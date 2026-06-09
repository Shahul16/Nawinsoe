# TODO - Delete unwanted files/folders

## Plan Steps
- [x] Review cleanup/audit recommendations from `reports/CLEANUP_REPORT.md` and `reports/REPO_AUDIT.md`.
- [x] Verify which “unwanted” items still exist in this working copy (archive/, deprecated/, duplicate roots, duplicate db repo).
- [ ] Delete the unwanted files/folders that are confirmed unused/unreferenced.
- [ ] Run `pnpm check` and `pnpm test` (or `pnpm build`) to validate.
- [ ] Run formatting/lint if configured.

## Vercel / sitemap fixes
- [x] Add `/vercel.json` to deploy `dist/public` and rewrite SPA routes.
- [x] Update `vite.config.ts` to copy `client/public` dir into `dist/public`.
- [x] Ensure `robots.txt` and `sitemap.xml` are present in `client/public/` (so they build into `dist/public`).


