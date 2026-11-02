import type { ReactNode } from 'react'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { business } from './data/business'
import { aboutPhotos } from './data/photos'
import { EnquiryForm } from './components/EnquiryForm'

function PageIntro({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <section className="page-intro"><p className="eyebrow">{label}</p><h1>{title}</h1>{children && <div>{children}</div>}</section>
}

export function AboutPage() {
  return <main className="simple-page">
    <PageIntro label="ABOUT RENUKA TAILORS" title="Women’s wear and tailoring in Meerut."><p>Founded by Vijay Gautam in 1998. Happily serving more than 10,000 customers.</p></PageIntro>
    <section className="page-content about-page-content"><div className="about-page-photos">{aboutPhotos.map((photo) => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption>{photo.note}</figcaption></figure>)}</div><div className="about-page-copy"><p className="eyebrow">THE BUSINESS</p><h2>Thoughtful work, shaped around you.</h2><p>Renuka Tailors specialises in women’s wear and professional tailoring. The business has professional fashion designers, latest technology machines, a team of more than 100 workers, and all types of embroidery work.</p><div className="facts-grid"><div><strong>1998</strong><span>Established</span></div><div><strong>Vijay Gautam</strong><span>Founder</span></div><div><strong>100+</strong><span>Team members</span></div><div><strong>Embroidery</strong><span>All types of work</span></div></div><h2>Visit the shop</h2><p>{business.address.value}</p><a className="text-link" href={business.directionsUrl.value} target="_blank" rel="noreferrer">Get directions <ArrowRight size={15} /></a><small className="reference-note">Photographs are illustrative style references, not images of the shop or its customers.</small></div></section>
  </main>
}

export function LocationPage() {
  return <main className="simple-page">
    <PageIntro label="LOCATION" title="Visit us in Meerut."><p>{business.address.value}</p></PageIntro>
    <section className="page-content location-content"><div className="location-links"><h2>Renuka Tailors</h2><p>{business.address.value}</p><a className="button button-primary" href={business.directionsUrl.value} target="_blank" rel="noreferrer"><MapPin size={16} /> Get directions</a><a className="text-link" href={business.mapsUrl.value} target="_blank" rel="noreferrer">Google Maps listing <ArrowRight size={15} /></a></div><iframe title="Map showing Renuka Tailors in Meerut" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${business.coordinates.latitude},${business.coordinates.longitude}&z=16&output=embed`} /></section>
  </main>
}

export function ContactPage() {
  return <main className="simple-page">
    <PageIntro label="CONTACT" title="Talk to the shop."><p>Call Renuka Tailors, send a question or visit us at {business.address.value}.</p></PageIntro>
    <section className="page-content contact-page-content"><div className="contact-page-details"><div className="contact-number-list"><a href={`tel:+91${business.phone.value}`}><Phone size={18} /><span><small>PHONE</small>+91 99271 44263</span></a><a href={`tel:+91${business.secondPhone.value}`}><Phone size={18} /><span><small>PHONE</small>+91 79065 01679</span></a><a href={`https://wa.me/${business.whatsapp.value}`} target="_blank" rel="noreferrer"><span><small>WHATSAPP</small>Message the shop</span><ArrowRight size={16} /></a></div><div className="contact-directions"><h2>Visit us</h2><p>{business.address.value}</p><a className="button button-primary" href={business.directionsUrl.value} target="_blank" rel="noreferrer"><MapPin size={16} /> Get directions</a></div></div><EnquiryForm /></section>
  </main>
}
