import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business } from './data/business'
import { FeedbackForm } from './components/FeedbackForm'

const title = (label: string, heading: string, copy: string) => <section className="page-intro"><p className="eyebrow">{label}</p><h1>{heading}</h1><p>{copy}</p></section>

export function PricingPage() {
  return <main className="simple-page">{title('PRICING', 'Ask us about current prices.', 'Prices depend on the garment and the work involved. Please contact or visit the shop for a current quote.')}<section className="page-content"><a className="button button-primary" href={`tel:+91${business.phone.value}`}>Call +91 99271 44263 <ArrowRight size={15} /></a></section></main>
}

export function TestimonialsPage() {
  return <main className="simple-page">{title('REVIEWS', 'Your honest feedback helps.', 'We have not added customer reviews here. You can leave an honest review on Google or send private feedback to the shop.')}<section className="page-content reviews-page-actions"><a className="button button-primary" href={business.reviewUrl.value} target="_blank" rel="noreferrer">Share a Google review <ArrowRight size={15} /></a><FeedbackForm /></section></main>
}

export function FAQPage() {
  const questions = [
    ['Where is Renuka Tailors?', business.address.value],
    ['Who founded Renuka Tailors?', 'Renuka Tailors was founded by Vijay Gautam and established in 1998.'],
    ['What work does the shop do?', 'Women’s wear, professional tailoring and embroidery work. Contact the shop to discuss a garment.'],
    ['How do I ask for a quote?', 'Call either of the numbers on the Contact page or visit the shop in Sadar Chowk Bazar.'],
  ]
  return <main className="simple-page">{title('HELP', 'Common questions.', 'A few details about the shop.')}<section className="page-content faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<Link className="text-link" to="/contact">Contact us <ArrowRight size={15} /></Link></section></main>
}

export function BlogPage() {
  return <main className="simple-page">{title('NEWS', 'Updates from the shop.', 'There are no updates to share yet.')}<section className="page-content"><Link className="text-link" to="/">Return home <ArrowRight size={15} /></Link></section></main>
}

export function BlogArticlePage() {
  return <BlogPage />
}
