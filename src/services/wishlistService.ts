import { supabase } from '@/lib/supabase';
import { WishlistItem } from '@/types/wishlist';
import { products } from '@/data/products';

export const wishlistService = {
  async getWishlist(): Promise<WishlistItem[]> {
    const { data, error } = await supabase
      .from('wishlists')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Enhance wishlist items with product details
    return data.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)
    }));
  },

  async addToWishlist(productId: string): Promise<void> {
    const { error } = await supabase
      .from('wishlists')
      .insert([{ product_id: productId }]);

    if (error) throw error;
  },

  async removeFromWishlist(productId: string): Promise<void> {
    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('product_id', productId);

    if (error) throw error;
  },

  async isInWishlist(productId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('wishlists')
      .select('id')
      .eq('product_id', productId)
      .single();

    if (error) return false;
    return !!data;
  }
};
