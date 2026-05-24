// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio canonico di Altrove. Usato per RSS, sitemap,
  // canonical link e qualsiasi URL assoluto.
  site: 'https://altrove.dev',

  // Italian default at /, English at /en/.
  // prefixDefaultLocale: false → l'italiano vive sulla root,
  // l'inglese sotto /en/. La logica di routing è gestita dai
  // file in src/pages/ + src/pages/en/.
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it-IT',
          en: 'en-US',
        },
      },
    }),
  ],
});
