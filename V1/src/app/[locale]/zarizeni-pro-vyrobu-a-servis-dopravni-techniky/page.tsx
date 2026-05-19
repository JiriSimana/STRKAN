import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export default function ProductsOverviewPage() {
  const productCategories = [
    {
      title: 'Dopravní technika',
      desc: 'Kompletní systémové celky pro plynulý přesun materiálu v halách.',
      href: '/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/dopravni-technika',
    },
    {
      title: 'Průmyslová automatizace',
      desc: 'Specializovaná zařízení navržená přesně na míru vašemu výrobnímu procesu.',
      href: '/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/prumyslova-automatizace',
    },
    {
      title: 'Svařované konstrukce',
      desc: 'Přesná výroba ocelových konstrukcí a dílů pro těžký průmysl.',
      href: '/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/svarovane-konstrukce',
    },
    {
      title: 'Desková polohovadla',
      desc: 'Bezpečná a robustní manipulační technika pro těžká břemena.',
      href: '/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/deskova-polohovadla',
    }
  ];

  return (
    <div className="flex flex-col">
      <section className="bg-brand-dark-blue text-white py-20 pt-32">
        <Container>
          <h1 className="text-display font-bold max-w-4xl leading-tight animate-fade-in">Zařízení pro výrobu a servis dopravní techniky</h1>
          <div className="h-1 w-20 bg-brand-sky-blue mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }} />
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <SectionHeading 
            title="Přehled našich produktů a řešení" 
            subtitle="Dodáváme špičková výrobní a servisní zařízení zaměřená primárně na automobilový a těžký průmysl."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-16">
            {productCategories.map((cat, i) => (
              <Card 
                key={i}
                title={cat.title}
                description={cat.desc}
                href={cat.href}
              />
            ))}
          </div>
        </Container>
      </section>
      
      {/* Short CTA block */}
      <section className="py-16 bg-brand-clean-gray text-center border-t border-brand-gray/20">
        <Container>
          <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Nenašli jste, co hledáte?</h2>
          <p className="text-brand-gray mb-8">Zabýváme se vývojem a výrobou prototypů dle specifického zadání.</p>
          <a href="/cs/kontakt" className="inline-block bg-brand-sky-blue text-brand-dark-blue font-bold px-8 py-4 uppercase text-sm tracking-wider hover:bg-[#3a9dbf] transition-colors shadow-flat">
            Poptat řešení na míru
          </a>
        </Container>
      </section>
    </div>
  );
}
