import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/ui/Logo';

export default function Footer() {
  const t = useTranslations('Navigation');
  
  return (
    <footer className="bg-brand-dark-blue text-brand-clean-gray pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand & Address */}
          <div>
            <div className="mb-6">
              <Logo variant="inverse" />
            </div>
            <address className="not-italic text-sm space-y-2 text-brand-clean-gray/80">
              <p>STRKAN s.r.o.</p>
              <p>Domažlická 1256/11</p>
              <p>318 00 Plzeň</p>
              <p className="pt-2">IČO: 12345678</p>
              <p>DIČ: CZ12345678</p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Navigace</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/o-nas" className="hover:text-brand-sky-blue transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/zarizeni-pro-vyrobu-a-servis-dopravni-techniky" className="hover:text-brand-sky-blue transition-colors">
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link href="/novinky" className="hover:text-brand-sky-blue transition-colors">
                  {t('news')}
                </Link>
              </li>
              <li>
                <Link href="/kariera" className="hover:text-brand-sky-blue transition-colors">
                  {t('career')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & CTA */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">{t('contact')}</h3>
            <ul className="space-y-3 text-sm text-brand-clean-gray/80 mb-6">
              <li>Email: <a href="mailto:info@strkan.cz" className="text-brand-sky-blue hover:text-white transition-colors">info@strkan.cz</a></li>
              <li>Tel: <a href="tel:+420123456789" className="text-brand-sky-blue hover:text-white transition-colors">+420 123 456 789</a></li>
            </ul>
            <Link 
              href="/kontakt" 
              className="inline-block px-6 py-3 bg-brand-sky-blue text-brand-dark-blue font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors"
            >
              Napište nám
            </Link>
          </div>

        </div>

        <div className="pt-8 border-t border-brand-gray/50 flex flex-col md:flex-row justify-between items-center text-xs text-brand-clean-gray/60">
          <p>&copy; {new Date().getFullYear()} STRKAN s.r.o. Všechna práva vyhrazena.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-brand-sky-blue transition-colors">Zásady ochrany osobních údajů</a>
            {/* TODO: replace href with Supabase Storage URL */}
            <a href="#" className="hover:text-brand-sky-blue transition-colors">VOP (PDF)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
