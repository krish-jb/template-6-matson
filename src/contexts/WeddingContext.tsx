import { createContext } from "react";
import type { Session } from "@supabase/supabase-js";
import type { User, WeddingData, WeddingWishType } from "@/types/wedding";

export interface WeddingContextType {
  weddingData: WeddingData;
  weddingWishes: WeddingWishType[];
  setWeddingWishes: (wishes: WeddingWishType[]) => void;
  loadAllWeddingWishes: () => Promise<void>;
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  globalIsLoading: boolean;
  updateWeddingData: (data: Partial<WeddingData>) => Promise<boolean>;
  updateGalleryImage: (
    file: File | null,
    imageCaption: string | null,
    index: number
  ) => void;
  saveData: (data: WeddingData) => Promise<boolean>;
  addWish: (wish: WeddingWishType) => Promise<void>;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

export const WeddingContext = createContext<WeddingContextType | undefined>(
  undefined
);