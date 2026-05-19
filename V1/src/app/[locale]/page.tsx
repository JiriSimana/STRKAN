'use client';

import * as React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import YouTube from 'react-youtube';

import { MasonryGallery } from '@/components/Gallery';

export default function HomePage() {
  
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "STRKAN s.r.o.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://strkan.cz",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://strkan.cz"}/logo-color.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+420 377 388 880",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Domažlická 1256/11",
      "addressLocality": "Plzeň",
      "postalCode": "318 00",
      "addressCountry": "CZ"
    }
  };

  const videoOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: 'lQKCzrs65do', // required for loop
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 bg-[url('/images/hero.jpg')] bg-cover bg-center overflow-hidden -mt-20"> {/* -mt-20 to underlap the fixed 80px navbar */}
        <div className="absolute inset-0 bg-brand-dark-blue/70 z-10" />
        {/* Pokud není url('/images/hero.jpg'), použij bg-brand-dark-blue bez url(). */}
        <Container className="relative z-20 text-center">
          <h1 className="text-display-xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
            Návrh, konstrukce a výroba strojů
          </h1>
          <p className="text-xl text-brand-clean-gray max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Stroje a zařízení pro výrobu, manipulaci a servis dopravní techniky, výrobní linky a automaty, robotické buňky, přípravky.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" variant="primary">Naše produkty</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-dark-blue">
              Kontaktujte nás
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. VIDEO ACTION SECTION */}
      <section className="bg-brand-dark-blue -mt-10 relative z-30 pb-20">
        <Container>
          <div className="relative aspect-video w-full max-w-5xl mx-auto bg-brand-gray shadow-2xl overflow-hidden border-4 border-white/10 group">
            <YouTube 
              videoId="lQKCzrs65do" 
              opts={videoOptions} 
              className="absolute inset-0 w-full h-full pointer-events-none" // Disable pointer to prevent pausing by clicking
            />
            {/* Optional Overlay on Video */}
            <div className="absolute inset-0 bg-brand-dark-blue/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </Container>
      </section>

      {/* 3. SEGMENTS SECTION */}
      <section className="py-24 bg-white">
        <Container>
          <SectionHeading 
            title="Hlavní oblasti působení" 
            subtitle="Komplexní řešení pro průmysl od návrhu po realizaci."
            align="center"
          />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <Card 
              title="Dopravní technika" 
              description="Konstrukce a výroba specializovaných zařízení."
              href="/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/dopravni-technika"
            />
            <Card 
              title="Průmyslová automatizace" 
              description="Spolehlivý servis a údržba výrobních linek."
              href="/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/prumyslova-automatizace"
            />
            <Card 
              title="Svařované konstrukce" 
              description="Přesná výroba ocelových konstrukcí a dílů."
              href="/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/svarovane-konstrukce"
            />
            <Card 
              title="Desková polohovadla" 
              description="Projekce, vývoj a technologická příprava."
              href="/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/deskova-polohovadla"
            />
          </div>
        </Container>
      </section>

      {/* 4. MASONRY GALLERY */}
      <section className="py-24 bg-brand-clean-gray">
        <Container>
          <SectionHeading 
            title="Výroba v akci" 
            subtitle="Nahlédněte do našich výrobních hal a realizovaných projektů. Databáze aktuálně obsahuje přes 60 fotografií."
            align="center"
          />
          
          <div className="mt-12">
            <MasonryGallery />
          </div>
          
          <div className="mt-16 text-center">
            {/* Future improvement: Load more button instead of linking out, or link to full gallery page */}
            <Button variant="outline">Zobrazit všechny fotografie</Button>
          </div>
        </Container>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 bg-cta-gradient text-white text-center">
        <Container>
          <h2 className="text-display font-bold mb-6">Spojte se s námi</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Hledáte spolehlivého partnera pro strojírenskou výrobu? Kontaktujte naše odborníky.
          </p>
          <Button size="lg" className="bg-white text-brand-dark-blue hover:bg-brand-clean-gray border-none shadow-nav">
            Přejít na kontakt
          </Button>
        </Container>
      </section>

    </div>
  );
}
