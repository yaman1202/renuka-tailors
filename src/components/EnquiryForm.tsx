import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { business } from '../data/business'

export function EnquiryForm() {
  const [error, setError] = useState('')
  const [whatsappLink, setWhatsappLink] = useState('')

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
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
      'Hello Renuka Tailors, I would like to ask about tailoring.',
      `Name: ${String(data.get('name') ?? '').trim()}`,
      `Phone: ${String(data.get('phone') ?? '').trim()}`,
      `Garment or service: ${String(data.get('service') ?? '').trim()}`,
      `Message: ${String(data.get('message') ?? '').trim()}`,
    ].join('\n')
    setError('')
    setWhatsappLink(`https://wa.me/${business.whatsapp.value}?text=${encodeURIComponent(message)}`)
  }

  return <form className="contact-enquiry-form" onSubmit={prepareEnquiry}>
    <p className="eyebrow">SEND A QUESTION</p>
    <h2>What can we help with?</h2>
    <p className="contact-enquiry-intro">Fill this in and review the message in WhatsApp before sending it to the shop.</p>
    <label>Your name<input name="name" autoComplete="name" required /></label>
    <label>Mobile number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
    <label>Garment or service<input name="service" placeholder="For example, blouse or embroidery" required /></label>
    <label>Your question<textarea name="message" rows={4} required /></label>
    <button className="button button-primary" type="submit">Prepare WhatsApp message <ArrowRight size={15} /></button>
    <p className="form-disclaimer">This website does not store your details or send the message automatically.</p>
    {error && <p className="form-message" role="alert">{error}</p>}
    {whatsappLink && <div className="form-message" role="status"><p>Your message is ready. Review it and tap Send in WhatsApp to contact the shop.</p><a className="text-link" href={whatsappLink} target="_blank" rel="noopener noreferrer">Open WhatsApp draft <ArrowRight size={15} /></a></div>}
  </form>
}
