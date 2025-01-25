import React from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { ShoppingCart, X } from 'lucide-react';
    import { Button } from '@/components/ui/Button';
    import { useCartStore } from '@/store/cart';
    import { Link } from 'react-router-dom';

    interface CartPopoverProps {
      isOpen: boolean;
      onClose: () => void;
    }

    export const CartPopover: React.FC<CartPopoverProps> = ({ isOpen, onClose }) => {
      const { items, removeItem, updateQuantity } = useCartStore();
      
      const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      console.log('CartPopover rendered, isOpen:', isOpen);

      return (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 right-4 w-96 bg-white rounded-lg shadow-xl z-50"
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#777A55]">Shopping Cart</h3>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-16 w-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">R{item.product.price}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              -
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">R{total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <Link to="/checkout" onClick={onClose}>
                      <Button className="w-full">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link to="/cart" onClick={onClose}>
                      <Button variant="secondary" className="w-full">
                        View Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      );
    };
