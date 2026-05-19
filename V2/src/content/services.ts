export const SERVICE_SEGMENTS = [
  'dopravni-technika',
  'jednoucelove-stroje',
  'svarovane-konstrukce',
  'automatizace-a-robotika',
  'deskova-polohovadla',
] as const;

export type ServiceSegment = (typeof SERVICE_SEGMENTS)[number];

export function isServiceSegment(value: string): value is ServiceSegment {
  return (SERVICE_SEGMENTS as readonly string[]).includes(value);
}
