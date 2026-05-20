/**
 * Indexed lookup for client-delivered photos under public/images/.
 * Filenames follow `NN.ext` (zero-padded) within each folder, so generators
 * can build arrays without enumerating the filesystem.
 *
 * If new photos arrive, just drop them into the matching folder using the
 * next index and update the `count` here.
 */

export const GENERAL_PHOTO_COUNT = 164;

export function generalPhoto(index: number): string {
  const n = String(index).padStart(3, '0');
  return `/images/general/strkan-${n}.jpg`;
}

export function generalPhotos(...indices: number[]): string[] {
  return indices.map(generalPhoto);
}

export const SERVICE_PHOTO_COUNTS = {
  'dopravni-technika': {
    'patkove-zvedaky': 6,
    'montazni-lavky': 10,
    'jamove-zvedaky': 12,
    'podvozkove-standy-a-lisy': 7,
    'polohovadla-a-pripravky': 10,
  },
  'svarovane-konstrukce': 7,
  'prumyslova-automatizace': 39,
  'ostatni-produkty-a-sluzby': 20,
} as const;

export function servicePhoto(
  segment: string,
  subOrIndex: string | number,
  index?: number,
): string {
  if (typeof subOrIndex === 'string') {
    const n = String(index ?? 1).padStart(2, '0');
    return `/images/services/${segment}/${subOrIndex}/${n}.jpg`;
  }
  const n = String(subOrIndex).padStart(2, '0');
  return `/images/services/${segment}/${n}.jpg`;
}

export function servicePhotos(
  segment: keyof typeof SERVICE_PHOTO_COUNTS,
  sub?: string,
): string[] {
  const segCounts = SERVICE_PHOTO_COUNTS[segment];
  const count =
    typeof segCounts === 'number'
      ? segCounts
      : (segCounts as Record<string, number>)[sub ?? ''] ?? 0;
  return Array.from({ length: count }, (_, i) =>
    sub
      ? servicePhoto(segment, sub, i + 1)
      : servicePhoto(segment, i + 1),
  );
}

export const KATALOGOVE_LISTY = {
  'patkove-zvedaky': '/documents/katalogove-listy/patkove-zvedaky.pdf',
  'montazni-lavky': '/documents/katalogove-listy/montazni-lavky.pdf',
  'podvozkove-standy-a-lisy':
    '/documents/katalogove-listy/podvozkove-standy-a-lisy.pdf',
  'deskova-polohovadla':
    '/documents/katalogove-listy/deskova-polohovadla.pdf',
  'svarovane-dily-kolejovych-vozidel':
    '/documents/katalogove-listy/svarovane-dily-kolejovych-vozidel.pdf',
} as const;
