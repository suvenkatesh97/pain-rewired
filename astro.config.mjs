// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://painrewired.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
