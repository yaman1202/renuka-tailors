import { ArrowRight, Scissors } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { business } from './data/business'

const services = [
  { slug: 'womens-wear', name: 'Women’s wear', text: 'Discuss traditional and contemporary women’s garments with the team.' },
  { slug: 'professional-tailoring', name: 'Professional tailoring', text: 'Talk through your garment, fit and finishing requirements with the team.' },
  { slug: 'embroidery', name: 'Embroidery work', text: 'Ask about embroidery styles and the details you have in mind.' },
  { slug: 'fashion-design', name: 'Fashion design consultation', text: 'Professional fashion designers are available to discuss your ideas.' },
]

export function ServicesIndexPage() {
  return <main className="simple-page"><section className="page-intro"><p className="eyebrow">SERVICES</p><h1>Women’s wear, thoughtful tailoring.</h1><p>Visit Renuka Tailors to discuss your design and garment requirements with the team.</p></section><section className="page-content"><div className="service-list service-list-page">{services.map((service, index) => <article key={service.slug}><span>0{index + 1}</span><Scissors size={19} /><h2>{service.name}</h2><p>{service.text}</p></article>)}</div><p className="service-note">The business has professional fashion designers, more than 100 workers and latest technology machines.</p><Link className="button button-primary" to="/appointment">Discuss your request <ArrowRight size={15} /></Link></section></main>
}

export function ServiceDetailPage() {
  const { category = '' } = useParams()
  const item = services.find(service => category === service.slug)
  if (!item) return <ServicesIndexPage />
  return <main className="simple-page"><section className="page-intro"><p className="eyebrow">RENUKA TAILORS · MEERUT</p><h1>{item.name}.</h1><p>{item.text}</p></section><section className="page-content"><h2>Let’s discuss what you need.</h2><p>Visit or call the team to check the options for your garment or design.</p><p>{business.address.value}</p><Link className="button button-primary" to="/appointment">Request an appointment <ArrowRight size={15} /></Link></section></main>
}

const references = [
  { src: '/images/teal-saree.jpg', alt: 'Woman wearing a teal sari in a portrait', title: 'Traditional wear', credit: 'Alena Darmel · Pexels' },
  { src: '/images/bridal-saree.jpg', alt: 'Bride wearing traditional red and gold attire', title: 'Bridal styling', credit: 'Pexels' },
  { src: '/images/embroidered-sari.jpg', alt: 'Woman wearing an embroidered teal sari', title: 'Embroidery detail', credit: 'Aman Ajimal · Pexels' },
]

export function LookbookPage() {
  return <main className="simple-page"><section className="page-intro"><p className="eyebrow">STYLE REFERENCES</p><h1>A lookbook of ideas.</h1><p>These licensed photographs are here for visual inspiration. They are not products in stock or examples of completed Renuka Tailors work.</p></section><section className="page-content gallery-page"><div className="lookbook-grid">{references.map((photo, index) => <figure className={`lookbook-item lookbook-${index + 1}`} key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption><span>{photo.title}</span><small>{photo.credit} · style reference</small></figcaption></figure>)}</div><div className="inventory-note"><span className="inventory-mark"><Scissors size={19} /></span><div><strong>Ask about current styles</strong><p>There is no online inventory catalogue. Call or visit the shop for current availability.</p></div><Link className="text-link" to="/contact">Contact the shop <ArrowRight size={15} /></Link></div></section></main>
}
