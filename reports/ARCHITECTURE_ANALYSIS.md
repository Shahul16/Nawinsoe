# ARCHITECTURE ANALYSIS

## Current Architecture Overview

### Tech Stack
| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | React | 19.2.1 |
| Language | TypeScript | 5.9.3 |
| Styling | TailwindCSS | 4.x |
| Routing | Wouter | 3.3.5 |
| Backend | Express | 4.21.2 |
| ORM | Drizzle | 0.44.5 |
| Database | MySQL | 3.x |
| State | TanStack Query | 5.x |
| API | tRPC | 11.x |
| Build | Vite | 7.x |
| Bundling | esbuild | 0.25.0 |

## Frontend Architecture Issues

### Component Organization Problems
```
CURRENT STRUCTURE:
components/
├── ui/                    # Radix UI wrappers
├── premium/             # Premium components
├── animations/          # Motion components
├── layout/              # ErrorBoundary, Footer
├── Navigation.tsx       # Root level - inconsistent
├── Footer.tsx           # Root level - inconsistent
├── CTASection.tsx       # Root level - inconsistent
└── ...

PROBLEM: Mixed organization - no clear feature boundaries
```

### Import Path Inconsistencies
| Pattern | Example | Issue |
|---------|---------|-------|
| `@/components/Navigation` | From root Navigation.tsx | Conflicting with navigation/ folder |
| `@/components/Footer` | From root Footer.tsx | Conflicting with layout/Footer.tsx |
| `@/components/Logo` | From components/Logo.tsx | Conflicting with ui/Logo.tsx |

### Route Organization
```
CURRENT ROUTES (App.tsx):
├── / (Home - uses client/src/pages/home/HomePage.tsx)
├── /about (uses client/src/pages/about/AboutPage.tsx)
├── /services (uses client/src/pages/services/ServicesPage.tsx)
├── /destinations (lazy loaded)
├── /success-stories (lazy loaded)
├── /universities (lazy loaded)
├── /blogs (uses client/src/pages/blogs/BlogPage.tsx)
├── /gallery (lazy loaded)
├── /contact (uses client/src/pages/contact/ContactPage.tsx)
├── /tasks (lazy loaded)
├── /privacy, /terms, /cookies (lazy loaded)
└── /faq (lazy loaded)
```

**Issue**: Root-level page files (Home.tsx, About.tsx, etc.) are NOT used.

## Backend Architecture Analysis

### File Structure Issues
```
CURRENT:
server/
├── _core/               # Core utilities
├── routes/
│   └── app.router.ts    # Main router
├── db.ts                # Database functions
├── repositories/
│   └── database.repository.ts  # DUPLICATE of db.ts
├── storage.ts           # Storage functions
└── services/
    └── storage.service.ts       # S3 storage
```

**Issue**: `server/db.ts` and `server/repositories/database.repository.ts` are identical.

### API Endpoint Organization
All endpoints in single `app.router.ts` - should be split by feature.

## Database Schema Analysis

### Tables (drizzle/schema.ts)
| Table | Purpose | Status |
|-------|---------|--------|
| users | Authentication | ✅ Complete |
| universities | University listings | ✅ Complete |
| courses | Course catalog | ✅ Complete |
| inquiries | Contact form submissions | ✅ Complete |
| testimonials | Student testimonials | ✅ Complete |
| tasks | Internal task management | ✅ Complete |
| newsletter_subscribers | Email subscriptions | ✅ Complete |

**Issues**:
- No proper relations between universities and courses
- Missing university logo URLs (imageUrl column exists but unused)
- No lead scoring table
- No document upload tracking

## Recommended Enterprise Architecture

### Target Structure
```
src/
├── app/                    # App-level providers and config
│   └── providers.tsx
├── pages/                  # Route-level components
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
├── layouts/                # Shared layouts
│   ├── RootLayout.tsx
│   └── PageLayout.tsx
├── components/             # Reusable UI components
│   ├── ui/                 # Design system (buttons, cards, forms)
│   ├── forms/              # Form components
│   ├── cards/              # Card variants
│   ├── sections/           # Page sections
│   └── shared/             # Cross-feature components
├── features/               # Feature modules
│   ├── destinations/
│   ├── universities/
│   ├── blog/
│   ├── crm/
│   ├── consultation/
│   └── careers/
├── services/               # API service layer
│   ├── api.ts
│   └── trpc.ts
├── hooks/                  # Custom React hooks
├── store/                  # State management
├── utils/                  # Utility functions
├── lib/                    # Third-party integrations
├── assets/                 # Static assets
│   ├── images/
│   ├── logos/
│   └── icons/
├── styles/                 # Global styles
└── constants/              # App constants

server/
├── api/                    # API routes by feature
│   ├── universities.ts
│   ├── inquiries.ts
│   ├── testimonials.ts
│   ├── tasks.ts
│   └── newsletter.ts
├── db/                     # Database layer
│   ├── connection.ts
│   ├── queries/
│   └── migrations/
├── services/               # Business logic
├── middleware/             # Express middleware
├── utils/                  # Server utilities
└── config/                 # Configuration

docs/
reports/
scripts/
.github/
public/
```

## Performance Analysis

### Bundle Size Concerns
- **All UI components imported**: Many Radix UI components may be unused
- **No tree-shaking optimization**: All components bundled
- **Emoji assets**: Should be replaced with optimized images
- **Duplicate code**: Increases bundle size by estimated 15-20%

### Lazy Loading
Some pages use React.lazy but root-level components are not optimized:
- ErrorBoundary
- SeoManager
- Navigation
- Footer

## Security Analysis

### Current Security Measures
- ✅ Zod validation on all API inputs
- ✅ Cookie-based session management
- ✅ Environment variables for secrets
- ✅ OAuth integration in _core/oauth.ts

### Missing Security Features
- ❌ Rate limiting
- ❌ CSRF protection
- ❌ Input sanitization for content
- ❌ Content Security Policy headers
- ❌ Security headers middleware

## Code Quality Metrics

| Metric | Current | Target |
|--------|---------|--------|
| TypeScript errors | Unknown | 0 |
| ESLint warnings | Unknown | 0 |
| Console logs in prod | 20+ | 0 |
| Duplicate files | 12 pairs | 0 |
| Unused dependencies | 3 | 0 |
| Test coverage | Unknown | >80% |

## Architecture Debt

### High Priority Debt
1. **Duplicate database layer** - Remove server/repositories/database.repository.ts
2. **Root-level page files** - Delete obsolete Home.tsx, About.tsx, etc.
3. **Duplicate components** - Consolidate Logo.tsx and Footer.tsx

### Medium Priority Debt
1. **API organization** - Split app.router.ts by feature
2. **Component folder structure** - Reorganize into ui/forms/cards/sections
3. **Unused dependencies** - Remove react-resizable-panels, streamdown, vaul

### Low Priority Debt
1. **Console log cleanup** - Remove debug logs
2. **Hardcoded values** - Extract to constants
3. **Archive cleanup** - Remove or document archive files