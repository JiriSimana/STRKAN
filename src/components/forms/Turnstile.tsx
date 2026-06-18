'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

type Props = {
  onVerify: (token: string) => void;
  onError?: () => void;
  theme?: 'light' | 'dark' | 'auto';
};

export function Turnstile({ onVerify, onError, theme = 'light' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !ref.current) return;

    let cancelled = false;

    const tryRender = () => {
      if (cancelled) return;
      if (window.turnstile && ref.current && !widgetId.current) {
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: onVerify,
          'error-callback': onError,
          theme,
        });
        return;
      }
      setTimeout(tryRender, 120);
    };

    tryRender();

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey, onVerify, onError, theme]);

  if (!siteKey) {
    return (
      <div className="type-body-sm text-fog">
        {/* TODO(secret): NEXT_PUBLIC_TURNSTILE_SITE_KEY not configured — form will skip captcha until set */}
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        async
        defer
      />
      <div ref={ref} />
    </>
  );
}
