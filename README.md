# Renuka Tailors website

Simple public website for Renuka Tailors in Meerut.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` runs TypeScript checks and builds the production website. Set `VITE_SITE_URL` to the public website origin before deployment to generate canonical URLs and `sitemap.xml`.

## Website content

- `src/data/business.ts` — business details, phone numbers, location and map links.
- `src/App.tsx` — homepage, navigation and footer.
- `src/ServicePages.tsx` — service information and the work-photo placeholder.
- `src/StorePages.tsx` — About, contact and location pages.
- `src/InformationPages.tsx` — quotes by request, feedback, FAQ and updates pages.
- `src/components/FeedbackForm.tsx` — private feedback message prepared for WhatsApp. The site does not store form details.

The workspace has no product inventory, customer reviews, or approved photos of Renuka Tailors’ work. Those sections stay empty until real material is supplied. The website does not publish prices.

## Before deployment

Set `VITE_SITE_URL` to the actual domain. Confirm the displayed phone numbers and WhatsApp availability, and provide approved shop photos if the gallery should be populated. Review the website privacy and terms text before publishing.
