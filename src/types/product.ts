
// Typ pro variantu produktu
export interface ProductVariant {
  id: string;
  title?: string;
  prices?: { amount: number }[];
  inventory_quantity?: number;
  weight?: number;
  original_price?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  safeClass?: string;
  fireResistance?: string;
  inStock: boolean;
  description: string;
  features: string[];
  // Varianty produktu pro Medusa.js
  variants?: ProductVariant[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  // Vnitřní rozměry v milimetrech
  internalDimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  weight?: number;
  // Bezpečnostní specifikace
  certificationLevel?: string;  // Bezpečnostní třída
  certificationStandard?: string; // Standard certifikace (např. ČSN EN 1143-1)
  securityClassification?: string; // Klasifikace bezpečnosti
  documentProtection?: string;  // Stupeň utajení dokumentů
  lockType?: string;           // Typ zámku - klíčový, elektronický
  keyCapacity?: number;        // Kapacita na klíče
  fireProtectionTime?: number;  // Doba ohnivzdornosti v minutách
  waterResistant?: boolean;     // Vodotěsnost
  installationType?: 'wall' | 'floor' | 'furniture' | 'door'; // Typ instalace
  recommendedInsurance?: number; // Doporučená pojistná částka
  // Rozšířená kategorizace
  subcategory?: string; // Podkategorie produktu
  manufacturer?: string; // Výrobce
  series?: string;      // Produktová řada
  // Vnitřní vybavení
  hooks?: number;       // Počet háčků
  shelves?: number;     // Počet polic
  interiorFeatures?: string[]; // Další vnitřní vybavení
}

export type ProductCategory =
  | 'nabytkove-trezory'
  | 'trezory-do-zdi'
  | 'trezory-do-podlahy'
  | 'trezory-na-zbrane'
  | 'vhozove-trezory'
  | 'ohnivzdorne-trezory'
  | 'trezory-na-hotovost'
  | 'trezory-na-dokumenty'
  | 'trezory-na-klice'
  | 'hotelove-trezory'
  | 'archivacni-skrine'
  | 'rozbalene-produkty'
  | 'penezni-boxy'
  | 'trezorove-dvere'
  | 'kreone-keybox';
