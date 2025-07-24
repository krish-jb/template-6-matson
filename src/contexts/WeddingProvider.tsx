import type { Session } from "@supabase/supabase-js";
import type React from "react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/custom-types";
import type { User, WeddingData, WeddingWish } from "@/types/wedding";
import uploadImage from "@/utils/UploadImage";
import { WeddingContext } from "./WeddingContext";

const defaultWeddingData: WeddingData = {
    couple: {
        groomName: "Alec Richelieu",
        brideName: "Zola Bekker",
        weddingQuote:
            "Together We Journey – Two souls, one path, endless love.",
        image: "/couple/white.png",
    },
    story: {
        title: "The A to Z's of Alec & Zola",
        content:
            "We met on a beautiful autumn day in the local coffee shop. What started as a chance encounter over spilled coffee became the beginning of our forever love story. After three wonderful years together, Alec proposed during a romantic sunset at our favorite beach, and Zola said yes with tears of joy.",
        image: "/couple/white.png",
    },
    weddingDetails: {
        event1: {
            title: "Ceremony",
            date: "June 10, 2030",
            time: "5:00 PM",
            venue: "Spring Events Patio",
            address: "123 Spring Events Street, City, State 12345",
            addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
        },
        event2: {
            title: "Reception",
            date: "June 10, 2030",
            time: "7:30 PM",
            venue: "Spring Events Ballroom",
            address: "123 Spring Events Street, City, State 12345",
            addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
        },
        toKnow1: {
            title: "Dress Code",
            description:
                "Semi-formal attire requested. Ladies: cocktail dresses or elegant separates. Gentlemen: suit and tie or dress shirt with slacks.",
        },
        toKnow2: {
            title: "Gift Registry",
            description:
                "Your presence is our present! If you wish to give a gift, we have a registry at Target and Amazon.",
        },
        toKnow3: {
            title: "Song Requests",
            description:
                "Help us create the perfect playlist! Send us your song requests and we'll make sure to play your favorites.",
        },
    },
    schedule: [
        {
            id: "1",
            time: "4:30 PM",
            event: "Guest Arrival",
            description: "Welcome drinks and mingling",
        },
        {
            id: "2",
            time: "5:00 PM",
            event: "Ceremony",
            description: "Wedding ceremony begins",
        },
        {
            id: "3",
            time: "6:00 PM",
            event: "Cocktail Hour",
            description: "Photos and cocktails",
        },
        {
            id: "4",
            time: "7:30 PM",
            event: "Reception",
            description: "Dinner and dancing",
        },
    ],
    gallery: [
        {
            id: "0",
            url: "/couple/white.png",
            caption: null,
            name: null,
        },
        {
            id: "1",
            url: "/couple/white.png",
            caption: null,
            name: null,
        },
        {
            id: "2",
            url: "/couple/white.png",
            caption: null,
            name: null,
        },
    ],
    moreInfo: {
        title: "Additional Information",
        content:
            "For dietary restrictions, please contact us at least one week before the wedding. We will have vegetarian and gluten-free options available. Children are welcome at both the ceremony and reception.",
    },
    contact: {
        phone: "+1 (555) 123-4567",
        email: "wedding@aleczola.com",
        address: "123 Main Street, City, State 12345",
        addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
    },
    jeweller: {
        title: "Our Wedding Jeweller",
        description:
            "Discover exquisite wedding rings and jewellery collections from our trusted partner.",
        shopName: "Diamond Dreams Jewellers",
        website: "https://www.diamonddreamsjewellers.com",
    },
};

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                             children,
                                                                         }) => {
    const [weddingData, setWeddingData] =
        useState<WeddingData>(defaultWeddingData);
    const [weddingWishes, setWeddingWishes] = useState<Array<WeddingWish>>([]);
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [globalIsLoading, setGloabalIsLoading] = useState(true);

    useEffect(() => {
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
                    return;
                }

                if (wishError) {
                    console.error("Error loading wish data: ", wishError);
                }

                if (weddingData?.data) {
                    setWeddingData(weddingData.data as unknown as WeddingData);
                    setGloabalIsLoading(false);
                }

                if (wishData) {
                    setWeddingWishes(wishData);
                }
            } catch (error) {
                console.error("Error loading wedding data:", error);
            }
        };

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_, session) => {
            flushSync(() => setSession(session));
            loadWeddingData(import.meta.env.VITE_WEBSITE_KEY || "default");

            if (session?.user) {
                const mappedUser: User = {
                    id: session.user.id,
                    email: session.user.email || "",
                    isAuthenticated: true,
                };
                setUser(mappedUser);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        });

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
                loadWeddingData(import.meta.env.VITE_WEBSITE_KEY || "default");
            }
            // else {
            //     setGloabalIsLoading(false);
            // }
        });

        return () => subscription.unsubscribe();
    }, []);

    const loadAllWeddingWishes = async () => {
        try {
            const { data: wishData, error: wishError } = await supabase
                .from("guest_wishes")
                .select("id, name, message")
                .eq("variant", import.meta.env.VITE_WEBSITE_KEY || "default")
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
            if (!imageUrl) return;
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

    const addWish = async (wish: WeddingWish) => {
        try {
            const { error } = await supabase.from("guest_wishes").insert({
                name: wish.name,
                message: wish.message,
                variant: import.meta.env.VITE_WEBSITE_KEY,
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
