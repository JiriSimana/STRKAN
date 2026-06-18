'use server';

import {
  contactSchema,
  configuratorSchema,
  jobApplicationSchema,
  newsletterSchema,
  type ConfiguratorInput,
} from './schemas';
import { runFormAction, type ActionState } from './server-action';

function generateInquiryCode(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  // TODO(infra): replace with DB sequence-backed counter (FEATURES.md §1.1 → inquiry_year_seq)
  return `INQ-${year}-${random}`;
}

export async function submitContact(input: unknown): Promise<ActionState> {
  return runFormAction({
    schema: contactSchema,
    input,
    handler: async (data) => {
      // TODO(secret): Resend send + Pipedrive lead + Supabase insert
      console.info('[submitContact]', { email: data.email });
      return {
        message:
          'Vaše zpráva byla odeslána. Ozveme se do 2 pracovních dnů.',
      };
    },
  });
}

export async function submitConfigurator(
  input: unknown,
): Promise<ActionState> {
  return runFormAction({
    schema: configuratorSchema,
    input,
    handler: async (data: ConfiguratorInput) => {
      const code = generateInquiryCode();
      // TODO(secret): insert into inquiries table, send confirmation + sales email,
      // optionally POST to Pipedrive (FEATURES.md §6).
      console.info('[submitConfigurator]', {
        code,
        segment: data.segment,
        timeline: data.timeline,
        email: data.contact.email,
      });
      return {
        message: `Vaše poptávka byla odeslána. Referenční kód: ${code}. Ozveme se do 2 pracovních dnů.`,
        data: { referenceCode: code },
      };
    },
  });
}

export async function submitNewsletter(
  input: unknown,
): Promise<ActionState> {
  return runFormAction({
    schema: newsletterSchema,
    input,
    handler: async (data) => {
      // TODO(secret): insert into newsletter_subscribers with confirm_token,
      // send double-opt-in email via Resend.
      console.info('[submitNewsletter]', { email: data.email });
      return {
        message:
          'Děkujeme. Na váš e-mail jsme poslali odkaz pro potvrzení.',
      };
    },
  });
}

export async function submitJobApplication(
  input: unknown,
): Promise<ActionState> {
  return runFormAction({
    schema: jobApplicationSchema,
    input,
    handler: async (data) => {
      // TODO(secret): upload CV to Supabase Storage cv-uploads bucket,
      // insert into applications, send HR notification email.
      console.info('[submitJobApplication]', {
        vacancy: data.vacancySlug,
        email: data.email,
      });
      return {
        message:
          'Děkujeme za přihlášku. Ozveme se vám do týdne.',
      };
    },
  });
}
