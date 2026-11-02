import { ArrowRight, Scissors } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { business } from './data/business'
import { collectionPhotos, servicePhotos, type ServicePhoto } from './data/photos'
import { PhotoGallery } from './components/PhotoGallery'
import { NotFoundPage } from './components/NotFoundPage'

const legacyServices = [
  { slug: 'professional-tailoring', name: 'Professional tailoring', text: 'Talk through your garment, fit and finishing requirements with the team.' },
  { slug: 'fashion-design', name: 'Fashion design consultation', text: 'Professional fashion designers are available to discuss your ideas.' },
]

function ServicePhotoCard({ service, index }: { service: ServicePhoto; index: number }) {
  return <Link className="service-page-card" to={`/services/${service.slug}`}>
    <span className="service-page-image"><img src={service.src} alt={service.alt} loading="lazy" style={service.position ? { objectPosition: service.position } : undefined} /></span>
    <span className="service-page-number">0{index + 1}</span><h2>{service.title}</h2><p>{service.description}</p><span className="text-link">Explore service <ArrowRight size={15} /></span>
  </Link>
}

export function ServicesIndexPage() {
  return <main className="simple-page"><section className="page-intro"><p className="eyebrow">SERVICES</p><h1>Women’s wear, thoughtfully tailored.</h1><p>Visit Renuka Tailors to discuss your design and garment requirements with the team.</p></section><section className="page-content service-page-content"><div className="service-page-grid">{servicePhotos.map((service, index) => <ServicePhotoCard key={service.slug} service={service} index={index} />)}</div><p className="service-note">Photographs are style references only. Ask the team about tailoring options for your request. The business has professional fashion designers, more than 100 workers and modern machines.</p><div className="legacy-service-links"><span>More ways to work with us</span>{legacyServices.map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.name} <ArrowRight size={14} /></Link>)}</div><Link className="button button-primary" to="/appointment">Discuss your request <ArrowRight size={15} /></Link></section></main>
}

export function ServiceDetailPage() {
  const { category = '' } = useParams()
  const item = servicePhotos.find((service) => category === service.slug)
  const legacy = legacyServices.find((service) => category === service.slug)
  if (!item && !legacy) return <NotFoundPage backTo="/services" backLabel="Browse our services" />
  const title = item?.title ?? legacy!.name
  const text = item?.description ?? legacy!.text
  return <main className="simple-page"><section className="page-intro"><p className="eyebrow">RENUKA TAILORS · MEERUT</p><h1>{title}.</h1><p>{text}</p></section><section className={`page-content service-detail-content${item ? '' : ' service-detail-text-only'}`}>
    {item && <figure><img src={item.src} alt={item.alt} style={item.position ? { objectPosition: item.position } : undefined} /><figcaption>Style reference · not a Renuka Tailors product</figcaption></figure>}
    <div><p className="eyebrow">LET’S DISCUSS WHAT YOU NEED</p><h2>Made around your request.</h2><p>Bring your ideas and talk with the team about the garment, fit, design and finishing you have in mind.</p><p>{business.address.value}</p><Link className="button button-primary" to="/appointment">Request an appointment <ArrowRight size={15} /></Link></div>
  </section></main>
}

export function LookbookPage() {
  return <main className="simple-page"><section className="page-intro"><p className="eyebrow">STYLE REFERENCES</p><h1>A lookbook of ideas.</h1><p>These licensed photographs are here for visual inspiration. They are not products in stock or examples of completed Renuka Tailors work.</p></section><section className="page-content gallery-page"><PhotoGallery photos={collectionPhotos} label="View larger style reference" className="photo-gallery--lookbook" /><div className="inventory-note"><span className="inventory-mark"><Scissors size={19} /></span><div><strong>Ask about current styles</strong><p>There is no online inventory catalogue. Call or visit the shop for current availability.</p></div><Link className="text-link" to="/contact">Contact the shop <ArrowRight size={15} /></Link></div></section></main>
}
