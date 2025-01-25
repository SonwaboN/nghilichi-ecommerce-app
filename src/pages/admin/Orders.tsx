import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/Button';
    import { adminOrderService } from '@/services/admin/orderManagement';
    import { OrderStatus, OrderSummary } from '@/types/order';
    import { format } from 'date-fns';
    import { DateRangePicker } from '@/components/ui/DateRangePicker';
    import { OrderStatusDropdown } from '@/components/admin/OrderStatusDropdown';
    import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

    export const Orders: React.FC = () => {
      const [orders, setOrders] = useState<OrderSummary[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
      const [startDate, setStartDate] = useState<Date | null>(null);
      const [endDate, setEndDate] = useState<Date | null>(null);
      const [searchQuery, setSearchQuery] = useState('');
      const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
      const [currentPage, setCurrentPage] = useState(1);
      const [totalOrders, setTotalOrders] = useState(0);
      const ordersPerPage = 10;
      const [actionLoading, setActionLoading] = useState<string | null>(null);

      useEffect(() => {
        const fetchOrders = async () => {
          try {
            setLoading(true);
            const { orders, total } = await adminOrderService.getAllOrders({
              status: statusFilter === 'all' ? undefined : statusFilter,
              startDate,
              endDate,
              page: currentPage,
              limit: ordersPerPage,
              searchTerm: searchQuery,
            });
            setOrders(orders.map(order => ({
              id: order.id,
              total: order.total,
              status: order.status,
              createdAt: order.created_at,
              itemCount: order.order_items.length,
              customerName: order.profiles?.full_name || 'Guest User',
            })));
            setTotalOrders(total || 0);
          } catch (err: any) {
            setError(err.message || 'Failed to fetch orders');
          } finally {
            setLoading(false);
          }
        };

        fetchOrders();
      }, [statusFilter, startDate, endDate, currentPage, searchQuery]);

      const handleStatusChange = async (orderId: string, status: OrderStatus) => {
        try {
          setActionLoading(orderId);
          await adminOrderService.updateOrderStatus(orderId, status);
          setOrders(prevOrders =>
            prevOrders.map(order =>
              order.id === orderId ? { ...order, status } : order
            )
          );
          toast.success('Order status updated successfully!');
        } catch (err: any) {
          setError(err.message || 'Failed to update order status');
        } finally {
          setActionLoading(null);
          setLoading(false);
        }
      };

      const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setOrders(prevOrders =>
          [...prevOrders].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
          })
        );
      };

      const filteredOrders = React.useMemo(() => {
        return orders.filter(order => {
          const search = searchQuery.toLowerCase();
          return (
            order.id.toLowerCase().includes(search) ||
            order.customerName.toLowerCase().includes(search)
          );
        });
      }, [orders, searchQuery]);

      const totalPages = Math.ceil(totalOrders / ordersPerPage);

      return (
        <div>
          <h2 className="text-2xl font-bold text-[#777A55] mb-4">Order Management</h2>

          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="statusFilter" className="mr-2 font-medium text-gray-700">
                Filter by Status:
              </label>
              <OrderStatusDropdown
                currentStatus={statusFilter}
                onStatusChange={setStatusFilter}
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="startDate" className="mr-2 font-medium text-gray-700">
                Filter by Date:
              </label>
              <DateRangePicker onDateChange={setDateRange} />
            </div>

            <input
              type="text"
              placeholder="Search by order ID or customer name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    onClick={handleSort}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th
                    onClick={handleSort}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">R {order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusDropdown
                        orderId={order.id}
                        currentStatus={order.status}
                        onStatusChange={handleStatusChange}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/admin/orders/${order.id}`}>
                        <Button variant="secondary" size="sm">View Details</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="mx-1"
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      );
    };
