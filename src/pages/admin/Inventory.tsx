import React, { useState, useEffect } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { Button } from '@/components/ui/Button';
    import { adminInventoryService } from '@/services/admin/inventoryManagement';
    import { Product } from '@/types/admin';

    export const Inventory: React.FC = () => {
      const [products, setProducts] = useState<Product[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [categoryFilter, setCategoryFilter] = useState<string>('all');
      const [searchQuery, setSearchQuery] = useState('');
      const [currentPage, setCurrentPage] = useState(1);
      const [totalProducts, setTotalProducts] = useState(0);
      const [sortColumn, setSortColumn] = useState<'name' | 'price' | 'stock_level' | 'category'>('name');
      const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
      const productsPerPage = 10;
      const navigate = useNavigate();
      const [stockLoading, setStockLoading] = useState<string | null>(null);

      useEffect(() => {
        const fetchProducts = async () => {
          try {
            setLoading(true);
            const { products, total } = await adminInventoryService.getInventory({
              category: categoryFilter === 'all' ? undefined : categoryFilter,
              page: currentPage,
              limit: productsPerPage,
              sortBy: { column: sortColumn, order: sortOrder },
              searchTerm: searchQuery,
            });
            setProducts(products);
            setTotalProducts(total || 0);
          } catch (err: any) {
            setError(err.message || 'Failed to fetch products');
          } finally {
            setLoading(false);
          }
        };

        fetchProducts();
      }, [categoryFilter, currentPage, sortColumn, sortOrder, searchQuery]);

      const handleStockUpdate = async (productId: string, newStock: number) => {
        try {
          setStockLoading(productId);
          await adminInventoryService.updateProduct(productId, { stock_level: newStock });
          setProducts(prevProducts =>
            prevProducts.map(product =>
              product.id === productId ? { ...product, stock_level: newStock } : product
            )
          );
          toast.success('Stock level updated successfully!');
        } catch (err: any) {
          setError(err.message || 'Failed to update stock');
        } finally {
          setStockLoading(null);
          setLoading(false);
        }
      };

      const handleSort = (column: 'name' | 'price' | 'stock_level' | 'category') => {
        if (sortColumn === column) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortColumn(column);
          setSortOrder('asc');
        }
      };

      const filteredProducts = React.useMemo(() => {
        return products.filter(product => {
          const search = searchQuery.toLowerCase();
          return (
            product.name.toLowerCase().includes(search) ||
            (product.description && product.description.toLowerCase().includes(search))
          );
        });
      }, [products, searchQuery]);

      const totalPages = Math.ceil(totalProducts / productsPerPage);

      if (loading) {
        return <div>Loading inventory...</div>;
      }

      if (error) {
        return <div className="text-red-500">Error: {error}</div>;
      }

      return (
        <div>
          <h2 className="text-2xl font-bold text-[#777A55] mb-4">Inventory Management</h2>

          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="categoryFilter" className="mr-2 font-medium text-gray-700">
                Filter by Category:
              </label>
              <select
                id="categoryFilter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="all">All</option>
                <option value="spiritual">Spiritual</option>
                <option value="herbal">Herbal</option>
                <option value="bundle">Bundle</option>
                <option value="protection">Protection</option>
                <option value="ritual">Ritual</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Search by product name or description"
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
                    onClick={() => handleSort('name')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th
                    onClick={() => handleSort('price')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Price
                  </th>
                  <th
                    onClick={() => handleSort('stock_level')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Stock Level
                  </th>
                  <th
                    onClick={() => handleSort('category')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">R {product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={product.stock_level}
                          onChange={(e) => handleStockUpdate(product.id, Number(e.target.value))}
                          className="border border-gray-300 rounded-md p-1 w-20"
                          disabled={stockLoading === product.id}
                        />
                        {stockLoading === product.id && <span className="ml-2">Updating...</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/admin/inventory/${product.id}`}>
                        <Button variant="secondary" size="sm">View Details</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <Button onClick={() => navigate('/admin/inventory/new')}>Add New Product</Button>
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
        </div>
      );
    };
