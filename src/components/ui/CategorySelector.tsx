// components/ui/CategorySelector.tsx

import React from 'react';
import { useStore } from '@/src/lib/store';

interface CategorySelectorProps {
  categories: string[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories }) => {
  const { selectedCategory, filterProductsByCategory } = useStore();
  
  return (
    <div className="mb-6 mt-4">
      <div className="flex space-x-3 overflow-x-auto pb-2 px-4">
        <button 
          onClick={() => filterProductsByCategory(null)} 
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
            selectedCategory === null 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          All
        </button>
        
        {categories.map((category,index) => (
          <button 
            key={index} 
            onClick={() => filterProductsByCategory(category)} 
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap capitalize ${
              selectedCategory === category 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;