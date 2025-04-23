
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { categoryNames } from '@/utils/categoryMapping';
import { Layers } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface CategoryFilterProps {
  onCategoryChange: (category: string | null) => void;
  currentCategory: string | null;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  onCategoryChange, 
  currentCategory 
}) => {
  const categories = Object.keys(categoryNames);
  
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2 flex items-center">
        <Layers size={16} className="mr-2 text-esejfy-burgundy" />
        Kategorie
      </h3>
      <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
        <div className="flex items-center space-x-2 py-1">
          <Checkbox 
            id="category-all"
            checked={currentCategory === null}
            onCheckedChange={() => onCategoryChange(null)}
          />
          <label 
            htmlFor="category-all"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Všechny produkty
          </label>
        </div>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2 py-1">
            <Checkbox 
              id={`category-${category}`}
              checked={currentCategory === category}
              onCheckedChange={() => onCategoryChange(category === currentCategory ? null : category)}
            />
            <label 
              htmlFor={`category-${category}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {categoryNames[category]}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
