// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Placeholder finché non c'è un dominio reale. Serve a RSS,
  // sitemap, e qualsiasi link assoluto. Aggiornare al deploy.
  site: 'https://altrove.example',

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
  integrations: [mdx()],
});
