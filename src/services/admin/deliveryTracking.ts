import { supabase } from '@/lib/supabase';
import { DeliveryUpdate } from '@/types/admin';

export const adminDeliveryService = {
  async getDeliveries(filters?: {
    status?: string;
    date?: Date;
    page?: number;
    limit?: number;
  }) {
    let query = supabase
      .from('deliveries')
      .select(`
        *,
        order:order_id (*),
        courier:courier_id (*)
      `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error, count } = await query
      .range(((filters?.page || 1) - 1) * (filters?.limit || 10),
             (filters?.page || 1) * (filters?.limit || 10) - 1);

    if (error) throw error;
    return { deliveries: data, total: count };
  },

  async updateDeliveryStatus(deliveryId: string, update: DeliveryUpdate) {
    const { error } = await supabase
      .from('delivery_updates')
      .insert([{
        delivery_id: deliveryId,
        ...update
      }]);

    if (error) throw error;
  },

  async assignCourier(deliveryId: string, courierId: string) {
    const { error } = await supabase
      .from('deliveries')
      .update({ courier_id: courierId })
      .eq('id', deliveryId);

    if (error) throw error;
  }
};
