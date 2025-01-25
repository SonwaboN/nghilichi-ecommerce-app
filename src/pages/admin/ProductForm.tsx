import React, { useState } from 'react';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/Button';
    import { adminInventoryService } from '@/services/admin/inventoryManagement';
    import { Product } from '@/types/admin';
    import { ArrowLeft } from 'lucide-react';
    import { toast } from 'sonner';
    import { supabase } from '@/lib/supabase';

    const productSchema = z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      description: z.string().optional(),
      price: z.number().min(0, 'Price must be a positive number'),
      stock_level: z.number().min(0, 'Stock level must be a positive number'),
      category: z.string().min(2, 'Category is required'),
      status: z.enum(['active', 'inactive']).default('active'),
      image: z.any().optional(),
    });

    type ProductFormType = z.infer<typeof productSchema>;

    export const ProductForm: React.FC = () => {
      const navigate = useNavigate();
      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
      } = useForm<ProductFormType>({
        resolver: zodResolver(productSchema),
      });

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [imagePreview, setImagePreview] = useState<string | null>(null);

      const onSubmit = async (data: ProductFormType) => {
        try {
          setLoading(true);
          let imageUrl = null;
          if (data.image) {
            const { data: storageData, error: storageError } = await supabase.storage
              .from('products')
              .upload(`product-images/${data.name}-${Date.now()}`, data.image, {
                cacheControl: '3600',
                upsert: false,
              });
            if (storageError) {
              throw storageError;
            }
            imageUrl = supabase.storage.from('products').getPublicUrl(storageData.path).data.publicUrl;
          }
          await adminInventoryService.createProduct({...data, image: imageUrl});
          toast.success('Product created successfully!');
          navigate('/admin/inventory');
        } catch (err: any) {
          setError(err.message || 'Failed to create product');
        } finally {
          setLoading(false);
        }
      };

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setValue('image', file);
          setImagePreview(URL.createObjectURL(file));
        }
      };

      if (loading) {
        return <div>Creating product...</div>;
      }

      if (error) {
        return <div className="text-red-500">Error: {error}</div>;
      }

      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button 
            onClick={() => navigate('/admin/inventory')}
            className="flex items-center text-[#777A55] hover:text-[#777A55]/80 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Inventory
          </button>

          <h2 className="text-2xl font-bold text-[#777A55] mb-4">Add New Product</h2>

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
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
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    {...register('price', { valueAsNumber: true })}
                    type="number"
                    id="price"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="stock_level" className="block text-sm font-medium text-gray-700">
                    Stock Level
                  </label>
                  <input
                    {...register('stock_level', { valueAsNumber: true })}
                    type="number"
                    id="stock_level"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  />
                  {errors.stock_level && (
                    <p className="mt-1 text-sm text-red-600">{errors.stock_level.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  {...register('category')}
                  id="category"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                >
                  <option value="spiritual">Spiritual</option>
                  <option value="herbal">Herbal</option>
                  <option value="bundle">Bundle</option>
                  <option value="protection">Protection</option>
                  <option value="ritual">Ritual</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  {...register('status')}
                  id="status"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Product Preview" className="mt-2 max-h-48 object-contain" />
                )}
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </Button>
            </form>
          </div>
        </div>
      );
    };
