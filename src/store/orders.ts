import { create } from 'zustand';
    import { persist } from 'zustand/middleware';
    import { Order, OrderStatus } from '@/types/order';
    import { orderService } from '@/services/orderService';
    import { toast } from 'sonner';

    interface OrderStore {
      orders: Order[];
      createOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => Promise<Order>;
      getOrders: (userId: string) => Promise<Order[]>;
      updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
    }

    export const useOrderStore = create<OrderStore>()(
      persist(
        (set, get) => ({
          orders: [],

          createOrder: async (orderData) => {
            try {
              const newOrder = await orderService.createOrder(orderData);
              set((state) => ({
                orders: [...state.orders, newOrder],
              }));
              toast.success('Order placed successfully!');
              return newOrder;
            } catch (error: any) {
              toast.error(error.message || 'Failed to create order');
              throw error;
            }
          },

          getOrders: async (userId) => {
            try {
              const orders = await orderService.getUserOrders(userId);
              set({ orders });
              return orders;
            } catch (error: any) {
              toast.error(error.message || 'Failed to fetch orders');
              throw error;
            }
          },

          updateOrderStatus: async (orderId, status) => {
            try {
              await orderService.updateOrderStatus(orderId, status);
              set((state) => ({
                orders: state.orders.map((order) =>
                  order.id === orderId ? { ...order, status } : order
                ),
              }));
              toast.success('Order status updated successfully!');
            } catch (error: any) {
              toast.error(error.message || 'Failed to update order status');
              throw error;
            }
          },
        }),
        {
          name: 'orders-storage',
        }
      )
    );
