
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
  Info,
  Anchor,
  Layers,
  Ruler,
  Award,
  BookOpen,
  Check
} from 'lucide-react';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductInfoProps {
  product: Product;
  onAddToCart?: (variantId: string, quantity: number) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);
  const { toast } = useToast();

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
    if (onAddToCart && product.id) {
      // Předpokládáme, že první varianta je výchozí
      const variantId = product.variants?.[0]?.id || product.id;
      onAddToCart(variantId, quantity);
    } else {
      toast({
        title: "Chyba při přidávání do košíku",
        description: "Nelze přidat produkt do košíku. Zkuste to prosím znovu.",
        variant: "destructive"
      });
    }
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

      {/* Enhanced Certification Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/10 p-3 rounded-lg mb-4 border border-blue-800/30">
        <div className="flex items-center mb-2">
          <ShieldCheck size={20} className="text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-white">Bezpečnostní certifikace</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {product.safeClass && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-blue-700 hover:bg-blue-800 text-white cursor-help text-sm py-1">
                    <ShieldCheck size={14} className="mr-1" /> Bezpečnostní třída {product.safeClass}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Certifikovaná bezpečnostní třída podle normy ČSN EN 1143-1</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {product.certificationStandard && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-green-700 hover:bg-green-800 text-white cursor-help text-sm py-1">
                    <Award size={14} className="mr-1" /> {product.certificationStandard}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Certifikováno podle evropské normy pro bezpečnostní úschovné objekty</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {product.certificationLevel && (
            <Badge variant="outline" className="border-blue-500 text-blue-400 text-sm py-1">
              <ShieldCheck size={14} className="mr-1" /> Certifikace {product.certificationLevel}
            </Badge>
          )}
        </div>

        <div className="text-xs text-gray-300 mt-1">
          <p>Trezor splňuje požadavky evropské normy ČSN EN 1143-1 pro bezpečnostní úschovné objekty.</p>
          {product.recommendedInsurance && (
            <p className="mt-1">Doporučená pojistná částka: <span className="text-white font-medium">{formattedInsurance}</span></p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {product.fireResistance && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-orange-600 hover:bg-orange-700 text-white cursor-help text-sm py-1">
                    <Flame size={14} className="mr-1" /> Ohnivzdornost {product.fireResistance}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Certifikovaná odolnost proti ohni</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {product.waterResistant && (
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1">
              <Droplets size={14} className="mr-1" /> Vodotěsný
            </Badge>
          )}

          {product.documentProtection && (
            <Badge variant="outline" className="border-green-500 text-green-400 text-sm py-1">
              <FileText size={14} className="mr-1" /> {product.documentProtection}
            </Badge>
          )}
        </div>
      </div>

      <p className="text-gray-300 mb-6">{product.description}</p>

      {/* Enhanced Dimensions Section */}
      <div className="bg-gradient-to-r from-esejfy-burgundy/20 to-esejfy-burgundy/5 p-4 rounded-lg mb-6 border border-esejfy-burgundy/30">
        <div className="flex items-center mb-3">
          <Ruler size={20} className="text-esejfy-burgundy mr-2" />
          <h3 className="text-lg font-semibold text-white">Rozměry trezoru</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.dimensions && (
            <div className="bg-esejfy-dark-primary p-3 rounded-md border border-gray-700">
              <h3 className="font-semibold mb-2 text-gray-300 flex items-center">
                <Ruler size={16} className="mr-2 text-esejfy-burgundy" />
                Vnější rozměry:
              </h3>
              <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="bg-esejfy-dark-secondary p-2 rounded text-center">
                    <p className="text-xs text-gray-400">Šířka</p>
                    <p className="text-white font-medium">{product.dimensions.width} cm</p>
                    <p className="text-xs text-gray-400">{product.dimensions.width * 10} mm</p>
                  </div>
                  <div className="bg-esejfy-dark-secondary p-2 rounded text-center">
                    <p className="text-xs text-gray-400">Výška</p>
                    <p className="text-white font-medium">{product.dimensions.height} cm</p>
                    <p className="text-xs text-gray-400">{product.dimensions.height * 10} mm</p>
                  </div>
                  <div className="bg-esejfy-dark-secondary p-2 rounded text-center">
                    <p className="text-xs text-gray-400">Hloubka</p>
                    <p className="text-white font-medium">{product.dimensions.depth} cm</p>
                    <p className="text-xs text-gray-400">{product.dimensions.depth * 10} mm</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {product.internalDimensions && (
            <div className="bg-esejfy-dark-primary p-3 rounded-md border border-gray-700">
              <h3 className="font-semibold mb-2 text-gray-300 flex items-center">
                <Layers size={16} className="mr-2 text-esejfy-burgundy" />
                Vnitřní rozměry:
              </h3>
              <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-esejfy-dark-secondary p-2 rounded text-center">
                    <p className="text-xs text-gray-400">Šířka</p>
                    <p className="text-white font-medium">{(product.internalDimensions.width / 10).toFixed(1)} cm</p>
                    <p className="text-xs text-gray-400">{product.internalDimensions.width} mm</p>
                  </div>
                  <div className="bg-esejfy-dark-secondary p-2 rounded text-center">
                    <p className="text-xs text-gray-400">Výška</p>
                    <p className="text-white font-medium">{(product.internalDimensions.height / 10).toFixed(1)} cm</p>
                    <p className="text-xs text-gray-400">{product.internalDimensions.height} mm</p>
                  </div>
                  <div className="bg-esejfy-dark-secondary p-2 rounded text-center">
                    <p className="text-xs text-gray-400">Hloubka</p>
                    <p className="text-white font-medium">{(product.internalDimensions.depth / 10).toFixed(1)} cm</p>
                    <p className="text-xs text-gray-400">{product.internalDimensions.depth} mm</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {product.weight && (
          <div className="mt-3 bg-esejfy-dark-primary p-3 rounded-md border border-gray-700">
            <h3 className="font-semibold mb-1 text-gray-300 flex items-center">
              <Scale size={16} className="mr-2 text-esejfy-burgundy" />
              Hmotnost:
            </h3>
            <p className="text-white font-medium">{product.weight} kg</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

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

        {/* Enhanced Interior Features Section */}
        <div className="bg-gradient-to-r from-green-900/20 to-green-800/5 p-3 rounded-md border border-green-800/30">
          <h3 className="font-semibold mb-2 text-gray-200 flex items-center">
            <BookOpen size={16} className="mr-2 text-green-500" />
            Vnitřní vybavení:
          </h3>

          <div className="grid grid-cols-2 gap-2 mb-2">
            {product.hooks !== undefined && (
              <div className="bg-esejfy-dark-secondary p-2 rounded flex items-center">
                <div className="bg-green-900/30 p-1.5 rounded mr-2">
                  <Anchor size={14} className="text-green-500" />
                </div>
                <div>
                  <p className="text-white font-medium">{product.hooks} háčků</p>
                  <p className="text-xs text-gray-400">Pro zavěšení klíčů</p>
                </div>
              </div>
            )}

            {product.shelves !== undefined && (
              <div className="bg-esejfy-dark-secondary p-2 rounded flex items-center">
                <div className="bg-green-900/30 p-1.5 rounded mr-2">
                  <Layers size={14} className="text-green-500" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {product.shelves} {product.shelves === 1 ? 'police' :
                    (product.shelves > 1 && product.shelves < 5) ? 'police' : 'polic'}
                  </p>
                  <p className="text-xs text-gray-400">Pro organizaci předmětů</p>
                </div>
              </div>
            )}
          </div>

          {product.interiorFeatures && product.interiorFeatures.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-300 mb-1">Další vybavení:</h4>
              <ul className="text-white space-y-1 bg-esejfy-dark-secondary p-2 rounded">
                {product.interiorFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="bg-green-900/30 p-1 rounded-full mr-2 flex-shrink-0">
                      <Check size={10} className="text-green-500" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

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
