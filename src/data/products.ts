import { Product } from '@/types/product';

export const products: Product[] = [
  // Nábytkové trezory
  {
    id: 'nt-105',
    name: 'Nábytkový trezor NT 105',
    slug: 'nabytkovy-trezor-nt-105',
    price: 4990,
    originalPrice: 5990,
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=800',
    category: 'nabytkove-trezory',
    safeClass: 'S1',
    inStock: true,
    description: 'Kvalitní nábytkový trezor NT 105 s certifikací třídy S1 je ideální pro bezpečné uložení cenností v domácnosti nebo kanceláři.',
    features: [
      'Bezpečnostní třída S1',
      'Dvojitá stěna',
      'Klíčový zámek',
      'Možnost kotvení do podlahy nebo stěny',
      'Protipožární vložka',
    ],
    dimensions: {
      width: 35,
      height: 25,
      depth: 25
    },
    weight: 12
  },
  {
    id: 'nt-120',
    name: 'Nábytkový trezor NT 120',
    slug: 'nabytkovy-trezor-nt-120',
    price: 5990,
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800',
    category: 'nabytkove-trezory',
    safeClass: 'S1',
    inStock: true,
    description: 'Prostorný nábytkový trezor s elektronickým zámkem a LED osvětlením.',
    features: [
      'Elektronický zámek',
      'LED osvětlení',
      'Nastavitelná police',
      'Možnost kotvení',
      'Protipožární ochrana',
    ],
    dimensions: {
      width: 40,
      height: 30,
      depth: 30
    },
    weight: 15
  },
  // Pokračujte s dalšími 18 nábytkovými trezory...

  // Trezory do zdi
  {
    id: 'tz-250',
    name: 'Trezor do zdi TZ 250',
    slug: 'trezor-do-zdi-tz-250',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1622060896522-88306aa5ee0b?q=80&w=800',
    category: 'trezory-do-zdi',
    safeClass: 'I',
    inStock: true,
    description: 'Certifikovaný trezor do zdi s vysokou úrovní zabezpečení a snadnou instalací.',
    features: [
      'Bezpečnostní třída I',
      'Určeno pro zazdění',
      'Elektronický zámek s displejem',
      'Nouzové otevření klíčem',
      'Vnitřní osvětlení',
    ],
    dimensions: {
      width: 45,
      height: 50,
      depth: 25
    },
    weight: 45
  },
  // Pokračujte s dalšími 19 trezory do zdi...

  // Trezory do podlahy
  {
    id: 'tp-100',
    name: 'Podlahový trezor PT 100',
    slug: 'podlahovy-trezor-pt-100',
    price: 11990,
    image: 'https://images.unsplash.com/photo-1609644124495-714212900768?q=80&w=800',
    category: 'trezory-do-podlahy',
    safeClass: 'II',
    inStock: true,
    description: 'Vysoce bezpečný podlahový trezor s možností volby barvy krytu.',
    features: [
      'Bezpečnostní třída II',
      'Voděodolná konstrukce',
      'Třístranný rozvorový mechanismus',
      'Volitelná barva krytu',
      'Certifikovaný zámek',
    ],
    dimensions: {
      width: 35,
      height: 50,
      depth: 35
    },
    weight: 65
  },
  // Pokračujte s dalšími 19 podlahovými trezory...

  // Trezory na zbraně
  {
    id: 'tz-5',
    name: 'Trezor na zbraně ZT 5',
    slug: 'trezor-na-zbrane-zt-5',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1584743579083-b933b3d23268?q=80&w=800',
    category: 'trezory-na-zbrane',
    safeClass: 'I',
    inStock: true,
    description: 'Certifikovaný trezor na zbraně pro bezpečné uložení až 5 krátkých zbraní.',
    features: [
      'Certifikace dle zákona o zbraních',
      'Bezpečnostní třída I',
      'Speciální držáky na zbraně',
      'Oddělený prostor na střelivo',
      'Mechanický kombinační zámek',
    ],
    dimensions: {
      width: 30,
      height: 20,
      depth: 20
    },
    weight: 25
  },
  // Pokračujte s dalšími 19 trezory na zbraně...

  // Vhozové trezory
  {
    id: 'vt-cash',
    name: 'Vhozový trezor Cashmatic Pro',
    slug: 'vhozovy-trezor-cashmatic-pro',
    price: 14990,
    image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=800',
    category: 'vhozove-trezory',
    safeClass: 'II',
    inStock: true,
    description: 'Profesionální vhozový trezor s elektronickým zámkem a časovým zpožděním.',
    features: [
      'Elektronický zámek s časovým zpožděním',
      'Historie vhozů',
      'Ochrana proti vytažení',
      'Alarmový výstup',
      'Velká vhozová štěrbina',
    ],
    dimensions: {
      width: 40,
      height: 60,
      depth: 38
    },
    weight: 80
  },
  // Pokračujte s dalšími 19 vhozovými trezory...

  // Ohnivzdorné trezory
  {
    id: 'ot-120',
    name: 'Ohnivzdorný trezor OT 120',
    slug: 'ohnivzdorny-trezor-ot-120',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1622060896522-88306aa5ee0b?q=80&w=800',
    category: 'ohnivzdorne-trezory',
    safeClass: 'S2',
    fireResistance: '120 min',
    inStock: true,
    description: 'Certifikovaný ohnivzdorný trezor s ochranou 120 minut.',
    features: [
      'Ohnivzdornost 120 minut',
      'Certifikace pro papírové dokumenty',
      'Ochrana datových médií',
      'Vodotěsné provedení',
      'Automatické těsnění při požáru',
    ],
    dimensions: {
      width: 50,
      height: 60,
      depth: 50
    },
    weight: 120
  },
  // Pokračujte s dalšími 19 ohnivzdornými trezory...

  // Trezory na hotovost
  {
    id: 'th-2m',
    name: 'Trezor na hotovost HS 2M',
    slug: 'trezor-na-hotovost-hs-2m',
    price: 18990,
    image: 'https://images.unsplash.com/photo-1633158829799-56bdf8e56dbd?q=80&w=800',
    category: 'trezory-na-hotovost',
    safeClass: '2',
    inStock: true,
    description: 'Certifikovaný trezor pro uložení hotovosti do 1 500 000 Kč.',
    features: [
      'Certifikace pro 1 500 000 Kč',
      'Biometrický zámek',
      'Časový zámek',
      'Historie přístupů',
      'Alarmový výstup',
    ],
    dimensions: {
      width: 60,
      height: 80,
      depth: 55
    },
    weight: 180
  },
  // Pokračujte s dalšími 19 trezory na hotovost...
  {
    id: '1',
    name: 'Nábytkový trezor NT 105',
    slug: 'nabytkovy-trezor-nt-105',
    price: 4990,
    originalPrice: 5990,
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=800',
    category: 'nabytkove-trezory',
    safeClass: 'S1',
    inStock: true,
    description: 'Kvalitní nábytkový trezor NT 105 s certifikací třídy S1 je ideální pro bezpečné uložení cenností v domácnosti nebo kanceláři. Nabízí spolehlivou ochranu před neoprávněným přístupem.',
    features: [
      'Bezpečnostní třída S1',
      'Dvojitá stěna',
      'Klíčový zámek',
      'Možnost kotvení do podlahy nebo stěny',
      'Protipožární vložka',
    ],
    dimensions: {
      width: 35,
      height: 25,
      depth: 25
    },
    weight: 12
  },
  {
    id: '2',
    name: 'Trezor do zdi TS 25',
    slug: 'trezor-do-zdi-ts-25',
    price: 7990,
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800',
    category: 'trezory-do-zdi',
    safeClass: 'I',
    inStock: true,
    description: 'Trezor do zdi TS 25 poskytuje maximální bezpečnost díky pevnému ukotvení ve zdi. Tento certifikovaný trezor I. bezpečnostní třídy je vhodný pro domácí i komerční použití.',
    features: [
      'Bezpečnostní třída I',
      'Speciální konstrukce pro zabudování do zdi',
      'Certifikovaný elektronický zámek',
      'Skryté panty',
      'Kompaktní rozměry',
    ],
    dimensions: {
      width: 35,
      height: 46,
      depth: 20
    },
    weight: 38
  },
  {
    id: '3',
    name: 'Ohnivzdorný trezor OT 120',
    slug: 'ohnivzdorny-trezor-ot-120',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1622060896522-88306aa5ee0b?q=80&w=800',
    category: 'ohnivzdorne-trezory',
    safeClass: 'S2',
    fireResistance: '120 min',
    inStock: true,
    description: 'Ohnivzdorný trezor OT 120 nabízí maximální ochranu dokumentů a cenností před ohněm po dobu 120 minut. Jeho certifikovaná konstrukce zajišťuje, že obsah zůstane nepoškozený i při vysokých teplotách.',
    features: [
      'Bezpečnostní třída S2',
      'Ohnivzdornost 120 minut',
      'Elektronický zámek s nouzovým klíčem',
      'Speciální izolace',
      'Nastavitelné police',
    ],
    dimensions: {
      width: 50,
      height: 60,
      depth: 50
    },
    weight: 120
  },
  {
    id: '4',
    name: 'Trezor na zbraně ZT 5',
    slug: 'trezor-na-zbrane-zt-5',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1584743579083-b933b3d23268?q=80&w=800',
    category: 'trezory-na-zbrane',
    safeClass: 'I',
    inStock: true,
    description: 'Trezor na zbraně ZT 5 je navržen speciálně pro bezpečné uložení střelných zbraní v souladu s platnou legislativou. Poskytuje ochranu až 5 krátkým zbraním.',
    features: [
      'Bezpečnostní třída I dle ČSN EN 1143-1',
      'Certifikace pro uložení zbraní',
      'Mechanický kombinační zámek',
      'Speciální vnitřní uspořádání',
      'Kotvící body',
    ],
    dimensions: {
      width: 30,
      height: 20,
      depth: 20
    },
    weight: 25
  },
  {
    id: '5',
    name: 'Podlahový trezor PT 10',
    slug: 'podlahovy-trezor-pt-10',
    price: 9990,
    image: 'https://images.unsplash.com/photo-1609644124495-714212900768?q=80&w=800',
    category: 'trezory-do-podlahy',
    safeClass: 'II',
    inStock: false,
    description: 'Podlahový trezor PT 10 zajišťuje maximální diskrétnost a bezpečnost. Díky instalaci do podlahy je prakticky neviditelný a poskytuje vynikající ochranu před neoprávněným přístupem.',
    features: [
      'Bezpečnostní třída II',
      'Speciální konstrukce pro zabudování do podlahy',
      'Třístranný rozvorový mechanismus',
      'Voděodolná konstrukce',
      'Možnost změny barvy krytu',
    ],
    dimensions: {
      width: 30,
      height: 23,
      depth: 30
    },
    weight: 40
  },
  {
    id: '6',
    name: 'Vhozový trezor Cashmatic',
    slug: 'vhozovy-trezor-cashmatic',
    price: 14990,
    image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=800',
    category: 'vhozove-trezory',
    safeClass: 'II',
    inStock: true,
    description: 'Vhozový trezor Cashmatic je ideálním řešením pro podniky s častou manipulací hotovosti. Umožňuje bezpečné vkládání peněz bez nutnosti otevírání hlavních dveří trezoru.',
    features: [
      'Bezpečnostní třída II',
      'Vhozová štěrbina s ochranou proti vytažení',
      'Elektronický zámek s časovým zpožděním',
      'Možnost připojení k alarmu',
      'Historie přístupů',
    ],
    dimensions: {
      width: 40,
      height: 60,
      depth: 38
    },
    weight: 80
  },
  {
    id: '7',
    name: 'Trezor na hotovost HS 2M',
    slug: 'trezor-na-hotovost-hs-2m',
    price: 18990,
    image: 'https://images.unsplash.com/photo-1633158829799-56bdf8e56dbd?q=80&w=800',
    category: 'trezory-na-hotovost',
    safeClass: '2',
    inStock: true,
    description: 'Trezor na hotovost HS 2M bezpečnostní třídy 2 je určen pro uložení až 1 500 000 Kč. Poskytuje vynikající ochranu proti vloupání a je vhodný pro firmy i náročné domácí uživatele.',
    features: [
      'Bezpečnostní třída 2 (1 500 000 Kč)',
      'Dvojitý rozvorový mechanismus',
      'Biometrický zámek na otisk prstu',
      'LED vnitřní osvětlení',
      'Alarmový výstup',
    ],
    dimensions: {
      width: 60,
      height: 80,
      depth: 55
    },
    weight: 180
  },
  {
    id: '8',
    name: 'Nábytkový trezor NT 100 E',
    slug: 'nabytkovy-trezor-nt-100-e',
    price: 3990,
    image: 'https://images.unsplash.com/photo-1568607689150-17e625c1d296?q=80&w=800',
    category: 'nabytkove-trezory',
    safeClass: 'S1',
    inStock: true,
    description: 'Nábytkový trezor NT 100 E s elektronickým zámkem nabízí jednoduché a pohodlné ovládání. Ideální pro bezpečné uložení dokumentů a cenností v domácnosti nebo kanceláři.',
    features: [
      'Bezpečnostní třída S1',
      'Elektronický zámek s nouzovým klíčem',
      'Dva pevné ocelové čepy',
      'Předvrtané otvory pro ukotvení',
      'Vnitřní police',
    ],
    dimensions: {
      width: 31,
      height: 20,
      depth: 20
    },
    weight: 9
  }
];

// These functions now use the database service to fetch data
// They maintain the same API for backward compatibility
import {
  fetchProducts,
  fetchProductBySlug,
  fetchProductsByCategory,
  fetchFeaturedProducts,
  fetchRelatedProducts
} from '@/services/database';

export const getProductsByCategory = async (category?: string) => {
  if (!category) return await fetchProducts();
  return await fetchProductsByCategory(category);
};

export const getProductBySlug = async (slug: string) => {
  return await fetchProductBySlug(slug);
};

export const getFeaturedProducts = async (count = 4) => {
  return await fetchFeaturedProducts(count);
};

export const getRelatedProducts = async (currentProductId: string, category: string, count = 4) => {
  return await fetchRelatedProducts(currentProductId, category, count);
};

// Synchronous versions for backward compatibility
// These will be deprecated in the future
export const getProductsByCategorySync = (category?: string) => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};

export const getProductBySlugSync = (slug: string) => {
  return products.find(product => product.slug === slug);
};

export const getFeaturedProductsSync = () => {
  return products.slice(0, 4);
};

export const getRelatedProductsSync = (currentProductId: string, category: string, count = 4) => {
  return products
    .filter(product => product.category === category && product.id !== currentProductId)
    .slice(0, count);
};

// Function to get products on sale
export const getProductsOnSale = async (count = 4) => {
  try {
    // In a real application, this would be a database query
    // For now, we'll filter products that have an originalPrice
    const onSaleProducts = products.filter(product =>
      product.originalPrice && product.originalPrice > product.price
    );

    // Sort by discount percentage (highest first)
    const sortedProducts = onSaleProducts.sort((a, b) => {
      const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
      const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
      return discountB - discountA;
    });

    return sortedProducts.slice(0, count);
  } catch (error) {
    console.error('Error fetching products on sale:', error);
    return [];
  }
};

// Synchronous version for backward compatibility
export const getProductsOnSaleSync = (count = 4) => {
  const onSaleProducts = products.filter(product =>
    product.originalPrice && product.originalPrice > product.price
  );

  const sortedProducts = onSaleProducts.sort((a, b) => {
    const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
    const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
    return discountB - discountA;
  });

  return sortedProducts.slice(0, count);
};
