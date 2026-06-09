# REPOSITORY AUDIT

## Executive Summary

Comprehensive audit of NAWINS-Website repository revealed significant technical debt including duplicate files, inconsistent structure, and obsolete code. The repository contains 100+ source files with multiple redundancies that impact maintainability and build performance.

## Duplicate Files Identified

### Critical Duplicates
| Location 1 | Location 2 | Notes |
|------------|------------|-------|
| server/db.ts | server/repositories/database.repository.ts | **IDENTICAL FILES** - Same content, same exports |
| client/src/components/Logo.tsx | client/src/components/ui/Logo.tsx | Duplicate SVG logo component |
| Navigation.tsx (root) | client/src/components/navigation/Navigation.tsx | Duplicate navigation component |
| Footer.tsx (root) | client/src/components/layout/Footer.tsx | Duplicate footer component |
| SeoManager.tsx (root) | client/src/components/SeoManager.tsx | Duplicate SEO component |
| CTASection.tsx (root) | client/src/components/CTASection.tsx | Duplicate CTA component |
| AboutPage.tsx (root) | client/src/pages/About.tsx | Duplicate About page |
| Home.tsx (root) | client/src/pages/Home.tsx | Duplicate Home page |

### Archive Duplicates
| Archive Location | Current Location | Status |
|------------------|------------------|--------|
| archive/legacy/DashboardLayout.tsx | client/src/components/DashboardLayout.tsx | Duplicate (legacy version) |
| archive/legacy/DashboardLayoutSkeleton.tsx | client/src/components/DashboardLayoutSkeleton.tsx | Duplicate |
| archive/legacy/Map.tsx | client/src/components/Map.tsx | Duplicate |
| archive/legacy/ManusDialog.tsx | client/src/components/ManusDialog.tsx | Duplicate |
| archive/deprecated/AIChatBox.tsx | client/src/components/AIChatBox.tsx | Deprecated duplicate |
| archive/deprecated/ComponentShowcase.tsx | client/src/pages/ComponentShowcase.tsx | Deprecated duplicate |
| archive/legacy/ErrorBoundary.tsx | client/src/components/ErrorBoundary.tsx | Duplicate |

### Page File Duplicates
The repository has TWO sets of page files:
1. **Old location** (root): Home.tsx, About.tsx, Services.tsx, Contact.tsx, Blogs.tsx, etc.
2. **New location** (client/src/pages/*): HomePage.tsx, AboutPage.tsx, ServicesPage.tsx, ContactPage.tsx, BlogPage.tsx, etc.

App.tsx uses the **new location** files, making the root level files obsolete.

## Dead Code Analysis

### Unused Imports
| File | Unused Import | Impact |
|------|---------------|--------|
| client/src/pages/services/ServicesPage.tsx | MessageSquare icon | Minor |
| client/src/pages/home/HomePage.tsx | Globe icon | Minor |
| client/src/pages/about/AboutPage.tsx | Zap icon | Minor |

### Obsolete Code Patterns
1. **Client pages using emoji instead of images**: GalleryPage.tsx, SuccessStoriesPage.tsx, BlogsPage.tsx
2. **Hardcoded statistics**: Inconsistent values (500+ vs 1200+, 10+ vs 750+)
3. **Missing error boundaries**: Most pages lack proper error handling
4. **Console logs in production**: Multiple console.warn/error statements in db.ts

## Unused Dependencies

| Dependency | Used In | Verdict |
|------------|---------|---------|
| @aws-sdk/client-s3 | scripts, storage.service.ts | Used |
| puppeteer | scripts | Used (build process) |
| sharp | scripts | Used (build process) |
| png-to-ico | scripts | Used (build process) |
| ttf2woff2 | scripts | Used (build process) |
| react-resizable-panels | Not found in imports | **UNUSED** |
| streamdown | Not found in imports | **UNUSED** |
| vaul | Not found in imports | **UNUSED** |
| next-themes | ThemeProvider in App.tsx | Used |
| jose | _core/oauth.ts | Used |

## File Structure Issues

### Inconsistent Paths
| Pattern | Examples | Issue |
|---------|----------|-------|
| Mixed locations | /client/src/components/Logo.tsx AND /client/Logo.tsx | Confusion |
| Duplicate folders | /client/src/components/ui/ AND root level components | Redundancy |
| Archive folder | /archive/legacy/ AND /archive/deprecated/ | Needs cleanup |

### Missing Standard Structure
- No /docs folder
- No /public folder for static assets
- No /types folder (types scattered)
- No /services folder structure
- No /features folder

## API Analysis

### tRPC Endpoints (server/routes/app.router.ts)
| Router | Procedures | Status |
|--------|------------|--------|
| auth | me, logout | ✅ Complete |
| universities | list, getById | ✅ Complete |
| courses | list | ✅ Complete |
| inquiries | create | ✅ Complete |
| newsletter | subscribe | ✅ Complete |
| testimonials | list | ✅ Complete |
| tasks | list, create, complete, updateStatus | ✅ Complete |

### Duplicate Database Files
The `server/db.ts` and `server/repositories/database.repository.ts` are identical and both export the same functions.

## Configuration Files

| File | Status |
|------|--------|
| vite.config.ts | ✅ Complete |
| vitest.config.ts | ✅ Complete |
| tsconfig.json | ✅ Complete |
| drizzle.config.ts | ✅ Complete |
| .env.example | ✅ Complete |
| .gitignore | ✅ Complete |
| .prettierrc | ✅ Complete |
| components.json | ✅ Complete |

## Build Process Analysis

### Scripts (package.json)
```
scripts/
├── ttf-to-woff2.cjs
├── ttf-to-woff2.js
├── fetch-fonts.js
├── generate-assets.js
├── generate-assets-puppeteer.js
├── convert-assets.js
└── convert-assets-puppeteer.js
```

### Dependencies (Key Issues)
- **react-resizable-panels**: Not imported anywhere
- **streamdown**: Not imported anywhere  
- **vaul**: Not imported anywhere

## Summary Statistics

| Category | Count |
|----------|-------|
| Total TypeScript files | ~80 |
| Total TSX files | ~100 |
| Duplicate file pairs | 12 |
| Unused dependencies | 3 |
| Archive files | 6 |
| Obsolete page files | 7 |
| Console logs (production) | 20+ |

## Risk Assessment

| Risk Level | Items | Impact |
|------------|-------|--------|
| High | Duplicate database files, duplicate page files | Confusion, larger bundles |
| Medium | Unused dependencies, archive files | Larger node_modules, maintenance burden |
| Low | Unused imports, console logs | Minor performance impact |