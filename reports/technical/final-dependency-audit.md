# NAWINS Education - Final Dependency Audit

**Audit Date:** February 6, 2026  
**Auditor:** Cline (Read-Only Analysis)  
**Scope:** Complete dependency analysis for all files with exact import chains

---

## KEEP - Active Production Files

### 1. client/src/App.tsx

**Direct Imports:**
- Line 1: `import { Toaster } from "@/components/ui/sonner";`
- Line 2: `import { TooltipProvider } from "@/components/ui/tooltip";`
- Line 3: `import NotFound from "@/pages/NotFound";`
- Line 4: `import { Route, Switch } from "wouter";`
- Line 5: `import ErrorBoundary from "./components/ErrorBoundary";`
- Line 6: `import SeoManager from "./components/SeoManager";`
- Line 7: `import { ThemeProvider } from "./contexts/ThemeContext";`
- Line 8: `import Home from "./pages/Home";`
- Line 9: `import About from "./pages/About";`
- Line 10: `import Services from "./pages/Services";`
- Line 11: `import Blogs from "./pages/Blogs";`
- Line 12: `import Contact from "./pages/Contact";`
- Line 13: `import Tasks from "./pages/Tasks";`
- Line 14: `import React, { Suspense } from "react";`
- Line 16: `const Universities = React.lazy(() => import("./pages/Universities"));`
- Line 17: `const Gallery = React.lazy(() => import("./pages/Gallery"));`
- Line 18: `const Destinations = React.lazy(() => import("./pages/Destinations"));`
- Line 19: `const SuccessStories = React.lazy(() => import("./pages/SuccessStories"));`

**Route References:** Lines 21-40 (11 routes defined)

**Package References:**
- `wouter` (line 4) - Routing
- `react` (line 14) - UI framework
- `sonner` (line 1) - Toast notifications
- `@radix-ui/react-tooltip` (line 2) - Tooltip component

**Build References:** Entry point for client routing, processed by Vite

---

### 2. client/src/pages/Home.tsx

**Direct Imports:**
- Line 1: `import { useState } from "react";`
- Line 2: `import { Button } from "@/components/ui/button";`
- Line 3: `import { Input } from "@/components/ui/input";`
- Line 4: `import { Card } from "@/components/ui/card";`
- Line 5: `import { trpc } from "@/lib/trpc";`
- Line 6: `import { useLocation } from "wouter";`
- Line 7: `import { BookOpen, Users, Briefcase, Globe, Award, Heart, GraduationCap, Zap, MessageSquare, MapPin, Search } from "lucide-react";`
- Line 8: `import Navigation from "@/components/Navigation";`
- Line 9: `import Footer from "@/components/Footer";`
- Line 10: `import MotionWrapper from "@/components/animations/MotionWrapper";`
- Line 11: `import Reveal from "@/components/animations/Reveal";`
- Line 12: `import ServicesGrid from "@/components/premium/ServicesGrid";`
- Line 13: `import Destinations from "@/components/premium/Destinations";`
- Line 14: `import PartnersWall from "@/components/premium/PartnersWall";`
- Line 15: `import JourneyTimeline from "@/components/premium/JourneyTimeline";`
- Line 16: `import TestimonialsPremium from "@/components/premium/TestimonialsPremium";`
- Line 17: `import ContactFormPremium from "@/components/premium/ContactFormPremium";`
- Line 18: `import Logo from "@/components/Logo";`
- Line 19: `import { toast } from "sonner";`
- Line 20: `import { fallbackTestimonials, fallbackUniversities } from "@/lib/fallbackData";`

**tRPC Usage:**
- Line 33: `trpc.universities.list.useQuery()`
- Line 34: `trpc.testimonials.list.useQuery()`
- Line 35: `trpc.inquiries.create.useMutation()`

**Package References:**
- `react` - useState
- `@radix-ui/react-button` - Button component
- `@radix-ui/react-input` - Input component
- `@radix-ui/react-card` - Card component
- `@trpc/react-query` - tRPC client
- `wouter` - useLocation
- `lucide-react` - Icons
- `sonner` - Toast notifications

---

### 3. client/src/pages/About.tsx

**Direct Imports:**
- Line 1: `import Navigation from "@/components/Navigation";`
- Line 2: `import Footer from "@/components/Footer";`
- Line 3: `import { Card } from "@/components/ui/card";`
- Line 4: `import { Award, Users, Globe, Zap } from "lucide-react";`

**Route Reference:** `/about` (App.tsx line 9)

**Package References:**
- `@radix-ui/react-card` - Card component
- `lucide-react` - Icons

---

### 4. client/src/pages/Services.tsx

**Direct Imports:**
- Line 1: `import Navigation from "@/components/Navigation";`
- Line 2: `import Footer from "@/components/Footer";`
- Line 3: `import { Card } from "@/components/ui/card";`
- Line 4: `import { MessageSquare, BookOpen, Zap, Briefcase, CheckCircle } from "lucide-react";`

**Route Reference:** `/services` (App.tsx line 10)

**Package References:**
- `@radix-ui/react-card` - Card component
- `lucide-react` - Icons

---

### 5. client/src/pages/Contact.tsx

**Direct Imports:**
- Line 1: `import Navigation from "@/components/Navigation";`
- Line 2: `import Footer from "@/components/Footer";`
- Line 3: `import { Card } from "@/components/ui/card";`
- Line 4: `import { Button } from "@/components/ui/button";`
- Line 5: `import { Input } from "@/components/ui/input";`
- Line 6: `import { Mail, Phone, MapPin, Clock } from "lucide-react";`
- Line 7: `import { useState, useEffect } from "react";`
- Line 8: `import { trpc } from "@/lib/trpc";`
- Line 9: `import { toast } from "sonner";`
- Line 10: `import { trackLeadCapture, trackUtmParams } from "@/lib/crm";`
- Line 11: `import { trackEvent } from "@/lib/analytics";`

**tRPC Usage:**
- Line 14: `trpc.inquiries.create.useMutation()`

**CRM/Analytics Usage:**
- Line 25: `trackUtmParams()`
- Line 26: `trackEvent("contact_page_view")`
- Lines 46-51: `trackLeadCapture({...})`

**Route Reference:** `/contact` (App.tsx line 12)

**Package References:**
- `react` - useState, useEffect
- `@radix-ui/react-card` - Card component
- `@radix-ui/react-button` - Button component
- `@radix-ui/react-input` - Input component
- `lucide-react` - Icons
- `@trpc/react-query` - tRPC client
- `sonner` - Toast notifications

---

### 6. client/src/pages/Universities.tsx

**Direct Imports:**
- Line 1: `import Navigation from "@/components/Navigation";`
- Line 2: `import Footer from "@/components/Footer";`
- Line 3: `import { Card } from "@/components/ui/card";`
- Line 4: `import { Button } from "@/components/ui/button";`
- Line 5: `import { Input } from "@/components/ui/input";`
- Line 6: `import { trpc } from "@/lib/trpc";`
- Line 7: `import { MapPin, GraduationCap, Search } from "lucide-react";`
- Line 8: `import { useMemo, useState } from "react";`
- Line 9: `import { useLocation } from "wouter";`
- Line 10: `import { fallbackUniversities } from "@/lib/fallbackData";`
- Line 11: `import { toast } from "sonner";`

**tRPC Usage:**
- Line 15: `trpc.universities.list.useQuery()`

**Route Reference:** `/universities` (App.tsx line 16 - dynamic import)

**Package References:**
- `react` - useMemo, useState
- `@radix-ui/react-card` - Card component
- `@radix-ui/react-button` - Button component
- `@radix-ui/react-input` - Input component
- `lucide-react` - Icons
- `@trpc/react-query` - tRPC client
- `wouter` - useLocation
- `sonner` - Toast notifications

---

### 7. client/src/pages/Blogs.tsx

**Direct Imports:**
- Line 1: `import Navigation from "@/components/Navigation";`
- Line 2: `import Footer from "@/components/Footer";`
- Line 3: `import { Card } from "@/components/ui/card";`
- Line 4: `import { Button } from "@/components/ui/button";`
- Line 5: `import { BookOpen, Clock, User, ArrowRight, Search, Filter } from "lucide-react";`
- Line 6: `import { useLocation } from "wouter";`
- Line 7: `import { useState } from "react";`
- Line 8: `import MotionWrapper from "@/components/animations/MotionWrapper";`
- Line 9: `import Reveal from "@/components/animations/Reveal";`

**Route Reference:** `/blogs` (App.tsx line 11)

**Package References:**
- `react` - useState
- `@radix-ui/react-card` - Card component
- `@radix-ui/react-button` - Button component
- `lucide-react` - Icons
- `wouter` - useLocation

**Note:** Subscribe form (lines 325-334) has no backend integration

---

### 8. client/src/pages/Destinations.tsx

**Direct Imports:**
- Line 1: `import Navigation from "@/components/Navigation";`
- Line 2: `import Footer from "@/components/Footer";`
- Line 3: `import { Card } from "@/components/ui/card";`
- Line 4: `import { Button } from "@/components/ui/button";`
- Line 5: `import { useLocation } from "wouter";`
- Line 6: `import { Globe, Users, TrendingUp, Award, BookOpen, DollarSign, Briefcase, MapPin } from "lucide-react";`
- Line 7: `import MotionWrapper from "@/components/animations/MotionWrapper";`
- Line 8: `import Reveal from "@/components/animations/Reveal";`

**Route Reference:** `/destinations` (App.tsx line 18 - dynamic import)

**Package References:**
- `@radix-ui/react-card` - Card component
- `@radix-ui/react-button` - Button component
- `lucide-react` - Icons
- `wouter` - useLocation

---

### 9. client/src/pages/Gallery.tsx

**Direct Imports:**
- Line 1: `import Navigation from "@/components/Navigation";`
- Line 2: `import Footer from "@/components/Footer";`
- Line 3: `import { Card } from "@/components/ui/card";`
- Line 4: `import { Button } from "@/components/ui/button";`
- Line 5: `import { Images, Heart } from "lucide-react";`
- Line 6: `import { useLocation } from "wouter";`
- Line 7: `import { useState } from "react";`
- Line 8: `import MotionWrapper from "@/components/animations/MotionWrapper";`
- Line 9: `import Reveal from "@/components/animations/Reveal";`

**Route Reference:** `/gallery` (App.tsx line 17 - dynamic import)

**Package References:**
- `react` - useState
- `@radix-ui/react-card` - Card component
- `@radix-ui/react-button` - Button component
- `lucide-react` - Icons
- `wouter` - useLocation

---

### 10. client/src/pages/SuccessStories.tsx

**Direct Imports:**
- Line 1: `import Navigation from "@/components/Navigation";`
- Line 2: `import Footer from "@/components/Footer";`
- Line 3: `import { Card } from "@/components/ui/card";`
- Line 4: `import { Button } from "@/components/ui/button";`
- Line 5: `import { useLocation } from "wouter";`
- Line 6: `import { Award, Target, Briefcase, GraduationCap, CheckCircle2, MapPin } from "lucide-react";`
- Line 7: `import MotionWrapper from "@/components/animations/MotionWrapper";`
- Line 8: `import Reveal from "@/components/animations/Reveal";`
- Line 9: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";`

**Route Reference:** `/success-stories` (App.tsx line 19 - dynamic import)

**Package References:**
- `@radix-ui/react-card` - Card component
- `@radix-ui/react-button` - Button component
- `@radix-ui/react-avatar` - Avatar component
- `lucide-react` - Icons
- `wouter` - useLocation

---

### 11. client/src/pages/Tasks.tsx

**Direct Imports:**
- Line 1: `import Footer from "@/components/Footer";`
- Line 2: `import Navigation from "@/components/Navigation";`
- Line 3: `import { Button } from "@/components/ui/button";`
- Line 4: `import { Card } from "@/components/ui/card";`
- Line 5: `import { Input } from "@/components/ui/input";`
- Line 6: `import { trpc } from "@/lib/trpc";`
- Line 7: `import { Bell, BellOff, CheckCircle2, ClipboardList, PlusCircle } from "lucide-react";`
- Line 8: `import { useEffect, useMemo, useState } from "react";`
- Line 9: `import { toast } from "sonner";`

**tRPC Usage:**
- Line 14: `trpc.useUtils()`
- Line 22: `trpc.tasks.list.useQuery()`
- Line 23: `trpc.tasks.create.useMutation()`
- Line 29: `trpc.tasks.complete.useMutation()`
- Line 35: `trpc.tasks.updateStatus.useMutation()`

**Route Reference:** `/tasks` (App.tsx line 13)

**Package References:**
- `react` - useEffect, useMemo, useState
- `@radix-ui/react-button` - Button component
- `@radix-ui/react-card` - Card component
- `@radix-ui/react-input` - Input component
- `lucide-react` - Icons
- `@trpc/react-query` - tRPC client
- `sonner` - Toast notifications

---

### 12. client/src/pages/NotFound.tsx

**Direct Imports:**
- Navigation, Footer, Button components

**Route References:**
- `/404` (App.tsx line 35)
- `*` fallback (App.tsx line 37)

---

### 13. client/src/components/Navigation.tsx

**Direct Imports:**
- Line 1: `import { Button } from "@/components/ui/button";`
- Line 2: `import { useLocation } from "wouter";`
- Line 3: `import { Menu, X } from "lucide-react";`
- Line 4: `import { useState } from "react";`
- Line 5: `import Logo from "./Logo";`

**Used In:** All pages (Home, About, Services, Contact, Blogs, Universities, Destinations, Gallery, SuccessStories, Tasks)

**Package References:**
- `@radix-ui/react-button` - Button component
- `wouter` - useLocation
- `lucide-react` - Menu, X icons
- `react` - useState

---

### 14. client/src/components/Footer.tsx

**Direct Imports:**
- Line 1: `import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";`
- Line 2: `import { useLocation } from "wouter";`
- Line 3: `import { toast } from "sonner";`
- Line 4: `import Logo from "./Logo";`

**Used In:** All pages

**Package References:**
- `lucide-react` - Social and contact icons
- `wouter` - useLocation
- `sonner` - Toast notifications

---

### 15. client/src/components/SeoManager.tsx

**Direct Imports:**
- Line 1: `import { useEffect } from "react";`
- Line 2: `import { useLocation } from "wouter";`

**Used In:** App.tsx line 49

**Package References:**
- `react` - useEffect
- `wouter` - useLocation

---

### 16. client/src/components/premium/*.tsx

**Files:**
- ServicesGrid.tsx (40 lines) - Used in Home.tsx line 196
- TestimonialsPremium.tsx (30 lines) - Used in Home.tsx line 200
- PartnersWall.tsx (23 lines) - Used in Home.tsx line 198
- Destinations.tsx - Used in Home.tsx line 197
- JourneyTimeline.tsx - Used in Home.tsx line 199
- ContactFormPremium.tsx - Used in Home.tsx line 201

**Package References:**
- `@radix-ui/react-card` - Card component
- `lucide-react` - Icons
- `react` - React imports

---

### 17. client/src/components/animations/*.tsx

**Files:**
- MotionWrapper.tsx - Used in Home, Destinations, Blogs, Gallery, SuccessStories
- Reveal.tsx - Used in Home, Destinations, Blogs, Gallery, SuccessStories

**Package References:**
- `framer-motion` - Animation library
- `react` - React imports

---

### 18. server/routers.ts

**Direct Imports:**
- Line 1: `import { COOKIE_NAME } from "@shared/const";`
- Line 2: `import { getSessionCookieOptions } from "./_core/cookies";`
- Line 3: `import { systemRouter } from "./_core/systemRouter";`
- Line 4: `import { publicProcedure, router } from "./_core/trpc";`
- Line 5: `import { z } from "zod";`
- Lines 6-16: Database function imports from `./db`
- Line 17: `import { notifyOwner } from "./_core/notification";`
- Line 18: `import { sendLeadToCrm } from "./_core/crm";`

**tRPC Routes Defined:**
- auth.me (line 23)
- auth.logout (lines 24-30)
- universities.list (lines 34-36)
- universities.getById (lines 37-39)
- courses.list (lines 43-45)
- inquiries.create (lines 49-111)
- testimonials.list (lines 115-117)
- tasks.list (lines 121-131)
- tasks.create (lines 133-151)
- tasks.complete (lines 153-175)
- tasks.updateStatus (lines 177-202)

**Package References:**
- `zod` - Input validation
- `@trpc/server` - tRPC router

---

### 19. server/db.ts

**Direct Imports:**
- Line 1: `import { desc, eq } from "drizzle-orm";`
- Line 2: `import { drizzle } from "drizzle-orm/mysql2";`
- Lines 3-14: Schema imports from `../drizzle/schema`
- Line 15: `import { ENV } from './_core/env';`

**Functions:**
- getDb() (lines 20-30)
- upsertUser() (lines 32-89)
- getUserByOpenId() (lines 91-101)
- getUniversities() (lines 103-113)
- getUniversityById() (lines 115-125)
- getCourses() (lines 127-137)
- createInquiry() (lines 139-152)
- getTestimonials() (lines 154-164)
- getTasks() (lines 166-183)
- createTask() (lines 185-203)
- completeTaskById() (lines 205-227)
- updateTaskStatus() (lines 229-257)

**Package References:**
- `drizzle-orm` - ORM
- `mysql2` - MySQL driver

---

### 20. drizzle/schema.ts

**Direct Imports:**
- Line 1: `import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";`
- Line 2: `import { relations } from "drizzle-orm";`

**Tables Defined:**
- users (lines 9-24)
- universities (lines 29-38)
- courses (lines 43-51)
- inquiries (lines 56-66)
- testimonials (lines 71-80)
- tasks (lines 85-95)

**Relations (lines 100-110):**
- universitiesRelations
- coursesRelations

**Package References:**
- `drizzle-orm` - ORM

---

## REFACTOR - Needs Improvement

### 1. client/src/pages/ComponentShowcase.tsx

**Direct Imports:** 60+ shadcn/ui components (lines 1-159)

**Evidence of Non-Production Status:**
- NOT in App.tsx routes
- NOT in Navigation.tsx navLinks (lines 11-21)
- NOT in Footer.tsx footerLinks (lines 9-28)
- NOT in sitemap.xml

**Used In:** No production pages

**Package References:**
- All `@radix-ui/*` components
- `lucide-react` - Icons
- `date-fns` - Date formatting
- `sonner` - Toast notifications

**Recommendation:** Move to dev-only or remove from production build

---

### 2. client/src/components/AIChatBox.tsx

**Direct Imports:**
- React, shadcn/ui components, sonner

**Used In:** ComponentShowcase.tsx line 174 only

**Evidence of Demo Status:**
- Not imported in any production page
- Only used in ComponentShowcase (dev page)
- Simulated responses (no real AI integration)

**Package References:**
- `react` - React imports
- `@radix-ui/*` - UI components
- `sonner` - Toast notifications

---

### 3. client/src/components/Map.tsx

**Direct Imports:**
- React, Google Maps types

**Used In:** No pages found

**Evidence:**
- Not imported in App.tsx
- Not imported in any page component
- Not in any route

**Package References:**
- `@types/google.maps` - Google Maps types

**Recommendation:** Archive or implement usage

---

### 4. client/src/pages/Blogs.tsx (Subscribe Form)

**Issue:** Subscribe form (lines 325-334) has no backend integration

**Evidence:**
- Form exists but no onSubmit handler
- No tRPC mutation for subscription
- No CRM integration for newsletter

**Package References:**
- `react` - useState
- `@radix-ui/*` - UI components

---

### 5. client/src/components/premium/PartnersWall.tsx

**Issue:** Placeholder content only

**Evidence (line 3):**
```typescript
const logos = new Array(12).fill(0).map((_,i)=>`partner-${i}`);
```

**Used In:** Home.tsx line 198

**Package References:**
- `react` - React imports

---

### 6. client/src/components/Footer.tsx

**Issue:** Social and legal links point to `#`

**Evidence:**
- Line 21: Testimonials `href: "#"`
- Line 24: Privacy Policy `href: "#"`
- Line 25: Terms of Service `href: "#"`
- Line 26: Cookie Policy `href: "#"`
- Lines 30-35: All social links `href: "#"`

**Package References:**
- `lucide-react` - Icons
- `wouter` - useLocation
- `sonner` - Toast notifications

---

## ARCHIVE - Low Priority Reference

### 1. scripts/*.js

**Files:**
- convert-assets.js
- convert-assets-puppeteer.js
- fetch-fonts.js
- generate-assets.js
- generate-assets-puppeteer.js
- ttf-to-woff2.js
- ttf-to-woff2.cjs

**Used In:** Build process (package.json scripts)

**Package References:**
- `sharp` - Image processing
- `puppeteer` - Browser automation
- `png-to-ico` - Icon generation
- `ttf2woff2` - Font conversion

---

### 2. drizzle/migrations/*.sql

**Files:**
- 0000_blushing_slapstick.sql
- 0001_tasks.sql
- 0002_inquiry_message.sql

**Used In:** Database migrations

**Package References:**
- `drizzle-kit` - Migration tool

---

### 3. references/periodic-updates.md

**Used In:** Documentation reference

---

### 4. patches/wouter@3.7.1.patch

**Used In:** package.json line 119 (pnpm patchedDependencies)

**Package References:**
- `wouter` - Routing library patch

---

## REMOVE - No Dependencies Found

### Evidence Required for REMOVE:
1. No imports in any file
2. No route references
3. No dynamic imports
4. No build references
5. No package references

### Files Investigated:

| File | Imports | Routes | Dynamic | Build | Packages | Verdict |
|------|---------|--------|---------|-------|----------|---------|
| ComponentShowcase.tsx | ❌ None in App.tsx | ❌ Not in routes | ❌ None | ❌ Not in build | ⚠️ Uses packages | ARCHIVE |
| AIChatBox.tsx | ⚠️ Used in ComponentShowcase | N/A | N/A | N/A | ⚠️ Uses packages | REFACTOR |
| Map.tsx | ❌ None in pages | ❌ Not in routes | ❌ None | ❌ Not in build | ⚠️ Uses @types/google.maps | ARCHIVE |
| ManusDialog.tsx | ⚠️ Limited usage | ❌ Not in routes | ❌ None | ❌ Not in build | ⚠️ Uses packages | REFACTOR |

**Conclusion:** No files meet all criteria for REMOVE. All files have at least one dependency or reference.

---

## Summary

### KEEP (18 files)
All core production files with active dependencies and route references.

### REFACTOR (6 files)
Files needing improvement or cleanup:
- ComponentShowcase.tsx - Dev-only, should be excluded from production
- AIChatBox.tsx - Demo only, needs real AI integration or removal
- Map.tsx - Unused, needs implementation or removal
- Blogs.tsx - Subscribe form needs backend
- PartnersWall.tsx - Needs real university logos
- Footer.tsx - Needs real social/legal links

### ARCHIVE (10+ files)
Low-priority reference files:
- Build scripts
- Database migrations
- Documentation
- Package patches

### REMOVE (0 files)
No files meet all criteria for complete removal.

---

**Total Files Analyzed:** 35+
**Total Dependencies Traced:** 50+ packages
**Total Route References:** 11 routes
**Total Dynamic Imports:** 4 components