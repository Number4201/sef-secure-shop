import React from 'react';
import { Shield, Award, Lock, Info, FileText, Check, Flame, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionDivider from '@/components/ui/SectionDivider';

const CertifiedSafesInfo: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-white to-gray-50 relative">
      <SectionDivider type="wave" position="top" color="white" className="absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="shrink-0 mt-1">
              <Shield className="text-esejfy-burgundy" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Kvalitní certifikované trezory a sejfy</h2>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                U nás naleznete velký výběr nábytkových trezorů a sejfů různých velikostí a druhů pojistných tříd. Mezi naše <strong>trezory a sejfy</strong> patří nábytkové trezory a skříňové trezory, trezory do zdi, trezory na zbraně, ohnivzdorné trezory a mnoho dalších.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Všechny naše <strong>trezory a sejfy</strong> jsou vyrobeny <strong>renomovanými výrobci s dlouholetou tradicí výroby trezorů</strong> a zabezpečovací techniky. Díky tomu jsme schopni zajistit záruční i pozáruční servis po celé ČR.
              </p>
            </div>
          </div>

          {/* Certifikační standardy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1 bg-blue-50 p-3 rounded-full">
                  <Award className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Certifikace ČSN EN 1143-1</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Evropská norma pro bezpečnostní úschovné objekty, která definuje požadavky, klasifikaci a metody zkoušení odolnosti proti vloupání.
                  </p>
                  <ul className="space-y-2">
                    {['Třída 0', 'Třída I', 'Třída II', 'Třída III'].map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <Check size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1 bg-amber-50 p-3 rounded-full">
                  <FileText className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Bezpečnostní třídy</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Bezpečnostní třídy určují úroveň zabezpečení trezoru a doporučenou pojistnou hodnotu uložených předmětů.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-700">
                      <Check size={16} className="text-amber-600 mr-2 flex-shrink-0" />
                      <span>Třída S1 - pro domácnosti a menší kanceláře</span>
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <Check size={16} className="text-amber-600 mr-2 flex-shrink-0" />
                      <span>Třída S2 - zvýšená ochrana pro firmy</span>
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <Check size={16} className="text-amber-600 mr-2 flex-shrink-0" />
                      <span>Třída Z1, Z2, Z3 - speciální třídy pro zbraně</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Speciální vlastnosti */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="shrink-0 bg-orange-50 p-2 rounded-full">
                  <Flame className="text-orange-600" size={20} />
                </div>
                <h4 className="font-semibold text-gray-900">Ohnivzdornost</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Ohnivzdorné trezory chrání obsah před požárem po dobu 30 až 120 minut při teplotách až 1000°C.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="shrink-0 bg-blue-50 p-2 rounded-full">
                  <Droplets className="text-blue-600" size={20} />
                </div>
                <h4 className="font-semibold text-gray-900">Vodotěsnost</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Vodotěsné trezory poskytují ochranu před poškozením vodou při povodních nebo hašení požáru.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="shrink-0 bg-green-50 p-2 rounded-full">
                  <Lock className="text-green-600" size={20} />
                </div>
                <h4 className="font-semibold text-gray-900">Typy zámků</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Nabízíme trezory s klíčovými, elektronickými i biometrickými zámky pro různé úrovně zabezpečení.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-esejfy-burgundy/10 to-esejfy-burgundy/5 p-6 rounded-lg shadow-md border border-esejfy-burgundy/20">
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                <Info className="text-esejfy-burgundy" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Potřebujete poradit s výběrem?</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  Pokud si nejste jisti, jaký trezor je pro vás nejvhodnější, neváhejte nás kontaktovat. Rádi vám doporučíme ideální řešení podle vašich specifických potřeb a požadavků na zabezpečení.
                </p>
                <div className="flex mt-4">
                  <Link
                    to="/kontakt"
                    className="inline-flex items-center px-5 py-2.5 bg-esejfy-burgundy text-white rounded-md hover:bg-esejfy-burgundy/90 transition-colors font-medium"
                  >
                    <Info size={18} className="mr-2" />
                    Kontaktujte nás pro odbornou radu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider type="curve" position="bottom" color="white" className="absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default CertifiedSafesInfo;
