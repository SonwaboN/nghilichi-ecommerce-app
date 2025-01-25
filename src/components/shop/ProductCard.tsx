import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success('Added to cart');
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="h-[400px] perspective-1000 cursor-pointer"
      onClick={handleFlip}
      onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
      role="button"
      tabIndex={0}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative h-64">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 transition-opacity opacity-0 hover:opacity-100" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[#777A55] mb-2">{product.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-[#777A55] font-bold">R{product.price}</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAddToCart}
                className="hover:bg-[#777A55] hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="h-full flex flex-col">
            <div className="relative h-32">
              <img
                src={`https://images.unsplash.com/photo-${product.id === '1' ? '1602928321679-560bb453f190' : '1515377905703-c4788e51af15'}?auto=format&fit=crop&q=80&w=500`}
                alt={`${product.name} - Detail`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-white">
                {product.name}
              </h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[#777A55]">Purpose:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.purpose.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-1 bg-[#EBEBDA] text-[#777A55] rounded-full text-xs"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-[#777A55]">Instructions:</h4>
                  <p className="text-sm text-gray-600 mt-1">{product.instructions}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Link 
                  to={`/product/${product.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1"
                >
                  <Button variant="secondary" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
