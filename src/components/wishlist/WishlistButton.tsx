import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { wishlistService } from '@/services/wishlistService';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface WishlistButtonProps {
  productId: string;
  onToggle?: (isInWishlist: boolean) => void;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({ productId, onToggle }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      checkWishlistStatus();
    } else {
      setLoading(false);
    }
  }, [user, productId]);

  const checkWishlistStatus = async () => {
    try {
      const status = await wishlistService.isInWishlist(productId);
      setIsInWishlist(status);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    try {
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(productId);
      } else {
        await wishlistService.addToWishlist(productId);
      }
      setIsInWishlist(!isInWishlist);
      onToggle?.(!isInWishlist);
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  if (loading) return null;

  return (
    <Button
      variant={isInWishlist ? 'primary' : 'secondary'}
      onClick={handleClick}
      className="flex items-center"
    >
      <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
      {isInWishlist ? 'Saved' : 'Save to Wishlist'}
    </Button>
  );
};
