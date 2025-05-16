import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getProductsByCategorySync } from '@/data/products';
import { getTrendingProductIdForCategory, setTrendingProductForCategory } from '@/data/trendingProducts';
import { categoryNames } from '@/utils/categoryMapping';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const TrendingProductManager: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('nabytkove-trezory');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  // Načíst produkty pro vybranou kategorii
  useEffect(() => {
    if (selectedCategory) {
      const categoryProducts = getProductsByCategorySync(selectedCategory);
      setProducts(categoryProducts);
      
      // Nastavit aktuálně trendující produkt
      const currentTrendingId = getTrendingProductIdForCategory(selectedCategory);
      setSelectedProductId(currentTrendingId || (categoryProducts.length > 0 ? categoryProducts[0].id : ''));
    }
  }, [selectedCategory]);

  // Uložit trendující produkt
  const saveTrendingProduct = () => {
    if (selectedCategory && selectedProductId) {
      setTrendingProductForCategory(selectedCategory, selectedProductId);
      toast({
        title: 'Trendující produkt byl uložen',
        description: `Produkt byl nastaven jako trendující v kategorii ${categoryNames[selectedCategory]}.`,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Správa trendujících produktů</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Vyberte kategorii</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Vyberte kategorii" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryNames).map(([slug, name]) => (
                  <SelectItem key={slug} value={slug}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Vyberte trendující produkt</label>
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Vyberte produkt" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={saveTrendingProduct} className="w-full">
            Uložit trendující produkt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingProductManager;
