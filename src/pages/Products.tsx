
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { products, getProductsByCategory, getProductsByCategorySync } from '@/data/products';
import { Product } from '@/types/product';
import { categoryNames, getCategoryDescription } from '@/utils/categoryMapping';
import SafeClassFilter from '@/components/products/SafeClassFilter';
import CategoryFilter from '@/components/products/CategoryFilter';
import AvailabilityFilter from '@/components/products/AvailabilityFilter';
import SortingOptions from '@/components/products/SortingOptions';
import { Separator } from '@/components/ui/separator';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('default');
  const [safeClassFilter, setSafeClassFilter] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Handle category change
  const handleCategoryChange = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  // Update filtered products when category or filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // First, use the sync version for immediate display
        let syncResult = categoryParam ? getProductsByCategorySync(categoryParam) : products;

        // Apply filters to the sync result
        if (safeClassFilter.length > 0) {
          syncResult = syncResult.filter(product =>
            product.safeClass && safeClassFilter.includes(product.safeClass)
          );
        }

        if (inStockOnly) {
          syncResult = syncResult.filter(product => product.inStock);
        }

        if (priceRange) {
          const [min, max] = priceRange;
          syncResult = syncResult.filter(product =>
            product.price >= min && product.price <= max
          );
        }

        // Apply sorting to the sync result
        switch(sortOption) {
          case 'price-asc':
            syncResult = [...syncResult].sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            syncResult = [...syncResult].sort((a, b) => b.price - a.price);
            break;
          case 'name-asc':
            syncResult = [...syncResult].sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name-desc':
            syncResult = [...syncResult].sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            // Default sorting - no change
            break;
        }

        // Set the filtered products with the sync result first
        setFilteredProducts(syncResult);

        // Then fetch from the database
        let dbResult = await getProductsByCategory(categoryParam);

        // Apply the same filters to the database result
        if (safeClassFilter.length > 0) {
          dbResult = dbResult.filter(product =>
            product.safeClass && safeClassFilter.includes(product.safeClass)
          );
        }

        if (inStockOnly) {
          dbResult = dbResult.filter(product => product.inStock);
        }

        if (priceRange) {
          const [min, max] = priceRange;
          dbResult = dbResult.filter(product =>
            product.price >= min && product.price <= max
          );
        }

        // Apply sorting to the database result
        switch(sortOption) {
          case 'price-asc':
            dbResult = [...dbResult].sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            dbResult = [...dbResult].sort((a, b) => b.price - a.price);
            break;
          case 'name-asc':
            dbResult = [...dbResult].sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name-desc':
            dbResult = [...dbResult].sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            // Default sorting - no change
            break;
        }

        // Update the filtered products with the database result
        setFilteredProducts(dbResult);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryParam, sortOption, safeClassFilter, inStockOnly, priceRange]);

  // Reset all filters
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
