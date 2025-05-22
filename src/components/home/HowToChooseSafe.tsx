import React from 'react';

const HowToChooseSafe: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Jak správně vybrat trezor</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="flex items-baseline gap-2 text-lg font-semibold mb-3">
              <span className="text-esejfy-burgundy text-xl font-bold">01</span>
              <span>Krok</span>
            </h3>
            <p className="text-gray-700">
              <strong>Víte, jaký potřebujete trezor?</strong><br />
              Existuje mnoho různých typů a druhů trezorů např.: trezory na hotovost, na zbraně, na cennosti, na dokumenty, na média a další.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="flex items-baseline gap-2 text-lg font-semibold mb-3">
              <span className="text-esejfy-burgundy text-xl font-bold">02</span>
              <span>Krok</span>
            </h3>
            <p className="text-gray-700">
              <strong>Víte, kam trezor chcete umístit?</strong><br />
              Podle umístění se trezory dělí na: trezory do nábytku, do zdi, do podlahy, volně stojící, trezorové místnosti/trezorové dveře.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="flex items-baseline gap-2 text-lg font-semibold mb-3">
              <span className="text-esejfy-burgundy text-xl font-bold">03</span>
              <span>Krok</span>
            </h3>
            <p className="text-gray-700">
              <strong>Víte, jaký chcete u trezoru nebo sejfu zámek?</strong><br />
              Výrobci trezorů nabízejí více možností zámkového vybavení, např.: klíčový zámek, mechanický kombinační zámek, elektronický zámek.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="flex items-baseline gap-2 text-lg font-semibold mb-3">
              <span className="text-esejfy-burgundy text-xl font-bold">04</span>
              <span>Krok</span>
            </h3>
            <p className="text-gray-700">
              <strong>Víte, jak hodnotné zboží chcete do trezoru ukládat?</strong><br />
              Trezory se rozdělují podle bezpečnostních tříd a podle úložné částky. Čím větší obnos chcete ukládat, tím vyšší třídu byste měli využívat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToChooseSafe;
