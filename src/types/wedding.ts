export interface User {
    id: string;
    email: string;
    username: string;
    isAuthenticated: boolean;
}

export interface WeddingCouple {
    groomName: string;
    brideName: string;
    weddingQuote: string;
    image: string;
}

export interface WeddingStory {
    title: string;
    content: string;
    image: string;
    disabled: boolean;
}

export interface WeddingEvent {
    title: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    addressMapLink: string;
}

export interface WeddingToKnow {
    title: string;
    description: string;
}

export interface WeddingDetails {
    event1: WeddingEvent;
    event2: WeddingEvent;
    toKnow1: WeddingToKnow;
    toKnow2: WeddingToKnow;
    toKnow3: WeddingToKnow;
    disabled: boolean;
}

export interface ScheduleItem {
    id: string;
    time: string;
    event: string;
    description: string;
}

export interface GalleryImage {
    id: string;
    url: string;
    caption: string | null;
    name: string;
}

export interface WeddingMoreInfo {
    title: string;
    content: string;
    disabled: boolean;
}

export interface WeddingContact {
    phone: string;
    email: string;
    address: string;
    addressMapLink: string;
    disabled: boolean;
}

export interface WeddingJeweller {
    title: string;
    description: string;
    shopName: string;
    website: string;
    disabled: boolean;
}

export interface WeddingData {
    colorScheme: string;
    fontFamily: string;
    template: string;
    couple: WeddingCouple;
    story: WeddingStory;
    weddingDetails: WeddingDetails;
    schedule: ScheduleItem[];
    gallery: GalleryImage[];
    wishDisabled: boolean;
    moreInfo: WeddingMoreInfo;
    contact: WeddingContact;
    jeweller: WeddingJeweller;
}

export interface WebEntry {
    web_data: WeddingData;
    user_profile: {
        user_id: string;
        username: string;
    };
}

export interface WeddingWish {
    id: string;
    name: string;
    message: string;
}
