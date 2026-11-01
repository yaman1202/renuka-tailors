import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business } from './data/business'

export function BookingPage() {
  return <main className="simple-page"><section className="page-intro"><p className="eyebrow">VISIT THE SHOP</p><h1>Let’s discuss your garment.</h1><p>Call or message Renuka Tailors before you visit.</p></section><section className="page-content booking-contact"><a className="button button-primary" href={`tel:+91${business.phone.value}`}>Call +91 99271 44263 <ArrowRight size={15} /></a><a className="text-link" href={`https://wa.me/${business.whatsapp.value}`} target="_blank" rel="noreferrer">Message on WhatsApp <ArrowRight size={15} /></a><Link className="text-link" to="/location">Shop location <ArrowRight size={15} /></Link></section></main>
}
