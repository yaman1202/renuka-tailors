# Renuka Tailors website

## Previous implementation checkpoints

- `f98f447` — initial design system and homepage.
- `af115ad` — original multi-page marketing site.

## Current polish

1. **Simplify the design** — done. Replaced the oversized editorial layout with a restrained ivory, burgundy and charcoal system, shorter copy, a compact mobile menu, and clear phone/directions links.
2. **Use supplied business details** — done. Added founder Vijay Gautam, established 1998, women’s wear, designers, modern machines, 100+ workers, embroidery, Meerut address and both phone numbers.
3. **Remove unverified storefront content** — done. Removed invented prices, sample testimonials, stock photography, draft inventory and sample journal posts. The work area stays empty until Renuka Tailors photographs are available.
4. **Make contact paths clear** — done. Added click-to-call, directions, the supplied Google review link, and a separate private feedback form that prepares a WhatsApp message without storing or sending it automatically.
5. **Verify and prepare for deployment** — done locally. Production build and TypeScript checks pass; all public routes were checked for sample copy and currency amounts; desktop/mobile navigation was reviewed. Sitemap generation was checked with a reserved test origin and that origin was removed afterward.

## Deployment items

- Set `VITE_SITE_URL` to the real domain so canonical URLs and sitemap entries use the public origin.
- Confirm the phone numbers and which number receives WhatsApp messages.
- Add approved photos of actual garments and embroidery when available.
- Review the privacy and website terms text before publishing.

The 5% offer in the attached brief is not included because it was not part of the direct request and would commit the business to a promotion.
