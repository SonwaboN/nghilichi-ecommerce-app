import React, { useState, useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/Button';
    import { adminDiscountService } from '@/services/admin/discountService';
    import { Discount } from '@/types/admin';
    import { format } from 'date-fns';

    export const Discounts: React.FC = () => {
      const [discounts, setDiscounts] = useState<Discount[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const navigate = useNavigate();

      useEffect(() => {
        const fetchDiscounts = async () => {
          try {
            const data = await adminDiscountService.getAllDiscounts();
            setDiscounts(data);
          } catch (err: any) {
            setError(err.message || 'Failed to fetch discounts');
          } finally {
            setLoading(false);
          }
        };

        fetchDiscounts();
      }, []);

      if (loading) {
        return <div>Loading discounts...</div>;
      }

      if (error) {
        return <div className="text-red-500">Error: {error}</div>;
      }

      return (
        <div>
          <h2 className="text-2xl font-bold text-[#777A55] mb-4">Discounts</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {discounts.map((discount) => (
                  <tr key={discount.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{discount.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{discount.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{discount.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {discount.start_date ? format(new Date(discount.start_date), 'MMM d, yyyy') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {discount.end_date ? format(new Date(discount.end_date), 'MMM d, yyyy') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{discount.code || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="secondary" size="sm">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={() => navigate('/admin/discounts/new')}>Add New Discount</Button>
          </div>
        </div>
      );
    };
