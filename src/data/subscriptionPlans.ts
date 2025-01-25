import { SubscriptionPlan } from '@/types/subscription';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 222,
    description: 'Access to essential spiritual guidance and healing content',
    features: [
      'Access to basic course library',
      'Monthly live healing sessions',
      'Community forum access',
      'Email support',
      'Basic spiritual assessments'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 999,
    description: 'Full access to all spiritual healing resources and premium features',
    features: [
      'Access to all courses (basic + premium)',
      'Weekly live healing sessions',
      'Priority booking for 1-on-1 sessions',
      'Exclusive premium content',
      'Advanced spiritual assessments',
      'Direct messaging with healer',
      '24/7 priority support'
    ]
  }
];
