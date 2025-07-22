import { supabase } from "@/integrations/supabase/client";
import type { User } from "@/types/wedding";

const uploadImage = async (
  file: File,
  user: User | null,
  imageName: string
): Promise<string> => {
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const { data, error } = await supabase.storage
      .from('wedding-images')
      .upload(`${user.id}/${imageName}`, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('wedding-images')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error("Error in uploadImage:", error);
    throw error;
  }
};

export default uploadImage;