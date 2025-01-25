import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { guestOrderService } from '@/services/guestOrderService';
import { OrderTimeline } from '@/components/orders/OrderTimeline';
import { OrderDetails } from '@/components/orders/OrderDetails';

export const GuestOrderTracking: React.FC = () => {
  const { token } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!token) return;
        const data = await guestOrderService.getOrderByTracking(token);
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#777A55] mb-4">Order Not Found</h2>
        <p className="text-gray-600 mb-8">
          The order you're looking for couldn't be found. Please check your tracking link.
        </p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <OrderTimeline 
        status={order.status}
        createdAt={order.created_at}
        updatedAt={order.updated_at}
      />
      <OrderDetails order={order} />
    </div>
  );
};
