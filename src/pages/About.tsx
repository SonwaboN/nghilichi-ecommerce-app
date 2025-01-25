import React from 'react';
import { Users, Heart, Star } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-[#777A55] mb-4">About Nghilichi International</h1>
        <p className="text-gray-600">
          Dedicated to bringing traditional spiritual healing to the modern world
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=500"
            alt="Traditional healing"
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[#777A55] mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded on the principles of traditional African healing, Nghilichi International
            bridges the gap between ancient wisdom and modern wellness needs. Our journey
            began with a vision to make spiritual healing accessible to all while preserving
            its sacred traditions.
          </p>
          <p className="text-gray-600">
            Today, we serve clients worldwide, offering both traditional products and
            consultation services that honor our ancestral practices while embracing
            contemporary approaches to wellness.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Users className="h-12 w-12 text-[#777A55] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#777A55] mb-2">Expert Healers</h3>
          <p className="text-gray-600">
            Our team consists of experienced traditional healers with deep knowledge
            of ancestral practices.
          </p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Heart className="h-12 w-12 text-[#777A55] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#777A55] mb-2">Holistic Approach</h3>
          <p className="text-gray-600">
            We believe in treating the whole person - mind, body, and spirit.
          </p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Star className="h-12 w-12 text-[#777A55] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#777A55] mb-2">Quality Products</h3>
          <p className="text-gray-600">
            All our products are carefully sourced and prepared following traditional methods.
          </p>
        </div>
      </div>
    </div>
  );
};
