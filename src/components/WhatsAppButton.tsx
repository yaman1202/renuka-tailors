import { MessageCircle } from 'lucide-react'
import { business } from '../data/business'

export function WhatsAppButton() {
  const message = encodeURIComponent(business.whatsappTemplates.values[0])
  return <a className="whatsapp-control" href={`https://wa.me/${business.whatsapp.value}?text=${message}`} target="_blank" rel="noreferrer" aria-label="Message Renuka Tailors on WhatsApp"><MessageCircle size={18} /><span>WhatsApp</span></a>
}
