export interface TimelineItem {
  id: string;
  category: 'civil' | 'church' | 'reception' | 'cake';
  title: string;
  time: string;
  location: string;
  address?: string;
  description: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  featured?: boolean;
}

export interface WeddingData {
  brideName: string;
  groomName: string;
  greetingTitle: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  venueName: string;
  venueAddress: string;
  venueCity: string;
  venueCoordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  welcomeMessage: string;
  loveQuote: string;
  dressCode: string;
  timeline: TimelineItem[];
  photos: PhotoItem[];
}

export interface GuestComment {
  id: string;
  author: string;
  relation: string;
  text: string;
  timestamp: string;
  likes: number;
  badge?: string;
}

export interface RsvpEntry {
  id: string;
  fullName: string;
  phone: string;
  status: 'attending' | 'declined';
  guestCount: number;
  wishes?: string;
  dietary?: string;
  createdAt: string;
}
