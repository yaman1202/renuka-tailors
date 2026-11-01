import { useEffect, useState } from 'react'
import { ArrowRight, MapPin, Menu, Phone, Scissors, X } from 'lucide-react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { business } from './data/business'
import { ServicesIndexPage, ServiceDetailPage, LookbookPage } from './ServicePages'
import { PricingPage, TestimonialsPage, FAQPage, BlogPage, BlogArticlePage } from './InformationPages'
import { AboutPage, ContactPage, LocationPage } from './StorePages'
import { BookingPage } from './BookingPage'
import { PolicyPage } from './PolicyPages'
import { SeoHead } from './SeoHead'
import { ErrorBoundary } from './ErrorBoundary'
import { FeedbackForm } from './components/FeedbackForm'
import { WhatsAppButton } from './components/WhatsAppButton'

function Brand() {
  return <Link className="brand" to="/" aria-label="Renuka Tailors home"><span className="brand-mark"><Scissors size={19} strokeWidth={1.6} /></span><span><strong>Renuka Tailors</strong><small>MEERUT · EST. 1998</small></span></Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <>
    <header className="site-header">
      <Brand />
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav-open' : ''} aria-label="Main navigation">
        <Link to="/#about" onClick={close}>About</Link><Link to="/services" onClick={close}>Services</Link><Link to="/gallery" onClick={close}>Our work</Link><Link to="/testimonials" onClick={close}>Reviews</Link>
        <Link className="nav-contact" to="/contact" onClick={close}>Contact</Link>
      </nav>
    </header>
  </>
}

function HomePage() {
  return <main>
    <section className="home-hero">
      <div className="hero-copy">
        <p className="eyebrow">WOMEN’S WEAR · MEERUT</p>
        <h1>Renuka Tailors</h1>
        <p className="hero-subtitle">Women’s wear and professional tailoring, established in 1998.</p>
        <div className="hero-actions"><Link className="button button-primary" to="/services">Our services <ArrowRight size={16} /></Link><a className="button button-outline" href={`tel:+91${business.phone.value}`}><Phone size={15} /> Call the shop</a></div>
        <p className="hero-byline">Founded by Vijay Gautam</p>
      </div>
      <div className="hero-note" aria-label="Renuka Tailors business details"><span className="hero-note-icon"><Scissors size={26} /></span><p>Personal tailoring<br />and embroidery</p><span>Meerut, Uttar Pradesh</span></div>
    </section>

    <section className="facts-strip" aria-label="About Renuka Tailors"><div><strong>Since 1998</strong><span>Established in Meerut</span></div><div><strong>100+ team members</strong><span>Skilled tailoring team</span></div><div><strong>Fashion designers</strong><span>Professional design support</span></div><div><strong>Embroidery</strong><span>Different styles of embroidery</span></div></section>

    <section className="simple-section about-section" id="about"><div className="section-heading"><p className="eyebrow">ABOUT US</p><h2>Tailoring in Meerut<br />since 1998.</h2></div><div className="section-copy"><p>Founded by Vijay Gautam, Renuka Tailors works in women’s wear and professional tailoring. The team includes professional fashion designers and more than 100 workers, with latest technology machines and embroidery work.</p><Link className="text-link" to="/about">More about Renuka Tailors <ArrowRight size={15} /></Link></div></section>

    <section className="services-section" id="services"><div className="section-heading"><p className="eyebrow">WHAT WE DO</p><h2>Women’s wear<br />and tailoring.</h2></div><div className="service-list"><div><span>01</span><h3>Women’s wear</h3><p>Talk with the team about the garment you have in mind.</p></div><div><span>02</span><h3>Professional tailoring</h3><p>Discuss fit, design and finishing at the shop.</p></div><div><span>03</span><h3>Embroidery</h3><p>All types of embroidery work.</p></div></div><Link className="text-link" to="/services">Ask about a garment <ArrowRight size={15} /></Link></section>

    <section className="work-section" id="work"><div><p className="eyebrow">OUR WORK</p><h2>Photos of our work<br />will be added here.</h2><p>We’re keeping this space for Renuka Tailors garments and embroidery. For now, please call or visit the shop to see current work.</p><Link className="text-link" to="/contact">Contact the shop <ArrowRight size={15} /></Link></div><div className="work-placeholder"><Scissors size={32} strokeWidth={1.2} /><span>RENUKA TAILORS · MEERUT</span></div></section>

    <section className="reviews-section" id="reviews"><div className="reviews-copy"><p className="eyebrow">CUSTOMER FEEDBACK</p><h2>We’d like to<br />hear from you.</h2><p>Share an honest review on Google, or send private feedback directly to the shop. These are separate options.</p><a className="button button-outline" href={business.reviewUrl.value} target="_blank" rel="noreferrer">Share a Google review <ArrowRight size={15} /></a></div><FeedbackForm /></section>

    <ContactStrip />
  </main>
}

function ContactStrip() {
  return <section className="contact-strip"><div><p className="eyebrow">VISIT RENUKA TAILORS</p><h2>Find us in Meerut.</h2><p>{business.address.value}</p></div><div className="contact-actions"><a href={`tel:+91${business.phone.value}`}>+91 99271 44263</a><a href={`tel:+91${business.secondPhone.value}`}>+91 79065 01679</a><Link className="button button-light" to="/location"><MapPin size={15} /> Directions</Link></div></section>
}

function Footer() {
  return <footer className="site-footer"><div><Brand /><p>Women’s wear and professional tailoring in Meerut.</p></div><nav aria-label="Footer navigation"><Link to="/about">About</Link><Link to="/services">Services</Link><Link to="/gallery">Our work</Link><Link to="/testimonials">Reviews</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy</Link></nav><div className="footer-contact"><a href={`tel:+91${business.phone.value}`}>+91 99271 44263</a><a href={business.directionsUrl.value} target="_blank" rel="noreferrer">Get directions</a></div><small>© {new Date().getFullYear()} Renuka Tailors, Meerut</small></footer>
}

function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => hash ? document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo({ top: 0 }))
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

export default function App() {
  return <ErrorBoundary><RouteEffects /><SeoHead /><Header /><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/services" element={<ServicesIndexPage />} />
    <Route path="/services/:category" element={<ServiceDetailPage />} />
    <Route path="/gallery" element={<LookbookPage />} />
    <Route path="/pricing" element={<PricingPage />} />
    <Route path="/testimonials" element={<TestimonialsPage />} />
    <Route path="/faq" element={<FAQPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:slug" element={<BlogArticlePage />} />
    <Route path="/appointment" element={<BookingPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/location" element={<LocationPage />} />
    <Route path="/privacy" element={<PolicyPage kind="privacy" />} />
    <Route path="/terms" element={<PolicyPage kind="terms" />} />
    <Route path="*" element={<main className="simple-section"><h1>Page not found</h1><Link className="text-link" to="/">Return home <ArrowRight size={15} /></Link></main>} />
  </Routes><Footer /><WhatsAppButton /></ErrorBoundary>
}
