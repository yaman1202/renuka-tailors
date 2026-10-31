import { useEffect, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Menu, MapPin, Scissors, X } from 'lucide-react'

const mapUrl = 'https://www.google.com/maps/dir/?api=1&destination=28.996372%2C77.6992851'
const address = 'Near Baldev Di Haati, Sadar Chowk Bazar, Meerut, Uttar Pradesh, India'
const photos = {
  hero: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2200&q=88',
  detail: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1100&q=85',
  festive: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?auto=format&fit=crop&w=1100&q=85',
  fabric: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1100&q=85',
  craft: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=85',
}

function Wordmark({ light = false }: { light?: boolean }) {
  return <a className={`wordmark${light ? ' wordmark-light' : ''}`} href="#home" aria-label="Renuka Tailors home">
    <span className="wordmark-symbol"><Scissors size={18} strokeWidth={1.2} /></span>
    <span><strong>RENuka</strong><small>TAILORS · MEERUT</small></span>
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <>
    <div className="preview-bar"><span className="preview-dot" /> PREVIEW WEBSITE <span className="preview-divider">/</span> SAMPLE CONTENT</div>
    <header className="site-header">
      <Wordmark />
      <nav className={open ? 'nav-open' : ''} aria-label="Main navigation">
        <a onClick={() => setOpen(false)} href="#craft">Our approach</a>
        <a onClick={() => setOpen(false)} href="#services">Services</a>
        <a onClick={() => setOpen(false)} href="#inspiration">Inspiration</a>
        <a onClick={() => setOpen(false)} href="#visit">Visit us</a>
        <a className="nav-appointment" onClick={() => setOpen(false)} href="#visit">Plan a visit <ArrowUpRight size={15} /></a>
      </nav>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
  </>
}

function Hero() {
  return <section className="hero" id="home" style={{ backgroundImage: `url("${photos.hero}")` }}>
    <div className="hero-shade" />
    <div className="hero-topline"><span>RENuka TAILORS · MEERUT</span><span>MADE FOR THE WAY YOU FEEL</span></div>
    <div className="hero-copy">
      <p className="eyebrow hero-eyebrow"><span /> A MORE PERSONAL KIND OF TAILORING</p>
      <h1>The art of<br /><em>perfect fit.</em></h1>
      <p className="hero-subtitle">Thoughtfully tailored. Beautifully crafted.<br className="desktop-break" /> Made to complement your style.</p>
      <div className="hero-actions"><a className="button button-light" href="#services">Discover our services <ArrowRight size={16} /></a><a className="text-link light-link" href="#craft">Explore our craft <ArrowDownRight size={16} /></a></div>
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

const serviceItems = [
  { n: '01', title: 'Salwar Kameez', meta: 'LISTED CATEGORY', image: photos.festive, verified: true, text: 'A considered fit for a timeless favourite. Explore silhouettes from straight suits to softly flowing styles.' },
  { n: '02', title: "Women's wear", meta: 'DEMO CATEGORY', image: photos.detail, text: 'An illustrative edit of blouses, kurtis, dresses and occasion pieces, shown as sample categories.' },
  { n: '03', title: 'Custom & occasion', meta: 'DEMO CATEGORY', image: photos.fabric, text: 'A starting point for made-to-measure ideas, festive details and personal design conversations.' },
]

function Services() {
  return <section className="services section-pad" id="services">
    <div className="services-head"><div><div className="section-kicker"><span>02</span><span>THE STITCHING ATELIER</span></div><h2>Made around<br /><em>your idea.</em></h2></div><p>Start with a style you love. We’ll help shape the details, fit and finish around it.<small>Additional categories shown here are sample concepts requiring confirmation.</small></p></div>
    <div className="service-grid">{serviceItems.map(item => <a className="service-item" href="#visit" key={item.n}>
      <div className="service-image"><img src={item.image} alt={`Editorial inspiration for ${item.title.toLowerCase()}`} loading="lazy" /><span className="service-number">{item.n}</span><span className="service-arrow"><ArrowUpRight size={19} /></span></div>
      <div className="service-meta"><span>{item.meta}</span>{item.verified && <span className="verified-mark">● LISTED</span>}</div>
      <h3>{item.title}</h3><p>{item.text}</p>
    </a>)}</div>
    <div className="all-services"><span>More styles to discover</span><a className="text-link dark-link" href="#inspiration">View the lookbook <ArrowUpRight size={15} /></a></div>
  </section>
}

function Craft() {
  const steps = [['01', 'A conversation', 'Share the garment you have in mind and what matters most to you.'], ['02', 'Shape the details', 'Talk through design, fabric and fit before the stitching begins.'], ['03', 'The fitting', 'Visit the shop to discuss measurements and the next steps for your garment.'], ['04', 'A final look', 'Arrange a trial and collection conversation at the shop.']]
  return <section className="craft section-pad" id="craft">
    <div className="craft-photo"><img src={photos.craft} alt="Illustrative image of a garment being prepared" loading="lazy" /><div className="craft-stamp">A PERSONAL<br /><em>process</em><span>— RENUKA TAILORS —</span></div><span className="photo-note">ILLUSTRATIVE CRAFT IMAGE · DEMO</span></div>
    <div className="craft-content"><div className="section-kicker"><span>03</span><span>THE MAKING OF IT</span></div><p className="eyebrow">A SUGGESTED JOURNEY</p><h2>Good work<br />begins with<br /><em>a conversation.</em></h2><p className="craft-intro">Every garment starts somewhere different. Here’s one way a visit to the shop could take shape.</p>
      <div className="steps">{steps.map(([n, name, text]) => <div className="step" key={n}><span className="step-no">{n}</span><div><h3>{name}</h3><p>{text}</p></div><ArrowDownRight size={16} /></div>)}</div>
      <a className="text-link dark-link" href="#visit">Start with a visit <ArrowRight size={15} /></a>
      <p className="fine-print">This is a suggested customer journey for preview purposes, not a confirmed service policy or timing commitment.</p>
    </div>
  </section>
}

function Inspiration() {
  return <section className="inspiration section-pad" id="inspiration">
    <div className="inspiration-head"><div className="section-kicker"><span>04</span><span>COLOUR · CUT · CHARACTER</span></div><div className="inspiration-title"><h2>Ideas to make<br /><em>your own.</em></h2><p>Fashion imagery is here as inspiration only. These are not Renuka Tailors customer orders.</p></div></div>
    <div className="lookbook-grid"><figure className="look look-tall"><img src={photos.festive} alt="Fashion inspiration in traditional Indian clothing" loading="lazy" /><figcaption><span>01 / TRADITIONAL</span><strong>A study in silhouette</strong></figcaption></figure><figure className="look look-wide"><img src={photos.fabric} alt="Fabric texture as fashion inspiration" loading="lazy" /><figcaption><span>02 / TEXTURE</span><strong>Let the fabric speak</strong></figcaption></figure><div className="lookbook-note"><span>LOOKBOOK NOTE</span><p>Sample editorial imagery.<br />Replace with approved shop work<br />when available.</p><a className="text-link dark-link" href="#services">Explore the categories <ArrowUpRight size={15} /></a></div></div>
  </section>
}

function Visit() {
  return <section className="visit section-pad" id="visit">
    <div className="section-kicker"><span>05</span><span>IN THE HEART OF MEERUT</span></div>
    <div className="visit-grid"><div className="visit-copy"><p className="eyebrow">COME BY, SAY HELLO</p><h2>A real shop.<br /><em>A personal start.</em></h2><p className="visit-address">Near Baldev Di Haati,<br />Sadar Chowk Bazar,<br />Meerut, Uttar Pradesh, India</p><a className="button button-dark" href={mapUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a><p className="visit-note">Store image to be added when a verified storefront photograph is supplied.</p></div><div className="storefront-placeholder"><div className="placeholder-art"><div className="placeholder-sun" /><div className="shop-front"><div className="shop-sign">RENuka <span>TAILOR</span></div><div className="shop-window"><span /><span /><span /></div><div className="shop-door" /></div></div><div className="placeholder-caption"><span>THE MEERUT STOREFRONT</span><span>LOCATION VERIFIED · PHOTO NEEDED</span></div><span className="map-pin"><MapPin size={19} /></span></div></div>
  </section>
}

function Footer() {
  return <footer className="footer"><div className="footer-main"><div><Wordmark light /><p className="footer-line">Thoughtfully tailored.<br /><em>Beautifully yours.</em></p></div><div className="footer-nav"><span>EXPLORE</span><a href="#craft">Our approach</a><a href="#services">Services</a><a href="#inspiration">Inspiration</a></div><div className="footer-nav"><span>FIND US</span><p>{address}</p><a href={mapUrl} target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={14} /></a><a href="https://www.justdial.com/Meerut/Renuka-Tailors-Near-Baldev-Di-Haati-Sadar-Chowk-Bazar/9999PX121-X121-091217164736-S1V7_BZDET" target="_blank" rel="noreferrer">Justdial listing <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><span>© 2026 RENUKA TAILORS · MEERUT</span><span>PREVIEW WEBSITE · SAMPLE CONTENT</span><a href="#home">BACK TO TOP ↑</a></div></footer>
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target) }
    }), { threshold: .12 })
    document.querySelectorAll('.section-pad, .service-item, .look, .craft-photo').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return <><Header /><main><Hero /><Introduction /><Services /><Craft /><Inspiration /><Visit /></main><Footer /></>
}
