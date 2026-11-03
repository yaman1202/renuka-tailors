# Renuka Tailors website implementation plan

## Project review

The project is a React 19 and Vite marketing site with React Router. It has business contact data, maps, policy pages, an appointment request form and private feedback form that prepare WhatsApp drafts. There is no Firebase, Firestore, admin, online stock catalogue, customer review feed or appointment API in this repository, so existing contact flows remain client-side and inventory is not fabricated.

## Phases

1. **Design system and homepage** — complete and checkpointed at `897840d`. The homepage uses the recovered purple-sari hero, burgundy and ivory palette, revised navigation and responsive editorial layout.
2. **Collections and photo catalog** — complete and checkpointed at `6c2ca21`. Added a collection hub and eight category routes, ten distinct references per category, filters, collection metadata and source credits. The existing accessible `PhotoGallery` lightbox is reused, and the homepage links to categories rather than repeating a general gallery.
3. **About, blog and contact content** — complete and checkpointed at `b802f6d`. Added the supplied customer-count statement, four practical articles with category filters and detail routes, and a contact enquiry form that only prepares a WhatsApp draft. Existing appointment and private-feedback flows are preserved.
4. **Visual system and motion** — complete and checkpointed at `1c9c604`. Improved small text sizes and contrast for ordinary reading, tuned responsive navigation and collection controls, and kept reduced-motion behavior and the homepage hero composition.
5. **Hero slideshow** — complete and checkpointed at `c0b5e7f`. The existing purple-sari hero remains slide one with its current crop. Four secondary bridal and ethnic-wear photos follow on a five-second interval with a 1.2-second crossfade, subtle zoom, next-image preload, and reduced-motion support.
6. **Real-user QA and final checkpoint** — complete and checkpointed in this plan update. The production build and all 35 route checks passed; filters, lightbox keyboard controls, mobile navigation and local WhatsApp draft flows were verified. Responsive checks at 1280, 820 and 390 pixels showed no horizontal overflow, and the browser console had no errors.

## Git checkpoint

The homepage phase is recorded at `897840d`, collections at `6c2ca21`, About, Journal and Contact at `b802f6d`, the visual pass at `1c9c604`, and the slideshow at `c0b5e7f`. This plan update checkpoints final route and contact-path QA.

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

### Current phase status

- **Collections and photo catalog: complete (`6c2ca21`).** `/collections` and eight category pages each contain ten unique photos. Style filters update the visible count, the existing modal gallery supports keyboard navigation and Escape, page titles update by collection, and all 80 local images and metadata records are present. Eighty Pexels sources are credited; 74 originals are at least 4,000 pixels on the long edge. The remaining six are represented at their actual source dimensions and were not upscaled.
- **About, blog and contact content: complete (`b802f6d`).** The About page includes the exact statement “Happily serving more than 10,000 customers.” The journal has four practical guides, working category filters and article-specific titles. Contact enquiry data is used only to prepare a WhatsApp draft after visitor submission; the site does not send or persist it. The sitemap now lists article and collection routes.
- **Visual system and motion: complete (`1c9c604`).** Readability and contrast are improved while keeping the ivory and burgundy palette. Tested at desktop, 820 px tablet and 390 px phone widths without horizontal overflow on the homepage, collections and contact pages. Mobile navigation opens, follows a link and closes. Reduced-motion CSS remains enabled.
- **Hero slideshow: complete (`c0b5e7f`).** The existing purple-sari image remains the first slide and is unchanged. The browser returned to it on refresh and after the five-photo loop. The first transition began at five seconds; secondary slides crossfade over 1.2 seconds and use a restrained zoom. The next image is preloaded; reduced-motion preference disables the timer and animation. The provided source photos remain unchanged; only the sideways bridal site copies are rotated upright.
- **Real-user QA: complete.** All 35 site routes rendered, including the `/gallery` redirect and not-found route. A collection filter reduced ten photos to nine, the existing lightbox advanced with the arrow key and closed with Escape, mobile navigation opened and closed after navigation, and appointment, contact and private-feedback forms validated sample numbers and produced local WhatsApp draft links. No draft link was opened and no message was sent. At 1280, 820 and 390 pixels there was no horizontal overflow. The browser console was clear. `npm run build` passed; sitemap generation was skipped because `VITE_SITE_URL` is not set.

### Image sourcing and accuracy rules

- Prefer source images with verified dimensions of 4K or higher where available; preserve source links, contributor names and source dimensions in the image credits.
- Ship optimized local derivatives for page speed, record the original dimensions, and never call a resized derivative “4K”. Avoid repeated photo IDs between collection galleries.
- Keep each gallery identified as licensed visual inspiration unless Renuka Tailors supplies approved product or customer photos. Do not create claims of inventory, awards, customer testimonials or business capabilities beyond the provided facts.
