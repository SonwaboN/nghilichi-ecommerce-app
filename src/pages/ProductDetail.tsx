import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WishlistButton } from '@/components/wishlist/WishlistButton';
import { useCartStore } from '@/store/cart';
import { products } from '@/data/products';
import { toast } from 'sonner';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-[#777A55]">Product not found</h2>
        <Button onClick={() => navigate('/shop')} className="mt-4">
          Back to Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast.success('Added to cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="mt-8 lg:mt-0">
          <h1 className="text-3xl font-bold text-[#777A55]">{product.name}</h1>
          <p className="mt-4 text-2xl text-[#777A55]">R{product.price}</p>
          
          <div className="mt-6">
            <h2 className="text-lg font-medium text-[#777A55]">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-[#777A55]">Purpose</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.purpose.map((purpose) => (
                <span
                  key={purpose}
                  className="px-3 py-1 bg-[#EBEBDA] text-[#777A55] rounded-full text-sm"
                >
                  {purpose}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-[#777A55]">Instructions</h2>
            <p className="mt-2 text-gray-600">{product.instructions}</p>
          </div>

          <div className="mt-8 space-y-4">
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            
            <WishlistButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
