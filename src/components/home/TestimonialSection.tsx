
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    quote: 'Trezor dorazil rychle a v perfektním stavu. Instalace do zdi byla jednoduchá díky přiloženému návodu a zákaznická podpora byla výborná, když jsem potřeboval radu.',
    author: 'Jan Novák',
    position: 'Praha',
    rating: 5
  },
  {
    quote: 'Jako firma oceňujeme profesionální přístup a kvalitu produktů. Náš vhozový trezor spolehlivě slouží už druhým rokem bez jediného problému.',
    author: 'Petra Svobodová',
    position: 'Jednatelka, Safe Finance s.r.o.',
    rating: 5
  },
  {
    quote: 'Skvělá cena za certifikovaný trezor. Hodně jsem porovnával nabídky a eSEJFY.net nabídl nejlepší poměr cena/výkon.',
    author: 'Martin Dvořák',
    position: 'Brno',
    rating: 4
  }
];

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, position, rating }) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Rating stars */}
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="flex-grow">
          <p className="text-gray-700 italic mb-4">{quote}</p>
        </blockquote>

        {/* Author info */}
        <footer>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-500">{position}</p>
        </footer>
      </CardContent>
    </Card>
  );
};

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Co o nás říkají naši zákazníci</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Přečtěte si recenze od spokojených zákazníků, kteří si vybrali naše trezory pro zabezpečení svých cenností
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
