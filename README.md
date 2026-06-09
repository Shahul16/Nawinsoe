# README

## NAWINS Edutech - Study Abroad Website

Enterprise-grade education consultancy platform for Indian students seeking international education opportunities in the UK, Canada, Australia, Ireland, and Europe.

## Architecture

### Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, TailwindCSS 4, Vite 7 |
| Backend | Express, tRPC, MySQL (Drizzle ORM) |
| State | TanStack Query, Wouter (Routing) |
| UI | Radix UI, Framer Motion, Lucide Icons |

### Folder Structure
```
src/
├── app/                    # App providers
├── pages/                  # Route components
│   ├── home/
│   ├── about/
│   ├── services/
│   ├── destinations/
│   ├── universities/
│   ├── success-stories/
│   ├── blog/
│   ├── gallery/
│   ├── contact/
│   ├── faq/
│   ├── legal/
│   └── tasks/
├── components/
│   ├── ui/                 # Design system
│   ├── navigation/         # Navigation component
│   ├── layout/             # Footer, ErrorBoundary, SeoManager
│   ├── premium/            # Feature components
│   └── animations/         # Motion components
├── lib/                    # Utilities
└── hooks/                  # Custom hooks

server/
├── _core/                  # Core utilities
├── routes/                 # API routes
└── db.ts                   # Database layer

docs/
reports/
scripts/
```

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm run dev
```

## Build

```bash
pnpm run build
```

## Testing

```bash
pnpm run test
pnpm run check
```

## Environment Variables

See `.env.example` for required configuration.

## Key Features

- Responsive design with mobile-first approach
- tRPC API with type-safe endpoints
- University database with search functionality
- Lead capture forms with validation
- Multi-destination study guides
- SEO-optimized pages
- Analytics integration (GA4, GTM, Meta Pixel)
- CRM integration (HubSpot)

## Routes

| Route | Page |
|-------|------|
| / | Home |
| /about | About Us |
| /services | Our Services |
| /destinations | Study Destinations |
| /universities | University Database |
| /success-stories | Student Testimonials |
| /blogs | Blog & Resources |
| /gallery | Community Photos |
| /contact | Contact Form |
| /faq | Frequently Asked Questions |
| /tasks | Task Management |

## Deployment

1. Set environment variables
2. Build: `pnpm run build`
3. Start: `pnpm run start`

## Integrations

See `/docs/INTEGRATIONS.md` for setup instructions.