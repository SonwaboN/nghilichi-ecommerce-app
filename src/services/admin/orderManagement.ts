import { supabase } from '@/lib/supabase';
    import { Order, OrderStatus } from '@/types/order';
    import { AdminAnalytics } from '@/types/admin';

    export const adminOrderService = {
      async getAllOrders(filters?: {
        status?: OrderStatus;
        startDate?: Date;
        endDate?: Date;
        page?: number;
        limit?: number;
        searchTerm?: string;
      }) {
        let query = supabase
          .from('orders')
          .select(`
            *,
            profiles (full_name),
            order_items (product_id)
          `);

        if (filters?.status) {
          query = query.eq('status', filters.status);
        }

        if (filters?.startDate && filters?.endDate) {
          query = query.gte('created_at', filters.startDate.toISOString())
                      .lte('created_at', filters.endDate.toISOString());
        }

        if (filters?.searchTerm) {
          query = query.or(`id.ilike.%${filters.searchTerm}%,profiles.full_name.ilike.%${filters.searchTerm}%`);
        }

        const { data, error, count } = await query
          .range(((filters?.page || 1) - 1) * (filters?.limit || 10), 
                (filters?.page || 1) * (filters?.limit || 10) - 1)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return { orders: data, total: count };
      },

      async updateOrderStatus(orderId: string, status: OrderStatus) {
        const { error } = await supabase
          .from('orders')
          .update({ status })
          .eq('id', orderId);

        if (error) throw error;
      },

      async getOrderAnalytics(): Promise<AdminAnalytics> {
        const { data, error } = await supabase
          .rpc('get_order_analytics')
          .returns<AdminAnalytics>();

        if (error) throw error;
        return data;
      },
      async getAllOrdersForExport(filters?: {
        status?: OrderStatus;
        startDate?: Date;
        endDate?: Date;
        searchTerm?: string;
      }) {
        let query = supabase
          .from('orders')
          .select(`
            *,
            profiles (full_name),
            order_items (product_id)
          `);

        if (filters?.status) {
          query = query.eq('status', filters.status);
        }

        if (filters?.startDate && filters?.endDate) {
          query = query.gte('created_at', filters.startDate.toISOString())
                      .lte('created_at', filters.endDate.toISOString());
        }

        if (filters?.searchTerm) {
          query = query.or(`id.ilike.%${filters.searchTerm}%,profiles.full_name.ilike.%${filters.searchTerm}%`);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        return { orders: data };
      }
    };
