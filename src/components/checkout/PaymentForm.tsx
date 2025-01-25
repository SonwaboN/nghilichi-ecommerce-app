import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { CreditCard, Lock } from 'lucide-react';

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
  nameOnCard: z.string().min(3, 'Name on card is required'),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <div className="mt-1 relative">
          <input
            {...register('cardNumber')}
            type="text"
            maxLength={16}
            placeholder="1234 5678 9012 3456"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50 pl-10"
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            {...register('expiryDate')}
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
          />
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <div className="mt-1 relative">
            <input
              {...register('cvv')}
              type="password"
              maxLength={4}
              placeholder="123"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50 pl-10"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">
          Name on Card
        </label>
        <input
          {...register('nameOnCard')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
        />
        {errors.nameOnCard && (
          <p className="mt-1 text-sm text-red-600">{errors.nameOnCard.message}</p>
        )}
      </div>

      <div className="mt-6">
        <Button type="submit" className="w-full">
          Pay Now
        </Button>
      </div>
    </form>
  );
};
