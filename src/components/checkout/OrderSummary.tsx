import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export const OrderSummary: React.FC = () => {
  const items = useCartStore((state) => state.items);
  
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const shipping = subtotal > 1000 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-[#777A55] mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center">
            <div className="h-16 w-16 flex-shrink-0">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-full w-full object-cover rounded"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-[#777A55]">
              R{(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-6">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">R{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? 'Free' : `R${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-base font-medium pt-2 border-t">
            <span className="text-[#777A55]">Total</span>
            <span className="text-[#777A55]">R{total.toFixed(2)}</span>
          </div>
        </div>

        {shipping > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Free shipping on orders over R1000
          </p>
        )}
      </div>
    </div>
  );
};
