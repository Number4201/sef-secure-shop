
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import ContactInfo from '@/components/ui/ContactInfo';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Normally this would send data to a server
    toast({
      title: "Formulář byl odeslán",
      description: "Děkujeme za vaši zprávu. Budeme vás kontaktovat co nejdříve.",
      duration: 5000,
    });
    
    // Reset the form
    e.currentTarget.reset();
  };

  return (
    <Layout>
      <div className="bg-esejfy-dark-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Kontaktujte nás</h1>
          <p className="text-lg text-white/80 max-w-3xl">
            Máte-li jakékoli dotazy ohledně našich produktů nebo služeb, neváhejte nás kontaktovat.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-esejfy-burgundy">Napište nám</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Jméno</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Předmět</label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Zpráva</label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 w-full sm:w-auto"
                >
                  Odeslat zprávu
                </Button>
              </div>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-esejfy-burgundy">Kontaktní informace</h2>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <ContactInfo />
              </CardContent>
            </Card>
            
            <h3 className="text-xl font-semibold mb-4 text-esejfy-burgundy">Otevírací doba</h3>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Pondělí - Pátek</div>
                <div>9:00 - 17:00</div>
                <div className="font-medium">Sobota</div>
                <div>9:00 - 12:00</div>
                <div className="font-medium">Neděle</div>
                <div>Zavřeno</div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-esejfy-burgundy">Kde nás najdete</h3>
            <div className="bg-gray-200 h-[300px] rounded-lg flex items-center justify-center text-gray-600">
              Mapa bude zde
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
