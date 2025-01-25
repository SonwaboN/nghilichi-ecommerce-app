import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'spiritual', label: 'Spiritual' },
    { id: 'herbal', label: 'Herbal' },
    { id: 'bundle', label: 'Bundles' },
    { id: 'ritual', label: 'Ritual Items' },
    { id: 'protection', label: 'Protection' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            'px-4 py-2 rounded-full transition-colors',
            selectedCategory === category.id
              ? 'bg-[#777A55] text-white'
              : 'border border-[#777A55] text-[#777A55] hover:bg-[#777A55]/10'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};
