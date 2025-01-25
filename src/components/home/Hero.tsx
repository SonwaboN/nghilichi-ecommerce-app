import React from 'react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background Container */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src="https://player.vimeo.com/video/1036827122?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
          className="absolute w-full h-full object-cover"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            aspectRatio: '16/9',
          }}
          allow="autoplay; fullscreen"
          title="Background Video"
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block mb-2">Spiritual Healing</span>
            <span className="block">For Your Soul</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover our collection of spiritual healing products and consultations. 
            Begin your journey to spiritual wellness today.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto bg-[#777A55] text-white hover:bg-[#777A55]/90">
                  Shop Now
                </Button>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link to="/consultation">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-[#777A55] hover:bg-gray-50">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
