/* ─────────────────────────────────────────────────────────────
   /en/rss.xml — RSS feed for English chapters.
   ───────────────────────────────────────────────────────────── */

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { t, localizedPath } from '../../lib/i18n';

export async function GET(context: APIContext) {
  const chapters = (
    await getCollection('chapters', ({ data }) => data.lang === 'en' && !data.draft)
  ).sort((a, b) => Number(b.data.number) - Number(a.data.number));

  return rss({
    title: t('site.title', 'en'),
    description: t('site.description', 'en'),
    site: context.site!,
    items: chapters.map((c) => {
      const slug = c.id.startsWith('en/') ? c.id.slice(3) : c.id;
      return {
        title: `${t('chapter.chapter', 'en')} ${c.data.number} · ${c.data.title}`,
        description: c.data.excerpt,
        link: localizedPath(`/chapters/${slug}`, 'en'),
        categories: c.data.tags,
      };
    }),
    customData: '<language>en</language>',
    stylesheet: undefined,
  });
}
