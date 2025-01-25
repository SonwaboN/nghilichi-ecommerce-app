import { useState, useEffect } from 'react';
import { wishlistService } from '@/services/wishlistService';
import { WishlistItem } from '@/types/wishlist';
import { toast } from 'sonner';

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const data = await wishlistService.getWishlist();
      setItems(data);
    } catch (error) {
      toast.error('Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    try {
      await wishlistService.addToWishlist(productId);
      await fetchWishlist();
      toast.success('Added to wishlist');
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await wishlistService.removeFromWishlist(productId);
      setItems(items.filter(item => item.productId !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return {
    items,
    loading,
    addToWishlist,
    removeFromWishlist
  };
}
