import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, Check, Clock3, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business, DEMO_MODE, isVisibleInCurrentMode } from './data/business'
import { businessHours } from './data/business-hours'
import { services } from './data/services'
import { DemoBadge } from './components/DemoBadge'
import { PageHero, PageTitle } from './components/EditorialPage'

type FormValues = { name: string; phone: string; email: string; service: string; garment: string; date: string; time: string; instructions: string }
const emptyForm: FormValues = { name: '', phone: '', email: '', service: '', garment: '', date: '', time: '', instructions: '' }
const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM']
const localToday = () => { const today = new Date(); return `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(2, '0')}-${`${today.getDate()}`.padStart(2, '0')}` }

export function BookingPage() {
  const availableServices = services.filter(item => isVisibleInCurrentMode(item.status))
  const [values, setValues] = useState(emptyForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [complete, setComplete] = useState(false)
  const endpointEnabled = business.enquiryEndpoint.status === 'verified' && Boolean(business.enquiryEndpoint.value)
  const selectedService = availableServices.find(item => item.slug === values.service)
  const garmentOptions = useMemo(() => selectedService?.items.filter(item => isVisibleInCurrentMode(item.status)) ?? [], [selectedService])
  const update = (field: keyof FormValues, value: string) => setValues(current => ({ ...current, [field]: value, ...(field === 'service' ? { garment: '' } : {}) }))

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting || complete) return
    const digits = values.phone.replace(/\D/g, '')
    const localPhone = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits
    if (!/^[6-9]\d{9}$/.test(localPhone)) { setError('Enter a valid 10-digit Indian mobile number.'); return }
    if (values.date < localToday()) { setError('Choose today or a future date.'); return }
    setError('')
    setSubmitting(true)
    try {
      const payload = { ...values, phone: `+91${localPhone}`, business: business.name.value, demo: DEMO_MODE }
      if (DEMO_MODE) {
        await new Promise(resolve => window.setTimeout(resolve, 450))
      } else if (endpointEnabled) {
        const response = await fetch(business.enquiryEndpoint.value, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!response.ok) throw new Error('The enquiry could not be sent. Please try again or visit the shop.')
      } else {
        throw new Error('Online enquiries are not available yet. Please visit the shop to arrange a conversation.')
      }
      setComplete(true)
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return <main className="page-main"><PageHero eyebrow="A PERSONAL START" title="Let’s talk" emphasis="about your idea." description={DEMO_MODE ? 'Share a few details to prepare for a shop visit. Demo enquiries stay in this page and are not sent anywhere.' : 'Online enquiries are not currently connected. Visit the shop to discuss your tailoring needs.'} image="https://images.unsplash.com/photo-1708234165852-89c978e5e33d?auto=format&fit=crop&w=1800&q=85" />
    <section className="page-section booking-layout"><div className="booking-intro"><PageTitle eyebrow="01 / PLAN A VISIT" title="Tell us what" emphasis="you have in mind."><p>{DEMO_MODE ? 'Use this preview form to test the enquiry experience. No appointment is confirmed by submitting it.' : 'Online enquiries are not connected. Visit the shop to discuss a garment.'}</p></PageTitle><div className="booking-detail"><MapPin size={17} /><div><span>VISIT THE SHOP</span><p>{business.address.value}</p><a href={business.directionsUrl.value} target="_blank" rel="noreferrer">Open directions <ArrowRight size={14} /></a></div></div>{DEMO_MODE && businessHours.map(item => <div className="hours-line" key={item.day}><Clock3 size={16} /><span>{item.day}</span><strong>{item.hours}</strong><DemoBadge status={item.status}>DEMO HOURS</DemoBadge></div>)}{DEMO_MODE && <p className="fine-print">Hours are sample values for preview only. Please confirm directly with the shop.</p>}</div>
      <div className="booking-form-wrap">{complete ? <div className="form-success" role="status"><span><Check size={22} /></span><p className="eyebrow">PREVIEW COMPLETE</p><h2>Your sample enquiry<br /><em>is ready.</em></h2><p>{DEMO_MODE ? 'This was a demo interaction only. No message was sent and no appointment has been booked.' : 'Your enquiry was submitted successfully.'}</p><button className="text-link dark-link" onClick={() => { setComplete(false); setValues(emptyForm) }}>Create another enquiry <ArrowRight size={14} /></button></div> : !DEMO_MODE && !endpointEnabled ? <div className="production-form-note"><p className="eyebrow">ENQUIRIES NOT YET CONNECTED</p><h2>Visit us<br /><em>in Meerut.</em></h2><p>An online receiving method has not been confirmed. The enquiry form is disabled until the business provides a verified submission endpoint.</p><Link className="button button-dark" to="/location">View store details <ArrowRight size={15} /></Link></div> : <form className="booking-form" onSubmit={submit}>
        <div className="booking-form-heading"><p className="eyebrow">ENQUIRY DETAILS</p><h2>A few things<br /><em>to get started.</em></h2><DemoBadge>{DEMO_MODE ? 'DEMO FORM · NOT SENT' : 'CONNECTED FORM'}</DemoBadge></div>
        <div className="form-grid"><label>YOUR NAME <input required autoComplete="name" value={values.name} onChange={event => update('name', event.target.value)} placeholder="Name" /></label><label>PHONE NUMBER <input required type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={event => update('phone', event.target.value)} placeholder="10-digit mobile number" /></label><label className="form-full">EMAIL <span className="optional-label">OPTIONAL</span><input type="email" autoComplete="email" value={values.email} onChange={event => update('email', event.target.value)} placeholder="you@example.com" /></label><label>SERVICE<select required value={values.service} onChange={event => update('service', event.target.value)}><option value="">Select a category</option>{availableServices.map(item => <option value={item.slug} key={item.slug}>{item.name}{item.status === 'demo' ? ' · DEMO' : ''}</option>)}</select></label><label>GARMENT TYPE<select required disabled={!selectedService} value={values.garment} onChange={event => update('garment', event.target.value)}><option value="">{selectedService ? 'Choose a garment' : 'Select a service first'}</option>{garmentOptions.map(item => <option value={item.name} key={item.name}>{item.name}{item.status === 'demo' ? ' · DEMO' : ''}</option>)}</select></label><label>VISIT DATE<input type="date" required min={localToday()} value={values.date} onChange={event => update('date', event.target.value)} /></label><label>TIME PREFERENCE<select required value={values.time} onChange={event => update('time', event.target.value)}><option value="">Choose a time</option>{timeSlots.map(time => <option value={time} key={time}>{time}{DEMO_MODE ? ' · SAMPLE' : ''}</option>)}</select></label><label className="form-full">ANYTHING ELSE? <span className="optional-label">OPTIONAL</span><textarea rows={4} value={values.instructions} onChange={event => update('instructions', event.target.value)} placeholder="Share a few details about your idea" /></label></div>
        {error && <p className="form-error" role="alert">{error}</p>}<p className="form-privacy">Please do not include measurements or sensitive personal information. In demo mode, this form does not store or transmit your details.</p><button className="button button-dark form-submit" type="submit" disabled={submitting}>{submitting ? 'Preparing preview…' : DEMO_MODE ? 'Test demo enquiry' : 'Send enquiry'} <ArrowRight size={15} /></button>
      </form>}</div>
    </section>
  </main>
}
