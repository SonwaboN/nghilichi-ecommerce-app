import { supabase } from '@/lib/supabase';
    import { Discount, DiscountProduct, DiscountCategory, DiscountUser, OrderDiscount } from '@/types/admin';

    export const adminDiscountService = {
      async createDiscount(discount: Omit<Discount, 'id' | 'created_at' | 'updated_at' | 'usage_count'>): Promise<Discount> {
        const { data, error } = await supabase
          .from('discounts')
          .insert([
            { ...discount, usage_count: 0 }
          ])
          .select()
          .single();

        if (error) throw error;
        return data;
      },

      async getDiscount(discountId: string): Promise<Discount | null> {
        const { data, error } = await supabase
          .from('discounts')
          .select('*')
          .eq('id', discountId)
          .single();

        if (error) throw error;
        return data;
      },

      async getAllDiscounts(): Promise<Discount[]> {
        const { data, error } = await supabase
          .from('discounts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
      },

      async updateDiscount(discountId: string, updates: Partial<Discount>): Promise<Discount> {
        const { data, error } = await supabase
          .from('discounts')
          .update(updates)
          .eq('id', discountId)
          .select()
          .single();

        if (error) throw error;
        return data;
      },

      async deleteDiscount(discountId: string): Promise<void> {
        const { error } = await supabase
          .from('discounts')
          .delete()
          .eq('id', discountId);

        if (error) throw error;
      },

      async applyDiscountToProducts(discountId: string, productIds: string[]): Promise<void> {
        const inserts = productIds.map(productId => ({ discount_id: discountId, product_id: productId }));
        const { error } = await supabase
          .from('discount_products')
          .insert(inserts);

        if (error) throw error;
      },

      async removeDiscountFromProducts(discountId: string, productIds: string[]): Promise<void> {
        const { error } = await supabase
          .from('discount_products')
          .delete()
          .in('product_id', productIds)
          .eq('discount_id', discountId);

        if (error) throw error;
      },

      async applyDiscountToCategories(discountId: string, categories: string[]): Promise<void> {
        const inserts = categories.map(category => ({ discount_id: discountId, category }));
        const { error } = await supabase
          .from('discount_categories')
          .insert(inserts);

        if (error) throw error;
      },

      async removeDiscountFromCategories(discountId: string, categories: string[]): Promise<void> {
        const { error } = await supabase
          .from('discount_categories')
          .delete()
          .in('category', categories)
          .eq('discount_id', discountId);

        if (error) throw error;
      },

      async applyDiscountToUsers(discountId: string, userIds: string[]): Promise<void> {
        const inserts = userIds.map(userId => ({ discount_id: discountId, user_id: userId }));
        const { error } = await supabase
          .from('discount_users')
          .insert(inserts);

        if (error) throw error;
      },

      async removeDiscountFromUsers(discountId: string, userIds: string[]): Promise<void> {
        const { error } = await supabase
          .from('discount_users')
          .delete()
          .in('user_id', userIds)
          .eq('discount_id', discountId);

        if (error) throw error;
      },

      async applyDiscountToEmails(discountId: string, emails: string[]): Promise<void> {
        const inserts = emails.map(email => ({ discount_id: discountId, email }));
        const { error } = await supabase
          .from('discount_users')
          .insert(inserts);

        if (error) throw error;
      },

      async removeDiscountFromEmails(discountId: string, emails: string[]): Promise<void> {
        const { error } = await supabase
          .from('discount_users')
          .delete()
          .in('email', emails)
          .eq('discount_id', discountId);

        if (error) throw error;
      },

      async recordOrderDiscount(orderId: string, discountId: string, discountAmount: number): Promise<void> {
        const { error } = await supabase
          .from('order_discounts')
          .insert([{ order_id: orderId, discount_id: discountId, discount_amount: discountAmount }]);

        if (error) throw error;
      },

      async getOrderDiscounts(orderId: string): Promise<OrderDiscount[]> {
        const { data, error } = await supabase
          .from('order_discounts')
          .select('*')
          .eq('order_id', orderId);

        if (error) throw error;
        return data;
      },
    };
