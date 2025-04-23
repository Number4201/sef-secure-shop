
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck, SortAsc, SortDesc } from 'lucide-react';
import { products, getProductsByCategory } from '@/data/products';
import { Product } from '@/types/product';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('default');
  const [safeClassFilter, setSafeClassFilter] = useState<string[]>([]);
  
  // Category name mapping for UI display
  const categoryNames: Record<string, string> = {
    'nabytkove-trezory': 'Nábytkové trezory',
    'trezory-do-zdi': 'Trezory do zdi',
    'trezory-do-podlahy': 'Trezory do podlahy',
    'trezory-na-zbrane': 'Trezory na zbraně',
    'vhozove-trezory': 'Vhozové trezory',
    'ohnivzdorne-trezory': 'Ohnivzdorné trezory',
    'trezory-na-hotovost': 'Trezory na hotovost'
  };
  
  // Update filtered products when category or filters change
  useEffect(() => {
    let result = categoryParam ? getProductsByCategory(categoryParam) : products;
    
    // Apply safe class filter if any are selected
    if (safeClassFilter.length > 0) {
      result = result.filter(product => 
        product.safeClass && safeClassFilter.includes(product.safeClass)
      );
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sorting - no change
        break;
    }
    
    setFilteredProducts(result);
  }, [categoryParam, sortOption, safeClassFilter]);
  
  // Get all unique safe classes for filter options
  const availableSafeClasses = Array.from(
    new Set(products.map(p => p.safeClass).filter(Boolean))
  ).sort() as string[];
  
  // Handle safe class filter toggle
  const toggleSafeClassFilter = (value: string) => {
    setSafeClassFilter(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  return (
    <Layout>
      <div className="bg-esejfy-lightgray py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink to="/">Domů</BreadcrumbLink>
            </BreadcrumbItem>
            {categoryParam ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink to="/products">Produkty</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    to={`/products?category=${categoryParam}`}
                    isCurrentPage
                  >
                    {categoryNames[categoryParam] || 'Kategorie'}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink to="/products" isCurrentPage>
                  Produkty
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
          
          <h1 className="text-3xl font-bold mt-4 mb-2">
            {categoryParam ? categoryNames[categoryParam] : 'Všechny produkty'}
          </h1>
          
          {categoryParam && (
            <p className="text-gray-600 mb-6">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produkt' : 
                filteredProducts.length >= 2 && filteredProducts.length <= 4 ? 'produkty' : 'produktů'}
            </p>
          )}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Filtry</h2>
                
                {/* Safety class filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2 flex items-center">
                    <ShieldCheck size={16} className="mr-2" />
                    Bezpečnostní třída
                  </h3>
                  <div className="space-y-2">
                    {availableSafeClasses.map((safeClass) => (
                      <div key={safeClass} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`safety-${safeClass}`}
                          checked={safeClassFilter.includes(safeClass)}
                          onCheckedChange={() => toggleSafeClassFilter(safeClass)}
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
                
                {/* Reset filters button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSafeClassFilter([]);
                    setSortOption('default');
                  }}
                  className="w-full"
                >
                  Zrušit všechny filtry
                </Button>
              </CardContent>
            </Card>
          </aside>
          
          {/* Products grid */}
          <div className="lg:col-span-3">
            {/* Sorting options */}
            <div className="mb-6 flex justify-end">
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-500">Řadit podle:</span>
                <select 
                  className="border rounded-md p-2 text-sm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">Výchozí</option>
                  <option value="price-asc">Cena (nejnižší)</option>
                  <option value="price-desc">Cena (nejvyšší)</option>
                  <option value="name-asc">Název (A-Z)</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-12">
                <h3 className="font-semibold text-lg mb-2">Žádné produkty neodpovídají zvoleným filtrům</h3>
                <p className="text-gray-600 mb-4">Zkuste upravit své filtry nebo se podívejte na další kategorie</p>
                <Button 
                  onClick={() => {
                    setSafeClassFilter([]);
                    setSortOption('default');
                  }}
                  className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90"
                >
                  Zrušit filtry
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
