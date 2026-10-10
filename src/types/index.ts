export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  imageUrl?: string;
  category: "cultural" | "educational" | "social" | "fundraiser";
  registrationUrl?: string;
  isPastEvent?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  linkedIn?: string;
  email?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  eventId?: string;
  category: string;
  date: Date;
}
