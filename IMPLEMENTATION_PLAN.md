# Renuka Tailors marketing website — implementation plan

## Inspection summary

- The workspace contains only an initialized, uncommitted Git repository. There is no application code, package manifest, framework, routing, component library, or image asset to preserve or reuse.
- Node.js 24 and npm 11 are available. The repository's Git author is configured.
- The supplied reference uses service navigation, category groupings, a customer journey, an enquiry form, pricing, testimonials, and contact links. Its doorstep tailoring model does not apply to Renuka Tailors' verified physical shop in Meerut.
- The brief supplies the business name, location, map coordinates and links, and a listed Salwar Kameez Tailoring category. It does not include a storefront photograph, confirmed phone number, hours, approved prices, or genuine reviews.

## Phases

1. **Design system and homepage** — establish a lightweight React/Vite/TypeScript foundation, global typography, palette, responsive primitives, preview banner, navigation/footer shell, and the editorial homepage. Use illustrative editorial imagery only; leave a clearly identified storefront-photo slot until a real shop image is supplied. Verify the development server, production build, homepage interactions, and responsive layout, then create a Git checkpoint.
2. **Central content and shared site shell** — add centralized business, services, pricing, testimonial, gallery, FAQ, and hours data with verified/demo/needs-confirmation statuses and a single `DEMO_MODE` switch; wire common route navigation and reusable content components.
3. **Service pages and lookbook** — add the service index and individual service/category pages, plus filterable inspiration gallery and accessible image viewer. Mark every unverified category and image as demo content.
4. **Pricing, testimonials, FAQ, and blog** — implement searchable/filterable illustrative price estimates, confirmation notes, sample-only reviews, FAQs, and sample editorial content; hide unverified content when demo mode is off.
5. **About, booking, contact, and location** — add truthful brand/about content, a validated demo enquiry form, store directions and listing links, configurable disabled-by-default WhatsApp entry points, and sample-hours handling.
6. **SEO, accessibility, and final verification** — add per-route metadata, canonical/Open Graph values, sitemap/robots and verified-only local business structured data; review reduced motion, keyboard support, mobile layouts, route behavior, production-mode visibility, console output, and production build. Fix issues found.

## Phase gates

- Complete and verify Phase 1 before committing its checkpoint.
- Proceed sequentially; reuse the components and data contracts created in earlier phases.
- Do not claim demo data is real. Do not add internal business-management functionality.
- Do not claim a real storefront photograph is present; replace the marked slot only when an actual shop image is available.
