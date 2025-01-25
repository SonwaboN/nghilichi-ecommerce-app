import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { ArrowLeft } from 'lucide-react';
    import { Button } from '@/components/ui/Button';
    import { adminInventoryService } from '@/services/admin/inventoryManagement';
    import { Product } from '@/types/admin';
    import { toast } from 'sonner';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { supabase } from '@/lib/supabase';
    import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

    interface ProductDetailsProps {
      product: Product;
      onClose: () => void;
    }

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

    export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
      const navigate = useNavigate();
      const [isEditing, setIsEditing] = useState(false);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [imagePreview, setImagePreview] = useState<string | null>(product.image);
      const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
      } = useForm<ProductFormType>({
        resolver: zodResolver(productSchema),
        defaultValues: {
          name: product.name,
          description: product.description,
          price: product.price,
          stock_level: product.stock_level,
          category: product.category,
          status: product.status,
          image: null,
        },
      });

      const onSubmit = async (data: ProductFormType) => {
        try {
          setLoading(true);
          let imageUrl = product.image;
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
          await adminInventoryService.updateProduct(product.id, {...data, image: imageUrl});
          toast.success('Product updated successfully!');
          onClose();
        } catch (err: any) {
          setError(err.message || 'Failed to update product');
        } finally {
          setLoading(false);
        }
      };

      const handleEdit = () => {
        setIsEditing(true);
      };

      const handleCancelEdit = () => {
        setIsEditing(false);
        reset({
          name: product.name,
          description: product.description,
          price: product.price,
          stock_level: product.stock_level,
          category: product.category,
          status: product.status,
          image: null,
        });
        setImagePreview(product.image);
      };

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setValue('image', file);
          setImagePreview(URL.createObjectURL(file));
        }
      };

      if (loading) {
        return <div className="flex items-center justify-center py-8"><LoadingSpinner size="lg" /></div>;
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

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#777A55]">{product.name}</h2>
            {isEditing ? (
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

                <div className="flex justify-end space-x-4">
                  <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-[#777A55] mb-4">Description</h3>
                  <p className="text-gray-600">
                    {product.description}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-[#777A55] mb-4">Price</h3>
                  <p className="text-gray-600">
                    R {product.price}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-[#777A55] mb-4">Stock Level</h3>
                  <p className="text-gray-600">
                    {product.stock_level}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-[#777A55] mb-4">Category</h3>
                  <p className="text-gray-600">
                    {product.category}
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleEdit}>Edit Product</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };
