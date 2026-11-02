import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Scissors } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { collections, collectionStyles, type CollectionStyle } from './data/collections'
import { business } from './data/business'
import { PhotoGallery } from './components/PhotoGallery'
import { NotFoundPage } from './components/NotFoundPage'

export function CollectionEntryGrid({ compact = false }: { compact?: boolean }) {
  return <div className={`collection-entry-grid${compact ? ' collection-entry-grid--home' : ''}`}>
    {collections.map((collection, index) => {
      const coverPhoto = collection.photos[collection.slug === 'bridal-wear' ? 3 : 0]
      return <Link className="collection-entry" to={`/collections/${collection.slug}`} key={collection.slug}>
        <span className="collection-entry-image"><img src={coverPhoto.src} alt={coverPhoto.alt} loading="lazy" /></span>
        <span className="collection-entry-meta"><span>0{index + 1}</span></span>
        <span className="collection-entry-title">{collection.title}<ArrowRight size={15} aria-hidden="true" /></span>
      </Link>
    })}
  </div>
}

export function CollectionsHubPage() {
  return <main className="simple-page">
    <section className="page-intro"><p className="eyebrow">STYLE REFERENCES</p><h1>Find a starting point.</h1><p>Browse women’s wear references by garment. The photographs are licensed examples to help you describe a style; they are not Renuka Tailors products, stock or finished customer work.</p></section>
    <section className="page-content collections-hub-content"><CollectionEntryGrid /></section>
  </main>
}

export function CollectionDetailPage() {
  const { slug = '' } = useParams()
  const collection = collections.find((item) => item.slug === slug)
  const [selectedStyle, setSelectedStyle] = useState<'All' | CollectionStyle>('All')
  useEffect(() => setSelectedStyle('All'), [slug])
  const styles = useMemo(() => collectionStyles.filter((style) => collection?.photos.some((photo) => photo.styles.includes(style))), [collection])
  if (!collection) return <NotFoundPage backTo="/collections" backLabel="Browse all collections" />
  const visiblePhotos = selectedStyle === 'All' ? collection.photos : collection.photos.filter((photo) => photo.styles.includes(selectedStyle))

  return <main className="simple-page collection-detail-page">
    <section className="page-intro collection-detail-intro"><Link className="back-link" to="/collections"><ArrowLeft size={14} /> All collections</Link><p className="eyebrow">STYLE REFERENCES · {collection.title.toUpperCase()}</p><h1>{collection.title} ideas.</h1><p>{collection.intro} These photographs are licensed visual references; they are not products in stock or examples of completed Renuka Tailors work.</p></section>
    <section className="page-content collection-detail-content">
      <div className="collection-filter-heading"><div><p className="eyebrow">BROWSE BY STYLE</p><h2>Choose a direction.</h2></div><span aria-live="polite">{visiblePhotos.length} photographs</span></div>
      <div className="collection-filters" role="group" aria-label={`Filter ${collection.title} style references`}>
        <button className={selectedStyle === 'All' ? 'is-selected' : ''} type="button" onClick={() => setSelectedStyle('All')} aria-pressed={selectedStyle === 'All'}>All styles</button>
        {styles.map((style) => <button className={selectedStyle === style ? 'is-selected' : ''} type="button" onClick={() => setSelectedStyle(style)} aria-pressed={selectedStyle === style} key={style}>{style}</button>)}
      </div>
      <PhotoGallery photos={visiblePhotos} label={`View ${collection.title} photo`} className="photo-gallery--collection-page" showNotes={false} />
      <aside className="collection-contact-card"><span className="inventory-mark"><Scissors size={18} /></span><div><strong>Have a look in mind?</strong><p>Bring a reference and talk with the team about the design, fit and finishing you need. Photos shown here are not available to buy.</p></div><Link className="button button-primary" to="/appointment">Plan a visit <ArrowRight size={14} /></Link></aside>
      <nav className="collection-next-links" aria-label="Other garment collections">{collections.filter((item) => item.slug !== collection.slug).map((item) => <Link to={`/collections/${item.slug}`} key={item.slug}>{item.shortTitle}<ArrowRight size={13} /></Link>)}</nav>
      <p className="collection-call-line"><a href={`tel:+91${business.phone.value}`}>Call +91 {business.phone.value}</a> to ask a question before visiting.</p>
    </section>
  </main>
}
