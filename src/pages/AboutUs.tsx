
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <Layout>
      <div className="bg-esejfy-dark-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">O nás</h1>
          <p className="text-lg text-white/80 max-w-3xl">
            Jsme specialisté na bezpečnostní trezory a sejfy s dlouholetou zkušeností v oboru.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-esejfy-burgundy">Naše historie</h2>
            <p className="mb-4 text-gray-700">
              Společnost eSEJFY.net vznikla v roce 2010 s jasnou vizí - poskytovat kvalitní bezpečnostní řešení pro domácnosti i firmy. Za více než desetiletí naší existence jsme pomohli tisícům zákazníků ochránit jejich cennosti, dokumenty a další důležité věci.
            </p>
            <p className="mb-4 text-gray-700">
              Naše dlouholeté zkušenosti nám umožňují nabízet pouze prověřené produkty, které splňují nejvyšší bezpečnostní standardy.
            </p>
          </div>
          <div className="bg-black rounded-lg h-[300px] md:h-[400px] flex items-center justify-center text-white/30">
            Ilustrační obrázek firemní historie
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-esejfy-burgundy">Profesionalita</h3>
            <p className="text-gray-700">
              Naši specialisté mají hluboké znalosti v oblasti bezpečnostních systémů a trezorů. Pravidelně se školíme, abychom vám mohli nabídnout ty nejnovější a nejbezpečnější produkty.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-esejfy-burgundy">Kvalita</h3>
            <p className="text-gray-700">
              Spolupracujeme pouze s prověřenými výrobci a dodavateli. Všechny naše produkty procházejí důkladnou kontrolou kvality, aby splnily náročné požadavky našich zákazníků.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-esejfy-burgundy">Spolehlivost</h3>
            <p className="text-gray-700">
              Naším cílem je poskytnout vám nejen kvalitní produkt, ale i spolehlivý servis. Jsme tu pro vás od výběru vhodného trezoru přes jeho instalaci až po následnou údržbu a servis.
            </p>
          </div>
        </div>

        <div className="bg-esejfy-dark-secondary rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Naše hodnoty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
              <div className="bg-esejfy-burgundy rounded-full p-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Bezpečnost na prvním místě</h3>
                <p className="text-white/80">
                  Bezpečnost vašeho majetku je naší prioritou. Proto nabízíme pouze certifikované trezory, které splňují přísné bezpečnostní normy.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-esejfy-burgundy rounded-full p-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Individuální přístup</h3>
                <p className="text-white/80">
                  Každý zákazník má jiné potřeby. Naši odborníci vám pomohou vybrat trezor, který bude přesně odpovídat vašim požadavkům.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-6 text-esejfy-burgundy">Prohlédněte si naši nabídku</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700">
            Nabízíme široký sortiment trezorů a sejfů pro různé účely. Od nábytkových trezorů přes trezory na zbraně až po hotelové trezory.
          </p>
          <Button asChild className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90">
            <Link to="/products">
              Zobrazit všechny produkty
            </Link>
          </Button>
        </div>

        <div className="bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-esejfy-burgundy">Kontaktujte nás</h2>
          <p className="text-center mb-8 text-gray-700">
            Máte-li jakékoliv dotazy ohledně našich produktů nebo služeb, neváhejte nás kontaktovat.
          </p>
          <div className="flex justify-center">
            <Button asChild variant="outline" className="border-esejfy-burgundy text-esejfy-burgundy hover:bg-esejfy-burgundy/10">
              <Link to="/kontakt">
                Přejít na kontakt
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
