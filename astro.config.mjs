import { defineConfig } from 'astro/config';

// Change `site` (and `base` if the repo is not <user>.github.io) before deploying.
export default defineConfig({
  site: 'https://rodrigolopezu.github.io',
  base: '/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
