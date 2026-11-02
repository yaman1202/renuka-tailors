import type { ReactNode } from 'react'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { business } from './data/business'
import { EnquiryForm } from './components/EnquiryForm'

function PageIntro({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <section className="page-intro"><p className="eyebrow">{label}</p><h1>{title}</h1>{children && <div>{children}</div>}</section>
}

export function AboutPage() {
  return <main className="simple-page">
    <PageIntro label="ABOUT RENUKA TAILORS" title="Women’s wear and tailoring in Meerut."><p>Founded by Vijay Gautam in 1998. Happily serving more than 10,000 customers.</p></PageIntro>
    <section className="page-content boutique-page-content">
      <figure className="boutique-photo boutique-editorial-photo"><img src="/images/renuka-tailors-store.jpg" alt="Renuka Tailors storefront with illuminated signage and shop entrance" loading="lazy" /><figcaption>Renuka Tailors · Sadar Bazar, Meerut</figcaption></figure>
      <div className="about-page-copy boutique-page-copy"><p className="eyebrow">OUR BOUTIQUE</p><h2>More Than a Boutique, A Place for Creativity and Craftsmanship.</h2><p>Step into Renuka Tailors, where personalised women's tailoring meets creativity and craftsmanship. Our boutique is dedicated to creating outfits with care, attention to detail and a passion for beautiful designs.</p>
        <div className="boutique-values">
          <section><h3>Our Story</h3><p>Founded by Vijay Gautam in 1998, Renuka Tailors has grown through a lasting commitment to personalised women’s wear and tailoring.</p></section>
          <section><h3>Our Craftsmanship</h3><p>Professional fashion designers, modern machines, a team of more than 100 members and embroidery expertise bring ideas to life.</p></section>
          <section><h3>Our Commitment</h3><p>We listen closely, give thoughtful attention to every detail and work to make each outfit feel special to the person wearing it.</p></section>
          <section><h3>Why Choose Renuka Tailors</h3><p>More than 10,000 customers have trusted our experience, creative care and personalised approach.</p></section>
        </div>
        <div className="boutique-page-visit"><p><strong>Visit our boutique</strong><br />{business.address.value}</p><a className="text-link" href={business.directionsUrl.value} target="_blank" rel="noreferrer">Get directions <ArrowRight size={15} /></a></div>
      </div>
    </section>
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
