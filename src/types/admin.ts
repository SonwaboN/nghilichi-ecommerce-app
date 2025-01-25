export interface Product {
      id: string;
      name: string;
      description: string;
      price: number;
      stock_level: number;
      category: string;
      status: 'active' | 'inactive';
      created_at: string;
      updated_at: string;
      image: string | null;
    }

    export interface InventoryUpdate {
      product_id: string;
      quantity: number;
      type: 'restock' | 'adjustment' | 'sale';
      notes?: string;
    }

    export interface CustomerFilter {
      searchTerm?: string;
      status?: string;
      page?: number;
      limit?: number;
    }

    export interface DeliveryUpdate {
      status: 'pending' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
      location?: string;
      notes?: string;
      timestamp: string;
    }

    export interface AdminAnalytics {
      total_orders: number;
      total_revenue: number;
      average_order_value: number;
      top_products: Array<{
        product_id: string;
        name: string;
        total_sales: number;
      }>;
      sales_by_category: Array<{
        category: string;
        total_sales: number;
      }>;
    }
