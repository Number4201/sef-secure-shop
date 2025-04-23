
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const EmptyCartDrawer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <ShoppingCart size={48} className="text-gray-300 mb-4" />
      <p className="text-gray-500 mb-4">Váš košík je prázdný</p>
      <Button asChild variant="default" onClick={onClose}>
        <Link to="/products">Prozkoumat produkty</Link>
      </Button>
    </div>
  );
};

export default EmptyCartDrawer;
