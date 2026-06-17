import type { Post, Vacancy } from '@/lib/supabase/types';

/**
 * Demo fallback content, shown ONLY when Supabase is not configured
 * (`hasSupabaseEnv() === false`) — e.g. on the preview deploy before the CMS
 * is wired up. As soon as real rows exist in Supabase, they take over and this
 * is never used. Kept in Czech (default locale); EN/DE show the empty state
 * until real content is published. See CONTENT_GAPS.md.
 */

export const SAMPLE_VACANCIES: Vacancy[] = [
  {
    id: 'sample-konstrukter',
    slug: 'konstrukter-jednoucelovych-stroju',
    locale: 'cs',
    title: 'Konstruktér jednoúčelových strojů',
    location: 'Město Touškov u Plzně',
    employment_type: 'full_time',
    perex:
      'Navrhujte stroje a zařízení pro kolejovou dopravní techniku ve SolidWorks, Siemens NX a CATIA — od první skici po výrobní dokumentaci.',
    description_md:
      'Hledáme konstruktéra do našeho samostatného konstrukčního oddělení v Městě Touškov. Budete navrhovat jednoúčelové stroje, přípravky a zařízení pro výrobu a servis kolejové dopravní techniky — od konceptu přes 3D model až po kompletní výrobní dokumentaci.\n\nPracujeme ve SolidWorks, Siemens NX a CATIA a úzce spolupracujeme s technology i výrobou. Není to práce do šuplíku — vaše stroje uvidíte vzniknout v naší hale a běžet u zákazníka.',
    responsibilities: [
      '3D konstrukce strojů a zařízení ve SolidWorks / Siemens NX / CATIA',
      'Tvorba výkresové a výrobní dokumentace dle ČSN',
      'Pevnostní výpočty a simulace navržených konstrukcí',
      'Spolupráce s technology, výrobou a projektovým vedením',
      'Konzultace technických řešení se zákazníkem',
    ],
    requirements: [
      'SŠ nebo VŠ strojního zaměření',
      'Znalost některého z CAD systémů (SolidWorks, NX, CATIA, Inventor)',
      'Schopnost číst a tvořit výkresovou dokumentaci',
      'Samostatnost, zodpovědnost a smysl pro detail',
      'Praxe v konstrukci strojů výhodou (není podmínkou)',
    ],
    benefits: [
      'Práce na reálných projektech od skici po předpřejímku',
      'Moderní CAD vybavení a zázemí vlastní výroby',
      'Stabilní 100% česká firma s dlouhodobými zákazníky',
      'Pružná pracovní doba',
      'Podpora vzdělávání a růstu v oboru',
    ],
    salary_range: null,
    status: 'open',
    published_at: '2026-06-01T08:00:00.000Z',
    closes_at: null,
    created_at: '2026-06-01T08:00:00.000Z',
  },
];

export const SAMPLE_POSTS: Post[] = [
  {
    id: 'sample-roboticka-bunka',
    slug: 'roboticka-bunka-pro-tramvajove-rosty',
    locale: 'cs',
    title: 'Robotická buňka pro svařování tramvajových podlahových roštů',
    perex:
      'Pro výrobce kolejových vozidel jsme navrhli a postavili robotické pracoviště pro svařování opakovaných roštů — kratší časy a stabilní kvalita dle DIN EN 15085-2 CL1.',
    content_mdx:
      'Pro výrobce kolejových vozidel jsme navrhli a postavili robotickou buňku pro svařování tramvajových podlahových roštů. Cílem bylo zrychlit výrobu opakovaných svařenců a zároveň držet stabilní kvalitu svaru podle normy DIN EN 15085-2, třída CL1.\n\nBuňku tvoří svařovací robot s polohovadlem, svařovací zdroj a upínací přípravky navržené přímo pro daný typ roštu. Operátor zakládá díly do přípravku, zbytek — stehování i finální svar — řídí program.\n\nNávrh, konstrukci, výrobu i oživení jsme zvládli pod jednou střechou v Městě Touškov. Pro zákazníka to znamená kratší výrobní časy, opakovatelnou kvalitu a méně ruční práce u monotónních operací.\n\nPodobná zařízení navrhujeme na míru — od jednoduchých polohovadel po kompletní robotická pracoviště. Máte-li ve výrobě opakovaný svařenec, ozvěte se nám.',
    category: 'Z výroby',
    cover_url: '/images/general/strkan-030.jpg',
    cover_alt: 'Robotické svařování ve výrobní hale STRKAN',
    author_name: 'STRKAN s.r.o.',
    reading_time: 3,
    published_at: '2026-05-20T08:00:00.000Z',
    status: 'published',
    created_at: '2026-05-20T08:00:00.000Z',
    updated_at: '2026-05-20T08:00:00.000Z',
  },
];
