import type { Session } from "@supabase/supabase-js";
import type React from "react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/client";
import type { User, WeddingData, WeddingWishType } from "@/types/wedding";
import uploadImage from "@/utils/UploadImage";
import { WeddingContext } from "./WeddingContext";

const defaultWeddingData: WeddingData = {
    couple: {
        groomName: "Vineeth",
        brideName: "Parvathy",
        weddingQuote:
            "Two souls, one path, endless love blessed by divine grace.",
        image: "/couple/white.png",
    },
    story: {
        title: "Our Beautiful Journey",
        content:
            "From the first moment we met, we knew our hearts were destined to be united. Through laughter, dreams, and countless shared moments, our love has blossomed into something truly beautiful. Today, we celebrate not just our union, but the beginning of our forever.",
        image: "/couple/white.png",
    },
    weddingDetails: {
        event1: {
            title: "Wedding Ceremony",
            date: "Sunday, May 18th 2025",
            time: "11:55 AM to 12:25 PM",
            venue: "Nedumudy Kottaram",
            address: "Sree Baghavathi Temple, Nedumudy",
            addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
        },
        event2: {
            title: "Reception",
            date: "Monday, May 19th 2025",
            time: "Between 3 PM - 10 PM",
            venue: "Groom's Residence",
            address: "Kailasam, Parakode P.O, Adoor",
            addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
        },
        toKnow1: {
            title: "Getting There",
            description:
                "The venue is easily accessible by car or public transport. Parking facilities are available at both locations. Traditional dress is appreciated.",
        },
        toKnow2: {
            title: "What to Wear",
            description:
                "Traditional Indian attire is preferred. Ladies: Sarees or elegant suits. Gentlemen: Dhoti-kurta, suit, or traditional wear.",
        },
        toKnow3: {
            title: "Blessings & Gifts",
            description:
                "Your presence is the greatest gift. If you wish to bless us, we would appreciate your love and good wishes for our new journey together.",
        },
    },
    schedule: [
        {
            id: "1",
            time: "11:00 AM",
            event: "Guest Arrival",
            description: "Welcome and traditional refreshments",
        },
        {
            id: "2",
            time: "11:55 AM",
            event: "Wedding Ceremony",
            description: "Sacred wedding rituals begin",
        },
        {
            id: "3",
            time: "12:25 PM",
            event: "Ceremony Completion",
            description: "Blessings and felicitations",
        },
        {
            id: "4",
            time: "1:00 PM",
            event: "Traditional Feast",
            description: "Wedding lunch and celebrations",
        },
    ],
    gallery: [
        {
            id: "0",
            url: "/couple/white.png",
            caption: null,
        },
        {
            id: "1",
            url: "/couple/white.png",
            caption: null,
        },
        {
            id: "2",
            url: "/couple/white.png",
            caption: null,
        },
    ],
    moreInfo: {
        title: "Additional Information",
        content:
            "We are blessed to have you in our lives and would love to celebrate this special moment with you. For any dietary restrictions or special arrangements, please reach out to us. Children are welcome at the ceremony.",
    },
    contact: {
        phone: "+91 9946981614, 8086501980",
        email: "wedding@vineeth_parvathy.com",
        address: "Kailasam, Parakode P.O, Adoor, Mob: 9946981614, 8086501980",
        addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
    },
    jeweller: {
        title: "Our Wedding Jeweller",
        description:
            "Discover exquisite wedding rings and jewellery collections from our trusted partner.",
        shopName: "Edimannickal Gold and Diamonds",
        website:
            "https://www.instagram.com/edimannickalgoldanddiamonds?igsh=czd3ZzV3bjNvMQ==",
    },
};

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [weddingData, setWeddingData] =
        useState<WeddingData>(defaultWeddingData);
    const [weddingWishes, setWeddingWishes] = useState<Array<WeddingWishType>>(
        [],
    );
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [globalIsLoading, setGlobalIsLoading] = useState(true);

    const WEBSITE_KEY = 'vineeth_parvathy_wedding';

    useEffect(() => {
        // Set up auth state listener
        const loadWeddingData = async (id: string) => {
            try {
                const { data: weddingData, error: weddingError } =
                    await supabase
                        .from("wedding_data")
                        .select("data")
                        .eq("user_id", id)
                        .maybeSingle();

                const { data: wishData, error: wishError } = await supabase
                    .from("guest_wishes")
                    .select("id, name, message")
                    .eq("variant", id)
                    .order("created_at", { ascending: false })
                    .limit(3);

                if (weddingError) {
                    console.error("Error loading wedding data:", weddingError);
                } else if (weddingData?.data) {
                    setWeddingData(weddingData.data as unknown as WeddingData);
                }

                if (wishError) {
                    console.error("Error loading wish data: ", wishError);
                } else if (wishData) {
                    setWeddingWishes(wishData);
                }

                setGlobalIsLoading(false);
            } catch (error) {
                console.error("Error loading wedding data:", error);
                setGlobalIsLoading(false);
            }
        };

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_, session) => {
            flushSync(() => setSession(session));
            
            if (session?.user) {
                const mappedUser: User = {
                    id: session.user.id,
                    email: session.user.email || "",
                    isAuthenticated: true,
                };
                setUser(mappedUser);
                setIsLoggedIn(true);
                loadWeddingData(session.user.id);
            } else {
                setUser(null);
                setIsLoggedIn(false);
                loadWeddingData(WEBSITE_KEY);
            }
        });

        // Check for existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session?.user) {
                const mappedUser: User = {
                    id: session.user.id,
                    email: session.user.email || "",
                    isAuthenticated: true,
                };
                setUser(mappedUser);
                setIsLoggedIn(true);
                loadWeddingData(session.user.id);
            } else {
                loadWeddingData(WEBSITE_KEY);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const loadAllWeddingWishes = async () => {
        try {
            const { data: wishData, error: wishError } = await supabase
                .from("guest_wishes")
                .select("id, name, message")
                .eq("variant", WEBSITE_KEY)
                .order("created_at", { ascending: false });

            if (wishError) {
                console.log(
                    "Error loading all wishes (Supabase error): ",
                    wishError,
                );
                return;
            }

            if (wishData) {
                setWeddingWishes(wishData);
            }
        } catch (error) {
            console.log("Error loading all wishes: ", error);
        }
    };

    const updateWeddingData = async (
        data: Partial<WeddingData>,
    ): Promise<boolean> => {
        const prev = structuredClone(weddingData);
        const updated = { ...weddingData, ...data };

        setWeddingData(updated);

        const success = await saveData(updated);

        if (!success) setWeddingData(prev);

        return success;
    };

    const updateGalleryImage = async (
        file: File | null,
        imageCaption: string | null,
        index: number,
    ) => {
        const imageId = `${Date.now()}-${crypto.randomUUID()}`;
        const imageName = `gallery_image_${imageId}`;

        const updatedGallery = [...weddingData.gallery];

        if (index >= updatedGallery.length) {
            updatedGallery.push({
                id: imageId,
                url: "",
                caption: imageCaption,
                name: imageName,
            });
        }

        if (file) {
            const imageUrl = await uploadImage(file, user, imageName);
            updatedGallery[index].url = imageUrl;
        }

        updatedGallery[index].caption = imageCaption;
        updateWeddingData({ gallery: updatedGallery });
    };

    const saveData = async (data: WeddingData): Promise<boolean> => {
        if (!user?.id) {
            console.error("No user logged in");
            return false;
        }

        try {
            const { error } = await supabase.from("wedding_data").upsert(
                {
                    user_id: user.id,
                    data: data as unknown as Json,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: "user_id" },
            );

            if (error) {
                console.error("Error saving wedding data:", error);
                return false;
            }
        } catch (error) {
            console.error("Error saving wedding data:", error);
            return false;
        }
        return true;
    };

    const addWish = async (wish: WeddingWishType) => {
        try {
            const { error } = await supabase.from("guest_wishes").insert({
                name: wish.name,
                message: wish.message,
                variant: WEBSITE_KEY,
            });

            if (error) {
                console.log("Error adding new wish(Supabase error)", error);
            }
        } catch (error) {
            console.log("Error adding new wish", error);
        }
    };

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <WeddingContext.Provider
            value={{
                weddingData,
                weddingWishes,
                setWeddingWishes,
                loadAllWeddingWishes,
                user,
                session,
                isLoggedIn,
                globalIsLoading,
                updateWeddingData,
                updateGalleryImage,
                saveData,
                addWish,
                login,
                logout,
            }}
        >
            {children}
        </WeddingContext.Provider>
    );
};