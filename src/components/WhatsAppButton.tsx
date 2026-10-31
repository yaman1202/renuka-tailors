import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { business, DEMO_MODE } from '../data/business'

export function WhatsAppButton() {
  const [message, setMessage] = useState('')
  const enabled = business.whatsapp.status === 'verified' && Boolean(business.whatsapp.value)
  if (!DEMO_MODE && !enabled) return null
  const number = business.whatsapp.value.replace(/\D/g, '')
  return <div className="whatsapp-control">{message && <p role="status">{message}</p>}{DEMO_MODE || !enabled ? <button type="button" aria-label="Simulated WhatsApp enquiry" onClick={() => { setMessage('WhatsApp is simulated in this preview. No number has been confirmed.'); window.setTimeout(() => setMessage(''), 3500) }}><MessageCircle size={18} /><span>WhatsApp</span><small>PREVIEW</small></button> : <a href={`https://wa.me/${number}?text=${encodeURIComponent(business.whatsappTemplates.values[0])}`} target="_blank" rel="noreferrer" aria-label="Enquire with Renuka Tailors on WhatsApp"><MessageCircle size={18} /><span>WhatsApp</span></a>}</div>
}
