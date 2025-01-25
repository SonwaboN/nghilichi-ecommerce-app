import { supabase } from '@/lib/supabase';
import { CustomerFilter } from '@/types/admin';

export const adminCustomerService = {
  async getCustomers(filters?: CustomerFilter) {
    let query = supabase
      .from('profiles')
      .select(`
        *,
        orders:orders (count),
        total_spent:orders (sum)
      `);

    if (filters?.searchTerm) {
      query = query.or(`email.ilike.%${filters.searchTerm}%,full_name.ilike.%${filters.searchTerm}%`);
    }

    const { data, error, count } = await query
      .range(((filters?.page || 1) - 1) * (filters?.limit || 10),
             (filters?.page || 1) * (filters?.limit || 10) - 1);

    if (error) throw error;
    return { customers: data, total: count };
  },

  async getCustomerDetails(customerId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        orders (
          *,
          order_items (*)
        )
      `)
      .eq('id', customerId)
      .single();

    if (error) throw error;
    return data;
  },

  async updateCustomerStatus(customerId: string, status: string) {
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', customerId);

    if (error) throw error;
  }
};
