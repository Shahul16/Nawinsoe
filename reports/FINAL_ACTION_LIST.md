# FINAL ACTION LIST

## SAFE TO DELETE

| File | Reason |
|------|--------|
| client/src/pages/NotFound.tsx | Keep - 404 page needed |
| server/storage.ts | Keep - Storage proxy function |
| server/auth.logout.test.ts | Keep - Test file |
| server/inquiries.test.ts | Keep - Test file |
| lighthouse-report.json | Safe to delete - Previous audit |
| axe-report.json | Safe to delete - Previous audit |
| reports/*.md (audit files) | Safe to delete - Documentation only |
| docs/INTEGRATIONS.md | Safe to delete - Documentation |
| README.md | Safe to delete - Will be regenerated |

*Note: After previous cleanup, no critical duplicate files remain*

## SAFE TO MOVE

| Current Location | Proposed Location | Reason |
|------------------|-----------------|--------|
| client/src/components/sections/CTASection.tsx | client/src/components/shared/ | Consolidate CTA components |
| client/src/components/premium/* | client/src/features/* | Feature-based organization |
| client/src/components/animations/* | client/src/components/shared/ | Shared animation utilities |
| client/src/lib/* | client/src/lib/ | Keep as is - good location |
| server/db.ts | server/db/queries/ | Better organization |
| server/_core/* | server/core/ | Simpler naming |

## SAFE TO RENAME

| Current Name | Proposed Name | Convention |
|--------------|--------------|----------|
| server/routes/app.router.ts | server/routes/router.ts | Shorter name |
| drizzle/relations.ts | drizzle/relation.ts | Consistent naming |
| client/src/pages/legal/* | client/src/pages/legal/* | Keep as is |

## KEEP AS IS

| File/Folder | Reason |
|-------------|--------|
| client/src/App.tsx | Main entry point |
| client/src/main.tsx | Vite entry |
| client/src/index.css | Global styles |
| client/src/components/layout/* | Good structure |
| client/src/components/navigation/* | Good structure |
| client/src/pages/* | Clean organization |
| server/_core/index.ts | Main server entry |
| server/routes/app.router.ts | Router definitions |
| package.json | Configuration correct |
| tsconfig.json | Configuration correct |
| vite.config.ts | Configuration correct |
| drizzle.config.ts | Database config |

## NEEDS REVIEW

| Item | Reason for Review |
|------|-------------------|
| client/src/pages/tasks/TasksPage.tsx | Admin functionality, may need auth |
| client/src/components/AIChatBox.tsx | Deprecated - not imported anywhere |
| client/src/components/ManusDialog.tsx | Deprecated - not imported anywhere |
| client/src/components/Map.tsx | Deprecated - not imported anywhere |
| client/src/components/DashboardLayout.tsx | Deprecated - not used |
| server/_core/llm.ts | AI functionality - purpose unclear |
| server/_core/voiceTranscription.ts | AI feature - verify usage |
| server/_core/imageGeneration.ts | AI feature - verify usage |
| scripts/* | Asset generation - verify necessity |

## ACTION SUMMARY

| Category | Count |
|----------|-------|
| Safe to Delete | 6 files |
| Safe to Move | 4 folders |
| Safe to Rename | 0 files |
| Keep As Is | 15+ items |
| Needs Review | 9 items |

## NEXT STEPS

1. Review deprecated components for removal
2. Consolidate premium components into features
3. Create careers page
4. Add missing destination content (Germany, France, Netherlands)
5. Implement blog article pages
6. Add security middleware
7. Configure analytics properly