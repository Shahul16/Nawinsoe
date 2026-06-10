# EDIT_PLAN_PHASE1.md (HubSpot + email + test stability)

## Information gathered
- HubSpot submission code: `server/_core/hubspot.ts`
  - Throws/errors when `HUBSPOT_ACCESS_TOKEN` is not configured.
  - Exposes `submitContactUsToHubSpot(lead)` and `upsertContactAndCreateDeal({ routeKey, lead })`.
  - Stage mapping currently supports only `routeKey: contact | premium-home-form | book-consultation`.
- tRPC routes: `server/routes/app.router.ts`
  - `inquiries.create` (used by Contact + Premium home form + Consultation booking) calls `submitContactUsToHubSpot(...)` inside try/catch and **throws TRPCError** if HubSpot submission fails.
  - `jobApplications.create` (Careers) only upserts contact-only; email sends to **both** `careers@nawinsedutech.com` and `info@nawinsedutech.com`.
- Tests failing:
  1) `server/inquiries.test.ts` expects `inquiries.create` to succeed, but fails due to missing HubSpot token (token required causes TRPCError).
  2) `server/auth.logout.test.ts` fails because it imports `appRouter` from `./routers` which doesn’t exist as a resolvable module in this repo layout.

## Plan (file-by-file)

### Step 1 — Make HubSpot submissions best-effort in inquiries
**Goal:** ensure `appRouter.inquiries.create` never throws when HubSpot token is missing.
- File: `server/routes/app.router.ts`
  - In `inquiries.create` mutation, wrap `submitContactUsToHubSpot(...)` with best-effort handling:
    - If HubSpot token missing/config missing, log and continue.
    - Keep owner notification best-effort.
  - Return `{ success: true }` even when HubSpot fails.

### Step 2 — Add Careers HubSpot deal creation + stage mapping
**Goal:** Careers submissions create a HubSpot deal + associate it with the contact.
- File: `server/_core/hubspot.ts`
  - Extend `routeKey` type union to include `"careers"`.
  - Add env getter `getStageCareersId` and mapping for careers stage.
- File: `server/routes/app.router.ts`
  - In `jobApplications.create` mutation:
    - Continue contact upsert (or replace with `upsertContactAndCreateDeal` using `routeKey: 'careers'`).
    - Create deal and associate to contact.

### Step 3 — Fix careers + contact email routing
**Goal:** meet exact recipients in requirements.
- File: `server/routes/app.router.ts`
  - Careers email `to` should be `['careers@nawinsedutech.com']` only.
  - Contact email fallback (if any other code path exists) must be `info@nawinsedutech.com` only.

### Step 4 — Lead source / UTM tracking to CRM
**Goal:** “proper lead source tracking” to HubSpot/CRM.
- File: `client/src/pages/contact/ContactPage.tsx` and other form pages
  - Ensure `trackUtmParams()` is called (already on ContactPage).
- File: `client/src/lib/crm.ts`
  - Extend `trackLeadCapture` / existing analytics calls to include UTM parameters in a structured way.
- File: `server/_core/hubspot.ts` and/or email webhook payload
  - Add UTM fields to `HubspotLeadContext` mapping into HubSpot contact properties (or deal properties) if supported.
  - If HubSpot custom properties aren’t configured, at minimum send `message` suffix containing UTM params.

### Step 5 — Fix failing auth.logout test import
**Goal:** make test loader work so CI/build audit isn’t blocked.
- File: create `server/routers.ts` (or `server/routers/index.ts`) as a thin re-export to `server/routes/app.router.ts`.
  - Ensure `auth.logout.test.ts` can resolve `./routers`.

## Dependent files to edit
- `server/routes/app.router.ts`
- `server/_core/hubspot.ts`
- `client/src/lib/crm.ts`
- `client/src/pages/contact/ContactPage.tsx` (if needed for UTMs)
- `server/routers.ts` (new)

## Follow-up steps after edits
- Run `pnpm test` until green.
- Run `pnpm run build` to ensure Vercel build readiness.
- After Phase 1, proceed to Phase 2 (universities images/logos + Learn More link) and then Phase 3 (Impact/Stay Updated/UI/UX/placeholder replacement/colors/mobile/SEO/Lighthouse).

## Approval gate
- Execute Phase 1 changes after approval.

