// Markers from .env.example placeholders. If an env var still contains one of
// these, treat Supabase as not configured so the site falls back to sample
// content instead of trying to reach a non-existent project.
const PLACEHOLDER_MARKERS = ['your-project', 'your-anon-key', 'your-'];

function isRealValue(value: string | undefined): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return !PLACEHOLDER_MARKERS.some((marker) => trimmed.includes(marker));
}

export function hasSupabaseEnv(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return isRealValue(url) && url.startsWith('http') && isRealValue(key);
}

export function getPublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!isRealValue(url) || !isRealValue(key)) {
    throw new Error(
      'Supabase env vars missing — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
    );
  }
  return { url, key };
}
