# Repository Audit Report - NAWINS Edutech

## Core Architecture
- **Frontend**: React 19 / Vite / Tailwind CSS 4 / Wouter.
- **Backend**: Node.js / Express / tRPC.
- **Database**: MySQL / Drizzle ORM.

## Findings
- **Dead Code**: `ComponentShowcase.tsx` is not wired to any route and contains unused UI components.
- **Duplicates**: Logo and favicon assets are duplicated across `manus-storage` and `manus-static`.
- **Consistency**: Branding references are inconsistent across legal pages and SEO metadata.
- **Structure**: Flat component and page directories hinder scalability.

## Dependency Graph Summary
- **Core**: react, framer-motion, lucide-react, trpc, drizzle-orm.
- **Unused**: recharts (only in dead chart component), input-otp (only in dead OTP component).

## Runtime Usage
- **Client**: Single Page Application (SPA) with route-based code splitting.
- **Server**: Type-safe API layer via tRPC.

## Dead Code Risk
- `client/src/pages/ComponentShowcase.tsx`: **High Risk** (Unreachable).
- `scripts/ttf-to-woff2.cjs`: **High Risk** (Duplicate of .js script).