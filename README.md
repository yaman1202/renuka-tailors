# Renuka Tailors website

Responsive marketing website for Renuka Tailors in Meerut.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` runs TypeScript checks, creates the production site, and generates a sitemap. Set `VITE_SITE_URL` to the public website origin before deployment.

## Website structure

- `src/App.tsx` — navigation, homepage sections and site footer.
- `src/styles.css` — shared design system and responsive layouts.
- `src/data/business.ts` — business details, phone numbers, location and map links.
- `src/BookingPage.tsx` — appointment request prepared for WhatsApp; not submitted automatically.
- `src/components/FeedbackForm.tsx` — private feedback prepared for WhatsApp; the site does not store form details.
- `src/ServicePages.tsx` — service pages and visual-reference lookbook.
- `src/StorePages.tsx` — About, contact and location pages.
- `public/images` — locally hosted licensed photographs and `IMAGE_CREDITS.md`.

The workspace has no product inventory, customer review feed, or appointment backend. The lookbook images are labeled visual references and do not represent shop stock or completed customer work. The website does not publish prices or reviews.

## Before deployment

Set `VITE_SITE_URL` to the real domain. Confirm the displayed phone numbers and WhatsApp availability. Replace the visual-reference photos with approved Renuka Tailors photos when available. Review the privacy and terms text before publishing.
