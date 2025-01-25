import React from 'react';

export const RetreatsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#777A55] mb-8">Spiritual Healing Retreats</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#777A55] mb-4">South Africa Retreats</h2>
          <p className="text-gray-600 mb-4">
            Join Mkhulu Nghilichi for transformative spiritual healing retreats in South Africa.
            Experience deep inner work, spiritual purification, cleansing, and protection.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#777A55] mb-4">Mozambique Retreats</h2>
          <p className="text-gray-600 mb-4">
            Discover healing and spiritual growth through our retreats in Mozambique.
            Focus on trauma healing and spiritual cleansing in a peaceful environment.
          </p>
        </div>
      </div>
    </div>
  );
};
