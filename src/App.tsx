import { useEffect, useState } from 'react'
import { ArrowRight, Award, Clock3, MapPin, Menu, Phone, Scissors, Sparkles, Users, X } from 'lucide-react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { business } from './data/business'
import { aboutPhotos, collectionPhotos, craftPhotos, featuredPhoto, heroPhoto, servicePhotos } from './data/photos'
import { ServicesIndexPage, ServiceDetailPage, LookbookPage } from './ServicePages'
import { PricingPage, TestimonialsPage, FAQPage, BlogPage, BlogArticlePage } from './InformationPages'
import { AboutPage, ContactPage, LocationPage } from './StorePages'
import { BookingPage } from './BookingPage'
import { PolicyPage } from './PolicyPages'
import { SeoHead } from './SeoHead'
import { ErrorBoundary } from './ErrorBoundary'
import { FeedbackForm } from './components/FeedbackForm'
import { PhotoGallery } from './components/PhotoGallery'
import { WhatsAppButton } from './components/WhatsAppButton'

function Brand() {
  return <Link className="brand" to="/" aria-label="Renuka Tailors home"><span className="brand-mark"><Scissors size={19} strokeWidth={1.6} /></span><span><strong>Renuka Tailors</strong><small>MEERUT · EST. 1998</small></span></Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <>
    <div className="announcement">Women’s wear and tailoring in Meerut <span>·</span> Est. 1998</div>
    <header className="site-header">
      <Brand />
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav-open' : ''} aria-label="Main navigation">
        <Link to="/#top" onClick={close}>Home</Link><Link to="/#about" onClick={close}>About us</Link>
        <div className="nav-services"><Link to="/services" onClick={close}>Our services</Link><div className="nav-dropdown"><Link to="/services/womens-wear" onClick={close}>Women’s wear</Link><Link to="/services/salwar-suits" onClick={close}>Salwar suits</Link><Link to="/services/saree-blouses" onClick={close}>Saree blouses</Link><Link to="/services/embroidery" onClick={close}>Embroidery work</Link><Link to="/services/fashion-design" onClick={close}>Design consultation</Link></div></div>
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
    <div className="hero-copy"><p className="eyebrow">RENUKA TAILORS <span>·</span> MEERUT</p><h1>The Art of<br /><em>Perfect Fit.</em></h1>
      <p className="hero-subtitle">Thoughtfully tailored. Beautifully crafted. Made to complement your style.</p>
      <div className="hero-actions"><Link className="button button-primary" to="/services">Discover Our Services <ArrowRight size={15} /></Link><Link className="button button-outline" to="/#collection">Explore Our Collection <ArrowRight size={15} /></Link></div>
      <p className="hero-byline"><span className="byline-rule" /> Women’s wear in Meerut since 1998</p>
    </div>
    <div className="hero-image-wrap"><img src={heroPhoto.src} alt={heroPhoto.alt} fetchPriority="high" /><span className="image-caption">Campaign image · Unsplash</span></div>
  </section>
}

function FactsStrip() {
  return <section className="facts-strip" aria-label="Renuka Tailors at a glance"><div><strong>Since 1998</strong><span>Established by Vijay Gautam</span></div><div><strong>100+ workers</strong><span>An experienced tailoring team</span></div><div><strong>Fashion designers</strong><span>Design support at the shop</span></div><div><strong>Embroidery</strong><span>Traditional and detailed work</span></div></section>
}

function AboutSection() {
  return <section className="about-section" id="about">
    <div className="about-photo-stack">
      <figure className="about-image about-image-main"><img src={aboutPhotos[0].src} alt={aboutPhotos[0].alt} loading="lazy" /><figcaption>{aboutPhotos[0].note}</figcaption></figure>
      <figure className="about-image about-image-detail"><img src={aboutPhotos[1].src} alt={aboutPhotos[1].alt} loading="lazy" /><figcaption>{aboutPhotos[1].note}</figcaption></figure>
    </div>
    <div className="about-copy"><p className="eyebrow">ABOUT RENUKA TAILORS</p><h2>Made with care.<br /><em>Worn your way.</em></h2><p>Founded by Vijay Gautam in 1998, Renuka Tailors brings women’s wear and professional tailoring together in Meerut.</p><p>Professional fashion designers, a team of more than 100 workers, latest technology machines and embroidery expertise support the work.</p><div className="about-facts"><span><strong>1998</strong>Established</span><span><strong>100+</strong>Team members</span><span><strong>Meerut</strong>Uttar Pradesh</span></div><Link className="text-link" to="/about">More about us <ArrowRight size={15} /></Link><small className="reference-note">Photographs are illustrative style references.</small></div>
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
  return <section className="collection-section" id="collection"><div className="collection-heading"><SectionIntro label="STYLE REFERENCES" title="Ideas for what comes next." copy="A collection of colours, silhouettes and details to help start a design conversation. These licensed photographs are not Renuka Tailors products or completed work." /><Link className="text-link" to="/gallery">View all photographs <ArrowRight size={15} /></Link></div>
    <PhotoGallery photos={collectionPhotos} label="View larger photo" className="photo-gallery--collection" />
    <div className="inventory-note"><span className="inventory-mark"><Scissors size={19} /></span><div><strong>Looking for current styles?</strong><p>We don’t publish an online stock catalogue. Call or visit the shop to ask what’s currently available.</p></div><Link className="text-link" to="/contact">Contact the shop <ArrowRight size={15} /></Link></div><a className="image-credit-link" href="/images/IMAGE_CREDITS.md">Image sources and credits <ArrowRight size={12} /></a>
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
