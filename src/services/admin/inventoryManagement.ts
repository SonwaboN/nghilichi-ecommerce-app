import { supabase } from '@/lib/supabase';
    import { Product, InventoryUpdate } from '@/types/admin';

    export const adminInventoryService = {
      async getInventory(filters?: {
        category?: string;
        lowStock?: boolean;
        page?: number;
        limit?: number;
        sortBy?: {
          column: 'name' | 'price' | 'stock_level' | 'category';
          order: 'asc' | 'desc';
        },
        searchTerm?: string;
      }) {
        let query = supabase
          .from('products')
          .select('*');

        if (filters?.category) {
          query = query.eq('category', filters.category);
        }

        if (filters?.sortBy) {
          query = query.order(filters.sortBy.column, { ascending: filters.sortBy.order === 'asc' });
        }

        if (filters?.searchTerm) {
          query = query.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
        }

        const { data, error, count } = await query
          .range(((filters?.page || 1) - 1) * (filters?.limit || 10),
                (filters?.page || 1) * (filters?.limit || 10) - 1);

        if (error) throw error;
        return { products: data, total: count };
      },

      async updateProduct(productId: string, updates: Partial<Product>) {
        const { error } = await supabase
          .from('products')
          .update(updates)
          .eq('id', productId);

        if (error) throw error;
      },

      async addInventoryUpdate(update: InventoryUpdate) {
        const { error } = await supabase
          .from('inventory_updates')
          .insert([update]);

        if (error) throw error;
      },

      async getProduct(productId: string): Promise<Product | null> {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (error) throw error;
        return data;
      },

      async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
        const { data, error } = await supabase
          .from('products')
          .insert([product])
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      async getAllProductsForExport(filters?: {
        category?: string;
        lowStock?: boolean;
        sortBy?: {
          column: 'name' | 'price' | 'stock_level' | 'category';
          order: 'asc' | 'desc';
        },
        searchTerm?: string;
      }) {
        let query = supabase
          .from('products')
          .select('*');

        if (filters?.category) {
          query = query.eq('category', filters.category);
        }

        if (filters?.sortBy) {
          query = query.order(filters.sortBy.column, { ascending: filters.sortBy.order === 'asc' });
        }

        if (filters?.searchTerm) {
          query = query.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
        }

        const { data, error } = await query.order('name', { ascending: true });

        if (error) throw error;
        return { products: data };
      }
    };
