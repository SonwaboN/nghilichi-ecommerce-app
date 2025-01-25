import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';

interface CartIconProps {
  className?: string;
}

export const CartIcon: React.FC<CartIconProps> = ({ className }) => {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingCart className={className || "h-6 w-6 text-[#777A55]"} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#777A55] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
};
