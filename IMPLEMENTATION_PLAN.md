# Renuka Tailors marketing website — implementation plan

## Inspection summary

- The workspace contains only an initialized, uncommitted Git repository. There is no application code, package manifest, framework, routing, component library, or image asset to preserve or reuse.
- Node.js 24 and npm 11 are available. The repository's Git author is configured.
- The supplied reference uses service navigation, category groupings, a customer journey, an enquiry form, pricing, testimonials, and contact links. Its doorstep tailoring model does not apply to Renuka Tailors' verified physical shop in Meerut.
- The brief supplies the business name, location, map coordinates and links, and a listed Salwar Kameez Tailoring category. It does not include a storefront photograph, confirmed phone number, hours, approved prices, or genuine reviews.

## Phases

1. **Design system and homepage — COMPLETE** — created the React/Vite/TypeScript foundation, design system and editorial homepage, including a labeled storefront illustration slot. Verified the production build and mobile navigation; checkpoint `f98f447` records this phase.
2. **Central content and shared site shell — COMPLETE** — added business, service, pricing, testimonial, gallery, FAQ, hours, delivery and blog data with verification states and a default-on `DEMO_MODE` switch.
3. **Service pages and lookbook — COMPLETE** — built the service index, seven distinct service landing pages, and a filterable lookbook with an image viewer.
4. **Pricing, testimonials, FAQ, and blog — COMPLETE** — added searchable/category-filtered pricing, comparison, sample-only reviews, FAQs, and six sample journal articles.
5. **About, booking, contact, and location — COMPLETE** — added the About, appointment, contact, location, map/directions, draft policy pages, simulated WhatsApp control, and demo hours. Verified required-field and Indian phone validation plus preview-only success behavior.
6. **SEO, accessibility, and final verification — COMPLETE WITH DOMAIN CONFIGURATION PENDING** — added per-route metadata, canonical/Open Graph tags, verified-only LocalBusiness structured data, robots, and a sitemap generator. Verified production-mode hiding and the sitemap generator using a reserved test domain. A real `VITE_SITE_URL` is still required to generate deployment URLs.

## Phase gates

- Complete and verify Phase 1 before committing its checkpoint.
- Proceed sequentially; reuse the components and data contracts created in earlier phases.
- Do not claim demo data is real. Do not add internal business-management functionality.
- Do not claim a real storefront photograph is present; replace the marked slot only when an actual shop image is available.
- The website is built and tested. A deployable sitemap and production canonical origin require the real public domain.
