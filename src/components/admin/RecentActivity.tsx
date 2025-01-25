import React from 'react';
    import { format } from 'date-fns';
    import { OrderSummary } from '@/types/order';

    interface RecentActivityProps {
      orders: OrderSummary[];
    }

    export const RecentActivity: React.FC<RecentActivityProps> = ({ orders }) => {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
