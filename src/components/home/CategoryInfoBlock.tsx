import React from 'react';
import { Shield, Award, Lock } from 'lucide-react';

interface CategoryInfoBlockProps {
  categorySlug: string;
}

// Informace o certifikacích a bezpečnostních standardech pro jednotlivé kategorie
const categoryInfo = {
  'nabytkove-trezory': {
    icon: <Shield className="text-esejfy-burgundy" size={20} />,
    title: 'Bezpečnostní certifikace nábytkových trezorů',
    content: 'Nábytkové trezory jsou certifikovány podle normy ČSN EN 1143-1 a nabízejí bezpečnostní třídy od S1 do S2. Jsou ideální pro domácnosti a menší kanceláře, kde poskytují základní ochranu proti vloupání.',
    bgColor: 'bg-gradient-to-r from-gray-50 to-white'
  },
  'trezory-do-zdi': {
    icon: <Lock className="text-esejfy-burgundy" size={20} />,
    title: 'Výhody trezorů zabudovaných do zdi',
    content: 'Trezory do zdi nabízejí zvýšenou bezpečnost díky diskrétnímu umístění a obtížnému odstranění. Jsou certifikovány podle normy ČSN EN 1143-1 s bezpečnostními třídami od S1 do S2 a poskytují vynikající ochranu při minimálním záboru prostoru.',
    bgColor: 'bg-gradient-to-r from-white to-gray-50'
  },
  'trezory-na-zbrane': {
    icon: <Award className="text-esejfy-burgundy" size={20} />,
    title: 'Legislativní požadavky na trezory na zbraně',
    content: 'Trezory na zbraně splňují přísné legislativní požadavky podle zákona č. 119/2002 Sb. o střelných zbraních a střelivu. Nabízejí bezpečnostní třídy od S1 do S3 podle normy ČSN EN 1143-1 a jsou nezbytné pro legální držitele zbraní.',
    bgColor: 'bg-gradient-to-r from-gray-50 to-white'
  },
  'ohnivzdorne-trezory': {
    icon: <Shield className="text-esejfy-burgundy" size={20} />,
    title: 'Ochrana před požárem a vysokými teplotami',
    content: 'Ohnivzdorné trezory jsou testovány podle přísných norem a garantují ochranu dokumentů a cenností před požárem po dobu 30 až 120 minut při teplotách až 1000°C. Kombinují protipožární ochranu s bezpečnostními prvky proti vloupání.',
    bgColor: 'bg-gradient-to-r from-white to-gray-50'
  }
};

const CategoryInfoBlock: React.FC<CategoryInfoBlockProps> = ({ categorySlug }) => {
  // Pokud pro danou kategorii nemáme informace, nezobrazíme nic
  if (!categoryInfo[categorySlug]) {
    return null;
  }

  const { icon, title, content, bgColor } = categoryInfo[categorySlug];

  return (
    <div className={`py-2 ${bgColor} border-t border-b border-gray-100`}>
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-2 max-w-3xl mx-auto">
          <div className="mt-0.5 shrink-0">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-base font-semibold text-gray-900 mb-0.5">{title}</h3>
            <p className="text-gray-700 text-sm">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryInfoBlock;
