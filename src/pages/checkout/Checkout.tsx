import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCartStore } from '@/store/cart';
import { useAuth } from '@/contexts/AuthContext';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';
import { CheckoutOptions } from '@/components/checkout/CheckoutOptions';
import { AddressForm } from '@/components/checkout/AddressForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useGuestCheckout } from '@/hooks/useGuestCheckout';
import type { GuestUser } from '@/types/checkout';

const steps = [
  { id: 1, name: 'Account', description: 'Login or continue as guest' },
  { id: 2, name: 'Shipping', description: 'Delivery address' },
  { id: 3, name: 'Payment', description: 'Complete your purchase' },
];

export const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [guestData, setGuestData] = useState<GuestUser | null>(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { items } = useCartStore();
  const { processGuestCheckout, loading } = useGuestCheckout();

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    // If user is logged in, skip to shipping step
    if (user) {
      setStep(2);
    }
  }, [user, items, navigate]);

  const handleGuestCheckout = (data: GuestUser) => {
    setGuestData(data);
    setStep(2);
  };

  const handleAddressSubmit = (address: any) => {
    setShippingAddress(address);
    setStep(3);
  };

  const handlePaymentSubmit = async (paymentMethod: any) => {
    try {
      if (user) {
        // Handle logged-in user checkout
        // Implement your logic here
      } else if (guestData && shippingAddress) {
        await processGuestCheckout(guestData, shippingAddress, paymentMethod);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CheckoutSteps currentStep={step} steps={steps} />

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          {step === 1 && !user && (
            <CheckoutOptions onGuestCheckout={handleGuestCheckout} />
          )}
          {step === 2 && (
            <AddressForm 
              onSubmit={handleAddressSubmit}
              defaultValues={user?.address ? JSON.parse(user.address) : undefined}
            />
          )}
          {step === 3 && (
            <PaymentForm onSubmit={handlePaymentSubmit} loading={loading} />
          )}
        </div>

        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
