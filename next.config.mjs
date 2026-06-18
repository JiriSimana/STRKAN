import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:locale(cs|en|de)/sluzby/automatizace-a-robotika',
        destination: '/:locale/sluzby/prumyslova-automatizace',
        permanent: true,
      },
      {
        source: '/:locale(cs|en|de)/sluzby/jednoucelove-stroje',
        destination: '/:locale/sluzby/ostatni-produkty-a-sluzby',
        permanent: true,
      },
      {
        source: '/:locale(cs|en|de)/sluzby/deskova-polohovadla',
        destination: '/:locale/sluzby/dopravni-technika',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
