import { useMemo, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { DEMO_MODE, isVisibleInCurrentMode } from './data/business'
import { deliveryEstimates } from './data/delivery-estimates'
import { faqs } from './data/faqs'
import { gallery } from './data/gallery'
import { pricing } from './data/pricing'
import { services } from './data/services'
import { DemoBadge } from './components/DemoBadge'
import { AppointmentCTA, PageHero, PageTitle, RelatedLinks } from './components/EditorialPage'

const categoryNarrative: Record<string, { title: string; emphasis: string; eyebrow: string; detail: string; display: string[]; priceCategory: string }> = {
  'womens-wear': { title: 'A wardrobe,', emphasis: 'made personal.', eyebrow: 'THE WOMEN’S EDIT', detail: 'An illustrative collection of tailored classics and occasion silhouettes. These sample categories are shown to help explore the website and require confirmation from the shop.', display: ['Salwar Kameez', 'Straight suits', 'Blouses', 'Kurtis', 'Occasion looks'], priceCategory: "Women's Wear" },
  'mens-wear': { title: 'The details', emphasis: 'make the look.', eyebrow: 'THE MEN’S EDIT · DEMO', detail: 'A preview of possible shirts, trousers and occasion tailoring. These garment categories are demonstration content and are not confirmed Renuka Tailors services.', display: ['Shirts', 'Trousers', 'Formalwear', 'Kurta Pyjama', 'Custom suits'], priceCategory: "Men's Wear" },
  'kids-wear': { title: 'Small looks,', emphasis: 'big moments.', eyebrow: 'THE LITTLE OCCASIONS · DEMO', detail: 'A sample edit of festive, birthday and traditional outfit ideas for children. Service availability requires confirmation.', display: ['Festive wear', 'Birthday outfits', 'Traditional looks', 'Kids dresses'], priceCategory: 'Kids Wear' },
  'salwar-kameez': { title: 'A classic,', emphasis: 'shaped by you.', eyebrow: 'THE LISTED CATEGORY', detail: 'Salwar Kameez Tailoring is the category identified in the supplied business listing. Visit the shop to discuss your preferred silhouette, fabric and fit. Specific styles below are illustrative inspirations.', display: ['Straight suits', 'Anarkali suits', 'Palazzo suits', 'Punjabi suits', 'Churidar suits'], priceCategory: "Women's Wear" },
  'custom-tailoring': { title: 'A thought,', emphasis: 'made tangible.', eyebrow: 'CUSTOM TAILORING · DEMO', detail: 'A sample service page for exploring a made-to-measure conversation. The availability of custom design services has not been confirmed.', display: ['Custom design ideas', 'Festive clothing', 'Party wear', 'Special occasion looks'], priceCategory: 'Custom & Designer' },
  alterations: { title: 'A better fit,', emphasis: 'in the details.', eyebrow: 'ALTERATIONS · DEMO', detail: 'Illustrative alteration and garment repair categories. Please confirm directly with the shop whether these services are available.', display: ['Length adjustments', 'Waist adjustments', 'Sleeve alterations', 'Fitting corrections', 'Garment repairs'], priceCategory: 'Alterations' },
  'designer-wear': { title: 'Dress for', emphasis: 'the moment.', eyebrow: 'DESIGNER WEAR · DEMO', detail: 'A sample inspiration edit for festive and special-occasion wear. These ideas are not a confirmed catalogue of Renuka Tailors services.', display: ['Festive clothing', 'Party wear', 'Custom designs', 'Special occasions'], priceCategory: 'Custom & Designer' },
}

export function ServicesIndexPage() {
  const visibleServices = services.filter(item => isVisibleInCurrentMode(item.status))
  return <main className="page-main">
    <PageHero eyebrow="THE STITCHING ATELIER" title="Made around" emphasis="your idea." description={DEMO_MODE ? 'Explore the listed tailoring category alongside clearly marked sample categories in this website preview.' : 'Explore the currently listed tailoring category and visit the shop to discuss your garment.'} image={services[0].image} />
    <section className="page-section page-section-wide"><PageTitle eyebrow="01 / SERVICE CATEGORIES" title="Find your" emphasis="starting point."><p>{DEMO_MODE ? 'The supplied listing confirms Salwar Kameez Tailoring. Other categories below are sample concepts for demonstration.' : 'The supplied listing confirms Salwar Kameez Tailoring. Visit the shop to discuss the garment you have in mind.'}</p></PageTitle>
      <div className="category-editorial-grid">{visibleServices.map((service, i) => <Link className="category-editorial-card" to={service.path} key={service.slug}>
        <div className="category-card-image"><img src={service.image} alt={`Editorial inspiration for ${service.name}`} loading="lazy" /><span>0{i + 1}</span><ArrowUpRight /></div><div className="category-card-copy"><p>{service.status === 'verified' ? 'LISTED CATEGORY' : 'SAMPLE CATEGORY'} <DemoBadge status={service.status} /></p><h3>{service.name}</h3><span>{service.description}</span></div>
      </Link>)}</div>
    </section><AppointmentCTA title="Bring an idea to the shop." />
  </main>
}

export function ServiceDetailPage() {
  const { category = '' } = useParams()
  const item = services.find(service => service.slug === category)
  const content = categoryNarrative[category]
  if (!item || !content || !isVisibleInCurrentMode(item.status)) return <ServicesIndexPage />
  const examples = item.items.filter(x => isVisibleInCurrentMode(x.status))
  const estimate = deliveryEstimates.find(x => x.service === (category === 'salwar-kameez' ? 'Basic stitching' : category === 'alterations' ? 'Simple alterations' : 'Standard custom outfits'))
  const prices = DEMO_MODE ? pricing.filter(x => category === 'salwar-kameez' ? x.service === 'Basic Salwar Suit' : x.category === content.priceCategory) : []
  const pageFaqs = faqs.slice(category === 'salwar-kameez' ? 0 : 2, category === 'salwar-kameez' ? 4 : 6).filter(faq => isVisibleInCurrentMode(faq.status))
  const related = services.filter(x => x.slug !== category && isVisibleInCurrentMode(x.status)).slice(0, 3)
  return <main className="page-main">
    <PageHero eyebrow={content.eyebrow} title={content.title} emphasis={content.emphasis} description={content.detail} image={item.image} status={item.status} />
    <section className="page-section service-detail-intro"><PageTitle eyebrow="01 / A CLOSER LOOK" title="Start with" emphasis="a conversation."><p>{content.detail}</p></PageTitle><div className="style-list"><p className="eyebrow">GARMENT IDEAS <DemoBadge status={item.status} /></p>{examples.map((garment, i) => <div className="style-line" key={garment.name}><span>0{i + 1}</span><strong>{garment.name}</strong><ArrowUpRight size={16} /></div>)}</div></section>
    <section className="service-inspiration"><div className="service-inspiration-copy"><p className="section-kicker">02 / THE MOODBOARD</p><h2>Ideas for<br /><em>what comes next.</em></h2><p>These editorial images are illustrative references, not completed Renuka Tailors garments.</p><DemoBadge /></div><div className="service-image-pair">{gallery.slice(category === 'mens-wear' ? 5 : 0, category === 'mens-wear' ? 6 : 2).map(photo => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption>{photo.category.toUpperCase()} · SAMPLE INSPIRATION</figcaption></figure>)}</div></section>
    <section className="page-section service-estimates"><PageTitle eyebrow="03 / PLANNING A GARMENT" title="A guide for" emphasis="your visit."><p>Sample information is for preview only and needs confirmation before it can represent shop pricing or timing.</p></PageTitle>
      {DEMO_MODE ? <div className="estimate-row"><div><span>INDICATIVE STITCHING PRICE</span><strong>{prices.length ? `₹${Math.min(...prices.map(x => x.low)).toLocaleString('en-IN')} – ₹${Math.max(...prices.map(x => x.high)).toLocaleString('en-IN')}` : 'Ask for a quote'}</strong><DemoBadge>DEMO ESTIMATE</DemoBadge></div><div><span>ILLUSTRATIVE TIMELINE</span><strong>{estimate?.estimate ?? 'Needs confirmation'}</strong><DemoBadge>OWNER CONFIRMATION NEEDED</DemoBadge></div></div> : <div className="estimate-row"><div><span>PRICING</span><strong>Ask at the shop</strong></div><div><span>TIMING</span><strong>Confirm at consultation</strong></div></div>}
      <p className="estimate-disclaimer">Final pricing and timing depend on garment details and shop workload. Preview estimates are not confirmed Renuka Tailors prices or delivery commitments.</p>
    </section>
    <section className="page-section service-faq"><PageTitle eyebrow="04 / BEFORE YOU VISIT" title="A few useful" emphasis="notes." />{pageFaqs.map(faq => <details className="faq-row" key={faq.question}><summary>{faq.question}<ChevronDown size={17} /></summary><p>{faq.answer} <DemoBadge status={faq.status} /></p></details>)}</section>
    <section className="page-section related-section"><PageTitle eyebrow="05 / MORE TO EXPLORE" title="Related" emphasis="categories."/><RelatedLinks paths={related.map(s => ({ title: s.name, to: s.path, label: s.status === 'verified' ? 'LISTED' : 'DEMO' }))} /></section>
    <AppointmentCTA title="Have a garment in mind?" description="Visit Renuka Tailors in Sadar Chowk Bazar to begin with a conversation." />
  </main>
}

export function LookbookPage() {
  const categories = ['All', ...Array.from(new Set(gallery.map(photo => photo.category)))]
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState<number | null>(null)
  const images = useMemo(() => gallery.filter(photo => active === 'All' || photo.category === active), [active])
  if (!DEMO_MODE) return <main className="page-main"><section className="page-section"><PageTitle eyebrow="LOOKBOOK" title="A place for" emphasis="approved work."><p>Lookbook imagery will appear here when approved shop photography is available.</p></PageTitle></section></main>
  return <main className="page-main">
    <PageHero eyebrow="A RENUKA TAILORS LOOKBOOK" title="Colour, cut" emphasis="& character." description="A collection of sample fashion inspiration. These images are not actual Renuka Tailors work or customer orders." image={gallery[0].src} />
    <section className="page-section page-section-wide"><PageTitle eyebrow="01 / THE LOOKBOOK" title="A place for" emphasis="ideas."><p>Use this visual reference gallery to explore moods and garment categories. Replace sample images with approved shop photography when available.</p></PageTitle>
      <div className="gallery-filters" role="group" aria-label="Filter lookbook by category">{categories.map(category => <button className={active === category ? 'active' : ''} onClick={() => setActive(category)} key={category}>{category}</button>)}</div>
      <div className="lookbook-masonry">{images.map((photo, index) => <button className="lookbook-tile" onClick={() => setSelected(index)} key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><span>{photo.category.toUpperCase()} · DEMO INSPIRATION</span></button>)}</div>
      <p className="gallery-note">All imagery on this page is sample editorial inspiration, not completed garments by Renuka Tailors.</p>
    </section>
    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Lookbook image preview" onClick={() => setSelected(null)}><button className="lightbox-close" aria-label="Close image preview" onClick={() => setSelected(null)}>×</button><img src={images[selected].src} alt={images[selected].alt} /><p>{images[selected].alt} · SAMPLE INSPIRATION</p></div>}
    <AppointmentCTA title="Let inspiration meet your idea." />
  </main>
}
