# NAWINS CODEBASE - NEW ARCHITECTURE BLUEPRINT

## Folder Structure Visualization

```
nawinsoe-main/
│
├── client/                              # Frontend (React 19 + Vite)
│   ├── public/                          # Static assets
│   │   ├── fonts/                       # Web fonts (WOFF2, TTF)
│   │   │   ├── fonts.css
│   │   │   └── [font files]
│   │   ├── manus-storage/               # Brand assets (single source)
│   │   │   ├── nawins_logo_*.png        # Multi-size PNG
│   │   │   ├── nawins_logo_*.webp       # Multi-size WebP
│   │   │   ├── nawins_logo_*.avif       # Multi-size AVIF
│   │   │   ├── nawins_education_favicon.svg
│   │   │   └── [other logos]
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── index.html
│   │
│   └── src/
│       ├── components/                  # React components (refactored)
│       │   ├── layout/                  # ✨ NEW - Page layout components
│       │   │   ├── Navigation.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── DashboardLayout.tsx
│       │   │   ├── DashboardLayoutSkeleton.tsx
│       │   │   ├── index.ts
│       │   │   └── README.md
│       │   │
│       │   ├── landing/                 # ✨ NEW - Landing page sections
│       │   │   ├── ContactFormPremium.tsx
│       │   │   ├── Destinations.tsx
│       │   │   ├── JourneyTimeline.tsx
│       │   │   ├── PartnersWall.tsx
│       │   │   ├── ServicesGrid.tsx
│       │   │   ├── TestimonialsPremium.tsx
│       │   │   ├── index.ts
│       │   │   └── README.md
│       │   │
│       │   ├── animations/              # ✨ MOVED - Animation components
│       │   │   ├── MotionWrapper.tsx
│       │   │   ├── Reveal.tsx
│       │   │   ├── index.ts
│       │   │   └── README.md
│       │   │
│       │   ├── common/                  # ✨ NEW - Non-page components
│       │   │   ├── ErrorBoundary.tsx
│       │   │   ├── Map.tsx
│       │   │   ├── AIChatBox.tsx
│       │   │   ├── Logo.tsx
│       │   │   ├── SeoManager.tsx
│       │   │   ├── ManusDialog.tsx
│       │   │   ├── index.ts
│       │   │   └── README.md
│       │   │
│       │   ├── ui/                      # UI Primitives (cleaned)
│       │   │   ├── accordion.tsx
│       │   │   ├── alert.tsx            # ✓ Keep
│       │   │   ├── badge.tsx
│       │   │   ├── [... 40 more]
│       │   │   ├── index.ts
│       │   │   └── README.md
│       │   │
│       │   ├── index.ts                 # ✨ NEW - Central exports
│       │   └── README.md                # ✨ NEW - Component architecture
│       │
│       ├── hooks/                       # ✨ CONSOLIDATED - All hooks
│       │   ├── index.ts                 # Central exports
│       │   ├── useAuth.ts               # (moved from _core/hooks)
│       │   ├── useComposition.ts
│       │   ├── useMobile.ts             # (renamed from .tsx)
│       │   ├── usePersistFn.ts
│       │   └── README.md                # ✨ NEW - Hook documentation
│       │
│       ├── contexts/                    # React Contexts
│       │   ├── index.ts                 # Central exports
│       │   ├── ThemeContext.tsx
│       │   └── README.md                # ✨ NEW
│       │
│       ├── lib/                         # Utilities & helpers
│       │   ├── index.ts                 # Central exports
│       │   ├── analytics.ts
│       │   ├── crm.ts
│       │   ├── trpc.ts
│       │   ├── utils.ts
│       │   ├── const.ts
│       │   ├── fallbackData.ts
│       │   └── README.md
│       │
│       ├── types/                       # ✨ NEW - Type definitions
│       │   ├── index.ts
│       │   ├── page.types.ts
│       │   ├── component.types.ts
│       │   └── README.md
│       │
│       ├── styles/                      # ✨ NEW - Global styles
│       │   ├── globals.css              # (from index.css)
│       │   ├── animations.css
│       │   ├── utilities.css
│       │   └── theme.css
│       │
│       ├── pages/                       # Page components (cleaned)
│       │   ├── Home.tsx                 # ✓ Keep
│       │   ├── About.tsx                # ✓ Keep
│       │   ├── Services.tsx             # ✓ Keep
│       │   ├── Destinations.tsx         # ✓ Keep
│       │   ├── Universities.tsx         # ✓ Keep
│       │   ├── SuccessStories.tsx       # ✓ Keep
│       │   ├── Blogs.tsx                # ✓ Keep
│       │   ├── Gallery.tsx              # ✓ Keep
│       │   ├── Contact.tsx              # ✓ Keep
│       │   ├── NotFound.tsx             # ✓ Keep
│       │   ├── Tasks.tsx                # ✓ Keep (internal)
│       │   ├── index.ts                 # ✨ NEW - Page exports
│       │   └── README.md                # ✨ NEW
│       │
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css                    # ⚠️ TO BE SPLIT (see styles/)
│
├── server/                              # Backend (Express + tRPC)
│   ├── _core/                           # Core server logic
│   │   ├── index.ts
│   │   ├── cookies.ts
│   │   ├── crm.ts
│   │   ├── dataApi.ts
│   │   ├── env.ts
│   │   ├── heartbeat.ts
│   │   ├── [... 10 more]
│   │   └── README.md
│   │
│   ├── routers.ts                       # tRPC route definitions
│   ├── db.ts                            # Database operations
│   ├── storage.ts                       # File storage
│   ├── auth.logout.test.ts              # ✓ Keep (active)
│   ├── inquiries.test.ts                # ✓ Keep (active)
│   └── index.ts
│
├── shared/                              # Shared types/utils
│   ├── _core/
│   │   └── errors.ts
│   ├── types.ts                         # Type definitions
│   ├── const.ts                         # Constants
│   └── index.ts
│
├── drizzle/                             # Database migrations
│   ├── migrations/                      # SQL migrations
│   ├── meta/                            # Metadata
│   └── README.md
│
├── scripts/                             # Build/utility scripts
│   ├── ttf-to-woff2.js                  # ✓ Keep
│   ├── ttf-to-woff2.cjs                 # ❌ DELETE (duplicate)
│   ├── fetch-fonts.js
│   └── README.md                        # ✨ NEW
│
├── patches/                             # Dependency patches
│   └── [patch files]
│
├── Config Files
│   ├── vite.config.ts                   # ✨ UPDATED (remove @assets)
│   ├── vitest.config.ts                 # ✨ UPDATED (remove @assets)
│   ├── tsconfig.json                    # ✨ UPDATED (remove @assets)
│   ├── tailwind.config.ts               # ✨ NEW
│   ├── .prettierrc
│   ├── .gitignore
│   ├── .eslintrc
│   └── package.json                     # ✨ UPDATED (remove 3 deps)
│
└── Documentation (Root)
    ├── CODEBASE_RESTRUCTURING_PLAN.md   # ✨ NEW (This document)
    ├── ARCHITECTURE.md                  # ✨ NEW (Detailed architecture)
    ├── README.md                        # (existing - keep)
    ├── DEPLOYMENT_GUIDE.md
    ├── PRODUCTION_CHECKLIST.md
    └── CHANGELOG.md
```

---

## Legend

- ✅ `✓ Keep` - Keep as-is, no changes
- ❌ `DELETE` - Remove completely
- ⚠️ `TO BE SPLIT` - Split into multiple files
- ✨ `NEW` - Create new file/folder
- 📝 `UPDATED` - Modify existing file

---

## COMPONENT HIERARCHY & IMPORTS

### Before (Current - Messy)

```
pages/Home.tsx
  ├── import { Destinations } from '../components/premium/Destinations'
  ├── import { useAuth } from '../_core/hooks/useAuth'
  ├── import { useComposition } from '../hooks/useComposition'
  ├── import MotionWrapper from '../components/animations/MotionWrapper'
  ├── import Reveal from '../components/animations/Reveal'
  ├── import { Button } from '../components/ui/button'
  └── [Mix of path styles and depths]
```

### After (New - Clean)

```
pages/Home.tsx
  ├── import { DestinationCards, JourneyTimeline, ... } from '@/components/landing'
  ├── import { useAuth, useComposition } from '@/hooks'
  ├── import { MotionWrapper, Reveal } from '@/components/animations'
  ├── import { Button } from '@/components/ui'
  └── [Consistent, shallow import paths]
```

---

## IMPORT PATH MIGRATION GUIDE

### Hook Imports

**BEFORE**:
```typescript
// Spread across two locations
import { useAuth } from '@/_core/hooks/useAuth';
import { useComposition } from '@/hooks/useComposition';
import { useMobile } from '@/hooks/useMobile';
```

**AFTER**:
```typescript
// All from single location
import { useAuth, useComposition, useMobile } from '@/hooks';
```

### Component Imports

**BEFORE**:
```typescript
import ContactFormPremium from '@/components/premium/ContactFormPremium';
import MotionWrapper from '@/components/animations/MotionWrapper';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
```

**AFTER**:
```typescript
import { ContactFormPremium } from '@/components/landing';
import { MotionWrapper } from '@/components/animations';
import { Navigation } from '@/components/layout';
import { Button } from '@/components/ui';
```

### Batch Update Commands

```bash
# For hooks - Find and replace across all files
find client/src -type f -name "*.tsx" -o -name "*.ts" | \
  xargs sed -i 's|from.*_core/hooks|from "@/hooks"|g'

# For components - Similarly update import paths
# (More complex due to various path styles)
```

---

## DETAILED FOLDER REORGANIZATION STEPS

### Step 1: Create New Directories

```bash
mkdir -p client/src/components/layout
mkdir -p client/src/components/landing
mkdir -p client/src/components/common
mkdir -p client/src/styles
mkdir -p client/src/types
```

### Step 2: Move Components

```bash
# Layout components
mv client/src/components/Navigation.tsx client/src/components/layout/
mv client/src/components/Footer.tsx client/src/components/layout/
mv client/src/components/DashboardLayout.tsx client/src/components/layout/
mv client/src/components/DashboardLayoutSkeleton.tsx client/src/components/layout/

# Landing/Premium components
mv client/src/components/premium/* client/src/components/landing/
rm -rf client/src/components/premium

# Common components
mv client/src/components/ErrorBoundary.tsx client/src/components/common/
mv client/src/components/Map.tsx client/src/components/common/
mv client/src/components/AIChatBox.tsx client/src/components/common/
mv client/src/components/Logo.tsx client/src/components/common/
mv client/src/components/SeoManager.tsx client/src/components/common/
mv client/src/components/ManusDialog.tsx client/src/components/common/
```

### Step 3: Consolidate Hooks

```bash
# Move _core hooks to main hooks folder
mv client/src/_core/hooks/useAuth.ts client/src/hooks/
rm -rf client/src/_core/hooks

# Rename .tsx to .ts
mv client/src/hooks/useMobile.tsx client/src/hooks/useMobile.ts
```

### Step 4: Create Index Files

**client/src/components/index.ts**:
```typescript
// Layout
export { default as Navigation } from './layout/Navigation';
export { default as Footer } from './layout/Footer';
export { DashboardLayout, DashboardLayoutSkeleton } from './layout';

// Landing
export * from './landing';

// Animations
export { default as MotionWrapper } from './animations/MotionWrapper';
export { default as Reveal } from './animations/Reveal';

// Common
export { default as ErrorBoundary } from './common/ErrorBoundary';
export { default as Map } from './common/Map';
// ... etc

// UI
export * from './ui';
```

**client/src/hooks/index.ts**:
```typescript
export { useAuth } from './useAuth';
export { useComposition } from './useComposition';
export { useMobile } from './useMobile';
export { usePersistFn } from './usePersistFn';
```

---

## FILE DELETION CHECKLIST

### ❌ Delete These Files

```
# Dead page
client/src/pages/ComponentShowcase.tsx

# Unused UI components
client/src/components/ui/alert-dialog.tsx
client/src/components/ui/button-group.tsx
client/src/components/ui/chart.tsx
client/src/components/ui/empty.tsx
client/src/components/ui/field.tsx
client/src/components/ui/form.tsx
client/src/components/ui/input-group.tsx
client/src/components/ui/item.tsx
client/src/components/ui/kbd.tsx
client/src/components/ui/navigation-menu.tsx
client/src/components/ui/spinner.tsx

# Duplicate script
scripts/ttf-to-woff2.cjs

# Duplicate assets
client/public/nawins_logo_512.png
client/public/manus-static/nawins_education_favicon.svg
```

---

## CONFIGURATION FILE UPDATES

### vite.config.ts - Changes

**Remove**:
```typescript
"@assets": path.resolve(__dirname, "./attached_assets"),
```

### tsconfig.json - Changes

**Update exclude**:
```json
{
  "exclude": [
    "node_modules", 
    "build", 
    "dist", 
    "**/*.test.ts",
    "**/*.test.tsx",
    ".next",
    "coverage"
  ]
}
```

### package.json - Changes

**Remove these lines**:
```json
"recharts": "^2.15.2",
"input-otp": "^1.4.2",
"embla-carousel-react": "^8.6.0"
```

**Run**:
```bash
pnpm remove recharts input-otp embla-carousel-react
pnpm install
```

---

## GIT MIGRATION COMMANDS

### Atomic commits (one per operation):

```bash
# 1. Remove dead code
git rm client/src/pages/ComponentShowcase.tsx
git commit -m "remove: ComponentShowcase.tsx (unused page)"

# 2. Remove unused UI components
git rm client/src/components/ui/{alert-dialog,button-group,chart,empty,field,form,input-group,item,kbd,navigation-menu,spinner}.tsx
git commit -m "remove: Unused UI components (11 files)"

# 3. Remove duplicate files
git rm scripts/ttf-to-woff2.cjs client/public/nawins_logo_512.png
git commit -m "remove: Duplicate script and asset files"

# 4. Remove unused dependencies
git rm package.json
# Edit package.json
git add package.json
git commit -m "remove: Unused dependencies (recharts, input-otp, embla)"

# 5. Update configs
git add vite.config.ts vitest.config.ts tsconfig.json
git commit -m "refactor: Remove unused @assets path alias"

# 6. Add new config
git add tailwind.config.ts
git commit -m "feat: Add tailwind.config.ts for better configuration"

# 7. Reorganize structure
git add -A
git commit -m "refactor: Reorganize components into layout/landing/common/ui directories"

# 8. Consolidate hooks
git add client/src/hooks/ client/src/contexts/
git commit -m "refactor: Consolidate hooks into single directory with exports"

# 9. Create new index files
git add client/src/components/index.ts client/src/hooks/index.ts
git commit -m "feat: Add central export files for components and hooks"

# 10. Final adjustments
git add -A
git commit -m "refactor: Update import paths and finalize structure"
```

---

## VERIFICATION CHECKLIST

After each step, verify:

### Build
```bash
pnpm build
# ✓ Should complete without errors
# ✓ Bundle size should be ~20-30% smaller
```

### Types
```bash
pnpm typecheck
# ✓ Should report 0 errors
```

### Tests
```bash
pnpm test
# ✓ All tests should pass
```

### Imports
```bash
grep -r "from.*_core/hooks" client/src/
# ✓ Should return no results (all migrated)

grep -r "ComponentShowcase" client/src/
# ✓ Should return no results
```

### Lighthouse
```bash
pnpm build
# Then audit in Chrome DevTools
# ✓ Performance: 95+
# ✓ Accessibility: 100
# ✓ Best Practices: 100
# ✓ SEO: 100
```

---

## MAINTENANCE GUIDELINES (Post-Refactor)

### For New Components:

1. **Always** place in appropriate directory (layout/landing/common/ui)
2. **Always** export from directory index.ts
3. **Always** use consistent naming: PascalCase for components
4. **Always** document in README.md if complex

### For New Hooks:

1. Place in `client/src/hooks/`
2. Export from `hooks/index.ts`
3. Name with `use` prefix (camelCase)
4. Document purpose and usage

### For New Utilities:

1. Place in `client/src/lib/`
2. Export from `lib/index.ts` if widely used
3. Keep focused and single-responsibility

### For Imports:

1. ✅ Use path aliases: `@/` for client, `@shared/` for shared
2. ✅ Use centralized exports: `from '@/components'`
3. ❌ Never use relative imports: `../../` or `../`
4. ❌ Never use default exports in re-export files

---

## SUPPORT & TROUBLESHOOTING

### If tests fail:
```bash
# Clear cache
rm -rf node_modules/.vite
pnpm install
pnpm test
```

### If types fail:
```bash
# Rebuild types
pnpm typecheck
# Check for missing exports in index files
```

### If build fails:
```bash
# Check for remaining invalid imports
grep -r "from.*\.\./" client/src/ | head -20

# Update imports to use aliases
# Example: from '../components/button' → from '@/components'
```

---

**Document Status**: Implementation Ready  
**Last Updated**: 2026-06-02  
**Complexity**: Medium (7-10 day sprint for experienced team)  
**Risk Level**: Low (non-functional refactoring)

