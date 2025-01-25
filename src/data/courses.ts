import { Course } from '@/types/subscription';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Spiritual Healing',
    description: 'Learn the fundamentals of spiritual healing and energy work.',
    thumbnail: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&q=80&w=500',
    videoUrl: 'https://player.vimeo.com/video/1036827122',
    duration: '45 minutes',
    level: 'basic'
  },
  {
    id: '2',
    title: 'Advanced Meditation Techniques',
    description: 'Discover powerful meditation practices for spiritual growth.',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500',
    videoUrl: 'https://player.vimeo.com/video/1036827122',
    duration: '60 minutes',
    level: 'premium'
  },
  {
    id: '3',
    title: 'Ancestral Connection Rituals',
    description: 'Learn sacred rituals to connect with your ancestors.',
    thumbnail: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&q=80&w=500',
    videoUrl: 'https://player.vimeo.com/video/1036827122',
    duration: '55 minutes',
    level: 'premium'
  }
];
