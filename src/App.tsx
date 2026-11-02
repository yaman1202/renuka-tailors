import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Award, Clock3, MapPin, Menu, Phone, Scissors, Sparkles, Users, X } from 'lucide-react'
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { business } from './data/business'
import { craftPhotos, featuredPhoto, heroPhoto, servicePhotos } from './data/photos'
import { ServicesIndexPage, ServiceDetailPage } from './ServicePages'
import { PricingPage, TestimonialsPage, FAQPage, BlogPage, BlogArticlePage } from './InformationPages'
import { AboutPage, ContactPage, LocationPage } from './StorePages'
import { BookingPage } from './BookingPage'
import { PolicyPage } from './PolicyPages'
import { SeoHead } from './SeoHead'
import { ErrorBoundary } from './ErrorBoundary'
import { FeedbackForm } from './components/FeedbackForm'
import { PhotoGallery } from './components/PhotoGallery'
import { WhatsAppButton } from './components/WhatsAppButton'
import { CollectionEntryGrid, CollectionDetailPage, CollectionsHubPage } from './CollectionPages'

function Brand() {
  return <Link className="brand" to="/" aria-label="Renuka Tailors home"><span className="brand-wordmark"><strong>RENUKA</strong><small>TAILORS</small></span><span className="brand-city">MEERUT</span></Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  const close = () => setOpen(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 8)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) close()
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        menuToggleRef.current?.focus()
      }
    }
    const closeOnDesktopResize = () => {
      if (window.matchMedia('(min-width: 1001px)').matches) close()
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktopResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktopResize)
    }
  }, [open])

  return <>
    <div className="announcement"><span className="announcement-dot" /> WOMEN’S TAILORING <span className="announcement-divider">/</span> MEERUT</div>
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} ref={headerRef}>
      <Brand />
      <button ref={menuToggleRef} className={`menu-toggle${open ? ' is-open' : ''}`} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><Menu className="menu-icon" size={23} aria-hidden="true" /><X className="close-icon" size={23} aria-hidden="true" /></button>
      <nav id="primary-navigation" className={open ? 'nav-open' : ''} aria-label="Main navigation">
        <NavLink to="/about" onClick={close}>About</NavLink>
        <div className="nav-services"><NavLink to="/services" onClick={close}>Services</NavLink><div className="nav-dropdown"><Link to="/services/womens-wear" onClick={close}>Women’s wear</Link><Link to="/services/salwar-suits" onClick={close}>Salwar suits</Link><Link to="/services/saree-blouses" onClick={close}>Saree blouses</Link><Link to="/services/embroidery" onClick={close}>Embroidery work</Link><Link to="/services/fashion-design" onClick={close}>Design consultation</Link></div></div>
        <NavLink to="/pricing" onClick={close}>Pricing</NavLink><NavLink to="/collections" onClick={close}>Collections</NavLink><NavLink to="/blog" end onClick={close}>Journal</NavLink><NavLink to="/location" onClick={close}>Visit us</NavLink>
        <NavLink className="nav-contact" to="/appointment" onClick={close}>Plan a visit <ArrowRight size={15} aria-hidden="true" /></NavLink>
      </nav>
    </header>
  </>
}

function SectionIntro({ label, title, copy }: { label: string; title: string; copy?: string }) {
  return <div className="section-intro"><p className="eyebrow">{label}</p><h2>{title}</h2>{copy && <p className="intro-copy">{copy}</p>}</div>
}

function Hero() {
  return <section className="home-hero" id="top">
    <div className="hero-image-wrap"><picture>
      <source type="image/webp" srcSet={heroPhoto.webpSrcSet} sizes="100vw" />
      <img src={heroPhoto.src} srcSet={heroPhoto.srcSet} sizes="100vw" width="3456" height="5184" alt={heroPhoto.alt} loading="eager" fetchPriority="high" decoding="async" />
    </picture></div>
    <div className="hero-frame" aria-hidden="true" />
    <p className="hero-meta hero-meta-left hero-brand"><strong>RENUKA</strong><span>TAILORS <i>·</i> MEERUT</span></p>
    <p className="hero-meta hero-meta-right">MADE WITH CARE · WORN YOUR WAY</p>
    <div className="hero-copy"><p className="eyebrow"><span className="byline-rule" /> A MORE PERSONAL KIND OF TAILORING</p><h1>The art of<br /><em>perfect fit.</em></h1>
      <p className="hero-subtitle"><span>Thoughtfully tailored. Beautifully crafted.</span><span>Made to complement your style.</span></p>
      <div className="hero-actions"><Link className="button button-primary" to="/services">Discover our services <ArrowRight size={15} /></Link><Link className="button button-outline" to="/#craft">Explore our craft <ArrowRight size={15} /></Link></div>
    </div>
    <p className="hero-side-note" aria-hidden="true">THE FIT IS IN THE DETAILS</p>
    <p className="hero-index" aria-hidden="true">01 <span>—</span> 04</p>
    <a className="hero-scroll" href="/#about"><span aria-hidden="true">↓</span> SCROLL TO DISCOVER</a>
  </section>
}

function FactsStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [customers, setCustomers] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.25 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCustomers(10000)
      return
    }

    const duration = 2000
    let frame = 0
    let startTime = 0
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCustomers(Math.round(10000 * eased))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isVisible])

  const number = (value: number) => value.toLocaleString('en-IN')

  return <section ref={sectionRef} className={`facts-strip${isVisible ? ' is-visible' : ''}`} aria-label="Renuka Tailors in numbers">
    <div className="facts-heading"><span>A LEGACY MEASURED IN TRUST</span><i /></div>
    <div className="facts-editorial">
      <article className="stat-card">
        <span className="stat-number" aria-hidden="true"><span>{number(customers)}</span><b>+</b></span>
        <span className="sr-only">10,000 plus happy customers</span>
        <h2>HAPPY CUSTOMERS</h2>
      </article>
      <div className="facts-editorial-copy">
        <p>Thank you for trusting our craftsmanship and making us part of your style journey.</p>
        <ul aria-label="Renuka Tailors">
          <li>Women’s Tailoring</li><li>Personalised Stitching</li><li>Meerut</li>
        </ul>
      </div>
    </div>
  </section>
}

function AboutSection() {
  return <section className="about-section home-boutique-preview" id="about">
    <figure className="boutique-photo home-boutique-photo"><img src="/images/renuka-tailors-store.jpg" alt="Renuka Tailors storefront with illuminated signage and shop entrance" loading="lazy" /><figcaption>Our Boutique · Sadar Bazar, Meerut</figcaption></figure>
    <div className="about-copy"><p className="eyebrow">ABOUT RENUKA TAILORS</p><h2>A Place Where Every Stitch Tells a Story.</h2><p>At Renuka Tailors, we bring your fashion ideas to life through personalised women's tailoring, creativity and attention to detail. Every outfit is crafted with care to make you feel special.</p><Link className="button button-primary boutique-story-link" to="/about">Discover Our Story <ArrowRight size={15} /></Link></div>
  </section>
}

function ServicesSection() {
  return <section className="services-section" id="services"><div className="services-top"><SectionIntro label="WHAT WE DO" title="Made for the way you wear it." copy="Every garment starts with a conversation. Visit the shop to discuss the style and service you have in mind." /><Link className="text-link" to="/services">All services <ArrowRight size={15} /></Link></div>
    <div className="service-cards">{servicePhotos.map((card, index) => <Link className="service-card" to={`/services/${card.slug}`} key={card.slug}>
      <span className="service-image"><img src={card.src} alt={card.alt} loading="lazy" style={card.position ? { objectPosition: card.position } : undefined} /></span><span className="service-no">0{index + 1}</span><h3>{card.title}</h3><p>{card.description}</p><span className="service-link">Explore <ArrowRight size={15} /></span>
    </Link>)}</div>
    <p className="service-note">These photos are visual references. Ask the team about tailoring options for your request.</p>
  </section>
}

function CollectionSection() {
  return <section className="collection-section" id="collection"><div className="collection-heading"><SectionIntro label="STYLE REFERENCES" title="Ideas for what comes next." copy="Browse by garment to find a shape, colour or detail to discuss. These licensed photographs are visual references, not Renuka Tailors products or completed work." /><Link className="text-link" to="/collections">All collections <ArrowRight size={15} /></Link></div>
    <CollectionEntryGrid compact />
    <div className="inventory-note"><span className="inventory-mark"><Scissors size={19} /></span><div><strong>Looking for current styles?</strong><p>We don’t publish an online stock catalogue. Call or visit the shop to ask what’s currently available.</p></div><Link className="text-link" to="/contact">Contact the shop <ArrowRight size={15} /></Link></div><a className="image-credit-link" href="/images/IMAGE_CREDITS.md">Photo sources and credits <ArrowRight size={12} /></a>
    <div className="featured-banner" style={{ backgroundImage: `linear-gradient(90deg, rgb(39 23 25 / .79), rgb(39 23 25 / .16)), url("${featuredPhoto.src}")` }}>
      <div><p className="eyebrow">RENUKA TAILORS · MEERUT</p><h2>Every Detail Tells a Story.</h2><p>Discover timeless styles, intricate detailing and the beauty of thoughtfully crafted women’s wear.</p><Link className="button button-light" to="/services">Explore Our Services <ArrowRight size={15} /></Link></div><span className="featured-caption">Illustrative style reference · Pexels</span>
    </div>
  </section>
}

const workSteps = [
  ['01', 'Share Your Requirement', 'Tell us the design or tailoring service you have in mind.'],
  ['02', 'Design and Measurements', 'Discuss the design and measurements with the team.'],
  ['03', 'Professional Stitching', 'The tailoring team works on your garment with care.'],
  ['04', 'Final Delivery', 'Review the finished work and coordinate collection with the shop.'],
]

function CraftSection() {
  const reasons = [
    [<Award size={17} />, 'Established in 1998', 'A women’s wear business founded in Meerut.'],
    [<Sparkles size={17} />, 'Professional designers', 'Design support from fashion designers.'],
    [<Users size={17} />, 'A team of 100+', 'An experienced team supporting the work.'],
    [<Scissors size={17} />, 'Embroidery work', 'Ask the team about embroidery styles and details.'],
  ]
  return <section className="craft-section" id="craft">
    <div className="craft-gallery-section"><div className="craft-head"><SectionIntro label="THE MAKING" title="Behind Every Beautiful Creation" copy="A closer look at stitching, embroidery and the small details that shape a garment." /><p>Illustrative photographs only; these are not images of Renuka Tailors staff or customer orders.</p></div>
      <PhotoGallery photos={craftPhotos} label="View larger craft photo" className="photo-gallery--craft" />
    </div>
    <div className="why-block"><div><p className="eyebrow">WHY RENUKA TAILORS</p><h2>Experience, skill<br /><em>and a personal touch.</em></h2></div><div className="why-grid">{reasons.map(([icon, title, text]) => <article key={String(title)}><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
    <div className="process-block"><div className="craft-head"><SectionIntro label="OUR PROCESS" title="A little care at every step." /><p>Visit or call the shop to discuss your request. The team will guide you through the next steps.</p></div>
      <div className="steps-grid">{workSteps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div>
  </section>
}

function ReviewsSection() {
  return <section className="reviews-section" id="reviews"><div className="reviews-copy"><p className="eyebrow">CUSTOMER FEEDBACK</p><h2>Your Trust Inspires<br /><em>Our Craft</em></h2><p>Read or leave an honest review on Google. We don’t publish sample reviews here.</p><a className="button button-outline" href={business.reviewUrl.value} target="_blank" rel="noopener noreferrer">Write a Google Review <ArrowRight size={15} /></a></div><div className="feedback-offer"><div className="offer-label">PRIVATE FEEDBACK · FROM THE SHOP</div><h3>Help us do better.</h3><p>Share private feedback directly with the team and receive 5% off your next order. You can submit private feedback whether or not you leave a public review.</p><FeedbackForm /></div></section>
}

function ContactStrip() {
  return <section className="contact-strip"><div><p className="eyebrow">VISIT RENUKA TAILORS</p><h2>Good work starts<br />with a conversation.</h2><p>{business.address.value}</p></div><div className="contact-actions"><a href={`tel:+91${business.phone.value}`}><Phone size={16} /> +91 99271 44263</a><a href={`tel:+91${business.secondPhone.value}`}><Phone size={16} /> +91 79065 01679</a><a className="button button-light" href={business.directionsUrl.value} target="_blank" rel="noopener noreferrer"><MapPin size={15} /> Get directions</a><Link className="contact-wa" to="/appointment">Book an appointment <ArrowRight size={15} /></Link></div></section>
}

function HomePage() {
  return <main><Hero /><FactsStrip /><AboutSection /><ServicesSection /><CollectionSection /><CraftSection /><section className="appointment-band"><div><Clock3 size={22} /><p className="eyebrow">YOUR VISIT, YOUR WAY</p><h2>Let’s talk through<br />what you have in mind.</h2><p>Share your preferred date and request. We’ll prepare a message for the shop so you can confirm it on WhatsApp.</p></div><Link className="button button-light" to="/appointment">Request an appointment <ArrowRight size={15} /></Link></section><ReviewsSection /><ContactStrip /></main>
}

function Footer() {
  return <footer className="site-footer"><div className="footer-brand"><Brand /><p>Women’s wear and professional tailoring in Meerut, established in 1998.</p></div><div className="footer-column"><strong>Explore</strong><nav aria-label="Footer navigation"><Link to="/about">About us</Link><Link to="/services">Our services</Link><Link to="/collections">Collections</Link><Link to="/blog">Journal</Link><Link to="/testimonials">Google reviews</Link><Link to="/contact">Contact</Link></nav></div><div className="footer-column footer-contact"><strong>Find the shop</strong><p>{business.address.value}</p><a href={`tel:+91${business.phone.value}`}>+91 99271 44263</a><a href={`tel:+91${business.secondPhone.value}`}>+91 79065 01679</a><a href={business.directionsUrl.value} target="_blank" rel="noopener noreferrer">Google Maps directions <ArrowRight size={13} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Renuka Tailors, Meerut</span><span><Users size={14} /> Founded by Vijay Gautam</span><nav><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></nav></div></footer>
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
    <Route path="/collections" element={<CollectionsHubPage />} />
    <Route path="/collections/:slug" element={<CollectionDetailPage />} />
    <Route path="/gallery" element={<Navigate to="/collections" replace />} />
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
