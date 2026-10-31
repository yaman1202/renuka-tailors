# Renuka Tailors marketing website

Public marketing site for the Meerut storefront. The site does not include internal order, customer, measurement, inventory, billing, or admin tools.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` runs strict TypeScript checks, creates the production bundle, and generates a sitemap when `VITE_SITE_URL` is configured.

## Demo content

Content lives in `src/data/`:

- `business.ts` — `DEMO_MODE`, verified business details, and unconfirmed contact/receiving details.
- `services.ts` — listed Salwar Kameez category and sample service categories.
- `pricing.ts`, `delivery-estimates.ts`, `business-hours.ts` — sample-only commercial estimates and hours.
- `testimonials.ts`, `gallery.ts`, `faqs.ts`, `blog.ts` — sample reviews, imagery, answers, and editorial content.

The default is preview mode. Set `VITE_DEMO_MODE=false` to check the production visibility rules. Unverified categories, sample prices, sample timings, sample reviews, sample hours, and sample articles are hidden in production mode. Replacing sample values does not make them verified: update each record's `status` only after the business confirms it.

## Before deployment

Copy `.env.example` to `.env` and set `VITE_SITE_URL` to the real public website origin. That value is used for canonical URLs, Open Graph URLs, and sitemap generation. The repository has no supplied production domain, so the build skips sitemap generation until this is configured.

Owner confirmation is still needed for the actual storefront photograph, phone, email, WhatsApp number, enquiry receiving endpoint, opening hours, prices, delivery estimates, additional services, customer reviews and consent, and approval of sample editorial content. The privacy notice and website terms are drafts for owner review. The appointment form is simulated in preview mode; production submission remains disabled until an approved receiving endpoint is configured.

## Project map

- `src/App.tsx` — shared header/footer and homepage.
- `src/ServicePages.tsx` — services and lookbook.
- `src/InformationPages.tsx` — pricing, testimonials, FAQ and journal.
- `src/BookingPage.tsx`, `src/StorePages.tsx` — enquiry, about, contact and location.
- `src/components/` — shared demo labels, page layouts, storefront illustration and WhatsApp control.
- `scripts/generate-sitemap.mjs` — builds a sitemap from the real site origin and omits demo routes in production mode.
