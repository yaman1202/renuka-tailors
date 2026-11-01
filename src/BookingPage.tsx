import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business } from './data/business'

function today() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function BookingPage() {
  const [error, setError] = useState('')
  const [whatsappLink, setWhatsappLink] = useState('')

  function prepareRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setWhatsappLink('')
    const data = new FormData(event.currentTarget)
    const digits = String(data.get('phone') ?? '').replace(/\D/g, '')
    const phone = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    const message = [
      'Hello Renuka Tailors, I would like to request an appointment.',
      `Name: ${String(data.get('name') ?? '').trim()}`,
      `Phone: ${String(data.get('phone') ?? '').trim()}`,
      `Service: ${String(data.get('service') ?? '').trim()}`,
      `Preferred date: ${String(data.get('date') ?? '').trim()}`,
      `Requirement: ${String(data.get('requirement') ?? '').trim()}`,
    ].join('\n')
    setError('')
    setWhatsappLink(`https://wa.me/${business.whatsapp.value}?text=${encodeURIComponent(message)}`)
  }

  return <main className="simple-page booking-page">
    <section className="page-intro"><p className="eyebrow">BOOK AN APPOINTMENT</p><h1>Let’s discuss your garment.</h1><p>Tell us a little about what you need. We’ll prepare a WhatsApp message for the shop so you can review and send it.</p></section>
    <section className="page-content booking-layout"><form className="appointment-form" onSubmit={prepareRequest}>
      <h2>Appointment request</h2>
      <label>Your name<input name="name" autoComplete="name" required /></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
      <label>Service required<select name="service" defaultValue="" required><option value="" disabled>Select a service</option><option>Women’s wear</option><option>Professional tailoring</option><option>Embroidery work</option><option>Fashion design discussion</option><option>Other request</option></select></label>
      <label>Preferred appointment date<input name="date" type="date" min={today()} required /></label>
      <label>Brief description<textarea name="requirement" rows={4} placeholder="What would you like to discuss?" required /></label>
      <button className="button button-primary" type="submit">Request an appointment <ArrowRight size={15} /></button>
      <p className="form-disclaimer">Your details stay in this browser until you open WhatsApp. Nothing is sent automatically and this website does not store your form.</p>
      {error && <p className="form-message" role="alert">{error}</p>}
      {whatsappLink && <div className="form-message" role="status"><p>Your request is ready. Review the message and tap Send in WhatsApp to contact the shop.</p><a className="text-link" href={whatsappLink} target="_blank" rel="noopener noreferrer">Open WhatsApp draft <ArrowRight size={15} /></a></div>}
    </form>
    <aside className="booking-aside"><p className="eyebrow">A VISIT TO THE SHOP</p><h2>We’ll take it from there.</h2><p>Appointment availability and your request can be confirmed directly with the team.</p><a href={`tel:+91${business.phone.value}`}><Phone size={16} /> +91 99271 44263</a><a href={`tel:+91${business.secondPhone.value}`}><Phone size={16} /> +91 79065 01679</a><a href={business.directionsUrl.value} target="_blank" rel="noopener noreferrer"><MapPin size={16} /> Directions to the shop</a><p className="aside-address">{business.address.value}</p><Link className="text-link" to="/services">Browse services <ArrowRight size={15} /></Link></aside></section>
  </main>
}
