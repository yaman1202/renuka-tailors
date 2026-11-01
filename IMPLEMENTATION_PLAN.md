# Renuka Tailors website implementation plan

## Project review

The existing project is a React 19 and Vite marketing site with React Router. It has business contact data, location links, and privacy/terms pages. The project has no Firebase setup, admin area, inventory store, customer review feed, or appointment API. Forms therefore prepare WhatsApp drafts, and current stock is not fabricated.

## Phases

1. **Design system and homepage** — complete. Set the cream, burgundy, charcoal, beige and gold palette; update type and navigation; create the new split hero and responsive homepage structure.
2. **Business content, services and lookbook** — complete. Add verified business details, service and process sections, trust points, locally hosted licensed style-reference photography, image credits and an honest empty inventory note.
3. **Appointment, reviews and contact paths** — complete. Add the WhatsApp appointment request form, Google review link, independent private-feedback offer, phone/WhatsApp links and map directions. The site does not send or store form data.
4. **Responsive and production verification** — complete. `npm run build` passes; the public routes were opened, the appointment and feedback drafts and validation were checked, image loads and console output were verified, and the homepage was checked at 1440, 1280, 768 and 375 pixels with no horizontal overflow. Changes are recorded in the next Git checkpoint.

## Previous Git checkpoint

- `f6b6ad0` — simplified Renuka Tailors website.

## Deployment notes

- Set `VITE_SITE_URL` to the public domain before deployment so canonical URLs and the sitemap use the correct origin.
- Confirm the phone numbers and WhatsApp availability before publishing.
- Replace the visual-reference photos with approved shop or garment photos whenever they become available.
- There is no online stock catalogue or booking backend in this project. Appointment requests are completed by the customer in WhatsApp.
- Review the privacy and terms copy before publishing.
