import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserPlus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GuestCheckoutForm } from './GuestCheckoutForm';

interface Props {
  onGuestCheckout: (data: any) => void;
}

export const CheckoutOptions: React.FC<Props> = ({ onGuestCheckout }) => {
  const location = useLocation();

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#777A55] mb-4">
          Checkout Options
        </h2>
        
        <div className="space-y-4">
          <Link 
            to="/register" 
            state={{ from: location.pathname }}
            className="block"
          >
            <Button variant="secondary" className="w-full flex items-center justify-center">
              <UserPlus className="mr-2 h-5 w-5" />
              Create Account
            </Button>
          </Link>
          
          <Link 
            to="/login" 
            state={{ from: location.pathname }}
            className="block"
          >
            <Button variant="secondary" className="w-full flex items-center justify-center">
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </Link>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue as guest</span>
            </div>
          </div>

          <GuestCheckoutForm onSubmit={onGuestCheckout} />
        </div>
      </div>
    </div>
  );
};
