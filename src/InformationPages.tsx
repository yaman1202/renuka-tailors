import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { DEMO_MODE, isVisibleInCurrentMode } from './data/business'
import { blogPosts } from './data/blog'
import { faqs } from './data/faqs'
import { pricing, priceDisclaimer } from './data/pricing'
import { testimonials } from './data/testimonials'
import { DemoBadge } from './components/DemoBadge'
import { AppointmentCTA, PageHero, PageTitle } from './components/EditorialPage'

const money = (amount: number) => `₹${amount.toLocaleString('en-IN')}`

export function PricingPage() {
  const visiblePricing = pricing.filter(item => item.status === 'verified' || DEMO_MODE)
  const categories = ['All services', ...Array.from(new Set(visiblePricing.map(item => item.category)))]
  const [category, setCategory] = useState('All services')
  const [query, setQuery] = useState('')
  const [compare, setCompare] = useState<string[]>([])
  const results = useMemo(() => visiblePricing
    .filter(item => category === 'All services' || item.category === category)
    .filter(item => item.service.toLowerCase().includes(query.trim().toLowerCase())), [category, query])
  const toggleCompare = (service: string) => setCompare(current => current.includes(service) ? current.filter(item => item !== service) : current.length < 3 ? [...current, service] : current)
  const compared = results.filter(item => compare.includes(item.service))
  return <main className="page-main">
    <PageHero eyebrow="A CLEAR PLACE TO BEGIN" title="Indicative" emphasis="stitching prices." description={DEMO_MODE ? 'Explore illustrative estimates for planning a garment conversation. These are sample figures and are not confirmed shop prices.' : 'Current stitching prices have not been provided. Visit the shop to ask about a garment.'} image="https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1800&q=85" />
    <section className="page-section page-section-wide"><PageTitle eyebrow="01 / PRICE GUIDE" title="Know the" emphasis="possibilities."><p>{DEMO_MODE ? 'Final pricing depends on design, fabric, detailing and consultation. Ask at the shop for current confirmed prices.' : 'A confirmed price list is not available yet. Visit Renuka Tailors to ask about current pricing.'}</p></PageTitle>
      <div className="pricing-controls"><div className="price-search"><Search size={17} /><input aria-label="Search stitching prices" placeholder="Search a garment or service" value={query} onChange={event => setQuery(event.target.value)} /></div><div className="price-filters" role="group" aria-label="Filter prices by category">{categories.map(item => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></div>
      {DEMO_MODE && <p className="pricing-demo-note"><DemoBadge>DEMO ESTIMATES</DemoBadge><span>{priceDisclaimer}</span></p>}
      {!DEMO_MODE && results.length === 0 && <p className="empty-note">Current prices are not available on this preview. Please visit the shop to ask about a garment.</p>}
      <div className="pricing-grid">{results.map((item, index) => <article className="pricing-card" key={item.service}><div className="pricing-card-top"><span>0{index + 1} / {item.category.toUpperCase()}</span>{item.status === 'demo' && <DemoBadge />}</div><h3>{item.service}</h3><strong>{item.status === 'verified' || DEMO_MODE ? `${money(item.low)} – ${money(item.high)}` : 'Ask at the shop'}</strong><p>Estimated stitching range <span>· final quote depends on details</span></p><button className={compare.includes(item.service) ? 'compare-button selected' : 'compare-button'} aria-pressed={compare.includes(item.service)} onClick={() => toggleCompare(item.service)}>{compare.includes(item.service) ? 'Added to comparison ✓' : 'Add to comparison +'}</button></article>)}</div>
      {results.length === 0 && DEMO_MODE && <p className="empty-note">No estimates match your search. Try a different garment name or category.</p>}
      {compared.length > 0 && <section className="comparison-panel"><div className="comparison-heading"><div><p className="eyebrow">SIDE BY SIDE</p><h3>Compare sample estimates <DemoBadge /></h3></div><button onClick={() => setCompare([])}>Clear comparison</button></div><div className="comparison-table"><div className="comparison-row comparison-labels"><span>GARMENT</span>{compared.map(item => <strong key={item.service}>{item.service}</strong>)}</div><div className="comparison-row"><span>ILLUSTRATIVE RANGE</span>{compared.map(item => <strong key={item.service}>{money(item.low)}–{money(item.high)}</strong>)}</div><div className="comparison-row"><span>CATEGORY</span>{compared.map(item => <strong key={item.service}>{item.category}</strong>)}</div></div></section>}
    </section>
    <section className="price-factors"><p className="section-kicker">02 / WHAT SHAPES A QUOTE</p><h2>Every detail<br /><em>has a say.</em></h2><div className="factor-grid">{[['01', 'Design', 'Silhouette, panels, neckline and construction details.'], ['02', 'Fabric', 'Fabric character, drape and preparation needs.'], ['03', 'Finishing', 'Lining, closures, embellishment and hand details.']].map(([n, title, copy]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></div>)}</div><p className="estimate-disclaimer">Factors are general examples. The shop’s specific pricing process has not been confirmed.</p></section>
    <AppointmentCTA title="Need a precise quote?" description="Bring your garment idea to Renuka Tailors in Meerut and ask about current pricing." />
  </main>
}

export function TestimonialsPage() {
  const visible = testimonials.filter(item => isVisibleInCurrentMode(item.status))
  return <main className="page-main"><PageHero eyebrow="CUSTOMER WORDS" title="A space for" emphasis="real stories." description={DEMO_MODE ? 'This preview uses clearly labeled sample reviews. No verified customer testimonials or ratings have been supplied.' : 'No approved customer testimonials or ratings have been supplied.'} image="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=85" />
    <section className="page-section page-section-wide"><PageTitle eyebrow="01 / TESTIMONIALS" title="Stories belong" emphasis="to their tellers."><p>Only genuine feedback shared with customer permission should appear here.</p></PageTitle>
      {visible.length ? <div className="testimonial-grid">{visible.map(item => <article className="testimonial-card" key={item.name}><div className="testimonial-mark">“</div><span className="sample-review">SAMPLE REVIEW — DEMO ONLY</span><p className="testimonial-quote">{item.quote}</p><div className="testimonial-rating" aria-label={`${item.rating} sample stars`}>{'★'.repeat(item.rating)}<span> SAMPLE</span></div><div className="testimonial-person"><strong>{item.name}</strong><span>{item.category} · FICTIONAL DEMO IDENTITY</span></div></article>)}</div> : <p className="empty-note">No approved customer stories are available yet.</p>}
      <p className="estimate-disclaimer">{DEMO_MODE ? 'These fictional examples are not actual customer feedback, endorsements or Google reviews.' : 'No verified Google ratings or customer reviews are supplied.'}</p>
    </section><AppointmentCTA title="Make your own first impression." />
  </main>
}

export function FAQPage() {
  const [query, setQuery] = useState('')
  const items = faqs.filter(item => isVisibleInCurrentMode(item.status)).filter(item => `${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase()))
  return <main className="page-main"><PageHero eyebrow="A FEW THINGS TO KNOW" title="Questions," emphasis="considered." description="Clear answers about what is confirmed and what still needs a conversation with the shop." image="https://images.unsplash.com/photo-1708234165852-89c978e5e33d?auto=format&fit=crop&w=1800&q=85" />
    <section className="page-section faq-page-section"><PageTitle eyebrow="01 / THE DETAILS" title="Before you" emphasis="drop by."><p>{DEMO_MODE ? 'Demo responses are identified as sample information. Where details are unconfirmed, the answer points you back to the shop.' : 'Answers reflect the supplied listing and verified shop location. Confirm service policies directly with the shop.'}</p></PageTitle><div className="faq-search"><Search size={16} /><input aria-label="Search frequently asked questions" placeholder="Search questions" value={query} onChange={event => setQuery(event.target.value)} /></div>
      {items.map(item => <details className="faq-row" key={item.question}><summary>{item.question}<span>{item.status === 'verified' ? 'LISTED INFO' : item.status === 'demo' ? 'DEMO ANSWER' : 'CONFIRM WITH SHOP'}</span></summary><p>{item.answer}<DemoBadge status={item.status} /></p></details>)}
      {items.length === 0 && <p className="empty-note">No questions match your search.</p>}
    </section><AppointmentCTA title="Still have a question?" description="Visit the shop in Sadar Chowk Bazar to ask directly." />
  </main>
}

export function BlogPage() {
  const posts = blogPosts.filter(post => isVisibleInCurrentMode(post.status))
  return <main className="page-main"><PageHero eyebrow={DEMO_MODE ? 'THE RENUKA JOURNAL · PREVIEW' : 'THE RENUKA JOURNAL'} title="Notes on" emphasis="style & fit." description={DEMO_MODE ? 'Proposed sample editorial stories about tailoring, fabric and traditional style. Content awaits business approval.' : 'Approved editorial stories will appear here when they are available.'} image="https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1800&q=85" />
    <section className="page-section page-section-wide"><PageTitle eyebrow="01 / STYLE NOTES" title="A considered" emphasis="reading list."><p>{DEMO_MODE ? 'These sample articles are editorial prototypes, not verified advice from Renuka Tailors.' : 'No approved journal stories are available yet.'}</p></PageTitle>{posts.length > 0 && <div className="blog-grid">{posts.map((post, index) => <Link className="blog-card" to={`/blog/${post.slug}`} key={post.slug}><div className="blog-image"><img src={post.image} alt="Editorial fashion inspiration" loading="lazy" /><span>0{index + 1}</span></div><p>{post.category} <DemoBadge /></p><h3>{post.title}</h3><span>{post.excerpt}</span><b>Read sample story <ArrowUpRight size={15} /></b></Link>)}</div>}</section>
  </main>
}

export function BlogArticlePage() {
  const { slug } = useParams()
  const post = blogPosts.find(item => item.slug === slug && isVisibleInCurrentMode(item.status))
  if (!post) return <BlogPage />
  return <main className="page-main"><div className="article-hero" style={{ backgroundImage: `linear-gradient(90deg,#17171798,#17171720),url("${post.image}")` }}><div><Link to="/blog" className="article-back"><ArrowLeft size={14} /> JOURNAL</Link><p>{post.category} · SAMPLE EDITORIAL <DemoBadge /></p><h1>{post.title}</h1><span>{post.excerpt}</span></div></div><article className="article-body"><p className="article-disclaimer">SAMPLE EDITORIAL CONTENT — FOR PREVIEW ONLY</p>{post.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<Link className="text-link dark-link" to="/blog">More from the journal <ArrowRight size={15} /></Link></article><AppointmentCTA title="Take an idea to the shop." /></main>
}
