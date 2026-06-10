# TODO_AUDIT_AND_FIXES (Generated)

## Phase 0 — Verification
- [x] Run `pnpm run build` (completed successfully; note NODE_ENV warning)
- [ ] Ensure `pnpm run check` (tsc --noEmit) completes and record errors
- [x] Run `pnpm test` and record failing tests

## Phase 1 — HubSpot + email + career requirements
- [ ] Fix inquiries.create (Contact/Premium/Book consultation) so HubSpot failure is best-effort (never breaks submission/tests)
- [ ] Ensure lead source tracking/UTM data is captured and included in HubSpot payload (or CRM webhook)
- [ ] Careers form:
  - [ ] Update backend to send to `careers@nawinsedutech.com` only (per requirement)
  - [ ] Connect Careers submissions to HubSpot CRM fully (create deal + association) with appropriate stage/pipeline mapping
  - [ ] Add required stageKey/routeKey support in `server/_core/hubspot.ts`

## Phase 2 — University page improvements
- [ ] Update universities data model + UI to display official images and logos
- [ ] Ensure “Learn More” opens the official university website

## Phase 3 — Homepage/Impact/Stay Updated/UI/UX
- [ ] Redesign “Our Impact” section using real business metrics (replace placeholders)
- [ ] Improve “Stay Updated” section visual hierarchy + mobile layout
- [ ] Replace placeholder content across the site

## Phase 4 — Brand + mobile responsiveness
- [ ] Enforce color palette (#040F23, #0B1E4D, #C59D50) across Tailwind/theme tokens
- [ ] Audit all pages for mobile responsiveness issues

## Phase 5 — SEO + performance
- [ ] Verify SEO artifacts: sitemap/robots already present; confirm OG + schema + meta tags per route
- [ ] Audit and improve Lighthouse score

## Phase 6 — Final audit report
- [ ] Produce final report: issues found, fixes implemented, remaining recommendations, deployment readiness status

