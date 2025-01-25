import { supabase } from '@/lib/supabase';
    import { Order, OrderStatus } from '@/types/order';

    export const orderService = {
      async createOrder(order: Omit<Order, 'id' | 'status' | 'createdAt'>) {
        const { data, error } = await supabase
          .from('orders')
          .insert([{
            ...order,
            status: 'pending',
            created_at: new Date().toISOString(),
          }])
          .select()
          .single();

        if (error) throw error;
        return data;
      },

      async getUserOrders(userId: string) {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            profiles (full_name)
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
      },

      async updateOrderStatus(orderId: string, status: OrderStatus) {
        const { error } = await supabase
          .from('orders')
          .update({ status })
          .eq('id', orderId);

        if (error) throw error;
      },

      async getOrderById(orderId: string): Promise<Order> {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*),
            profiles (full_name, email, phone, address)
          `)
          .eq('id', orderId)
          .single();

        if (error) throw error;
        return data;
      },
      async refundOrder(orderId: string): Promise<void> {
        // Placeholder for refund logic
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.updateOrderStatus(orderId, 'cancelled');
      },
    };
