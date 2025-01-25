import { Order } from '@/types/order';
    import { Product } from '@/types/admin';
    import { jsPDF } from 'jspdf';
    import 'jspdf-autotable';

    export const exportToCsv = (data: Order[] | Product[]) => {
      if (data.length === 0) return "";
      const isOrderData = (data[0] as Order).hasOwnProperty('shipping_address');
      const headers = isOrderData
        ? [
            'Order ID',
            'Customer Name',
            'Date',
            'Total',
            'Status',
          ]
        : [
            'Product Name',
            'Description',
            'Price',
            'Stock Level',
            'Category',
            'Status'
          ];

      const rows = data.map((item) => {
        if (isOrderData) {
          const order = item as Order;
          return [
            order.id,
            order.profiles?.full_name || 'Guest User',
            order.createdAt,
            order.total.toFixed(2),
            order.status,
          ];
        } else {
          const product = item as Product;
          return [
            product.name,
            product.description,
            product.price,
            product.stock_level,
            product.category,
            product.status,
          ];
        }
      });

      const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
      return csv;
    };

    export const exportToPdf = (orders: Order[]) => {
      const doc = new jsPDF();
      const headers = [
        'Order ID',
        'Customer Name',
        'Date',
        'Total',
        'Status',
      ];

      const rows = orders.map((order) => [
        order.id,
        order.profiles?.full_name || 'Guest User',
        order.createdAt,
        order.total.toFixed(2),
        order.status,
      ]);

      (doc as any).autoTable({
        head: [headers],
        body: rows,
      });

      return doc.output('blob');
    };
