
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
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  weight?: number;
  // New fields
  certificationLevel?: string;  // Bezpečnostní třída
  documentProtection?: string;  // Stupeň utajení dokumentů
  lockType?: string;           // Typ zámku - klíčový, elektronický
  keyCapacity?: number;        // Kapacita na klíče
  fireProtectionTime?: number;  // Doba ohnivzdornosti v minutách
  waterResistant?: boolean;     // Vodotěsnost
  installationType?: 'wall' | 'floor' | 'furniture' | 'door'; // Typ instalace
  recommendedInsurance?: number; // Doporučená pojistná částka
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
  | 'archivacni-skrine';
