# Nawins Education

Premium international education consultancy website built with React, Vite, Tailwind CSS, tRPC, and Node.js.

## Brand

- Company: Nawins Education
- Tagline: Empowering Minds. Building Futures.
- Positioning: premium international education consultancy and university recruitment partner
- Visual identity: deep navy, gold, steel blue, and clean white surfaces

## What’s Included

- Luxury landing page with premium hero, destinations, services, testimonials, and consultation form
- Brand-aligned typography using Montserrat for headings and Open Sans for body text
- Self-hosted fonts and optimized image assets
- Framer Motion page transitions and scroll reveals
- SEO helpers with canonical tags, Open Graph data, Twitter cards, schema markup, robots.txt, and sitemap.xml
- Responsive layouts with shadcn/ui components

## Project Structure

- `client/` - Vite React frontend
- `client/src/pages/` - route-level pages
- `client/src/components/` - shared UI and premium sections
- `client/public/` - static assets, fonts, robots.txt, and sitemap.xml
- `server/` - Node/tRPC backend and internal helpers
- `drizzle/` - database schema and migrations
- `scripts/` - asset generation and font tooling

## Local Development

```bash
pnpm install
pnpm run dev
```

## Production Build

```bash
pnpm run build
NODE_ENV=production node dist/index.js
```

## Asset Generation

```bash
pnpm run generate:assets
pnpm run generate:avif
pnpm run generate:woff2
```

## SEO and Deployment Notes

- Update production domain values in `client/index.html` and `client/src/components/SeoManager.tsx` before final launch.
- Keep `client/public/sitemap.xml` and `client/public/robots.txt` in sync with the deployed domain.
- Prefer optimized AVIF/WebP images and preloaded WOFF2 fonts.

## Status

This repository is prepared for production-grade refinement and further performance tuning.
