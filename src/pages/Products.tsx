
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { Product } from '@/types/product';
import { categoryNames, getCategoryDescription } from '@/utils/categoryMapping';
import SafeClassFilter from '@/components/products/SafeClassFilter';
import CategoryFilter from '@/components/products/CategoryFilter';
import AvailabilityFilter from '@/components/products/AvailabilityFilter';
import SortingOptions from '@/components/products/SortingOptions';
import { Separator } from '@/components/ui/separator';
import useProducts from '@/hooks/useProducts';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [sortOption, setSortOption] = useState('default');
  const [safeClassFilter, setSafeClassFilter] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  // Použijeme náš hook pro práci s produkty
  const {
    products: allProducts,
    loading,
    error,
    fetchProducts,
    fetchProductsByCategory
  } = useProducts();

  // Stav pro filtrované produkty
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Získáme všechny unikátní bezpečnostní třídy pro možnosti filtru
  const availableSafeClasses = Array.from(
    new Set(allProducts.map((p: Product) => p.safeClass).filter(Boolean))
  ).sort() as string[];

  // Přepínání filtru bezpečnostní třídy
  const toggleSafeClassFilter = (value: string) => {
    setSafeClassFilter(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Změna kategorie
  const handleCategoryChange = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  // Načtení produktů při prvním načtení a při změně kategorie
  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (categoryParam) {
          const categoryProducts = await fetchProductsByCategory(categoryParam);
          setFilteredProducts(categoryProducts);
        } else {
          await fetchProducts();
          setFilteredProducts(allProducts);
        }
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };

    loadProducts();
  }, [categoryParam, fetchProducts, fetchProductsByCategory, allProducts]);

  // Aplikace filtrů a řazení na produkty
  useEffect(() => {
    let result = [...(categoryParam ? filteredProducts : allProducts)];

    // Aplikace filtrů
    if (safeClassFilter.length > 0) {
      result = result.filter((product: Product) =>
        product.safeClass && safeClassFilter.includes(product.safeClass)
      );
    }

    if (inStockOnly) {
      result = result.filter((product: Product) => product.inStock);
    }

    if (priceRange) {
      const [min, max] = priceRange;
      result = result.filter((product: Product) =>
        product.price >= min && product.price <= max
      );
    }

    // Aplikace řazení
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
      case 'name-desc':
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Výchozí řazení - žádná změna
        break;
    }

    setFilteredProducts(result);
  }, [categoryParam, sortOption, safeClassFilter, inStockOnly, priceRange, allProducts]);

  // Reset všech filtrů
  const resetFilters = () => {
    setSafeClassFilter([]);
    setSortOption('default');
    setInStockOnly(false);
    setPriceRange(null);
  };

  return (
    <Layout>
      <div className="bg-esejfy-dark-secondary py-8">
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

          <h1 className="text-3xl font-bold mt-4 mb-2 text-white">
            {categoryParam ? categoryNames[categoryParam] : 'Všechny produkty'}
          </h1>

          {categoryParam && (
            <p className="text-gray-300 mb-6">
              {getCategoryDescription(categoryParam)}
            </p>
          )}

          {categoryParam && (
            <p className="text-gray-300 mb-2">
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
            <Card className="bg-white">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Filtry</h2>

                <CategoryFilter
                  onCategoryChange={handleCategoryChange}
                  currentCategory={categoryParam}
                />

                <Separator className="my-4" />

                {/* Safety class filter */}
                <SafeClassFilter
                  availableSafeClasses={availableSafeClasses}
                  selectedClasses={safeClassFilter}
                  onToggleClass={toggleSafeClassFilter}
                />

                <Separator className="my-4" />

                {/* Availability filter */}
                <AvailabilityFilter
                  inStockOnly={inStockOnly}
                  setInStockOnly={setInStockOnly}
                />

                <Separator className="my-4" />

                {/* Reset filters button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
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
              <SortingOptions sortOption={sortOption} setSortOption={setSortOption} />
            </div>

            {loading && filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border p-8">
                <div className="w-12 h-12 border-4 border-esejfy-burgundy border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                <h3 className="font-semibold text-lg mb-2">Načítání produktů</h3>
                <p className="text-gray-600">Prosím vyčkejte, načítáme produkty...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border p-8">
                <h3 className="font-semibold text-lg mb-2">Žádné produkty neodpovídají zvoleným filtrům</h3>
                <p className="text-gray-600 mb-4">Zkuste upravit své filtry nebo se podívejte na další kategorie</p>
                <Button
                  onClick={resetFilters}
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
