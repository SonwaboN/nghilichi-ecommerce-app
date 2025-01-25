export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  description: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  level: 'basic' | 'premium';
}

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  duration: string;
  streamUrl?: string;
  isLive: boolean;
  level: 'basic' | 'premium';
}
