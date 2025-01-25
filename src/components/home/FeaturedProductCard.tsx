import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';

interface FeaturedProductCardProps {
  product: Product;
}

export const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      className="w-72 h-96 perspective-1000 group"
      initial={{ y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 cursor-pointer"
        animate={controls}
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full backface-hidden border-2 border-[#B4A04D] rounded-lg overflow-hidden shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="relative h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
              <p className="text-white/90 text-lg">R{product.price}</p>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full backface-hidden bg-white border-2 border-[#B4A04D] rounded-lg p-6 flex flex-col justify-between shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div>
            <h3 className="text-xl font-bold text-[#777A55] mb-4">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="space-y-2">
              <h4 className="font-medium text-[#777A55]">Purpose:</h4>
              <div className="flex flex-wrap gap-2">
                {product.purpose.map((p) => (
                  <span
                    key={p}
                    className="px-2 py-1 bg-[#EBEBDA] text-[#777A55] rounded-full text-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-[#B4A04D] hover:bg-[#B4A04D]/90"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
              variant="secondary"
              className="w-full"
            >
              View Details
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
