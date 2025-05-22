import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, MinusCircle, PlusCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CartDisplay: React.FC = () => {
  const { 
    cart, 
    loading, 
    error, 
    updateItem, 
    removeItem, 
    isEmpty, 
    itemsCount, 
    subtotal, 
    total, 
    items 
  } = useCartContext();
  
  const { toast } = useToast();

  // Formátování ceny
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price / 100); // Medusa ukládá ceny v nejmenších jednotkách měny (centy)
  };

  // Funkce pro aktualizaci množství položky
  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    try {
      await updateItem(lineId, quantity);
    } catch (err) {
      console.error('Error updating item quantity:', err);
      toast({
        title: "Chyba při aktualizaci košíku",
        description: "Nastala chyba při aktualizaci množství. Zkuste to prosím znovu.",
        variant: "destructive"
      });
    }
  };

  // Funkce pro odstranění položky z košíku
  const handleRemoveItem = async (lineId: string) => {
    try {
      await removeItem(lineId);
      toast({
        title: "Položka odstraněna",
        description: "Položka byla odstraněna z košíku.",
      });
    } catch (err) {
      console.error('Error removing item:', err);
      toast({
        title: "Chyba při odstraňování položky",
        description: "Nastala chyba při odstraňování položky z košíku. Zkuste to prosím znovu.",
        variant: "destructive"
      });
    }
  };

  // Zobrazení načítání
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-4 border-esejfy-burgundy border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold mb-2 text-white">Načítání košíku</h2>
        <p className="text-gray-400">Prosím vyčkejte, načítáme váš košík...</p>
      </div>
    );
  }

  // Zobrazení chyby
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-500/10 p-4 rounded-full mb-4">
          <Trash2 size={32} className="text-red-500" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-white">Chyba při načítání košíku</h2>
        <p className="text-gray-400 mb-4">Nastala chyba při načítání vašeho košíku. Zkuste to prosím znovu.</p>
        <Button onClick={() => window.location.reload()}>Zkusit znovu</Button>
      </div>
    );
  }

  // Zobrazení prázdného košíku
  if (isEmpty || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-esejfy-burgundy/10 p-4 rounded-full mb-4">
          <ShoppingBag size={32} className="text-esejfy-burgundy" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-white">Váš košík je prázdný</h2>
        <p className="text-gray-400 mb-4">Přidejte nějaké produkty do košíku a vraťte se zpět.</p>
        <Button asChild className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90">
          <Link to="/products">Prohlédnout produkty</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-esejfy-dark-secondary rounded-lg border border-gray-700 p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Váš košík</h2>
      
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-esejfy-dark-primary rounded-lg border border-gray-700">
            {/* Obrázek produktu */}
            <div className="w-20 h-20 bg-white rounded overflow-hidden flex-shrink-0">
              {item.thumbnail ? (
                <img 
                  src={item.thumbnail} 
                  alt={item.title || 'Produkt'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ShoppingBag size={24} className="text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Informace o produktu */}
            <div className="flex-grow">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-400">
                {item.variant?.title || 'Standardní varianta'}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    <MinusCircle size={14} />
                  </Button>
                  <span className="text-white">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <PlusCircle size={14} />
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            
            {/* Cena */}
            <div className="text-right">
              <p className="font-semibold text-esejfy-burgundy">
                {formatPrice(item.unit_price * item.quantity)}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs text-gray-400">
                  {formatPrice(item.unit_price)} za kus
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Souhrn košíku */}
      <div className="bg-esejfy-dark-primary rounded-lg border border-gray-700 p-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-300">Mezisoučet:</span>
          <span className="text-white">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-300">Doprava:</span>
          <span className="text-white">Bude vypočteno v dalším kroku</span>
        </div>
        <div className="border-t border-gray-700 pt-4 flex justify-between">
          <span className="text-lg font-semibold text-white">Celkem:</span>
          <span className="text-lg font-semibold text-esejfy-burgundy">{formatPrice(total)}</span>
        </div>
      </div>
      
      {/* Tlačítka */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button asChild variant="outline" className="flex-1">
          <Link to="/products">
            Pokračovat v nákupu
          </Link>
        </Button>
        <Button asChild className="flex-1 bg-esejfy-burgundy hover:bg-esejfy-burgundy/90">
          <Link to="/checkout">
            Pokračovat k pokladně <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CartDisplay;
