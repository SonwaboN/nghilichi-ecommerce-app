import React from 'react';
import { format } from 'date-fns';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Order } from '@/types/order';
import { Button } from '@/components/ui/Button';

interface OrderListProps {
  orders: Order[];
  loading: boolean;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, loading }) => {
  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6">Start shopping to create your first order</p>
        <Link to="/shop">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium text-[#777A55]">
                Order #{order.id}
              </h3>
              <p className="text-sm text-gray-500">
                Placed on {format(new Date(order.createdAt), 'PPP')}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Items</span>
              <span className="font-medium">{order.items.length}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Order Total</span>
              <span className="font-medium">R{order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6">
            <Link to={`/account/orders/${order.id}`}>
              <Button variant="secondary" className="w-full">
                View Order Details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
