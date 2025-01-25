import React from 'react';
import { SearchBar } from '@/components/shop/SearchBar';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { useShopFilters } from '@/hooks/useShopFilters';
import { products } from '@/data/products';

export const ShopPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  } = useShopFilters(products);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-[#777A55] mb-8">Shop Our Products</h1>
      
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <ProductGrid products={filteredProducts} />

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
