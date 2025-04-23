
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ShoppingCart size={24} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Váš košík je prázdný</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Vypadá to, že jste zatím nepřidali žádné produkty do košíku.
        Prozkoumejte naši nabídku a najděte trezor, který vyhovuje vašim potřebám.
      </p>
      <Button asChild className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90">
        <Link to="/products">
          Prozkoumat produkty
        </Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
