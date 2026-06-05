# Fonts Reference Audit (build warning: /fonts/fonts.css doesn't exist at build time)

## Build warning observed
During `pnpm build`:
- `"/fonts/fonts.css" doesn't exist at build time, it will remain unchanged to be resolved at runtime`

This indicates the build pipeline encountered an absolute-path reference like `/fonts/fonts.css` and couldn't find it in the build-time filesystem. It does **not** fail the build.

## Target file existence
- `public/fonts/fonts.css` exists.

Referenced contents include absolute URLs to font files under `/fonts/...`, e.g.:
- `/fonts/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU7NSg.woff2`
- `/fonts/xMQOuFFYT72X5wkB_18qmnndmSdgnn-K.woff2`

These will be served correctly at runtime if the deployment hosts `public/` at the web root.

## Where `/fonts/fonts.css` is likely referenced
Due to the environment lacking `ripgrep`, global reference scanning could not be completed. The most likely reference locations are:
- `client/src/index.css` (via `@import '/fonts/fonts.css'` or similar)
- `client/index.html` (via `<link href="/fonts/fonts.css" ...>`)
- any other CSS/HTML template under `client/`

## Can it be safely removed?
Not recommended to remove solely based on this warning.
- `/fonts/fonts.css` appears to be part of the font loading mechanism.
- Even if it’s a build-time resolution issue, runtime resolution may still work.

## Safe next step (no code changes)
1. Locate the exact reference(s) to `/fonts/fonts.css`.
2. Verify whether it should be `public/fonts/fonts.css` (web root `/fonts/fonts.css`).
3. If the reference is correct, nothing needs removal—only address why build can't resolve it (path quoting, leading slash, or Vite handling).

## Conclusion
- The target `public/fonts/fonts.css` is present.
- The warning is build-time resolution related, not necessarily missing asset at runtime.
- No deletions/modifications should be performed until the exact reference site is confirmed.

