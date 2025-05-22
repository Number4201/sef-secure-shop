import React from 'react';
import { Shield, Award, Lock, Flame } from 'lucide-react';
import { H3, P } from '@/components/ui/typography';

interface CategoryInfoBlockProps {
  categorySlug: string;
}

// Informace o certifikacích a bezpečnostních standardech pro jednotlivé kategorie
const categoryInfo = {
  'nabytkove-trezory': {
    icon: <Shield className="text-white" size={20} />,
    title: 'Bezpečnostní certifikace nábytkových trezorů',
    content: 'Nábytkové trezory jsou certifikovány podle normy ČSN EN 1143-1 a nabízejí bezpečnostní třídy od S1 do S2. Jsou ideální pro domácnosti a menší kanceláře, kde poskytují základní ochranu proti vloupání.',
    bgColor: 'bg-gradient-to-r from-esejfy-navy/95 to-esejfy-navy/90',
    iconBgColor: 'bg-esejfy-burgundy'
  },
  'trezory-do-zdi': {
    icon: <Lock className="text-white" size={20} />,
    title: 'Výhody trezorů zabudovaných do zdi',
    content: 'Trezory do zdi nabízejí zvýšenou bezpečnost díky diskrétnímu umístění a obtížnému odstranění. Jsou certifikovány podle normy ČSN EN 1143-1 s bezpečnostními třídami od S1 do S2 a poskytují vynikající ochranu při minimálním záboru prostoru.',
    bgColor: 'bg-gradient-to-r from-esejfy-blue/95 to-esejfy-blue/90',
    iconBgColor: 'bg-esejfy-burgundy'
  },
  'trezory-na-zbrane': {
    icon: <Award className="text-white" size={20} />,
    title: 'Legislativní požadavky na trezory na zbraně',
    content: 'Trezory na zbraně splňují přísné legislativní požadavky podle zákona č. 119/2002 Sb. o střelných zbraních a střelivu. Nabízejí bezpečnostní třídy od S1 do S3 podle normy ČSN EN 1143-1 a jsou nezbytné pro legální držitele zbraní.',
    bgColor: 'bg-gradient-to-r from-esejfy-navy/95 to-esejfy-navy/90',
    iconBgColor: 'bg-esejfy-burgundy'
  },
  'ohnivzdorne-trezory': {
    icon: <Flame className="text-white" size={20} />,
    title: 'Ochrana před požárem a vysokými teplotami',
    content: 'Ohnivzdorné trezory jsou testovány podle přísných norem a garantují ochranu dokumentů a cenností před požárem po dobu 30 až 120 minut při teplotách až 1000°C. Kombinují protipožární ochranu s bezpečnostními prvky proti vloupání.',
    bgColor: 'bg-gradient-to-r from-esejfy-blue/95 to-esejfy-blue/90',
    iconBgColor: 'bg-esejfy-burgundy'
  }
};

const CategoryInfoBlock: React.FC<CategoryInfoBlockProps> = ({ categorySlug }) => {
  // Pokud pro danou kategorii nemáme informace, nezobrazíme nic
  if (!categoryInfo[categorySlug]) {
    return null;
  }

  const { icon, title, content, bgColor, iconBgColor } = categoryInfo[categorySlug];

  return (
    <div className={`py-8 ${bgColor} border-t border-b border-gray-800/10 text-white`}>
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-5 max-w-4xl mx-auto">
          <div className={`${iconBgColor} p-3 rounded-full shrink-0`}>
            {icon}
          </div>
          <div className="text-left">
            <H3 className="text-white mb-2 font-bold">{title}</H3>
            <P className="text-white/90 leading-relaxed">{content}</P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryInfoBlock;
