import { supabase } from '@/lib/supabase';
import { GuestOrder } from '@/types/checkout';

export const emailService = {
  async sendOrderConfirmation(order: GuestOrder) {
    const { error } = await supabase.functions.invoke('send-order-confirmation', {
      body: { order }
    });
    
    if (error) throw error;
  },

  async sendGuestOrderTracking(order: GuestOrder) {
    const { error } = await supabase.functions.invoke('send-tracking-link', {
      body: { order }
    });
    
    if (error) throw error;
  }
};
