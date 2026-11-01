import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { business } from '../data/business'

export function FeedbackForm() {
  const [error, setError] = useState('')
  const [whatsappLink, setWhatsappLink] = useState('')

  function sendFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setWhatsappLink('')
    const data = new FormData(event.currentTarget)
    const digits = String(data.get('phone') ?? '').replace(/\D/g, '')
    const localNumber = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits
    if (!/^[6-9]\d{9}$/.test(localNumber)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    const body = [
      'Private customer feedback for Renuka Tailors — 5% off my next order offer',
      `Name: ${String(data.get('name') ?? '').trim()}`,
      `Contact: ${String(data.get('phone') ?? '').trim()}`,
      `Feedback: ${String(data.get('feedback') ?? '').trim()}`,
    ].join('\n')
    const url = `https://wa.me/${business.whatsapp.value}?text=${encodeURIComponent(body)}`
    setError('')
    setWhatsappLink(url)
  }

  return <form className="feedback-form" onSubmit={sendFeedback}>
    <h3>Private feedback</h3>
    <p>Send feedback directly to the shop to claim 5% off your next order. This offer does not depend on posting a Google review. No information is stored on this website.</p>
    <label>Your name<input name="name" autoComplete="name" required /></label>
    <label>Contact number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
    <label>Your feedback<textarea name="feedback" rows={4} required /></label>
    <button className="button button-primary" type="submit">Prepare WhatsApp message <ArrowRight size={15} /></button>
    {error && <p className="form-message" role="alert">{error}</p>}
    {whatsappLink && <div className="form-message" role="status"><p>Review your message in WhatsApp and tap Send there. This website does not store your feedback.</p><a className="text-link" href={whatsappLink} target="_blank" rel="noreferrer">Open WhatsApp draft <ArrowRight size={15} /></a></div>}
  </form>
}
