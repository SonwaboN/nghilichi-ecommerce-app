import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { subscriptionPlans } from '@/data/subscriptionPlans';
import { useAuthStore } from '@/store/auth';

export const SubscriptionPlans: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleSubscribe = (planId: string) => {
    if (!user) {
      navigate('/login?redirect=subscription');
      return;
    }
    navigate(`/checkout/subscription/${planId}`);
  };

  return (
    <div className="bg-[#EBEBDA] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#777A55] mb-4">
            Private Client Memberships
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our exclusive private client program and get access to personalized spiritual guidance,
            healing sessions, and premium content curated by our experienced healer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#777A55] mb-4">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="text-4xl font-bold text-[#777A55] mb-6">
                  R{plan.price}
                  <span className="text-base font-normal text-gray-600">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#777A55] mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full"
                  size="lg"
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
