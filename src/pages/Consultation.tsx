import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ConsultationCalendar } from '@/components/consultation/ConsultationCalendar';
import { TimeSlotPicker } from '@/components/consultation/TimeSlotPicker';

const consultationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  purpose: z.string().min(10, 'Please describe your consultation purpose'),
  date: z.string(),
  time: z.string(),
});

type ConsultationForm = z.infer<typeof consultationSchema>;

export const ConsultationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationForm>({
    resolver: zodResolver(consultationSchema),
  });

  const onSubmit = (data: ConsultationForm) => {
    console.log('Consultation booking:', data);
    // Handle form submission
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#777A55] mb-8">Book a Consultation</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#777A55] mb-4">
            Consultation Types
          </h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-[#777A55]">Spiritual Guidance</h3>
              <p className="text-gray-600 mt-2">
                One-on-one session for spiritual guidance and healing - R500
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-[#777A55]">Ancestral Connection</h3>
              <p className="text-gray-600 mt-2">
                Deep spiritual connection with ancestral guidance - R750
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#777A55] mb-6">
              Personal Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                  Consultation Purpose
                </label>
                <textarea
                  {...register('purpose')}
                  id="purpose"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                />
                {errors.purpose && (
                  <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#777A55] mb-6">
              Select Date & Time
            </h2>
            
            <div className="space-y-6">
              <ConsultationCalendar />
              <TimeSlotPicker />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Book Consultation
          </Button>
        </form>
      </div>
    </div>
  );
};
