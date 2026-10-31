import { useEffect, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Menu, Scissors, X } from 'lucide-react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { business, DEMO_MODE, isVisibleInCurrentMode } from './data/business'
import { gallery } from './data/gallery'
import { services } from './data/services'
import { DemoBadge, PreviewBanner } from './components/DemoBadge'
import { LookbookPage, ServiceDetailPage, ServicesIndexPage } from './ServicePages'
import { PricingPage, TestimonialsPage, FAQPage, BlogPage, BlogArticlePage } from './InformationPages'
import { pricing } from './data/pricing'
import { testimonials } from './data/testimonials'
import { AboutPage, ContactPage, LocationPage } from './StorePages'
import { BookingPage } from './BookingPage'
import { StorefrontPanel } from './components/StorefrontPanel'
import { WhatsAppButton } from './components/WhatsAppButton'
import { SeoHead } from './SeoHead'
import { ErrorBoundary } from './ErrorBoundary'
import { PolicyPage } from './PolicyPages'

const mapUrl = business.directionsUrl.value
const address = business.address.value
const photos = {
  hero: gallery[0].src.replace('w=1200', 'w=2200').replace('q=85', 'q=88'),
  detail: gallery[1].src,
  festive: gallery[2].src,
  fabric: gallery[3].src,
  craft: gallery[4].src,
}

function Wordmark({ light = false }: { light?: boolean }) {
  return <Link className={`wordmark${light ? ' wordmark-light' : ''}`} to="/" aria-label="Renuka Tailors home">
    <span className="wordmark-symbol"><Scissors size={18} strokeWidth={1.2} /></span>
    <span><strong>Renuka</strong><small>TAILORS · MEERUT</small></span>
  </Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <>
    <PreviewBanner />
    <header className="site-header">
      <Wordmark />
      <nav className={open ? 'nav-open' : ''} aria-label="Main navigation">
        <Link onClick={() => setOpen(false)} to="/about">About</Link>
        <Link onClick={() => setOpen(false)} to="/services">Services</Link>
        <Link onClick={() => setOpen(false)} to="/pricing">Pricing</Link>
        <Link onClick={() => setOpen(false)} to="/gallery">Lookbook</Link>
        <Link onClick={() => setOpen(false)} to="/blog">Journal</Link>
        <Link onClick={() => setOpen(false)} to="/location">Visit us</Link>
        <Link className="nav-appointment" onClick={() => setOpen(false)} to="/appointment">Plan a visit <ArrowUpRight size={15} /></Link>
      </nav>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
  </>
}

function Hero() {
  return <section className="hero" id="home" style={{ backgroundImage: `url("${photos.hero}")` }}>
    <div className="hero-shade" />
    <div className="hero-topline"><span>Renuka TAILORS · MEERUT</span><span>{DEMO_MODE ? 'EDITORIAL INSPIRATION · DEMO' : 'SALWAR KAMEEZ TAILORING · MEERUT'}</span></div>
    <div className="hero-copy">
      <p className="eyebrow hero-eyebrow"><span /> A MORE PERSONAL KIND OF TAILORING</p>
      <h1>The art of<br /><em>perfect fit.</em></h1>
      <p className="hero-subtitle">Thoughtfully tailored. Beautifully crafted.<br className="desktop-break" /> Made to complement your style.</p>
      <div className="hero-actions"><a className="button button-light" href="#services">Discover our services <ArrowRight size={16} /></a><Link className="text-link light-link" to={DEMO_MODE ? '#craft' : '/about'}>Explore our craft <ArrowDownRight size={16} /></Link></div>
    </div>
    <div className="hero-bottom"><span>01 — 04</span><a href="#introduction" aria-label="Scroll to introduction"><ArrowDown size={18} /><span>SCROLL TO DISCOVER</span></a><span>28°59′47.0″N &nbsp; 77°41′57.4″E</span></div>
    <div className="hero-side-note">THE FIT IS IN THE DETAILS</div>
  </section>
}

function Introduction() {
  return <section className="intro section-pad" id="introduction">
    <div className="section-kicker"><span>01</span><span>THE RENUKA POINT OF VIEW</span></div>
    <div className="intro-grid">
      <div className="intro-heading"><p className="eyebrow">CLOTHES, CONSIDERED</p><h2>Where every detail<br />finds its <em>fit.</em></h2></div>
      <div className="intro-copy"><p className="large-copy">The best clothes feel like they were always meant to be yours.</p><p>Renuka Tailors is a neighbourhood tailoring destination in Sadar Chowk Bazar, Meerut. Bring a garment idea, a favourite fabric, or simply a sense of what feels like you. We’ll begin with a conversation.</p><a className="text-link dark-link" href="#visit">Find us in Meerut <ArrowUpRight size={15} /></a></div>
    </div>
    <div className="intro-image-wrap"><img src={photos.detail} alt="Illustrative editorial inspiration: richly detailed Indian occasion wear" loading="lazy" /><div className="image-caption"><span>THE BEAUTY OF A THOUGHTFUL FINISH</span><span>EDITORIAL INSPIRATION · DEMO</span></div><div className="image-index">RT<span>—</span>01</div></div>
  </section>
}

const serviceItems = [services[3], services[0], services[4]].map((service, index) => ({
  n: `0${index + 1}`, title: service.name, meta: service.status === 'verified' ? 'LISTED CATEGORY' : 'DEMO CATEGORY', image: service.image,
  verified: service.status === 'verified', text: service.description, path: service.path,
}))

function Services() {
  const visibleItems = serviceItems.filter(item => isVisibleInCurrentMode(item.verified ? 'verified' : 'demo'))
  return <section className="services section-pad" id="services">
    <div className="services-head"><div><div className="section-kicker"><span>02</span><span>THE STITCHING ATELIER</span></div><h2>Made around<br /><em>your idea.</em></h2></div><p>Start with a style you love. We’ll help shape the details, fit and finish around it.{DEMO_MODE && <small>Additional categories shown here are sample concepts requiring confirmation.</small>}</p></div>
    <div className="service-grid">{visibleItems.map(item => <Link className="service-item" to={item.path} key={item.n}>
      <div className="service-image"><img src={item.image} alt={`Editorial inspiration for ${item.title.toLowerCase()}`} loading="lazy" /><span className="service-number">{item.n}</span><span className="service-arrow"><ArrowUpRight size={19} /></span></div>
      <div className="service-meta"><span>{item.meta}</span>{item.verified && <span className="verified-mark">● LISTED</span>}</div>
      <h3>{item.title}</h3><p>{item.text}</p>
    </Link>)}</div>
    <div className="all-services"><span>{DEMO_MODE ? 'More styles to discover' : 'Explore the listed category'}</span><Link className="text-link dark-link" to="/gallery">View the lookbook <ArrowUpRight size={15} /></Link></div>
  </section>
}

function Craft() {
  if (!DEMO_MODE) return null
  const steps = [['01', 'A conversation', 'Share the garment you have in mind and what matters most to you.'], ['02', 'Shape the details', 'Talk through design, fabric and fit before the stitching begins.'], ['03', 'The fitting', 'Visit the shop to discuss measurements and the next steps for your garment.'], ['04', 'A final look', 'Arrange a trial and collection conversation at the shop.']]
  return <section className="craft section-pad" id="craft">
    <div className="craft-photo"><img src={photos.craft} alt="Sample editorial image of a seamstress guiding fabric through a sewing machine" loading="lazy" /><div className="craft-stamp">A PERSONAL<br /><em>process</em><span>— RENUKA TAILORS —</span></div><span className="photo-note">ILLUSTRATIVE CRAFT IMAGE · DEMO</span></div>
    <div className="craft-content"><div className="section-kicker"><span>03</span><span>THE MAKING OF IT</span></div><p className="eyebrow">A SUGGESTED JOURNEY</p><h2>Good work<br />begins with<br /><em>a conversation.</em></h2><p className="craft-intro">Every garment starts somewhere different. Here’s one way a visit to the shop could take shape.</p>
      <div className="steps">{steps.map(([n, name, text]) => <div className="step" key={n}><span className="step-no">{n}</span><div><h3>{name}</h3><p>{text}</p></div><ArrowDownRight size={16} /></div>)}</div>
      <a className="text-link dark-link" href="#visit">Start with a visit <ArrowRight size={15} /></a>
      <p className="fine-print">This is a suggested customer journey for preview purposes, not a confirmed service policy or timing commitment.</p>
    </div>
  </section>
}

function WhyChoose() {
  if (!DEMO_MODE) return null
  const themes = [
    ['01', 'Personal fit', 'Begin with how you want the garment to feel and move.'],
    ['02', 'Design conversation', 'Bring a reference, a fabric or a first thought to the discussion.'],
    ['03', 'Attention to detail', 'Consider the small choices that shape a finished look.'],
    ['04', 'Individual style', 'Let the garment reflect what feels distinctly yours.'],
    ['05', 'A considered process', 'A suggested path from first conversation to a final fitting.'],
  ]
  return <section className="why-choose section-pad"><div className="section-kicker"><span>04</span><span>THE THINGS WE VALUE</span></div><div className="why-grid"><div><p className="eyebrow">A POINT OF VIEW, NOT A PROMISE</p><h2>What makes<br />a garment <em>yours.</em></h2><p>These are the values behind this brand preview: thoughtful themes for a personal tailoring conversation, not claims about credentials or service guarantees.</p></div><div className="value-list">{themes.map(([number, title, copy]) => <div className="value-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight size={15} /></div>)}</div></div></section>
}

function Inspiration() {
  if (!DEMO_MODE) return null
  return <section className="inspiration section-pad" id="inspiration">
    <div className="inspiration-head"><div className="section-kicker"><span>06</span><span>COLOUR · CUT · CHARACTER</span></div><div className="inspiration-title"><h2>Ideas to make<br /><em>your own.</em></h2><p>Fashion imagery is here as inspiration only. These are not Renuka Tailors customer orders.</p></div></div>
    <div className="lookbook-grid"><figure className="look look-tall"><img src={photos.festive} alt="Fashion inspiration in traditional Indian clothing" loading="lazy" /><figcaption><span>01 / TRADITIONAL</span><strong>A study in silhouette</strong></figcaption></figure><figure className="look look-wide"><img src={photos.fabric} alt="Fabric texture as fashion inspiration" loading="lazy" /><figcaption><span>02 / TEXTURE</span><strong>Let the fabric speak</strong></figcaption></figure><div className="lookbook-note"><span>LOOKBOOK NOTE</span><p>Sample editorial imagery.<br />Replace with approved shop work<br />when available.</p><a className="text-link dark-link" href="#services">Explore the categories <ArrowUpRight size={15} /></a></div></div>
  </section>
}

function PricingPreview() {
  if (!DEMO_MODE) return null
  const previews = pricing.slice(0, 3)
  return <section className="homepage-pricing section-pad"><div className="section-kicker"><span>05</span><span>A CLEAR PLACE TO BEGIN</span></div><div className="homepage-pricing-heading"><div><p className="eyebrow">A STARTING POINT</p><h2>Considered<br /><em>estimates.</em></h2></div><div className="homepage-pricing-aside"><DemoBadge>DEMO PRICES</DemoBadge><p>Illustrative sample ranges only. Final prices require consultation.</p><Link className="text-link dark-link" to="/pricing">Explore indicative prices <ArrowUpRight size={15} /></Link></div></div><div className="price-preview-list">{previews.map((item, index) => <Link to="/pricing" className="price-preview-line" key={item.service}><span>0{index + 1}</span><strong>{item.service}</strong><DemoBadge /><b>₹{item.low.toLocaleString('en-IN')} — ₹{item.high.toLocaleString('en-IN')}</b><ArrowUpRight size={15} /></Link>)}</div></section>
}

function TestimonialPreview() {
  if (!DEMO_MODE) return null
  const [current, setCurrent] = useState(0)
  const item = testimonials[current]
  return <section className="home-testimonial"><div className="section-kicker"><span>07</span><span>WORDS FROM THE FITTING ROOM</span></div><div className="testimonial-preview-grid"><div><p className="eyebrow">CUSTOMER STORIES</p><h2>Every story<br /><em>is personal.</em></h2><DemoBadge>SAMPLE REVIEWS</DemoBadge></div><div className="testimonial-preview-copy"><p className="sample-review">SAMPLE REVIEW — DEMO ONLY</p><blockquote>“{item.quote}”</blockquote><div className="testimonial-preview-by"><span>{item.name}<small>{item.category} · FICTIONAL SAMPLE</small></span><span>{'★'.repeat(item.rating)} <small>SAMPLE</small></span></div><div className="testimonial-controls"><button aria-label="Previous sample review" onClick={() => setCurrent((current + testimonials.length - 1) % testimonials.length)}><ArrowLeft size={15} /></button><span>0{current + 1} / 0{testimonials.length}</span><button aria-label="Next sample review" onClick={() => setCurrent((current + 1) % testimonials.length)}><ArrowRight size={15} /></button><Link to="/testimonials">VIEW ALL SAMPLE STORIES <ArrowUpRight size={14} /></Link></div></div></div></section>
}

function AppointmentPrompt() {
  return <section className="appointment-prompt"><div><p className="eyebrow">WHEN YOU’RE READY</p><h2>Bring an idea.<br /><em>We’ll start there.</em></h2><p>Visit Renuka Tailors in Sadar Chowk Bazar to talk through your garment.</p></div><Link className="button button-light" to="/appointment">Plan a visit <ArrowUpRight size={16} /></Link></section>
}

function Visit() {
  return <section className="visit section-pad" id="visit">
    <div className="section-kicker"><span>08</span><span>IN THE HEART OF MEERUT</span></div>
    <div className="visit-grid"><div className="visit-copy"><p className="eyebrow">COME BY, SAY HELLO</p><h2>A real shop.<br /><em>A personal start.</em></h2><p className="visit-address">Near Baldev Di Haati,<br />Sadar Chowk Bazar,<br />Meerut, Uttar Pradesh, India</p><Link className="button button-dark" to="/location">Store details <ArrowUpRight size={16} /></Link><p className="visit-note">Store image to be added when a verified storefront photograph is supplied.</p></div><StorefrontPanel /></div>
  </section>
}

function Footer() {
  return <footer className="footer"><div className="footer-main"><div><Wordmark light /><p className="footer-line">Thoughtfully tailored.<br /><em>Beautifully yours.</em></p></div><div className="footer-nav"><span>EXPLORE</span><Link to="/about">Our approach</Link><Link to="/services">Services</Link><Link to="/gallery">Inspiration</Link><Link to="/pricing">Pricing</Link><Link to="/testimonials">{DEMO_MODE ? 'Sample stories' : 'Customer stories'}</Link><Link to="/faq">FAQs</Link><Link to="/blog">Journal</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy notice</Link><Link to="/terms">Website terms</Link></div><div className="footer-nav"><span>FIND US</span><p>{address}</p><Link to="/location">Store details <ArrowUpRight size={14} /></Link><a href={mapUrl} target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={14} /></a><a href={business.justdialUrl.value} target="_blank" rel="noreferrer">Justdial listing <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><span>© 2026 RENUKA TAILORS · MEERUT</span>{DEMO_MODE && <span>PREVIEW WEBSITE · SAMPLE CONTENT</span>}<Link to="/">BACK TO TOP ↑</Link></div></footer>
}

function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target) }
    }), { threshold: .12 })
    document.querySelectorAll('.section-pad, .service-item, .look, .craft-photo').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return <ErrorBoundary><RouteEffects /><SeoHead /><Header /><Routes>
    <Route path="/" element={<main><Hero /><Introduction /><Services /><Craft /><WhyChoose /><PricingPreview /><Inspiration /><TestimonialPreview /><AppointmentPrompt /><Visit /></main>} />
    <Route path="/services" element={<ServicesIndexPage />} />
    <Route path="/services/:category" element={<ServiceDetailPage />} />
    <Route path="/gallery" element={<LookbookPage />} />
    <Route path="/pricing" element={<PricingPage />} />
    <Route path="/testimonials" element={<TestimonialsPage />} />
    <Route path="/faq" element={<FAQPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:slug" element={<BlogArticlePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/appointment" element={<BookingPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/location" element={<LocationPage />} />
    <Route path="/privacy" element={<PolicyPage kind="privacy" />} />
    <Route path="/terms" element={<PolicyPage kind="terms" />} />
    <Route path="*" element={<main className="route-placeholder"><p className="eyebrow">Renuka TAILORS · MEERUT</p><h1>Something thoughtful<br /><em>is taking shape.</em></h1><p>This page is part of the website preview and will be available in the next build phase.</p><Link className="button button-dark" to="/">Return home <ArrowRight size={16} /></Link></main>} />
  </Routes><Footer /><WhatsAppButton /></ErrorBoundary>
}
