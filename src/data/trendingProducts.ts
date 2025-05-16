import { Product } from '@/types/product';

// Trendující produkty pro každou kategorii
// Toto by v reálné aplikaci bylo načítáno z databáze nebo API
// Pro účely demonstrace používáme statická data
export const trendingProducts: Record<string, string> = {
  'nabytkove-trezory': 'nt-105',
  'trezory-do-zdi': 'tz-200',
  'trezory-na-zbrane': 'zbr-300',
  'ohnivzdorne-trezory': 'ohn-150',
  'trezory-do-podlahy': 'tp-100',
  'vhozove-trezory': 'vh-100',
  'trezory-na-hotovost': 'hot-200',
  'trezory-na-dokumenty': 'dok-100',
  'trezory-na-klice': 'kl-50',
  'hotelove-trezory': 'hot-100',
  'archivacni-skrine': 'arch-200',
  'rozbalene-produkty': 'rozb-100',
  'penezni-boxy': 'pb-50',
  'trezorove-dvere': 'dv-300',
  'kreone-keybox': 'key-100'
};

// Funkce pro získání trendujícího produktu pro danou kategorii
export const getTrendingProductIdForCategory = (categorySlug: string): string | null => {
  return trendingProducts[categorySlug] || null;
};

// Funkce pro nastavení trendujícího produktu pro kategorii
// V reálné aplikaci by tato funkce aktualizovala databázi
export const setTrendingProductForCategory = (categorySlug: string, productId: string): void => {
  trendingProducts[categorySlug] = productId;
};
