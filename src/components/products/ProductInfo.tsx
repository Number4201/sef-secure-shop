
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Flame, 
  Package, 
  Truck, 
  MinusCircle, 
  PlusCircle, 
  Lock, 
  Droplets,
  FileText,
  Scale,
  Info
} from 'lucide-react';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    toast({
      title: "Přidáno do košíku",
      description: `${product.name} (${quantity}x) byl přidán do košíku.`
    });
  };

  const getInstallationTypeLabel = (type?: string) => {
    if (!type) return "";
    switch (type) {
      case 'wall': return 'Do zdi';
      case 'floor': return 'Do podlahy';
      case 'furniture': return 'Nábytkový';
      case 'door': return 'Trezorové dveře';
      default: return type;
    }
  };

  return (
    <div className="flex flex-col bg-esejfy-dark-secondary p-6 rounded-lg border border-gray-700">
      <h1 className="text-3xl font-bold mb-2 text-white">{product.name}</h1>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {product.safeClass && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-blue-700 hover:bg-blue-800 text-white cursor-help">
                  <ShieldCheck size={16} className="mr-1" /> Bezpečnostní třída {product.safeClass}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Certifikovaná bezpečnostní třída podle normy ČSN EN 1143-1</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {product.fireResistance && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-orange-600 hover:bg-orange-700 text-white cursor-help">
                  <Flame size={16} className="mr-1" /> Ohnivzdornost {product.fireResistance}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Certifikovaná odolnost proti ohni</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {product.certificationLevel && (
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            <ShieldCheck size={16} className="mr-1" /> Certifikace {product.certificationLevel}
          </Badge>
        )}
        
        {product.waterResistant && (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
            <Droplets size={16} className="mr-1" /> Vodotěsný
          </Badge>
        )}
        
        {product.documentProtection && (
          <Badge variant="outline" className="border-green-500 text-green-400">
            <FileText size={16} className="mr-1" /> {product.documentProtection}
          </Badge>
        )}
      </div>
      
      <p className="text-gray-300 mb-6">{product.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {product.dimensions && (
          <div className="bg-esejfy-dark-primary p-3 rounded-md">
            <h3 className="font-semibold mb-1 text-gray-300 flex items-center">
              <Info size={16} className="mr-2 text-esejfy-burgundy" />
              Rozměry:
            </h3>
            <p className="text-white">
              {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
            </p>
          </div>
        )}
        
        {product.weight && (
          <div className="bg-esejfy-dark-primary p-3 rounded-md">
            <h3 className="font-semibold mb-1 text-gray-300 flex items-center">
              <Scale size={16} className="mr-2 text-esejfy-burgundy" />
              Hmotnost:
            </h3>
            <p className="text-white">{product.weight} kg</p>
          </div>
        )}
        
        {product.lockType && (
          <div className="bg-esejfy-dark-primary p-3 rounded-md">
            <h3 className="font-semibold mb-1 text-gray-300 flex items-center">
              <Lock size={16} className="mr-2 text-esejfy-burgundy" />
              Typ zámku:
            </h3>
            <p className="text-white">{product.lockType}</p>
          </div>
        )}
        
        {product.keyCapacity && (
          <div className="bg-esejfy-dark-primary p-3 rounded-md">
            <h3 className="font-semibold mb-1 text-gray-300 flex items-center">
              <Info size={16} className="mr-2 text-esejfy-burgundy" />
              Kapacita klíčů:
            </h3>
            <p className="text-white">{product.keyCapacity} kusů</p>
          </div>
        )}
        
        {product.fireProtectionTime && (
          <div className="bg-esejfy-dark-primary p-3 rounded-md">
            <h3 className="font-semibold mb-1 text-gray-300 flex items-center">
              <Flame size={16} className="mr-2 text-orange-500" />
              Doba ohnivzdornosti:
            </h3>
            <p className="text-white">{product.fireProtectionTime} minut</p>
          </div>
        )}
        
        {product.installationType && (
          <div className="bg-esejfy-dark-primary p-3 rounded-md">
            <h3 className="font-semibold mb-1 text-gray-300 flex items-center">
              <Info size={16} className="mr-2 text-esejfy-burgundy" />
              Typ instalace:
            </h3>
            <p className="text-white">
              {getInstallationTypeLabel(product.installationType)}
            </p>
          </div>
        )}
        
        {formattedInsurance && (
          <div className="bg-esejfy-dark-primary p-3 rounded-md">
            <h3 className="font-semibold mb-1 text-gray-300 flex items-center">
              <Info size={16} className="mr-2 text-esejfy-burgundy" />
              Doporučená pojistná částka:
            </h3>
            <p className="text-white">{formattedInsurance}</p>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <div className="flex items-baseline mb-2">
          <span className="text-2xl font-bold text-esejfy-burgundy">{formattedPrice}</span>
          {formattedOriginalPrice && (
            <span className="ml-3 text-lg text-gray-400 line-through">{formattedOriginalPrice}</span>
          )}
        </div>
        <p className="text-sm text-gray-400 mb-4">Včetně DPH</p>
        
        <div className="flex items-center mb-6">
          <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={product.inStock ? 'text-green-400' : 'text-red-400'}>
            {product.inStock ? 'Skladem' : 'Momentálně nedostupné'}
          </span>
        </div>
        
        {product.inStock && (
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-700 rounded-md bg-esejfy-dark-primary">
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
        
        <div className="mt-6 border-t border-gray-700 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck size={18} className="text-esejfy-burgundy" />
            <span className="text-gray-300">Doprava zdarma při objednávce nad 5 000 Kč</span>
          </div>
          <div className="flex items-center gap-2">
            <Package size={18} className="text-esejfy-burgundy" />
            <span className="text-gray-300">Osobní odběr na prodejně zdarma</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
