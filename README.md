# Portfolio

Personal portfolio of Rodrigo López Monroy. Static site built with [Astro](https://astro.build), bilingual (ES/EN), published on GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Add a project

Create a folder in `src/content/projects/` named after the project and add two files, one per language:

```
src/content/projects/my-project/
  es.md
  en.md
  cover.png      (optional)
```

Each file starts with this header, followed by the description in Markdown:

```md
---
title: 'Project title'
summary: 'One or two sentences shown on the home page card.'
date: 2026-11-02
facts:            # highlighted line: dataset size, key metric...
  - '325 players'
  - 'silhouette 0.25'
tags:             # stack and techniques
  - K-Means
  - scikit-learn
repo: 'https://github.com/rodrigolopezu/my-project'
demo: 'https://...'        # optional
cover: ./cover.png          # optional
draft: true                 # optional, hides it from the site
---

Description here. Images in the same folder work with ![alt](./image.png).
```

If a project only exists in one language, it is listed only in that language.

## Publish

1. Create a GitHub repository and push this folder.
2. In `astro.config.mjs` set `site` to `https://<user>.github.io`. If the repository is not named `<user>.github.io`, also set `base` to `'/<repository>'`.
3. In the repository go to Settings → Pages and choose **GitHub Actions** as the source.
4. Every push to `main` builds and publishes the site.

## Customize

- Name, links and interface texts: `src/lib/i18n.ts`
- Colors and layout: `src/styles/global.css`
- Accent color choices: `src/layouts/Base.astro`
- Background animation: `src/components/ClusterBackground.astro`
