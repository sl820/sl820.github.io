import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    track: z.enum(["design", "research", "tooling"]),
    year: z.number().int(),
    date: z.coerce.date(),
    color: z.enum(["cinnabar", "cobalt", "ochre", "sage", "lilac", "umber"]),
    role: z.string().optional(),
    client: z.string().optional(),
    location: z.string().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    cover: z.string().optional(),
    gallery: z
      .union([
        z.array(z.string()),
        z.object({
          views: z.array(z.string()).optional(),
          stickers: z.array(z.string()).optional(),
        }),
      ])
      .default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works, notes };
