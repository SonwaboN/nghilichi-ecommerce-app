import React, { useState } from 'react';
    import { Button } from '@/components/ui/Button';
    import { OrderStatus } from '@/types/order';
    import { cn } from '@/lib/utils';

    interface OrderStatusDropdownProps {
      orderId: string;
      currentStatus: OrderStatus;
      onStatusChange: (orderId: string, status: OrderStatus) => void;
    }

    export const OrderStatusDropdown: React.FC<OrderStatusDropdownProps> = ({
      orderId,
      currentStatus,
      onStatusChange,
    }) => {
      const [isOpen, setIsOpen] = useState(false);

      const handleStatusSelect = (status: OrderStatus) => {
        onStatusChange(orderId, status);
        setIsOpen(false);
      };

      const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      return (
        <div className="relative">
          <Button variant="secondary" size="sm" onClick={toggleDropdown}>
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </Button>
          {isOpen && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md mt-1">
              <ul className="py-1">
                <li
                  onClick={() => handleStatusSelect('pending')}
                  className={cn(
                    'px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer',
                    currentStatus === 'pending' && 'bg-gray-100'
                  )}
                >
                  Pending
                </li>
                <li
                  onClick={() => handleStatusSelect('processing')}
                  className={cn(
                    'px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer',
                    currentStatus === 'processing' && 'bg-gray-100'
                  )}
                >
                  Processing
                </li>
                <li
                  onClick={() => handleStatusSelect('shipped')}
                  className={cn(
                    'px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer',
                    currentStatus === 'shipped' && 'bg-gray-100'
                  )}
                >
                  Shipped
                </li>
                <li
                  onClick={() => handleStatusSelect('delivered')}
                  className={cn(
                    'px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer',
                    currentStatus === 'delivered' && 'bg-gray-100'
                  )}
                >
                  Delivered
                </li>
                <li
                  onClick={() => handleStatusSelect('cancelled')}
                  className={cn(
                    'px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer',
                    currentStatus === 'cancelled' && 'bg-gray-100'
                  )}
                >
                  Cancelled
                </li>
              </ul>
            </div>
          )}
        </div>
      );
    };
