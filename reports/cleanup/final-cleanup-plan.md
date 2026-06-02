# NAWINS Education - Final Cleanup Plan

**Audit Date:** February 6, 2026  
**Auditor:** Cline (Read-Only Analysis)  
**Action Plan:** Based on complete dependency analysis

---

## KEEP - No Action Required

These files are actively used in production with verified dependencies:

| File | Route | Evidence |
|------|-------|----------|
| `client/src/App.tsx` | N/A | Main entry, defines all routes |
| `client/src/pages/Home.tsx` | `/` | Imported App.tsx line 8 |
| `client/src/pages/About.tsx` | `/about` | Imported App.tsx line 9 |
| `client/src/pages/Services.tsx` | `/services` | Imported App.tsx line 10 |
| `client/src/pages/Contact.tsx` | `/contact` | Imported App.tsx line 12 |
| `client/src/pages/Blogs.tsx` | `/blogs` | Imported App.tsx line 11 |
| `client/src/pages/Destinations.tsx` | `/destinations` | Dynamic import App.tsx line 18 |
| `client/src/pages/Universities.tsx` | `/universities` | Dynamic import App.tsx line 16 |
| `client/src/pages/SuccessStories.tsx` | `/success-stories` | Dynamic import App.tsx line 19 |
| `client/src/pages/Gallery.tsx` | `/gallery` | Dynamic import App.tsx line 17 |
| `client/src/pages/Tasks.tsx` | `/tasks` | Imported App.tsx line 13 |
| `client/src/pages/NotFound.tsx` | `/404`, `*` | Imported App.tsx lines 3, 35, 37 |
| `client/src/components/Navigation.tsx` | N/A | Used in all pages |
| `client/src/components/Footer.tsx` | N/A | Used in all pages |
| `client/src/components/SeoManager.tsx` | N/A | Used App.tsx line 49 |
| `client/src/components/premium/*.tsx` | N/A | Used Home.tsx lines 196-201 |
| `client/src/components/animations/*.tsx` | N/A | Used in multiple pages |
| `server/routers.ts` | N/A | Main API router |
| `server/db.ts` | N/A | Database operations |
| `drizzle/schema.ts` | N/A | Database schema |

---

## REFACTOR - Action Required

### 1. client/src/pages/ComponentShowcase.tsx

**Current State:** 1440 lines, 60+ component imports

**Issues:**
- Not in any route (App.tsx lines 21-40)
- Not in Navigation (Navigation.tsx lines 11-21)
- Not in Footer (Footer.tsx lines 9-28)
- Not in sitemap.xml
- Development/demo page only

**Action Options:**

**Option A - Move to Dev-Only:**
```
// Move file to:
client/src/__dev__/ComponentShowcase.tsx

// Update vite.config.ts to exclude __dev__ folder from production build
```

**Option B - Remove Completely:**
```
// Delete file if not needed for production
// Remove from any imports
```

**Recommendation:** Option A - Keep for development reference but exclude from production build

---

### 2. client/src/components/AIChatBox.tsx

**Current State:** Demo chatbot with simulated responses

**Issues:**
- Only used in ComponentShowcase.tsx line 174
- No real AI integration
- Simulated responses (lines 212-226)

**Action Options:**

**Option A - Integrate Real AI:**
```typescript
// Add real AI backend integration
// Create tRPC route: ai.chat
// Connect to OpenAI or similar service
```

**Option B - Archive Component:**
```
// Move to client/src/__archive__/AIChatBox.tsx
// Remove from ComponentShowcase imports
```

**Recommendation:** Option B - Archive until AI integration is planned

---

### 3. client/src/components/Map.tsx

**Current State:** Google Maps component

**Issues:**
- Not imported in any page
- Not in any route
- Only dependency: `@types/google.maps`

**Action Options:**

**Option A - Implement Usage:**
```typescript
// Add to Destinations.tsx or Contact.tsx
// Show office location on Contact page
// Show university locations on Universities page
```

**Option B - Archive Component:**
```
// Move to client/src/__archive__/Map.tsx
// Remove @types/google.maps if not needed elsewhere
```

**Recommendation:** Option A - Implement on Contact page for office location

---

### 4. client/src/pages/Blogs.tsx (Subscribe Form)

**Current State:** Subscribe form without backend (lines 325-334)

**Issues:**
- Form exists but no onSubmit handler
- No tRPC mutation for subscriptions
- No email marketing integration

**Action Required:**

**Option A - Add Backend Integration:**
```typescript
// Add to server/routers.ts:
newsletter: router({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      // Add to database or email service
    }),
})

// Update Blogs.tsx form to use mutation
```

**Option B - Remove Form:**
```typescript
// Remove lines 317-337 from Blogs.tsx
// Remove subscribe section
```

**Recommendation:** Option A - Add newsletter subscription functionality

---

### 5. client/src/components/premium/PartnersWall.tsx

**Current State:** Placeholder content (line 3)

**Issues:**
```typescript
const logos = new Array(12).fill(0).map((_,i)=>`partner-${i}`);
```
- No real university logos
- Placeholder divs only (lines 14-18)

**Action Required:**

**Option A - Add Real Logos:**
```typescript
// Replace placeholder with actual university logos
// Store logos in public/partners/
// Create database table for partner universities
```

**Option B - Remove Component:**
```typescript
// Remove from Home.tsx line 198
// Remove PartnersWall.tsx file
```

**Recommendation:** Option A - Add real university partner logos

---

### 6. client/src/components/Footer.tsx

**Current State:** Multiple links pointing to `#`

**Issues:**
- Line 21: Testimonials `href: "#"`
- Line 24: Privacy Policy `href: "#"`
- Line 25: Terms of Service `href: "#"`
- Line 26: Cookie Policy `href: "#"`
- Lines 30-35: All social links `href: "#"`

**Action Required:**

**Create Missing Pages:**
1. Privacy Policy page (`/privacy`)
2. Terms of Service page (`/terms`)
3. Cookie Policy page (`/cookies`)
4. Testimonials page (or link to `/success-stories`)

**Add Social Links:**
- Update Footer.tsx lines 30-35 with real social media URLs

**Recommendation:** Create all missing legal pages and update social links

---

## ARCHIVE - Move to Archive Folder

These files should be moved to `__archive__` folder for reference:

| File | Reason | Action |
|------|--------|--------|
| `client/src/pages/ComponentShowcase.tsx` | Dev-only page | Move to `client/src/__archive__/` |
| `client/src/components/AIChatBox.tsx` | Demo only | Move to `client/src/__archive__/` |
| `scripts/convert-assets-puppeteer.js` | Alternative script | Move to `scripts/__archive__/` |
| `scripts/generate-assets-puppeteer.js` | Alternative script | Move to `scripts/__archive__/` |
| `references/periodic-updates.md` | Documentation | Keep in references/ |

---

## REMOVE - No Files Qualify

After complete dependency analysis, **NO files meet all criteria for removal**:

| File Investigated | Imports | Routes | Dynamic | Build | Packages | Verdict |
|-------------------|---------|--------|---------|-------|----------|---------|
| ComponentShowcase.tsx | ❌ | ❌ | ❌ | ❌ | ⚠️ | ARCHIVE |
| AIChatBox.tsx | ⚠️ | ❌ | ❌ | ❌ | ⚠️ | REFACTOR |
| Map.tsx | ❌ | ❌ | ❌ | ❌ | ⚠️ | REFACTOR |
| ManusDialog.tsx | ⚠️ | ❌ | ❌ | ❌ | ⚠️ | REFACTOR |

**All files have at least one dependency or reference.**

---

## Implementation Priority

### Phase 1 - Critical (Week 1)

1. **Create Legal Pages**
   - Privacy Policy (`/privacy`)
   - Terms of Service (`/terms`)
   - Cookie Policy (`/cookies`)
   - Update Footer.tsx links

2. **Add Social Media Links**
   - Update Footer.tsx lines 30-35
   - Add real Facebook, Twitter, LinkedIn, Instagram URLs

### Phase 2 - Important (Week 2)

3. **Archive Dev-Only Files**
   - Move ComponentShowcase.tsx to `__archive__`
   - Move AIChatBox.tsx to `__archive__`
   - Update vite.config.ts to exclude archive folder

4. **Implement Map Component**
   - Add Google Maps to Contact.tsx
   - Show office location

### Phase 3 - Enhancement (Week 3-4)

5. **Add Newsletter Subscription**
   - Create backend for newsletter
   - Update Blogs.tsx subscribe form
   - Integrate with email service

6. **Add University Partner Logos**
   - Replace PartnersWall.tsx placeholders
   - Add real university logos
   - Create partner database table

---

## File Structure After Cleanup

```
client/src/
├── __archive__/           # NEW - Archived components
│   ├── ComponentShowcase.tsx
│   ├── AIChatBox.tsx
│   └── Map.tsx (if not implemented)
├── pages/
│   ├── Home.tsx           # KEEP
│   ├── About.tsx          # KEEP
│   ├── Services.tsx       # KEEP
│   ├── Contact.tsx        # KEEP + REFACTOR (add map)
│   ├── Blogs.tsx          # KEEP + REFACTOR (add newsletter)
│   ├── Destinations.tsx   # KEEP
│   ├── Universities.tsx   # KEEP
│   ├── SuccessStories.tsx # KEEP
│   ├── Gallery.tsx        # KEEP
│   ├── Tasks.tsx          # KEEP
│   ├── NotFound.tsx       # KEEP
│   ├── Privacy.tsx        # NEW
│   ├── Terms.tsx          # NEW
│   └── Cookies.tsx        # NEW
├── components/
│   ├── premium/
│   │   ├── PartnersWall.tsx  # REFACTOR (add real logos)
│   │   └── ...
│   └── ...
└── ...
```

---

## Summary

| Category | Count | Action |
|----------|-------|--------|
| KEEP | 20 | No action required |
| REFACTOR | 6 | Implement improvements |
| ARCHIVE | 5 | Move to archive folder |
| REMOVE | 0 | No files qualify |

**Total Files Affected:** 11 files
**Estimated Effort:** 20-40 hours
**Priority:** Legal pages first (compliance risk)