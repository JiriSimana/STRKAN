import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const MOCK_PRODUCTS = {
  'dopravni-technika': {
    title: 'Dopravní technika',
    subtitle: 'Konstrukce a výroba specializovaných zařízení.',
    desc: 'Navrhujeme a vyrábíme pásové, válečkové i řetězové dopravníky pro automobilový a těžký průmysl.',
    features: ['Modulární provedení', 'Nosnost až 5000 kg', 'Průmyslový standard Průmysl 4.0', 'Dálkové sledování stavu']
  },
  'prumyslova-automatizace': {
    title: 'Průmyslová automatizace',
    subtitle: 'Nezávislá automatizační řešení přesně na míru.',
    desc: 'Vývoj a nasazení robotických buněk, jednoúčelových strojů a automatických montážních stanic.',
    features: ['Precizní návrh v CAD', 'Optimalizace taktu linky', 'Osazeno komponenty předních výrobců']
  },
  'svarovane-konstrukce': {
    title: 'Svařované konstrukce',
    subtitle: 'Přesná výroba z certifikovaných materiálů.',
    desc: 'Kompletní výroba ocelových konstrukcí, rámů a podskupin strojů včetně finální povrchové úpravy.',
    features: ['Svařování dle ISO', 'Ultrazvuková kontrola svarů', 'Materiálové atesty']
  },
  'deskova-polohovadla': {
    title: 'Desková polohovadla',
    subtitle: 'Manipulace s těžkými břemeny bezpečně a jednoduše.',
    desc: 'Výroba a dodávka polohovadel pro sváření a montáž těžkých dílců, nosnost až několik desítek tun.',
    features: ['Certifikace bezpečnosti', 'Vlastní robustní převodovka', 'Integrované dálkové ovládání']
  }
};

export default function ProductSubpage({ params }: { params: { slug: string } }) {
  const product = MOCK_PRODUCTS[params.slug as keyof typeof MOCK_PRODUCTS];

  if (!product) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.desc,
    "brand": {
      "@type": "Brand",
      "name": "STRKAN s.r.o."
    }
  };

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section className="bg-brand-dark-blue text-white py-20 pt-32">
        <Container>
          <div className="text-brand-gray text-sm uppercase tracking-wider mb-4 font-bold">Produkty a zařízení</div>
          <h1 className="text-display font-bold text-white animate-fade-in">{product.title}</h1>
          <div className="h-1 w-20 bg-brand-sky-blue mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }} />
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Content Left */}
            <div className="order-2 lg:order-1">
              <SectionHeading title={product.subtitle} />
              
              <div className="prose prose-lg text-brand-gray mb-12">
                <p>{product.desc}</p>
              </div>

              <h3 className="text-2xl font-bold text-brand-dark-blue mb-6">Klíčové vlastnosti</h3>
              <ul className="space-y-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-brand-sky-blue mr-3 shrink-0">✓</span>
                    <span className="text-brand-gray font-semibold">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* PDF DOWNLOAD SECTION */}
              <div className="mt-12">
                {/* TODO: replace href with Supabase Storage URL */}
                <a 
                  href="#" 
                  className="inline-flex items-center gap-3 bg-brand-clean-gray text-brand-dark-blue border border-brand-gray/20 font-bold px-6 py-4 hover:border-brand-sky-blue transition-colors"
                >
                  <svg className="w-6 h-6 text-brand-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Stáhnout katalogový list (PDF)
                </a>
              </div>

              <div className="mt-16 p-8 bg-brand-clean-gray border-l-4 border-brand-sky-blue">
                <h4 className="text-brand-dark-blue font-bold text-lg mb-2">Máte zájem o technické řešení?</h4>
                <p className="text-brand-gray mb-6">Rádi s vámi probereme vaši situaci a navrhneme adekvátní postup.</p>
                <a href="/cs/kontakt" className="inline-block bg-brand-sky-blue text-brand-dark-blue font-bold px-6 py-3 uppercase text-sm tracking-wider hover:bg-[#3a9dbf] transition-colors shadow-flat">
                  Zaslat poptávku
                </a>
              </div>
            </div>

            {/* Image Right Area - PLACEHOLDER */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] w-full bg-brand-clean-gray shadow-flat flex items-center justify-center p-8 border border-brand-gray/10 text-center">
                {/* TODO: replace with real image from /public/images/ */}
                <span className="text-brand-gray/60 font-medium text-lg leading-relaxed">
                  [Placeholder]<br />Hlavní produktová fotografie
                </span>
              </div>
            </div>
            
          </div>
          
          {/* CERTIFICATES SECTION */}
          <div className="mt-32 pt-16 border-t border-brand-clean-gray">
            <h3 className="text-2xl font-bold text-brand-dark-blue mb-8">Certifikáty a osvědčení</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[3/4] bg-brand-clean-gray border border-brand-gray/10 flex items-center justify-center p-4 text-center">
                  {/* TODO: replace with real certificate scan */}
                  <span className="text-brand-gray/40 font-medium text-xs uppercase tracking-wider">
                    [Placeholder]<br />Sken Certifikátu {i}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
