# Renuka Tailors website implementation plan

## Project review

The project is a React 19 and Vite marketing site with React Router. It has business contact data, maps, policy pages, an appointment request form and private feedback form that prepare WhatsApp drafts. There is no Firebase, Firestore, admin, online stock catalogue, customer review feed or appointment API in this repository, so existing contact flows remain client-side and inventory is not fabricated.

## Phases

1. **Design system and homepage** — complete. The homepage now uses the recovered purple-sari hero, burgundy and ivory palette, revised navigation and an editorial responsive layout.
2. **Business content, services and lookbook** — complete. Added six photo-led service cards, a 12-image reference collection with keyboard-accessible lightbox, featured collection banner, six-photo craft gallery, editorial About content and image-source credits. No reference image is presented as Renuka Tailors inventory, staff or completed work.
3. **Appointments, reviews and contact paths** — preserved. Appointment requests, direct contact links, the existing Google review URL, and the separate 5% private-feedback WhatsApp draft remain in place.
4. **Responsive and production verification** — complete after the final visual pass. The production build passes, local image assets load, existing routes are checked, gallery lightbox navigation and responsive layouts are checked, and the hero checksum matches the recovered source image.

## Git checkpoint

The completed redesign is recorded in the latest Git checkpoint after verification.

## Deployment notes

- Set `VITE_SITE_URL` to the public domain before deployment so canonical URLs and the sitemap use the correct origin.
- Confirm phone numbers and WhatsApp availability before publishing.
- Replace visual-reference photos with approved shop or garment photos when available.
- There is no online stock catalogue or booking backend in this project. Appointment requests are completed by the customer in WhatsApp.
- Review the privacy and terms copy before publishing.

## Complete boutique upgrade plan

### Audit findings

- The React Router app has 15 routes, reusable service cards and an accessible photo lightbox.
- `/collections` and individual collection routes do not exist yet. The current `/gallery` is a 12-photo general lookbook; service detail pages show one image each.
- `/blog` is an empty-state page and `/blog/:slug` currently renders the blog list instead of an article.
- The About page has the supplied business facts, but not the requested 10,000-customer statement. The Contact page has phone, WhatsApp and map links, but no enquiry form.
- There are 26 local image assets, mostly resized to 1200 px wide; current credits list Pexels and Unsplash sources. Images are labeled as visual references, not shop inventory or completed work.
- `package.json` has no test or lint scripts. There is no Firebase SDK, Firebase configuration or database integration in this repository. Existing appointment and feedback flows prepare WhatsApp drafts and do not store submissions.
- The home hero reference is already implemented and checkpointed as `897840d`; preserve its composition while working on the other phases.

### Remaining phases

1. **Collection system and photo catalog** — add a collections landing page and eight data-driven collection routes (blouses, lehengas, gowns, salwar kameez, kurtis, bridal wear, designer wear and suits). Each gallery will have at least ten distinct, category-appropriate, licensed photos, names and concise design details; add working filters and reuse the accessible lightbox. Keep the homepage to category entry points rather than a full product-photo gallery.
2. **About, blog and contact content** — add the user-supplied 10,000-customer statement to About, create useful article listing/detail routes and working blog-category navigation, and add a contact enquiry form that prepares a WhatsApp draft without sending or storing data automatically.
3. **Visual system and motion pass** — review type sizes and contrast across every page, align collection/blog pages with the ivory/burgundy design system, add restrained SVG tailoring details and lightweight entrance/hover transitions, and honor reduced-motion preferences. Keep the current hero composition.
4. **Real-user QA and final checkpoint** — build and manually exercise all route journeys, category filters, lightbox controls, mobile navigation, contact drafts, image loading and crop behavior at desktop, tablet and mobile widths. Fix issues, record actual checks and commit each completed implementation phase.

### Image sourcing and accuracy rules

- Prefer source images with verified dimensions of 4K or higher where available; preserve source links, contributor names and source dimensions in the image credits.
- Ship optimized local derivatives for page speed, record the original dimensions, and never call a resized derivative “4K”. Avoid repeated photo IDs between collection galleries.
- Keep each gallery identified as licensed visual inspiration unless Renuka Tailors supplies approved product or customer photos. Do not create claims of inventory, awards, customer testimonials or business capabilities beyond the provided facts.
