import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@/types/wedding";

const deleteImage = async (user: User, name: string) => {
    const imagePath = `user_uploads/${user.id}/${name}`;

    const { error } = await supabase.storage.from("images").remove([imagePath]);

    if (error) {
        toast.error("Failed to remove image");
        console.log("Failed to remove image", error);
        return false;
    }

    return true;
};

export default deleteImage;
