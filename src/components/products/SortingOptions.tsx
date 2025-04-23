
import React from 'react';
import { SortAsc, SortDesc } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SortingOptionsProps {
  sortOption: string;
  setSortOption: (option: string) => void;
}

const SortingOptions: React.FC<SortingOptionsProps> = ({
  sortOption,
  setSortOption
}) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm text-gray-500">Řadit podle:</span>
      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger className="w-[180px] h-9 text-sm">
          <SelectValue placeholder="Výchozí" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Výchozí</SelectItem>
          <SelectItem value="price-asc">
            <div className="flex items-center">
              <SortAsc size={14} className="mr-1" />
              <span>Cena (nejnižší)</span>
            </div>
          </SelectItem>
          <SelectItem value="price-desc">
            <div className="flex items-center">
              <SortDesc size={14} className="mr-1" />
              <span>Cena (nejvyšší)</span>
            </div>
          </SelectItem>
          <SelectItem value="name-asc">Název (A-Z)</SelectItem>
          <SelectItem value="name-desc">Název (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortingOptions;
