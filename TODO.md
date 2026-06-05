# TODO - Delete unwanted files/folders

## Plan Steps
- [x] Review cleanup/audit recommendations from `reports/CLEANUP_REPORT.md` and `reports/REPO_AUDIT.md`.
- [x] Verify which “unwanted” items still exist in this working copy (filesystem checks).
- [x] Stage deletion list with safety checks (ensure no imports reference removed paths).
- [x] Create a branch (if needed) and backup plan.
- [ ] Delete the unwanted files/folders.
- [ ] Run `pnpm check` and `pnpm test` (or `pnpm build`) to validate.
- [ ] Run formatting/lint if configured.

## Deletion candidates discovered
- Archive/deprecated/legacy folders: **not present** in this working copy.
- `server/repositories/database.repository.ts`: **not present** in this working copy.
- `client/src/components/ui/Logo.tsx`: **not present** in this working copy.
- `public/Logo Assest/`: exists; cannot delete without confirming it is unused vs `public/favicon.ico` and font assets.

## What changed
No safe deletions could be confirmed yet from the items listed in the audit reports, because the “unwanted” targets appear to already be removed.

