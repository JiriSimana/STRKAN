import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kariéra',
  description: 'Hledáme šikovné strojaře, konstruktéry a technology do našeho týmu v Plzni. Podívejte se na aktuální volné pozice.',
};

export default function CareersPage() {
  const benefits = [
    { title: 'Stabilní zaměstnání', desc: 'Práce v prosperující a zavedené české firmě s více než 30letou historií.' },
    { title: 'Finanční ohodnocení', desc: 'Odpovídající mzdové ohodnocení s motivačními složkami a prémie.' },
    { title: 'Odborný růst', desc: 'Podpora dalšího vzdělávání a získávání nových certifikací (např. svářečské zkoušky).' },
    { title: 'Příspěvek na stravování', desc: 'Zajištěné dotované stravování přímo v areálu podniku nebo stravenky.' },
    { title: 'Dovolená', desc: '5 týdnů dovolené pro váš kvalitní odpočinek.' },
    { title: 'Firemní akce', desc: 'Pravidelné teambuildingy a sportovní akce pro utužení kolektivu.' }
  ];

  return (
    <div className="flex flex-col">
      <section className="bg-brand-dark-blue text-white py-20 pt-32">
        <Container>
          <h1 className="text-display font-bold text-white animate-fade-in">Kariéra</h1>
          <div className="h-1 w-20 bg-brand-sky-blue mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }} />
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <SectionHeading 
            title="Přidejte se do našeho týmu" 
            subtitle="Hledáme šikovné a motivované kolegy pro náš strojírenský provoz v Plzni."
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="p-8 border border-brand-clean-gray bg-brand-clean-gray/30">
                <h3 className="text-xl font-bold text-brand-dark-blue mb-4">{b.title}</h3>
                <p className="text-brand-gray">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-brand-clean-gray">
        <Container>
          <SectionHeading title="Aktuálně volné pozice" align="center" />
          
          <div className="mt-12 space-y-6 max-w-4xl mx-auto">
            {/* Vacancy Card 1 */}
            <div className="bg-white p-8 border border-brand-gray/20 shadow-flat hover:shadow-card-hover transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-2xl font-bold text-brand-dark-blue mb-2">Svářeč kovů (TIG/MIG)</h3>
                <p className="text-brand-gray mb-4 md:mb-0">Hledáme zkušeného svářeče ocelových konstrukcí s platným certifikátem pro Plzeňský provoz.</p>
              </div>
              <a href="mailto:hr@strkan.cz?subject=Zájem o pozici Svářeč kovů" className="mt-4 md:mt-0 font-bold uppercase text-sm tracking-wider bg-brand-sky-blue text-brand-dark-blue px-6 py-3 hover:bg-[#3a9dbf] transition-colors">
                Mám zájem
              </a>
            </div>

            {/* Vacancy Card 2 */}
            <div className="bg-white p-8 border border-brand-gray/20 shadow-flat hover:shadow-card-hover transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-2xl font-bold text-brand-dark-blue mb-2">Konstruktér v SolidWorks</h3>
                <p className="text-brand-gray mb-4 md:mb-0">Návrhy strojních součástí a jednoúčelových strojů pro automobilový dopravní průmysl.</p>
              </div>
              <a href="mailto:hr@strkan.cz?subject=Zájem o pozici Konstruktér" className="mt-4 md:mt-0 font-bold uppercase text-sm tracking-wider bg-brand-sky-blue text-brand-dark-blue px-6 py-3 hover:bg-[#3a9dbf] transition-colors">
                Mám zájem
              </a>
            </div>
            
            <div className="text-center mt-12 text-brand-gray">
              Nenašli jste pozici přímo pro vás, ale myslíte, že byste k nám perfektně zapadli? <br className="hidden sm:block"/>
              Pošlete nám svůj životopis na <a href="mailto:hr@strkan.cz" className="text-brand-sky-blue hover:underline font-semibold">hr@strkan.cz</a>.
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
