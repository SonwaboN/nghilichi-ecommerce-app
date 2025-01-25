import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Mail, User, Phone } from 'lucide-react';

const guestCheckoutSchema = z.object({
  email: z.string().email('Valid email is required'),
  name: z.string().min(2, 'Name is required'),
  phone: z.string().optional(),
});

type GuestCheckoutForm = z.infer<typeof guestCheckoutSchema>;

interface Props {
  onSubmit: (data: GuestCheckoutForm) => void;
}

export const GuestCheckoutForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestCheckoutForm>({
    resolver: zodResolver(guestCheckoutSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="mt-1 relative">
          <input
            {...register('email')}
            type="email"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-[#777A55] focus:ring-[#777A55]"
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <div className="mt-1 relative">
          <input
            {...register('name')}
            type="text"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-[#777A55] focus:ring-[#777A55]"
          />
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number (Optional)
        </label>
        <div className="mt-1 relative">
          <input
            {...register('phone')}
            type="tel"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-[#777A55] focus:ring-[#777A55]"
          />
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Continue as Guest
      </Button>
    </form>
  );
};
