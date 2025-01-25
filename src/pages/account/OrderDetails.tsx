import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { ArrowLeft } from 'lucide-react';
    import { Button } from '@/components/ui/Button';
    import { orderService } from '@/services/orderService';
    import { Order } from '@/types/order';
    import { toast } from 'sonner';

    export const OrderDetailsPage: React.FC = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const [order, setOrder] = useState<Order | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        const fetchOrder = async () => {
          try {
            if (!id) return;
            const data = await orderService.getOrderById(id);
            setOrder(data);
          } catch (err: any) {
            setError(err.message || 'Failed to fetch order details');
            navigate('/admin/orders');
          } finally {
            setLoading(false);
          }
        };

        fetchOrder();
      }, [id, navigate]);

      if (loading) {
        return <div>Loading order details...</div>;
      }

      if (error) {
        return <div className="text-red-500">Error: {error}</div>;
      }

      if (!order) {
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold text-[#777A55]">Order not found</h2>
            <Button onClick={() => navigate('/admin/orders')} className="mt-4">
              Back to Orders
            </Button>
          </div>
        );
      }

      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button 
            onClick={() => navigate('/admin/orders')}
            className="flex items-center text-[#777A55] hover:text-[#777A55]/80 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Orders
          </button>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#777A55]">Order #{order.id}</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-[#777A55] mb-4">Customer Details</h3>
              <p className="text-gray-600">
                Customer Name: {order.profiles?.full_name}
              </p>
              <p className="text-gray-600">
                Email: {order.profiles?.email}
              </p>
              <p className="text-gray-600">
                Phone: {order.profiles?.phone || 'N/A'}
              </p>
              <p className="text-gray-600">
                Address: {order.profiles?.address || 'N/A'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-[#777A55] mb-4">Items Purchased</h3>
              <ul className="space-y-2">
                {order.order_items.map((item) => (
                  <li key={item.id} className="text-gray-600">
                    Product ID: {item.product_id}, Quantity: {item.quantity}, Price: R{item.price}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-[#777A55] mb-4">Shipping Information</h3>
              <p className="text-gray-600">
                Street: {order.shipping_address.street}, City: {order.shipping_address.city}, State: {order.shipping_address.state}, Postal Code: {order.shipping_address.postalCode}, Country: {order.shipping_address.country}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-[#777A55] mb-4">Payment Status</h3>
              <p className="text-gray-600">
                Payment Method: {order.payment_method.type}, Last 4 digits: {order.payment_method.last4}
              </p>
            </div>
          </div>
        </div>
      );
    };
