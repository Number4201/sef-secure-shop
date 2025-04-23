
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-esejfy-burgundy text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Nejste si jisti výběrem? Kontaktujte naše odborníky!
            </h2>
            <p className="mb-0 md:max-w-xl opacity-90">
              Naši specialisté vám pomohou vybrat ideální trezor pro vaše potřeby a odpovědí na všechny vaše otázky.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-esejfy-burgundy hover:bg-white/90">
              <a href="/kontakt" className="flex items-center gap-2">
                <PhoneCall size={18} />
                <span>Kontaktujte nás</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/products">
                Prohlédnout produkty
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
