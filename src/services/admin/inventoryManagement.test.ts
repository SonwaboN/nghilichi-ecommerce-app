import { adminInventoryService } from './inventoryManagement';
    import { supabase } from '@/lib/supabase';

    jest.mock('@/lib/supabase', () => ({
      supabase: {
        from: jest.fn(() => ({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          range: jest.fn().mockReturnThis(),
          update: jest.fn().mockReturnThis(),
          insert: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: {} }),
        })),
      },
    }));

    describe('adminInventoryService', () => {
      it('should call supabase.from with correct parameters for getInventory', async () => {
        await adminInventoryService.getInventory({ limit: 10, page: 1 });
        expect(supabase.from).toHaveBeenCalledWith('products');
        expect(supabase.from().select).toHaveBeenCalledWith('*');
        expect(supabase.from().range).toHaveBeenCalledWith(0, 9);
      });

      it('should call supabase.from with correct parameters for updateProduct', async () => {
        await adminInventoryService.updateProduct('test-id', { stock_level: 10 });
        expect(supabase.from).toHaveBeenCalledWith('products');
        expect(supabase.from().update).toHaveBeenCalledWith({ stock_level: 10 });
        expect(supabase.from().eq).toHaveBeenCalledWith('id', 'test-id');
      });

      it('should call supabase.from with correct parameters for createProduct', async () => {
        const product = {
          name: 'Test Product',
          description: 'Test Description',
          price: 100,
          stock_level: 10,
          category: 'test',
          status: 'active',
        };
        await adminInventoryService.createProduct(product);
        expect(supabase.from).toHaveBeenCalledWith('products');
        expect(supabase.from().insert).toHaveBeenCalledWith([product]);
      });

      it('should call supabase.from with correct parameters for getProduct', async () => {
        await adminInventoryService.getProduct('test-id');
        expect(supabase.from).toHaveBeenCalledWith('products');
        expect(supabase.from().select).toHaveBeenCalledWith('*');
        expect(supabase.from().eq).toHaveBeenCalledWith('id', 'test-id');
        expect(supabase.from().single).toHaveBeenCalled();
      });
    });
