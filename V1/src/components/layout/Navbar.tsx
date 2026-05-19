'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { Logo } from '@/components/ui/Logo';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkBg = pathname === '/' && !isScrolled; 
  const navbarClasses = isDarkBg 
    ? 'bg-transparent text-white' 
    : 'bg-white text-brand-dark-blue shadow-flat';
    
  const variant = isDarkBg ? 'inverse' : 'colored';

  const navLinks = [
    { href: '/o-nas', label: t('about') },
    { href: '/zarizeni-pro-vyrobu-a-servis-dopravni-techniky', label: t('products') },
    { href: '/novinky', label: t('news') },
    { href: '/kariera', label: t('career') },
    { href: '/kontakt', label: t('contact') },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Logo variant={variant as 'colored' | 'inverse'} />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 hover:text-brand-sky-blue ${
                  pathname.startsWith(link.href) ? 'text-brand-sky-blue' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pl-4 border-l border-gray-300/30">
              <LanguageSwitcher variant={variant} />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -mr-2 transition-colors hover:text-brand-sky-blue"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white text-brand-dark-blue shadow-lg border-t border-brand-clean-gray">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-3 font-semibold transition-colors ${
                  pathname.startsWith(link.href) ? 'text-brand-sky-blue bg-brand-clean-gray' : 'hover:bg-brand-clean-gray'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <LanguageSwitcher variant="colored" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
