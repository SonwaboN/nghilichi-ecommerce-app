import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/Button';
    import { ChartPlaceholder } from '@/components/admin/ChartPlaceholder';
    import { RecentActivity } from '@/components/admin/RecentActivity';
    import { adminOrderService } from '@/services/admin/orderManagement';
    import { adminInventoryService } from '@/services/admin/inventoryManagement';
    import { AdminAnalytics } from '@/types/admin';
    import { format } from 'date-fns';

    export const Dashboard: React.FC = () => {
      const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [recentOrders, setRecentOrders] = useState<any[]>([]);

      useEffect(() => {
        const fetchAnalytics = async () => {
          try {
            const data = await adminOrderService.getOrderAnalytics();
            setAnalytics(data);
            const { orders } = await adminOrderService.getAllOrders({ limit: 5 });
            setRecentOrders(orders);
          } catch (err: any) {
            setError(err.message || 'Failed to fetch analytics');
          } finally {
            setLoading(false);
          }
        };

        fetchAnalytics();
      }, []);

      if (loading) {
        return <div>Loading dashboard data...</div>;
      }

      if (error) {
        return <div className="text-red-500">Error: {error}</div>;
      }

      return (
        <div>
          <h2 className="text-2xl font-bold text-[#777A55] mb-4">Dashboard Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-[#777A55] mb-2">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-700">
                R {analytics?.total_revenue?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-[#777A55] mb-2">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-700">
                {analytics?.total_orders || '0'}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-[#777A55] mb-2">Inventory Count</h3>
              <p className="text-2xl font-bold text-gray-700">
                {/* Replace with actual inventory count */}
                320
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-[#777A55] mb-2">Active Users</h3>
              <p className="text-2xl font-bold text-gray-700">
                {/* Replace with actual active user count */}
                85
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
              <h3 className="text-lg font-medium text-[#777A55] mb-4">Sales Trends</h3>
              <ChartPlaceholder type="line" data={analytics?.top_products} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-[#777A55] mb-4">Order Volume</h3>
              <ChartPlaceholder type="bar" data={analytics?.sales_by_category} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-3">
              <h3 className="text-lg font-medium text-[#777A55] mb-4">Inventory Status</h3>
              <ChartPlaceholder type="pie" data={analytics?.top_products} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-medium text-[#777A55] mb-4">Recent Activity</h3>
            <RecentActivity orders={recentOrders} />
          </div>

          <div className="flex justify-end space-x-4">
            <Link to="/admin/inventory">
              <Button>Add Product</Button>
            </Link>
            <Link to="/admin/orders">
              <Button variant="secondary">View All Orders</Button>
            </Link>
          </div>
        </div>
      );
    };
