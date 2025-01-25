import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FeaturedProductCard } from './FeaturedProductCard';
import { products } from '@/data/products';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export const FeaturedProducts: React.FC = () => {
  return (
    <motion.div 
      className="py-24 bg-gradient-to-b from-[#EBEBDA] to-white relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#777A55] mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of spiritual healing products
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <Swiper
              modules={[Autoplay, Navigation, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              navigation
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="featured-products-swiper py-8"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="flex justify-center pb-8">
                  <FeaturedProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
