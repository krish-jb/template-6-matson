export interface User {
  id: string;
  email: string;
  isAuthenticated: boolean;
}

export interface WeddingWishType {
  id?: string;
  name: string;
  message: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  event: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string | null;
  name?: string;
}

export interface EventDetails {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  addressMapLink: string;
}

export interface ToKnowItem {
  title: string;
  description: string;
}

export interface WeddingData {
  couple: {
    groomName: string;
    brideName: string;
    weddingQuote: string;
    image: string;
  };
  story: {
    title: string;
    content: string;
    image: string;
  };
  weddingDetails: {
    event1: EventDetails;
    event2: EventDetails;
    toKnow1: ToKnowItem;
    toKnow2: ToKnowItem;
    toKnow3: ToKnowItem;
  };
  schedule: ScheduleItem[];
  gallery: GalleryItem[];
  moreInfo: {
    title: string;
    content: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    addressMapLink: string;
  };
  jeweller: {
    title: string;
    description: string;
    shopName: string;
    website: string;
  };
}