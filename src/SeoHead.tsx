import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { business, DEMO_MODE } from './data/business'
import { blogPosts } from './data/blog'
import { services } from './data/services'

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'Renuka Tailors | Tailor in Meerut', description: 'Visit Renuka Tailors near Baldev Di Haati, Sadar Chowk Bazar, Meerut. Salwar Kameez Tailoring is the listed category.' },
  '/about': { title: 'About Renuka Tailors | Meerut', description: 'Meet the verified shop details and tailoring point of view of Renuka Tailors in Sadar Chowk Bazar, Meerut.' },
  '/services': { title: 'Tailoring Services | Renuka Tailors Meerut', description: 'Explore the listed Salwar Kameez Tailoring category and clearly marked sample service categories for Renuka Tailors, Meerut.' },
  '/services/salwar-kameez': { title: 'Salwar Kameez Tailoring in Meerut | Renuka Tailors', description: 'Renuka Tailors is listed for Salwar Kameez Tailoring near Baldev Di Haati, Sadar Chowk Bazar, Meerut.' },
  '/pricing': { title: 'Indicative Stitching Prices | Renuka Tailors Meerut', description: 'See sample demonstration stitching price ranges for garments. These are illustrative estimates, not confirmed Renuka Tailors prices.' },
  '/gallery': { title: 'Fashion Lookbook Inspiration | Renuka Tailors Meerut', description: 'Explore sample editorial fashion inspiration. Images are not customer orders or completed garments by Renuka Tailors.' },
  '/testimonials': { title: DEMO_MODE ? 'Sample Testimonials | Renuka Tailors' : 'Customer Testimonials | Renuka Tailors', description: DEMO_MODE ? 'Preview clearly labeled sample review cards. No verified customer testimonials or Google ratings are claimed.' : 'No approved customer testimonials or verified Google ratings have been supplied.' },
  '/faq': { title: 'Tailoring FAQs | Renuka Tailors Meerut', description: 'Answers about the listed Salwar Kameez Tailoring category, the Meerut shop location and details requiring confirmation.' },
  '/blog': { title: 'Style Journal | Renuka Tailors Meerut', description: 'Sample editorial ideas about Salwar suits, garment fit, fabric and traditional fashion.' },
  '/appointment': { title: 'Plan a Visit | Renuka Tailors Meerut', description: 'Prepare a sample tailoring enquiry for a visit to Renuka Tailors in Sadar Chowk Bazar, Meerut.' },
  '/contact': { title: 'Contact Renuka Tailors | Meerut', description: 'Find Renuka Tailors near Baldev Di Haati, Sadar Chowk Bazar, Meerut, and open verified directions.' },
  '/location': { title: 'Renuka Tailors Location | Sadar Chowk Bazar Meerut', description: 'Find the Renuka Tailors storefront location near Baldev Di Haati, Sadar Chowk Bazar, Meerut.' },
  '/privacy': { title: 'Privacy Notice | Renuka Tailors', description: 'Draft privacy notice for the Renuka Tailors website preview; review before public launch.' },
  '/terms': { title: 'Website Terms | Renuka Tailors', description: 'Draft website terms for Renuka Tailors preview content; review before public launch.' },
}

export function SeoHead() {
  const { pathname } = useLocation()
  useEffect(() => {
    const canonicalBase = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')
    const canonicalUrl = `${canonicalBase}${pathname}`
    const service = services.find(item => item.path === pathname)
    const article = blogPosts.find(item => `/blog/${item.slug}` === pathname)
    const metadata = article
      ? { title: `${article.title} | Renuka Tailors Journal`, description: article.excerpt }
      : service
        ? { title: `${service.name} Tailoring | Renuka Tailors Meerut`, description: service.status === 'verified' ? service.description : `Sample category for website preview. Confirm service availability with Renuka Tailors in Meerut.` }
        : pageMetadata[pathname] ?? { title: `${business.name.value} | Meerut`, description: `Explore tailoring information for ${business.name.value} in Meerut.` }
    document.title = metadata.title
    const setMeta = (selector: string, attribute: string, value: string, create: () => HTMLMetaElement) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) { element = create(); document.head.append(element) }
      element.setAttribute(attribute, value)
    }
    setMeta('meta[name="description"]', 'content', metadata.description, () => Object.assign(document.createElement('meta'), { name: 'description' }))
    setMeta('meta[property="og:title"]', 'content', metadata.title, () => Object.assign(document.createElement('meta'), { property: 'og:title' }))
    setMeta('meta[property="og:description"]', 'content', metadata.description, () => Object.assign(document.createElement('meta'), { property: 'og:description' }))
    setMeta('meta[property="og:type"]', 'content', 'website', () => Object.assign(document.createElement('meta'), { property: 'og:type' }))
    setMeta('meta[property="og:url"]', 'content', canonicalUrl, () => Object.assign(document.createElement('meta'), { property: 'og:url' }))
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
    canonical.href = canonicalUrl

    document.head.querySelector('#renuka-business-schema')?.remove()
    const schema = document.createElement('script')
    schema.id = 'renuka-business-schema'
    schema.type = 'application/ld+json'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Tailor', '@id': `${canonicalBase}/#business`,
      name: business.name.value, url: canonicalBase, description: 'Tailoring / Salwar Kameez Tailoring',
      address: { '@type': 'PostalAddress', streetAddress: 'Near Baldev Di Haati, Sadar Chowk Bazar', addressLocality: 'Meerut', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
      geo: { '@type': 'GeoCoordinates', latitude: business.coordinates.latitude, longitude: business.coordinates.longitude },
      sameAs: [business.mapsUrl.value, business.justdialUrl.value],
    })
    document.head.append(schema)
    document.documentElement.dataset.demoMode = String(DEMO_MODE)
  }, [pathname])
  return null
}
