import { z } from 'zod';

export const SEGMENTS = [
  'dopravni-technika',
  'jednoucelove-stroje',
  'svarovane-konstrukce',
  'automatizace-a-robotika',
  'deskova-polohovadla',
  'jine',
] as const;

export type Segment = (typeof SEGMENTS)[number];

export const TIMELINES = [
  'do-1-mesice',
  '1-3-mesice',
  '3-6-mesicu',
  '6-plus-mesicu',
] as const;

export type Timeline = (typeof TIMELINES)[number];

const trueLiteral = z.literal(true, {
  errorMap: () => ({ message: 'Souhlas je vyžadován.' }),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Jméno musí mít alespoň 2 znaky.')
    .max(120),
  email: z.string().email('Zadejte platnou e-mailovou adresu.'),
  subject: z.string().min(2).max(200),
  message: z
    .string()
    .min(10, 'Napište prosím alespoň 10 znaků.')
    .max(5000),
  consent: trueLiteral,
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const configuratorContactSchema = z.object({
  company: z.string().min(2),
  name: z.string().min(2),
  role: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
});

export const configuratorSchema = z.object({
  segment: z.enum(SEGMENTS),
  parameters: z.record(z.string(), z.unknown()).default({}),
  timeline: z.enum(TIMELINES),
  contact: configuratorContactSchema,
  attachments: z
    .array(
      z.object({
        url: z.string().url(),
        name: z.string(),
        size: z.number(),
      }),
    )
    .optional(),
  consent: trueLiteral,
  turnstileToken: z.string().optional(),
});

export type ConfiguratorInput = z.infer<typeof configuratorSchema>;

export const jobApplicationSchema = z.object({
  vacancySlug: z.string().min(1),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6).optional().or(z.literal('')),
  cvUrl: z.string().url('CV musí být nahrané PDF.'),
  linkedinUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal('')),
  motivation: z.string().max(5000).optional().or(z.literal('')),
  consentGdpr: trueLiteral,
  turnstileToken: z.string().optional(),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;

export const newsletterSchema = z.object({
  email: z.string().email(),
  consent: trueLiteral,
  turnstileToken: z.string().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
