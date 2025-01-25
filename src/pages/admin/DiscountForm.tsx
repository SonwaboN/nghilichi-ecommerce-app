import React, { useState } from 'react';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/Button';
    import { adminDiscountService } from '@/services/admin/discountService';
    import { DiscountType } from '@/types/admin';
    import { ArrowLeft } from 'lucide-react';
    import { toast } from 'sonner';

    const discountSchema = z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      description: z.string().optional(),
      type: z.enum(['percentage', 'fixed_amount'] as [DiscountType, DiscountType]),
      value: z.number().min(0, 'Value must be a positive number'),
      start_date: z.string().optional(),
      end_date: z.string().optional(),
      code: z.string().optional(),
      usage_limit: z.number().optional(),
    });

    type DiscountFormType = z.infer<typeof discountSchema>;

    export const ProductForm: React.FC = () => {
      const navigate = useNavigate();
      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<DiscountFormType>({
        resolver: zodResolver(discountSchema),
      });

      const onSubmit = async (data: DiscountFormType) => {
        try {
          setLoading(true);
          await adminDiscountService.createDiscount(data);
          toast.success('Discount created successfully!');
          navigate('/admin/discounts');
        } catch (err: any) {
          setError(err.message || 'Failed to create discount');
        } finally {
          setLoading(false);
        }
      };

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      if (loading) {
        return <div>Creating discount...</div>;
      }

      if (error) {
        return <div className="text-red-500">Error: {error}</div>;
      }

      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button 
            onClick={() => navigate('/admin/discounts')}
            className="flex items-center text-[#777A55] hover:text-[#777A55]/80 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Discounts
          </button>

          <h2 className="text-2xl font-bold text-[#777A55] mb-4">Add New Discount</h2>

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Discount Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  id="description"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Discount Type
                  </label>
                  <select
                    {...register('type')}
                    id="type"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed_amount">Fixed Amount</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                    Value
                  </label>
                  <input
                    {...register('value', { valueAsNumber: true })}
                    type="number"
                    id="value"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  />
                  {errors.value && (
                    <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    {...register('start_date')}
                    type="date"
                    id="start_date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    {...register('end_date')}
                    type="date"
                    id="end_date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Discount Code (Optional)
                </label>
                <input
                  {...register('code')}
                  type="text"
                  id="code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="usage_limit" className="block text-sm font-medium text-gray-700">
                  Usage Limit (Optional)
                </label>
                <input
                  {...register('usage_limit', { valueAsNumber: true })}
                  type="number"
                  id="usage_limit"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Discount'}
              </Button>
            </form>
          </div>
        </div>
      );
    };
