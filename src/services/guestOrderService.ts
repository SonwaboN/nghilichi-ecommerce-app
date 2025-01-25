import { supabase } from '@/lib/supabase';
import { GuestOrder } from '@/types/checkout';
import { generateOrderId, generateTrackingToken } from '@/utils/orderTracking';

export const guestOrderService = {
  async createOrder(orderData: Omit<GuestOrder, 'orderId' | 'trackingToken'>) {
    const orderId = generateOrderId();
    const trackingToken = generateTrackingToken();

    const { data, error } = await supabase
      .from('guest_orders')
      .insert([
        {
          ...orderData,
          order_id: orderId,
          tracking_token: trackingToken,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getOrderByTracking(trackingToken: string) {
    const { data, error } = await supabase
      .from('guest_orders')
      .select('*')
      .eq('tracking_token', trackingToken)
      .single();

    if (error) throw error;
    return data;
  },
};
