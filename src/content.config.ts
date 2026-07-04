import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional().default([]),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional().default('beginner'),
    source: z.string().optional(),
    authors: z.string().optional(),
    journal: z.string().optional(),
    pmcid: z.string().optional(),
  }),
});

export const collections = { posts };
