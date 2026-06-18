import 'server-only';

const VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    // TODO(secret): TURNSTILE_SECRET_KEY missing — bypassing verification
    // for development. Configure before production deploy (FEATURES.md §12).
    if (process.env.NODE_ENV === 'production') {
      console.error('TURNSTILE_SECRET_KEY is required in production');
      return false;
    }
    return true;
  }

  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });

  try {
    const res = await fetch(VERIFY_URL, { method: 'POST', body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification failed', error);
    return false;
  }
}
