import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@/types/wedding";

const convertToWebp = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(img.src);
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject("Failed to get canvas context");
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    if (!blob) return reject("Webp conversion failed");
                    const webpFile = new File(
                        [blob],
                        file.name.replace(/\.\w+$/, ".webp"),
                        {
                            type: "image/webp",
                        },
                    );
                    resolve(webpFile);
                },
                "image/webp",
                0.7,
            );
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
};

export type ImageData = {
    url: string;
    name: string;
};

const uploadImage = async (
    file: File,
    user: User,
    name: string,
): Promise<ImageData | null> => {
    const webpFile = await convertToWebp(file);
    const fileName = `${name}.webp`;
    const imagePath = `user_uploads/${user.id}/${fileName}`;
    const { error } = await supabase.storage
        .from("images")
        .upload(imagePath, webpFile, {
            upsert: true,
        });

    if (error) {
        console.log("Error Uploading image: ", error.message);
        toast.error("Failed to upload image!", {
            description: error.message,
        });
        return null;
    }

    toast.success("Image uploaded Successfully!", {
        description: "Please wait few seconds to see the effect.",
    });

    const { data } = supabase.storage.from("images").getPublicUrl(imagePath);

    if (!data.publicUrl) {
        toast.error("Failed to retrieve load Image!");
        return null;
    }

    return { url: `${data.publicUrl}?t=${Date.now()}`, name: fileName };
};

export default uploadImage;
