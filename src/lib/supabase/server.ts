import 'server-only';

import { createServerClient as createSSRClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getPublicEnv } from './env';

export async function createServerClient() {
  const { url, key } = getPublicEnv();
  const cookieStore = await cookies();

  return createSSRClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {
        // Read-only access from RSC; cookie writes happen in middleware.
      },
    },
  });
}
