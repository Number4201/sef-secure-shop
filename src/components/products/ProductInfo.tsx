
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Flame, Package, Truck, MinusCircle, PlusCircle, Lock, Droplets } from 'lucide-react';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);
  const { toast } = useToast();
  const { addItem } = useCart();

  const formattedPrice = new Intl.NumberFormat('cs-CZ', { 
    style: 'currency', 
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice ? new Intl.NumberFormat('cs-CZ', { 
    style: 'currency', 
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(product.originalPrice) : null;
  
  const formattedInsurance = product.recommendedInsurance ? new Intl.NumberFormat('cs-CZ', { 
    style: 'currency', 
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(product.recommendedInsurance) : null;

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {product.safeClass && (
          <Badge className="bg-esejfy-blue text-white">
            <ShieldCheck size={16} className="mr-1" /> Bezpečnostní třída {product.safeClass}
          </Badge>
        )}
        {product.fireResistance && (
          <Badge className="bg-orange-600 text-white">
            <Flame size={16} className="mr-1" /> Ohnivzdornost {product.fireResistance}
          </Badge>
        )}
        {product.certificationLevel && (
          <Badge variant="outline" className="border-esejfy-blue">
            <ShieldCheck size={16} className="mr-1" /> Certifikace {product.certificationLevel}
          </Badge>
        )}
        {product.waterResistant && (
          <Badge className="bg-blue-500 text-white">
            <Droplets size={16} className="mr-1" /> Vodotěsný
          </Badge>
        )}
      </div>
      
      <p className="text-gray-700 mb-6">{product.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {product.dimensions && (
          <div>
            <h3 className="font-semibold mb-1">Rozměry:</h3>
            <p className="text-gray-700">
              {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
            </p>
          </div>
        )}
        
        {product.weight && (
          <div>
            <h3 className="font-semibold mb-1">Hmotnost:</h3>
            <p className="text-gray-700">{product.weight} kg</p>
          </div>
        )}
        
        {product.lockType && (
          <div>
            <h3 className="font-semibold mb-1">Typ zámku:</h3>
            <div className="flex items-center">
              <Lock size={16} className="mr-1 text-esejfy-burgundy" /> 
              <p className="text-gray-700">{product.lockType}</p>
            </div>
          </div>
        )}
        
        {product.keyCapacity && (
          <div>
            <h3 className="font-semibold mb-1">Kapacita klíčů:</h3>
            <p className="text-gray-700">{product.keyCapacity} kusů</p>
          </div>
        )}
        
        {product.fireProtectionTime && (
          <div>
            <h3 className="font-semibold mb-1">Doba ohnivzdornosti:</h3>
            <div className="flex items-center">
              <Flame size={16} className="mr-1 text-orange-600" />
              <p className="text-gray-700">{product.fireProtectionTime} minut</p>
            </div>
          </div>
        )}
        
        {product.documentProtection && (
          <div>
            <h3 className="font-semibold mb-1">Stupeň utajení:</h3>
            <p className="text-gray-700">{product.documentProtection}</p>
          </div>
        )}
        
        {product.installationType && (
          <div>
            <h3 className="font-semibold mb-1">Typ instalace:</h3>
            <p className="text-gray-700">
              {product.installationType === 'wall' && 'Do zdi'}
              {product.installationType === 'floor' && 'Do podlahy'}
              {product.installationType === 'furniture' && 'Nábytkový'}
              {product.installationType === 'door' && 'Trezorové dveře'}
            </p>
          </div>
        )}
        
        {formattedInsurance && (
          <div>
            <h3 className="font-semibold mb-1">Doporučená pojistná částka:</h3>
            <p className="text-gray-700">{formattedInsurance}</p>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <div className="flex items-baseline mb-2">
          <span className="text-2xl font-bold text-esejfy-burgundy">{formattedPrice}</span>
          {formattedOriginalPrice && (
            <span className="ml-3 text-lg text-gray-500 line-through">{formattedOriginalPrice}</span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-4">Včetně DPH</p>
        
        <div className="flex items-center mb-6">
          <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>{product.inStock ? 'Skladem' : 'Momentálně nedostupné'}</span>
        </div>
        
        {product.inStock && (
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Snížit množství"
              >
                <MinusCircle size={18} />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={increaseQuantity}
                aria-label="Zvýšit množství"
              >
                <PlusCircle size={18} />
              </Button>
            </div>
            <Button 
              className="flex-1 bg-esejfy-burgundy hover:bg-esejfy-burgundy/90"
              onClick={handleAddToCart}
            >
              Přidat do košíku
            </Button>
          </div>
        )}
        
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck size={18} className="text-esejfy-burgundy" />
            <span>Doprava zdarma při objednávce nad 5 000 Kč</span>
          </div>
          <div className="flex items-center gap-2">
            <Package size={18} className="text-esejfy-burgundy" />
            <span>Osobní odběr na prodejně zdarma</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
