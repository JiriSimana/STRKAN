
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nás',
  description: 'Tradiční česká strojírenská firma z Plzně. Seznamte se s naší historií, strojírenskými hodnotami a certifikacemi.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-brand-dark-blue text-white py-20 pt-32">
        <Container>
          <h1 className="text-display font-bold text-white animate-fade-in">O nás</h1>
          <div className="h-1 w-20 bg-brand-sky-blue mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }} />
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading 
              title="Tradice a inovace ve strojírenství" 
              subtitle="Od roku 1993 jsme spolehlivým partnerem pro průmyslové podniky nejen v České republice."
            />
            <div className="space-y-6 text-brand-gray leading-relaxed text-lg">
              <p>
                Společnost STRKAN s.r.o. sídlící v Plzni se zaměřuje na poskytování komplexních služeb v oblasti 
                strojírenské výroby, inženýringu a servisu. Naší specializací jsou především zařízení pro výrobu 
                a údržbu dopravní techniky.
              </p>
              <p>
                Zakládáme si na individuálním přístupu, špičkové kvalitě zpracování a dodržování dohodnutých termínů. 
                Díky našemu modernímu strojnímu vybavení a týmu zkušených odborníků jsme schopni realizovat 
                i ty nejnáročnější projekty od prvotní vize až po finální instalaci u zákazníka.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full bg-brand-clean-gray flex items-center justify-center p-8 border border-brand-gray/10 text-center">
            {/* TODO: replace with real image from /public/images/ */}
            <span className="text-brand-gray/60 font-medium text-lg leading-relaxed">
              [Placeholder]<br />Fotografie haly nebo týmu
            </span>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 bg-brand-clean-gray">
        <Container>
          <SectionHeading title="Naše hodnoty" align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-sky-blue text-white flex items-center justify-center font-bold text-2xl mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold text-brand-dark-blue mb-4">Kvalita bez kompromisů</h3>
              <p className="text-brand-gray">Každý díl prochází přísnou výstupní kontrolou. Jsme držiteli certifikátů ISO 9001.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-sky-blue text-white flex items-center justify-center font-bold text-2xl mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold text-brand-dark-blue mb-4">Inovativní přístup</h3>
              <p className="text-brand-gray">Neustále investujeme do nových technologií a vzdělávání našich zaměstnanců.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-sky-blue text-white flex items-center justify-center font-bold text-2xl mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold text-brand-dark-blue mb-4">Flexibilita a rychlost</h3>
              <p className="text-brand-gray">Dokážeme rychle reagovat na mimořádné požadavky a expresní servisní zásahy.</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
