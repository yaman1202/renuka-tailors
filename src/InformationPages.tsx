import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { business } from './data/business'
import { journalArticles } from './data/articles'
import { FeedbackForm } from './components/FeedbackForm'
import { NotFoundPage } from './components/NotFoundPage'

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
    ['How do I ask for a quote?', `Call either of the numbers on the Contact page or visit the shop at ${business.address.value}.`],
  ]
  return <main className="simple-page">{title('HELP', 'Common questions.', 'A few details about the shop.')}<section className="page-content faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<Link className="text-link" to="/contact">Contact us <ArrowRight size={15} /></Link></section></main>
}

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All articles')
  const categories = useMemo(() => ['All articles', ...new Set(journalArticles.map((article) => article.category))], [])
  const articles = activeCategory === 'All articles' ? journalArticles : journalArticles.filter((article) => article.category === activeCategory)

  return <main className="simple-page journal-page">
    {title('THE JOURNAL', 'Notes for your next visit.', 'Simple guides to help you talk through fit, fabric and finishing with the tailoring team.')}
    <section className="page-content journal-content">
      <div className="journal-filters" role="group" aria-label="Filter journal articles">
        {categories.map((category) => <button type="button" key={category} aria-pressed={activeCategory === category} className={activeCategory === category ? 'is-selected' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
      </div>
      <p className="journal-result-count" aria-live="polite">{articles.length} {articles.length === 1 ? 'article' : 'articles'}</p>
      <div className="journal-card-grid">
        {articles.map((article) => <article className="journal-card" key={article.slug}>
          <div className="journal-card-meta"><span>{article.category}</span><span><Clock3 size={13} /> {article.minutes} min read</span></div>
          <h2><Link to={`/blog/${article.slug}`}>{article.title}</Link></h2>
          <p>{article.summary}</p>
          <Link className="text-link" to={`/blog/${article.slug}`}>Read the guide <ArrowRight size={15} /></Link>
        </article>)}
      </div>
      <p className="journal-contact-line">Have a question about a garment? <Link to="/contact">Contact the shop <ArrowRight size={14} /></Link></p>
    </section>
  </main>
}

export function BlogArticlePage() {
  const { slug = '' } = useParams()
  const article = journalArticles.find((item) => item.slug === slug)
  if (!article) return <NotFoundPage backTo="/blog" backLabel="Back to the journal" />

  return <main className="simple-page journal-article-page">
    <section className="page-intro journal-article-intro">
      <Link className="back-link" to="/blog"><ArrowLeft size={14} /> The journal</Link>
      <p className="eyebrow">{article.category.toUpperCase()} <span className="article-dot">·</span> {article.minutes} MIN READ</p>
      <h1>{article.title}</h1>
      <p>{article.summary}</p>
    </section>
    <article className="page-content journal-article-content">
      {article.sections.map((section) => <section key={section.heading}>
        <h2>{section.heading}</h2>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
      </section>)}
      <div className="journal-article-end"><Link className="text-link" to="/blog"><ArrowLeft size={15} /> More from the journal</Link><Link className="button button-primary" to="/appointment">Plan a visit <ArrowRight size={15} /></Link></div>
    </article>
  </main>
}
