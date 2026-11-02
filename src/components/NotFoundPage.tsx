import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage({ backTo = '/', backLabel = 'Return to the homepage' }: { backTo?: string; backLabel?: string }) {
  return <main className="simple-page">
    <section className="page-intro"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>This page couldn’t be found.</h1><p>The page may have moved or the address may be incorrect.</p></section>
    <section className="page-content"><Link className="text-link" to={backTo}>{backLabel} <ArrowRight size={15} /></Link></section>
  </main>
}
