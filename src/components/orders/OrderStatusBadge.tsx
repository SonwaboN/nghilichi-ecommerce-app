import React from 'react';
import { OrderStatus } from '@/types/order';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, size = 'sm' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`
      ${getStatusStyles()}
      ${size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-base'}
      rounded-full font-medium
    `}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
