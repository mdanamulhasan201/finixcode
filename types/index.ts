export interface InfoItem {
    id: number;
    title: string;
    gender: string;
    age: string;
    type: string;
    about: string;
    location: string;
    map: string;
    Highlights: Array<{
        id: number;
        date: string;
        time: string;
        Arrive: string;
        Venue: string;
    }>;
    Refund: Array<{
        id: number;
        title: string;
    }>;
    "Hosted by": Array<{
        id: number;
        name: string;
        "activities hosted": string;
        "host rating": string;
        image: string;
        description: string;
    }>;
}

export interface PlayerItem {
    id: number;
    name: string;
    image: string;
    description: string;
}

export interface BannerData {
    id: number;
    bannerImage: Array<{ id: number; image: string }>;
    rightImage: Array<{ id: number; image: string }>;
    title: string;
    location: string;
    time: string;
    eventPrice: number;
    spotsLeft: number;
    Info: InfoItem[];
    Player: PlayerItem[];
}

export interface AllEventData {
    currentEvent: BannerData | null;
    allImages: {
        bannerImages: string[];
        rightImages: string[];
    };
    allEvents: BannerData[];
} 