
export const categoryNames: Record<string, string> = {
  'nabytkove-trezory': 'Nábytkové trezory a sejfy',
  'trezory-do-zdi': 'Trezory a sejfy do zdi',
  'trezory-do-podlahy': 'Trezory do podlahy',
  'trezory-na-zbrane': 'Trezory na zbraně',
  'vhozove-trezory': 'Vhozové trezory',
  'ohnivzdorne-trezory': 'Ohnivzdorné trezory',
  'trezory-na-hotovost': 'Trezory na hotovost',
  'trezory-na-dokumenty': 'Trezory na dokumenty',
  'trezory-na-klice': 'Trezory na klíče',
  'hotelove-trezory': 'Hotelové trezory a sejfy',
  'archivacni-skrine': 'Archivační skříně na dokumenty',
  'rozbalene-produkty': 'ROZBALENO - výprodej',
  'penezni-boxy': 'Peněžní boxy a pokladničky',
  'trezorove-dvere': 'Trezorové dveře',
  'kreone-keybox': 'Creone / Keybox'
};

export const getCategoryDescription = (category: string): string => {
  switch (category) {
    case 'nabytkove-trezory':
      return 'Nábytkové trezory a sejfy určené pro běžné použití v domácnostech nebo kancelářích k úschově cenností, šperků a dokumentů.';
    case 'trezory-do-zdi':
      return 'Trezory určené k zabudování do zdi s důrazem na diskrétnost a zvýšenou ochranu proti fyzickému odstranění.';
    case 'trezory-do-podlahy':
      return 'Specializované řešení zaměřené na maximální diskrétnost a skryté uložení cenností v podlaze.';
    case 'trezory-na-zbrane':
      return 'Trezory splňující legislativní požadavky pro bezpečné uložení střelných zbraní a střeliva.';
    case 'vhozove-trezory':
      return 'Trezory pro prostředí s častým příjmem hotovosti nebo dokumentů, umožňující vkládat obsah bez nutnosti otevírání hlavních dveří.';
    case 'ohnivzdorne-trezory':
      return 'Trezory testované a certifikované pro ochranu cenností a dokumentů před požárem s garantovanou dobou ohnivzdornosti.';
    case 'trezory-na-hotovost':
      return 'Trezory určené pro bezpečné uložení finanční hotovosti a dalších vysoce hodnotných předmětů s různými bezpečnostními třídami.';
    case 'trezory-na-dokumenty':
      return 'Trezory pro bezpečné uložení důležitých listin a dokumentů, často s certifikací pro různé stupně utajení.';
    case 'trezory-na-klice':
      return 'Trezory a skříňky určené pro bezpečné a organizované uložení většího množství klíčů v hotelech, firmách a institucích.';
    case 'hotelove-trezory':
      return 'Trezory specificky určené pro použití v hotelových pokojích, poskytující hostům bezpečné místo pro osobní cennosti.';
    case 'archivacni-skrine':
      return 'Skříně navržené pro bezpečné uložení velkého objemu dokumentů, často s protipožární ochranou.';
    case 'rozbalene-produkty':
      return 'Produkty, které byly vystaveny nebo rozbaleny a nemají originální obal, nabízené za sníženou cenu.';
    case 'penezni-boxy':
      return 'Přenosné kovové pokladničky a lékárničky pro uložení menší hotovosti nebo zdravotnického materiálu.';
    case 'trezorove-dvere':
      return 'Robustní konstrukce určené pro ochranu celých místností, sklepů nebo komor, instalované namísto standardních dveří.';
    case 'kreone-keybox':
      return 'Specializované systémy pro správu klíčů od švédského výrobce Creone, určené pro firmy a instituce.';
    default:
      return 'Bezpečnostní úložné systémy pro ochranu vašich cenností, dokumentů a dalších důležitých věcí.';
  }
};

export const getSafeCategoryIcon = (category: string): string => {
  switch (category) {
    case 'nabytkove-trezory':
      return 'shield';
    case 'trezory-do-zdi':
      return 'wall';
    case 'trezory-do-podlahy':
      return 'floor';
    case 'trezory-na-zbrane':
      return 'gun';
    case 'vhozove-trezory':
      return 'deposit';
    case 'ohnivzdorne-trezory':
      return 'flame';
    case 'trezory-na-hotovost':
      return 'money';
    case 'trezory-na-dokumenty':
      return 'file';
    case 'trezory-na-klice':
      return 'key';
    case 'hotelove-trezory':
      return 'hotel';
    case 'archivacni-skrine':
      return 'archive';
    case 'rozbalene-produkty':
      return 'tag';
    case 'penezni-boxy':
      return 'cash';
    case 'trezorove-dvere':
      return 'door';
    case 'kreone-keybox':
      return 'keybox';
    default:
      return 'shield';
  }
};
