Nawins Education — Brand Guidelines (brief)

Purpose
- Corporate, international study-abroad consultancy brand.
- Use on marketing site, proposals, and communications.

Logo
- Place the provided logo file at: `client/public/manus-storage/nawins_education_advanced_logo_e06c3e9e.png`
- Use the square/mark for favicon, and the full mark for header and hero.
- If the image doesn't appear, ensure the file exists at the path above and the dev server is restarted.

Colors
- Primary (Navy): #07133a
- Accent (Gold): #ffbf47
- Accent-dark (Deep gold): #e0a12a
- Neutral: #f7f9ff (background)

Fonts
- Headings: `Sora` (weights 500-800)
- Body: `Plus Jakarta Sans` (weights 400-700)

Logo usage
- Maintain clear space equal to the height of the logo around the mark.
- Do not distort or recolor the logo; use the provided gold + glass effect on dark background where possible.

Accessibility
- Ensure sufficient contrast for text over background. Use the navy background with white text for hero and nav.

Assets
- Recommended folder: `client/public/manus-storage/`
- Favicon: create `client/public/favicon.ico` and `client/public/apple-touch-icon.png` from the mark.

Deployment
- Restart dev server after adding assets.
- Verify image URL `/_assets/...` in production if rewritten by hosting.

Contact
- For adjustments to the mark (size/padding/alt text), update `client/src/components/Navigation.tsx` and `client/src/pages/Home.tsx`.
