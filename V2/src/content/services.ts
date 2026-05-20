export const SERVICE_SEGMENTS = [
  'dopravni-technika',
  'svarovane-konstrukce',
  'prumyslova-automatizace',
  'ostatni-produkty-a-sluzby',
] as const;

export type ServiceSegment = (typeof SERVICE_SEGMENTS)[number];

export function isServiceSegment(value: string): value is ServiceSegment {
  return (SERVICE_SEGMENTS as readonly string[]).includes(value);
}

export const DOPRAVNI_SUBPRODUCTS = [
  'patkove-zvedaky',
  'montazni-lavky',
  'jamove-zvedaky',
  'podvozkove-standy-a-lisy',
  'ceske-kl',
  'polohovadla-a-pripravky',
] as const;

export type DopravniSubproduct = (typeof DOPRAVNI_SUBPRODUCTS)[number];
