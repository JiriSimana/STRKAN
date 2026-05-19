import 'server-only';

import type { z } from 'zod';
import { verifyTurnstile } from './turnstile';

export type ActionState =
  | { status: 'idle' }
  | { status: 'success'; message: string; data?: Record<string, unknown> }
  | {
      status: 'error';
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

type RunArgs<Schema extends z.ZodTypeAny> = {
  schema: Schema;
  input: unknown;
  handler: (
    data: z.infer<Schema>,
  ) => Promise<{ message?: string; data?: Record<string, unknown> }>;
  skipTurnstile?: boolean;
};

export async function runFormAction<Schema extends z.ZodTypeAny>({
  schema,
  input,
  handler,
  skipTurnstile,
}: RunArgs<Schema>): Promise<ActionState> {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Zkontrolujte prosím vyplněné údaje.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = parsed.data as Record<string, unknown>;

  if (!skipTurnstile) {
    const ok = await verifyTurnstile(
      typeof data.turnstileToken === 'string' ? data.turnstileToken : undefined,
    );
    if (!ok) {
      return {
        status: 'error',
        message: 'Ověření selhalo. Obnovte stránku a zkuste to znovu.',
      };
    }
  }

  try {
    const result = await handler(parsed.data);
    return {
      status: 'success',
      message:
        result.message ??
        'Vaše zpráva byla odeslána. Ozveme se do 2 pracovních dnů.',
      data: result.data,
    };
  } catch (error) {
    console.error('Form action handler failed', error);
    return {
      status: 'error',
      message:
        'Odeslání selhalo. Zkuste to prosím znovu, nebo nám napište přímo na obchod@strkan.cz.',
    };
  }

  // TODO(infra): wire rate limiting per IP (FEATURES.md §8.2 — 3 req/10 min)
  // once Upstash Redis / Vercel KV credentials are available.
}
