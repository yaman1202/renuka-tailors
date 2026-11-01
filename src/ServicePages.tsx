import { ArrowRight, Scissors } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { business } from './data/business'

const services = [
  { name: 'Women’s wear', text: 'Women’s wear made with professional tailoring.' },
  { name: 'Fashion design', text: 'Professional fashion designers are available.' },
  { name: 'Embroidery', text: 'All types of embroidery work.' },
]

export function ServicesIndexPage() {
  return <main className="simple-page"><section className="page-intro"><p className="eyebrow">SERVICES</p><h1>Women’s wear and professional tailoring.</h1><p>Visit Renuka Tailors to discuss your design and garment requirements.</p></section><section className="page-content"><div className="service-list service-list-page">{services.map((service, index) => <article key={service.name}><span>0{index + 1}</span><Scissors size={19} /><h2>{service.name}</h2><p>{service.text}</p></article>)}</div><p className="service-note">The team includes professional fashion designers and more than 100 workers, with latest technology machines.</p><Link className="button button-primary" to="/contact">Contact the shop <ArrowRight size={15} /></Link></section></main>
}

export function ServiceDetailPage() {
  const { category = '' } = useParams()
  const item = services.find(service => category === service.name.toLowerCase().replace(/[^a-z]+/g, '-'))
  if (!item && category !== 'salwar-kameez' && category !== 'womens-wear' && category !== 'women-s-wear') return <ServicesIndexPage />
  const title = item?.name ?? 'Women’s wear'
  return <main className="simple-page"><section className="page-intro"><p className="eyebrow">RENUKA TAILORS · MEERUT</p><h1>{title}.</h1><p>Speak with our team about the garment or embroidery work you have in mind.</p></section><section className="page-content"><h2>Visit or call us</h2><p>{business.address.value}</p><Link className="button button-primary" to="/contact">Contact Renuka Tailors <ArrowRight size={15} /></Link></section></main>
}

export function LookbookPage() {
  return <main className="simple-page"><section className="page-intro"><p className="eyebrow">OUR WORK</p><h1>Renuka Tailors collection.</h1><p>We’ll add photographs of our garments and embroidery here when they’re available.</p></section><section className="page-content empty-work"><Scissors size={27} strokeWidth={1.4} /><h2>Photos coming soon</h2><p>For current styles and work samples, please contact or visit the shop.</p><Link className="text-link" to="/contact">Contact the shop <ArrowRight size={15} /></Link></section></main>
}
