import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';

interface OrderItemCardProps {
  productId: string;
  quantity: number;
  price: number;
}

export const OrderItemCard: React.FC<OrderItemCardProps> = ({ productId, quantity, price }) => {
  const product = products.find(p => p.id === productId);

  return (
    <div className="flex items-center py-4 space-x-4">
      <div className="h-20 w-20 flex-shrink-0">
        <img
          src={product?.image}
          alt={product?.name || 'Product'}
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1 min-w-0">
        <Link 
          to={`/product/${productId}`}
          className="text-[#777A55] hover:text-[#777A55]/80 font-medium"
        >
          {product?.name || `Product #${productId}`}
        </Link>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
        <p className="text-sm font-medium text-[#777A55]">
          R{(price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
