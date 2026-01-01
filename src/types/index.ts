export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  imageUrl?: string;
  category: 'cultural' | 'educational' | 'social' | 'fundraiser';
  registrationUrl?: string;
  isPastEvent?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  imageUrl?: string;
  category: string;
  slug: string;
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

export interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  isHonorarium?: boolean;
  honorariumName?: string;
  subscribeToNewsletter?: boolean;
}

export interface DonationFormData {
  frequency: 'one-time' | 'monthly' | 'annual';
  amount: number;
  customAmount?: number;
  coverFees: boolean;
  donorInfo: DonorInfo;
}