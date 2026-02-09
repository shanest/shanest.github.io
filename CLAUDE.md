# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm start` — Dev server with parallel Eleventy + Sass watchers (hot reload)
- `npm run build` — Production Eleventy build to `_site/`
- `npm run build-sass` — Compile SCSS to `_site/css/`
- `npm run debug` — Eleventy with debug output

Both `build` and `build-sass` must run for a complete production build. The GitHub Actions workflow runs both.

## Architecture

This is a personal academic website built with **Eleventy 3.0** (ES modules, `"type": "module"`). Based on `eleventy-base-blog` with significant customizations.

### Content & Templates

- **Content lives in `content/`** — blog posts (`content/blog/`), trip reports (`content/trip-reports/`), photos, feeds, sitemap
- **Layouts in `_includes/layouts/`** — `base.njk` (HTML shell with Bootstrap navbar) → `home.njk` or `post.njk`
- **Directory data files** (`.11tydata.js`) set defaults per directory (tags, layout, flags)
- Posts need the `posts` tag to appear in the blog collection. Blog posts get this automatically via `content/blog/blog.11tydata.js`
- `draft: true` in frontmatter excludes posts from production builds (visible in dev server only)

### Styling

SCSS compiled separately from Eleventy (not via a plugin). The main stylesheet is `css/shanest.scss` which layers:
1. Bootstrap 5 (selective component imports, not the full framework)
2. Gruvbox color theme variables (`css/gruvbox-variables*.scss`)
3. Tufte CSS typography (`css/tufte.css`) with ET Book fonts

Posts can set `tufte: true` for Tufte-width content or `code: true` to load Prism syntax highlighting CSS.

### Custom Markdown Plugins (`md-tufte/`)

Two custom markdown-it plugins for Tufte-style notes:
- `^[text]` — numbered sidenotes 
- `+[text]` — unnumbered margin notes

### Image Handling

- Eleventy Image plugin auto-transforms images (generates avif/webp, multiple widths)
- Custom `gimage` shortcode in `eleventy.config.js` for PhotoSwipe gallery images
- Images can be co-located with content posts

### Key Config Files

- `eleventy.config.js` — Main config: plugins, shortcodes, markdown setup, image pipeline
- `_config/filters.js` — Date formatting (Luxon), tag filtering, markdown rendering filters
- `_data/metadata.js` — Site metadata (title, URL, author info)

### Deployment

Deployed to GitHub Pages via `.github/workflows/11ty.yml` on push to main. Also has a `netlify.toml` config.

### Static Assets

`public/` is copied directly to output root — contains fonts, JS (Bootstrap/PhotoSwipe), CV data and output, and teaching materials.

`public/cv` has all information for the CV, including build directions via `pandoc` in `public/cv/README.md`
