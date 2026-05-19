import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import ContactForm from '@/components/ContactForm';
export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-brand-dark-blue text-white py-20 pt-32">
        <Container>
          <h1 className="text-display font-bold text-white animate-fade-in">Kontakt</h1>
          <div className="h-1 w-20 bg-brand-sky-blue mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }} />
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <SectionHeading 
              title="Kde nás najdete" 
              subtitle="Jsme připraveni prokonzultovat váš projekt a nabídnout optimální řešení."
            />
            
            <div className="space-y-8 mt-12 text-lg">
              <div>
                <h3 className="font-bold text-brand-dark-blue mb-2">Sídlo společnosti a provozovna</h3>
                <p className="text-brand-gray">
                  STRKAN s.r.o.<br />
                  Domažlická 1256/11<br />
                  318 00 Plzeň
                </p>
              </div>

              <div>
                <h3 className="font-bold text-brand-dark-blue mb-2">Fakturační údaje</h3>
                <p className="text-brand-gray">
                  IČO: 12345678<br />
                  DIČ: CZ12345678
                </p>
              </div>

              <div>
                <h3 className="font-bold text-brand-dark-blue mb-2">Spojení</h3>
                <p className="text-brand-gray">
                  Tel: <a href="tel:+420123456789" className="text-brand-sky-blue hover:underline">+420 123 456 789</a><br />
                  Email: <a href="mailto:info@strkan.cz" className="text-brand-sky-blue hover:underline">info@strkan.cz</a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-brand-clean-gray p-8 lg:p-12 border border-brand-gray/20">
            <h3 className="text-2xl font-bold text-brand-dark-blue mb-8">Napište nám</h3>
            <ContactForm />
          </div>

        </Container>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-brand-gray relative">
        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xl font-bold bg-brand-dark-blue/80">
          Google Maps Embed Placeholder
        </div>
      </section>
    </div>
  );
}
