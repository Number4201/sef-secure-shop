
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck } from 'lucide-react';

interface SafeClassFilterProps {
  availableSafeClasses: string[];
  selectedClasses: string[];
  onToggleClass: (value: string) => void;
}

const SafeClassFilter: React.FC<SafeClassFilterProps> = ({
  availableSafeClasses,
  selectedClasses,
  onToggleClass
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2 flex items-center">
        <ShieldCheck size={16} className="mr-2 text-esejfy-burgundy" />
        Bezpečnostní třída
      </h3>
      <div className="space-y-2">
        {availableSafeClasses.map((safeClass) => (
          <div key={safeClass} className="flex items-center space-x-2">
            <Checkbox 
              id={`safety-${safeClass}`}
              checked={selectedClasses.includes(safeClass)}
              onCheckedChange={() => onToggleClass(safeClass)}
            />
            <label 
              htmlFor={`safety-${safeClass}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Třída {safeClass}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafeClassFilter;
