/* ─────────────────────────────────────────────────────────────
   /rss.xml — feed RSS dei capitoli italiani.

   Filosofia: il feed è il canale "lento" del progetto. Chi lo
   sottoscrive sceglie deliberatamente di lasciare entrare
   Altrove nel suo silenzio. Niente promozione, niente CTA — solo
   il capitolo, con la sua voce.
   ───────────────────────────────────────────────────────────── */

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { t, localizedPath } from '../lib/i18n';

export async function GET(context: APIContext) {
  const chapters = (
    await getCollection('chapters', ({ data }) => data.lang === 'it' && !data.draft)
  ).sort((a, b) => Number(b.data.number) - Number(a.data.number));

  return rss({
    title: t('site.title', 'it'),
    description: t('site.description', 'it'),
    site: context.site!,
    items: chapters.map((c) => {
      const slug = c.id.startsWith('it/') ? c.id.slice(3) : c.id;
      return {
        title: `${t('chapter.chapter', 'it')} ${c.data.number} · ${c.data.title}`,
        description: c.data.excerpt,
        link: localizedPath(`/chapters/${slug}`, 'it'),
        categories: c.data.tags,
      };
    }),
    customData: '<language>it-IT</language>',
    stylesheet: undefined,
  });
}
