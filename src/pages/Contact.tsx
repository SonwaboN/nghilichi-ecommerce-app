import React from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#777A55] mb-8 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Phone className="h-6 w-6 text-[#777A55] mb-2" />
            <h3 className="text-lg font-semibold text-[#777A55] mb-1">Phone</h3>
            <p className="text-gray-600">+27 (0) 82 123 4567</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Mail className="h-6 w-6 text-[#777A55] mb-2" />
            <h3 className="text-lg font-semibold text-[#777A55] mb-1">Email</h3>
            <p className="text-gray-600">info@nghilichi.co.za</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MapPin className="h-6 w-6 text-[#777A55] mb-2" />
            <h3 className="text-lg font-semibold text-[#777A55] mb-1">Location</h3>
            <p className="text-gray-600">123 Healing Street, Johannesburg</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MessageSquare className="h-6 w-6 text-[#777A55] mb-2" />
            <h3 className="text-lg font-semibold text-[#777A55] mb-1">WhatsApp</h3>
            <p className="text-gray-600">+27 (0) 82 123 4567</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[#777A55] mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
