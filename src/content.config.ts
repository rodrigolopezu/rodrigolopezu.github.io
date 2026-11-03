import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/{es,en}.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      // short highlights shown in accent color: dataset size, key metric...
      facts: z.array(z.string()).default([]),
      // stack / techniques
      tags: z.array(z.string()).default([]),
      repo: z.string().url(),
      demo: z.string().url().optional(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
