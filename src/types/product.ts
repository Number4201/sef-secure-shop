
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
}

export type ProductCategory = 
  | 'nabytkove-trezory'
  | 'trezory-do-zdi'
  | 'trezory-do-podlahy'
  | 'trezory-na-zbrane'
  | 'vhozove-trezory'
  | 'ohnivzdorne-trezory'
  | 'trezory-na-hotovost';
