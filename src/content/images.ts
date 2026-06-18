/**
 * Indexed lookup for client-delivered photos under public/images/.
 * Filenames follow `NN.ext` (zero-padded) within each folder.
 *
 * NOTE: the `general` set is NOT a contiguous 1..N range. Photos that showed
 * the photo crew / unrelated people were removed by the client, leaving gaps
 * (e.g. 007, 014, 027 … are absent). Source of truth: `Fotky/Compressed`,
 * mirrored into `public/images/general/strkan-NNN.jpg` with the same numbers.
 * Always reference a KNOWN-PRESENT index — do not iterate 1..count blindly.
 *
 * If new photos arrive, drop them into the matching folder and reference them
 * explicitly. After changing the source folder, re-sync `public/images/general`.
 */

// Count of files actually present in public/images/general (non-contiguous).
export const GENERAL_PHOTO_COUNT = 128;

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
