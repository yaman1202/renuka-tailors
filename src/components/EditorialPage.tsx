import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DemoBadge } from './DemoBadge'

export function PageHero({ eyebrow, title, emphasis, description, image, status = 'demo' }: {
  eyebrow: string; title: string; emphasis: string; description: string; image: string; status?: 'verified' | 'demo' | 'needs_confirmation'
}) {
  return <section className="editorial-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(20,16,14,.73),rgba(20,16,14,.16)),url("${image}")` }}>
    <div className="editorial-hero-frame" />
    <div className="editorial-hero-copy"><p className="page-eyebrow">{eyebrow}<DemoBadge status={status} /></p><h1>{title}<br /><em>{emphasis}</em></h1><p>{description}</p></div>
    <span className="editorial-hero-caption">EDITORIAL IMAGE · DEMO INSPIRATION</span>
  </section>
}

export function PageTitle({ eyebrow, title, emphasis, children }: { eyebrow: string; title: string; emphasis?: string; children?: ReactNode }) {
  return <div className="page-title"><p className="section-kicker">{eyebrow}</p><h2>{title} {emphasis && <em>{emphasis}</em>}</h2>{children && <div className="page-title-copy">{children}</div>}</div>
}

export function AppointmentCTA({ title = 'Your idea starts here.', description = 'Visit the shop to begin a conversation about your garment.' }: { title?: string; description?: string }) {
  return <section className="page-cta"><div><p className="eyebrow">A PERSONAL START</p><h2>{title}</h2><p>{description}</p></div><Link className="button button-light" to="/appointment">Plan a visit <ArrowRight size={16} /></Link></section>
}

export function RelatedLinks({ paths }: { paths: { title: string; to: string; label?: string }[] }) {
  return <div className="related-grid">{paths.map(item => <Link to={item.to} className="related-link" key={item.to}><span>{item.label ?? 'EXPLORE'}</span><strong>{item.title}</strong><ArrowUpRight size={18} /></Link>)}</div>
}
