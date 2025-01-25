import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { guestOrderService } from '@/services/guestOrderService';
import { emailService } from '@/services/emailService';
import { useCartStore } from '@/store/cart';
import { toast } from 'sonner';
import type { GuestUser } from '@/types/checkout';

export const useGuestCheckout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const processGuestCheckout = async (
    guestData: GuestUser,
    shippingAddress: any,
    paymentMethod: any
  ) => {
    try {
      setLoading(true);

      const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      const order = await guestOrderService.createOrder({
        ...guestData,
        total,
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        }))
      });

      await Promise.all([
        emailService.sendOrderConfirmation(order),
        emailService.sendGuestOrderTracking(order)
      ]);

      clearCart();
      navigate(`/order/tracking/${order.tracking_token}`);
      toast.success('Order placed successfully! Check your email for tracking details.');
    } catch (error) {
      toast.error('Failed to process order');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    processGuestCheckout
  };
};
