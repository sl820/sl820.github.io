import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "~/lib/site";

export async function GET(context: { site: URL }) {
  const notes = await getCollection("notes", ({ data }) => !data.draft);
  return rss({
    title: `${SITE.name} · Notes`,
    description: SITE.bio,
    site: context.site,
    items: notes
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((note) => ({
        title: note.data.title,
        pubDate: note.data.date,
        description: note.data.summary ?? "",
        link: `/notes/${note.id}/`,
      })),
  });
}
