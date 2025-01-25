import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useWishlist } from '@/hooks/useWishlist';
import { useCartStore } from '@/store/cart';

export const WishlistPage: React.FC = () => {
  const { items, loading, removeFromWishlist } = useWishlist();
  const addToCart = useCartStore(state => state.addItem);

  const handleMoveToCart = (productId: string) => {
    const item = items.find(item => item.productId === productId);
    if (item?.product) {
      addToCart(item.product);
      removeFromWishlist(productId);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#777A55]">Your wishlist is empty</h2>
        <p className="mt-4 text-gray-600">Browse our products and add some items to your wishlist.</p>
        <Link to="/shop">
          <Button className="mt-8">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#777A55] mb-8">My Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => item.product && (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#777A55] mb-2">
                {item.product.name}
              </h3>
              <p className="text-gray-600 mb-4">R{item.product.price}</p>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handleMoveToCart(item.productId)}
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Move to Cart
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => removeFromWishlist(item.productId)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
