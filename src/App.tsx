import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, Award, Clock3, MapPin, Menu, Phone, Scissors, Sparkles, Users, X } from 'lucide-react'
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

const photos = {
  hero: '/images/hero-saree.jpg',
  bridal: '/images/bridal-saree.jpg',
  embroidery: '/images/embroidered-sari.jpg',
  sewing: '/images/sewing-detail.jpg',
}

function Brand() {
  return <Link className="brand" to="/" aria-label="Renuka Tailors home"><span className="brand-mark"><Scissors size={19} strokeWidth={1.6} /></span><span><strong>Renuka Tailors</strong><small>MEERUT · EST. 1998</small></span></Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <>
    <div className="announcement">Crafting Beautiful Women’s Wear Since 1998 <span>·</span> Renuka Tailors, Meerut</div>
    <header className="site-header">
      <Brand />
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav-open' : ''} aria-label="Main navigation">
        <Link to="/#top" onClick={close}>Home</Link><Link to="/#about" onClick={close}>About us</Link>
        <div className="nav-services"><Link to="/services" onClick={close}>Our services</Link><div className="nav-dropdown"><Link to="/services/womens-wear" onClick={close}>Women’s wear</Link><Link to="/services/embroidery" onClick={close}>Embroidery</Link><Link to="/services/fashion-design" onClick={close}>Design consultation</Link></div></div>
        <Link to="/#collection" onClick={close}>Collection</Link><Link to="/#craft" onClick={close}>Craftsmanship</Link><Link to="/contact" onClick={close}>Contact</Link>
        <Link className="nav-contact" to="/appointment" onClick={close}>Book an appointment <ArrowRight size={14} /></Link>
      </nav>
    </header>
  </>
}

function SectionIntro({ label, title, copy }: { label: string; title: string; copy?: string }) {
  return <div className="section-intro"><p className="eyebrow">{label}</p><h2>{title}</h2>{copy && <p className="intro-copy">{copy}</p>}</div>
}

function Hero() {
  return <section className="home-hero" id="top">
    <div className="hero-copy"><p className="eyebrow">EST. 1998 <span>·</span> MEERUT</p><h1>Perfectly Tailored.<br /><em>Beautifully Yours.</em></h1>
      <p className="hero-subtitle">From timeless traditional wear to contemporary women’s fashion, Renuka Tailors brings creativity, craftsmanship and precision to every design.</p>
      <div className="hero-actions"><Link className="button button-primary" to="/#collection">Explore our collection <ArrowDown size={15} /></Link><Link className="button button-outline" to="/appointment">Book an appointment <ArrowRight size={15} /></Link></div>
      <p className="hero-byline"><span className="byline-rule" /> Founded by Vijay Gautam</p>
    </div>
      <div className="hero-image-wrap"><img src={photos.hero} alt="Woman in a teal and purple sari in an indoor portrait" fetchPriority="high" /><span className="image-caption">A style reference · Milton Das / Pexels</span><div className="hero-stamp"><span>RENUKA</span><Scissors size={22} /><span>TAILORS</span></div></div>
  </section>
}

function FactsStrip() {
  return <section className="facts-strip" aria-label="Renuka Tailors at a glance"><div><strong>Since 1998</strong><span>Established in Meerut</span></div><div><strong>100+ workers</strong><span>An experienced tailoring team</span></div><div><strong>Professional designers</strong><span>Design support at the shop</span></div><div><strong>Embroidery</strong><span>A wide range of embroidery work</span></div></section>
}

function AboutSection() {
  return <section className="about-section" id="about">
    <div className="about-image"><img src={photos.sewing} alt="Tailor guiding fabric through an industrial sewing machine" loading="lazy" /><span className="image-caption">A detail from the tailoring process · Jane Blaze / Pexels</span></div>
    <div className="about-copy"><p className="eyebrow">ABOUT RENUKA TAILORS</p><h2>More than two decades of <em>craftsmanship.</em></h2><p>Established in 1998 by Vijay Gautam, Renuka Tailors has built its name through professional tailoring, attention to detail and a long-standing focus on women’s fashion.</p><p>Today, the team brings together professional fashion designers, more than 100 workers, latest technology machines and embroidery expertise.</p><div className="about-facts"><span><strong>1998</strong>Established</span><span><strong>100+</strong>Team members</span><span><strong>Meerut</strong>Uttar Pradesh</span></div><Link className="text-link" to="/about">Our story <ArrowRight size={15} /></Link></div>
  </section>
}

const serviceCards = [
  { no: '01', slug: 'womens-wear', name: 'Women’s wear', text: 'Discuss traditional and contemporary women’s garments with the team.', icon: <Sparkles /> },
  { no: '02', slug: 'professional-tailoring', name: 'Professional tailoring', text: 'Bring your garment idea and talk through fit, design and finishing.', icon: <Scissors /> },
  { no: '03', slug: 'embroidery', name: 'Embroidery work', text: 'Ask the team about embroidery styles and garment details.', icon: <Award /> },
]

function ServicesSection() {
  return <section className="services-section" id="services"><div className="services-top"><SectionIntro label="WHAT WE DO" title="Made for the way you wear it." copy="Every garment starts with a conversation. Visit the shop to discuss the style and service you have in mind." /><Link className="text-link" to="/services">All services <ArrowRight size={15} /></Link></div>
    <div className="service-cards">{serviceCards.map(card => <Link className="service-card" to={`/services/${card.slug}`} key={card.no}><span className="service-no">{card.no}</span><span className="service-icon">{card.icon}</span><h3>{card.name}</h3><p>{card.text}</p><span className="service-link">Explore <ArrowRight size={15} /></span></Link>)}</div>
    <p className="service-note">Specific styles and garment requests are best discussed with the team in person.</p>
  </section>
}

const workSteps = [
  ['01', 'Share your requirement', 'Tell us what design or tailoring service you need.'],
  ['02', 'Design & measurements', 'Discuss your design and required measurements with the team.'],
  ['03', 'Professional stitching', 'The tailoring team works on your garment with care.'],
  ['04', 'Final review', 'Review the finished work and coordinate collection with the shop.'],
]

function CraftSection() {
  const reasons = [
    ['1998', 'Experience since 1998', 'A women’s wear business established in Meerut.'],
    ['✳', 'Professional designers', 'Design support from professional fashion designers.'],
    ['100+', 'A team of 100+ workers', 'An experienced team supporting the tailoring work.'],
    ['✂', 'Latest technology machines', 'Modern machines used in the tailoring process.'],
    ['✺', 'Embroidery expertise', 'The team offers all types of embroidery work.'],
    ['◇', 'Care in every detail', 'Attention to fit, finish and the garment requirements.'],
  ]
  return <section className="craft-section" id="craft"><div className="craft-head"><SectionIntro label="THE PROCESS" title="A little care at every step." /><p>Visit or call the shop to discuss your request. Our team will guide you through the next steps.</p></div>
    <div className="steps-grid">{workSteps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    <div className="why-block"><div><p className="eyebrow">WHY RENUKA TAILORS</p><h2>Experience you can<br /><em>talk to in person.</em></h2></div><div className="why-grid">{reasons.map(([icon, title, text]) => <article key={title}><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
  </section>
}

const gallery = [
  { src: photos.embroidery, alt: 'Woman wearing a teal sari with embroidered patterns', title: 'Embroidered sari' },
  { src: photos.bridal, alt: 'Bride in traditional red and gold attire with jewelry', title: 'Bridal styling' },
  { src: photos.hero, alt: 'Woman wearing a teal sari in a portrait', title: 'Traditional wear' },
]

function CollectionSection() {
  return <section className="collection-section" id="collection"><div className="collection-heading"><SectionIntro label="STYLE REFERENCES" title="A lookbook of ideas." copy="A few images to help start a design conversation. These are licensed reference photographs, not garments made or stocked by Renuka Tailors." /><Link className="text-link" to="/gallery">View lookbook <ArrowRight size={15} /></Link></div>
    <div className="lookbook-grid">{gallery.map((item, index) => <figure className={`lookbook-item lookbook-${index + 1}`} key={item.title}><img src={item.src} alt={item.alt} loading="lazy" /><figcaption><span>{item.title}</span><small>Style reference</small></figcaption></figure>)}</div>
    <div className="inventory-note"><span className="inventory-mark"><Scissors size={19} /></span><div><strong>Looking for current styles?</strong><p>We don’t publish an online stock catalogue. Call or visit the shop to ask what’s currently available.</p></div><Link className="text-link" to="/contact">Contact the shop <ArrowRight size={15} /></Link></div>
  </section>
}

function ReviewsSection() {
  return <section className="reviews-section" id="reviews"><div className="reviews-copy"><p className="eyebrow">CUSTOMER FEEDBACK</p><h2>Your trust inspires<br /><em>our craft.</em></h2><p>Read or leave an honest review on Google. We don’t publish sample reviews here.</p><a className="button button-outline" href={business.reviewUrl.value} target="_blank" rel="noopener noreferrer">Write a Google review <ArrowRight size={15} /></a></div><div className="feedback-offer"><div className="offer-label">A NOTE FROM THE SHOP</div><h3>Help us do better.</h3><p>Share private feedback directly with the team and receive 5% off your next order. This offer is available for private feedback whether or not you leave a public review.</p><FeedbackForm /></div></section>
}

function ContactStrip() {
  return <section className="contact-strip"><div><p className="eyebrow">VISIT RENUKA TAILORS</p><h2>Good work starts<br />with a conversation.</h2><p>{business.address.value}</p></div><div className="contact-actions"><a href={`tel:+91${business.phone.value}`}><Phone size={16} /> +91 99271 44263</a><a href={`tel:+91${business.secondPhone.value}`}><Phone size={16} /> +91 79065 01679</a><a className="button button-light" href={business.directionsUrl.value} target="_blank" rel="noopener noreferrer"><MapPin size={15} /> Get directions</a><Link className="contact-wa" to="/appointment">Book an appointment <ArrowRight size={15} /></Link></div></section>
}

function HomePage() {
  return <main><Hero /><FactsStrip /><AboutSection /><ServicesSection /><CraftSection /><CollectionSection /><section className="appointment-band"><div><Clock3 size={22} /><p className="eyebrow">YOUR VISIT, YOUR WAY</p><h2>Let’s talk through<br />what you have in mind.</h2><p>Share your preferred date and request. We’ll prepare a message for the shop so you can confirm it on WhatsApp.</p></div><Link className="button button-light" to="/appointment">Request an appointment <ArrowRight size={15} /></Link></section><ReviewsSection /><ContactStrip /></main>
}

function Footer() {
  return <footer className="site-footer"><div className="footer-brand"><Brand /><p>Women’s wear and professional tailoring in Meerut, established in 1998.</p></div><div className="footer-column"><strong>Explore</strong><nav aria-label="Footer navigation"><Link to="/about">About us</Link><Link to="/services">Our services</Link><Link to="/gallery">Style references</Link><Link to="/testimonials">Google reviews</Link><Link to="/contact">Contact</Link></nav></div><div className="footer-column footer-contact"><strong>Find the shop</strong><p>{business.address.value}</p><a href={`tel:+91${business.phone.value}`}>+91 99271 44263</a><a href={`tel:+91${business.secondPhone.value}`}>+91 79065 01679</a><a href={business.directionsUrl.value} target="_blank" rel="noopener noreferrer">Google Maps directions <ArrowRight size={13} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Renuka Tailors, Meerut</span><span><Users size={14} /> Founded by Vijay Gautam</span><nav><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></nav></div></footer>
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
