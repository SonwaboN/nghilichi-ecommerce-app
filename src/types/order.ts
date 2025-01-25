export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

    export interface Order {
      id: string;
      user_id: string;
      items: Array<{
        product_id: string;
        quantity: number;
        price: number;
      }>;
      total: number;
      status: OrderStatus;
      shipping_address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
      created_at: string;
      payment_method: {
        type: 'credit_card' | 'debit_card';
        last4: string;
      };
      profiles?: {
        full_name: string;
        email: string;
        phone: string | null;
        address: string | null;
      };
      order_items: Array<{
        id: string;
        order_id: string;
        product_id: string;
        quantity: number;
        price: number;
      }>
    }

    export interface OrderSummary {
      id: string;
      total: number;
      status: OrderStatus;
      createdAt: string;
      itemCount: number;
      customerName: string;
    }
