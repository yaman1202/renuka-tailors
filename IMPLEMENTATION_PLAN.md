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
