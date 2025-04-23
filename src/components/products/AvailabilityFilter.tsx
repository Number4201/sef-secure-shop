
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Package2 } from 'lucide-react';

interface AvailabilityFilterProps {
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({
  inStockOnly,
  setInStockOnly
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2 flex items-center">
        <Package2 size={16} className="mr-2 text-esejfy-burgundy" />
        Dostupnost
      </h3>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={() => setInStockOnly(!inStockOnly)}
        />
        <label 
          htmlFor="in-stock"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Pouze skladem
        </label>
      </div>
    </div>
  );
};

export default AvailabilityFilter;
