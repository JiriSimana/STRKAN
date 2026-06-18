'use client';

import { createBrowserClient as createSSRBrowserClient } from '@supabase/ssr';
import { getPublicEnv } from './env';

export function createBrowserClient() {
  const { url, key } = getPublicEnv();
  return createSSRBrowserClient(url, key);
}
