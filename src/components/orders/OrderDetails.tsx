import React from 'react';
import { format } from 'date-fns';
import { MapPin, CreditCard } from 'lucide-react';
import { Order } from '@/types/order';

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="space-y-8">
      {/* Order Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-[#777A55]">Order #{order.id}</h2>
          <p className="text-gray-600">
            Placed on {format(new Date(order.createdAt), 'PPP')}
          </p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* Order Information */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 text-[#777A55] mr-2" />
            <h3 className="text-lg font-medium text-[#777A55]">Shipping Address</h3>
          </div>
          <p className="text-gray-600">
            {order.shippingAddress.street}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state}<br />
            {order.shippingAddress.postalCode}<br />
            {order.shippingAddress.country}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="h-5 w-5 text-[#777A55] mr-2" />
            <h3 className="text-lg font-medium text-[#777A55]">Payment Method</h3>
          </div>
          <p className="text-gray-600">
            Credit Card ending in {order.paymentMethod.last4}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-[#777A55] mb-4">Order Items</h3>
          <div className="divide-y divide-gray-200">
            {order.items.map((item) => (
              <div key={item.productId} className="py-4 flex items-center">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Product #{item.productId}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium text-[#777A55]">
                  R{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between text-base font-medium text-[#777A55]">
            <span>Total</span>
            <span>R{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
