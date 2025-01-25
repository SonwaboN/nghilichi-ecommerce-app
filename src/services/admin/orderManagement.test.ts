import { adminOrderService } from './orderManagement';
    import { supabase } from '@/lib/supabase';

    jest.mock('@/lib/supabase', () => ({
      supabase: {
        from: jest.fn(() => ({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          range: jest.fn().mockReturnThis(),
          update: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: {} }),
        })),
        rpc: jest.fn().mockResolvedValue({ data: {} }),
      },
    }));

    describe('adminOrderService', () => {
      it('should call supabase.from with correct parameters for getAllOrders', async () => {
        await adminOrderService.getAllOrders({ limit: 10, page: 1 });
        expect(supabase.from).toHaveBeenCalledWith('orders');
        expect(supabase.from().select).toHaveBeenCalledWith(expect.stringContaining('*'));
        expect(supabase.from().order).toHaveBeenCalledWith('created_at', { ascending: false });
        expect(supabase.from().range).toHaveBeenCalledWith(0, 9);
      });

      it('should call supabase.from with correct parameters for updateOrderStatus', async () => {
        await adminOrderService.updateOrderStatus('test-id', 'shipped');
        expect(supabase.from).toHaveBeenCalledWith('orders');
        expect(supabase.from().update).toHaveBeenCalledWith({ status: 'shipped' });
        expect(supabase.from().eq).toHaveBeenCalledWith('id', 'test-id');
      });

      it('should call supabase.rpc with correct parameters for getOrderAnalytics', async () => {
        await adminOrderService.getOrderAnalytics();
        expect(supabase.rpc).toHaveBeenCalledWith('get_order_analytics');
      });
    });
