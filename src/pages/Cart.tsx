import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
    import { Button } from '@/components/ui/Button';
    import { useCartStore } from '@/store/cart';
    import { useAuthStore } from '@/store/auth';

    export const CartPage: React.FC = () => {
      const navigate = useNavigate();
      const { items, removeItem, updateQuantity } = useCartStore();
      const { user } = useAuthStore();
      
      const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      const handleCheckout = () => {
        if (!user) {
          // Redirect to login with return URL
          navigate(`/login?redirect=/checkout`);
        } else {
          navigate('/checkout');
        }
      };

      if (items.length === 0) {
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#777A55]">Your cart is empty</h2>
            <p className="mt-4 text-gray-600">Start shopping to add items to your cart.</p>
            <Link to="/shop">
              <Button className="mt-8">Continue Shopping</Button>
            </Link>
          </div>
        );
      }

      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-[#777A55] mb-8">Shopping Cart</h1>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-7">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex py-6 border-b border-gray-200"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-[#777A55]">
                        <h3>{item.product.name}</h3>
                        <p className="ml-4">R{item.product.price}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-gray-700">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-[#777A55]">Order Summary</h2>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-[#777A55]">R{total.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-[#777A55]">Order Total</p>
                  <p className="text-base font-medium text-[#777A55]">R{total.toFixed(2)}</p>
                </div>
              </div>

              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      );
    };
