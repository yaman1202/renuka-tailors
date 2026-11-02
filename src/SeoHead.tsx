import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { business } from './data/business'
import { collections } from './data/collections'

const pages: Record<string, { title: string; description: string }> = {
  '/': { title: "Renuka Tailors | Women's Wear & Tailoring in Meerut", description: 'Established in 1998 by Vijay Gautam. Women’s wear, professional tailoring and embroidery in Meerut.' },
  '/about': { title: 'About Renuka Tailors | Meerut', description: 'Founded by Vijay Gautam in 1998, Renuka Tailors offers women’s wear, professional tailoring and embroidery in Meerut.' },
  '/services': { title: 'Tailoring Services | Renuka Tailors Meerut', description: 'Women’s wear, professional tailoring, fashion design and embroidery at Renuka Tailors in Meerut.' },
  '/services/womens-wear': { title: 'Women’s Wear | Renuka Tailors Meerut', description: 'Discuss traditional and contemporary women’s wear with Renuka Tailors in Meerut.' },
  '/services/professional-tailoring': { title: 'Professional Tailoring | Renuka Tailors Meerut', description: 'Discuss tailoring, fit and finishing with Renuka Tailors in Meerut.' },
  '/services/embroidery': { title: 'Embroidery Work | Renuka Tailors Meerut', description: 'Ask Renuka Tailors in Meerut about embroidery work and garment details.' },
  '/services/fashion-design': { title: 'Fashion Design | Renuka Tailors Meerut', description: 'Speak with professional fashion designers at Renuka Tailors in Meerut.' },
  '/gallery': { title: 'Style References | Renuka Tailors Meerut', description: 'Licensed style-reference photos to help start a design conversation at Renuka Tailors.' },
  '/collections': { title: 'Women’s Wear Collections | Renuka Tailors Meerut', description: 'Browse blouse, lehenga, gown, salwar kameez, kurti, bridal, designer wear and suit style references.' },
  '/pricing': { title: 'Contact for a Quote | Renuka Tailors', description: 'Contact Renuka Tailors in Meerut for current garment and tailoring quotes.' },
  '/testimonials': { title: 'Customer Feedback | Renuka Tailors', description: 'Leave an honest Google review or send private feedback directly to Renuka Tailors.' },
  '/contact': { title: 'Contact Renuka Tailors | Meerut', description: `Call or visit Renuka Tailors at ${business.address.value}.` },
  '/location': { title: 'Location | Renuka Tailors, Meerut', description: `Find Renuka Tailors at ${business.address.value}.` },
  '/appointment': { title: 'Book an Appointment | Renuka Tailors Meerut', description: 'Prepare an appointment request for Renuka Tailors in Meerut through WhatsApp.' },
  '/faq': { title: 'Common Questions | Renuka Tailors Meerut', description: 'Frequently asked questions about Renuka Tailors, services and location.' },
  '/blog': { title: 'Shop Updates | Renuka Tailors Meerut', description: 'Updates from Renuka Tailors in Meerut.' },
}

export function SeoHead() {
  const { pathname } = useLocation()
  useEffect(() => {
    const canonicalBase = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')
    const collectionSlug = pathname.match(/^\/collections\/([^/]+)$/)?.[1]
    const collection = collections.find((item) => item.slug === collectionSlug)
    const metadata = pages[pathname] ?? (collection
      ? { title: `${collection.title} Style References | Renuka Tailors Meerut`, description: `${collection.intro} Browse licensed visual references from Renuka Tailors in Meerut.` }
      : { title: `${business.name.value} | Meerut`, description: 'Women’s wear, professional tailoring and embroidery in Meerut.' })
    const canonicalUrl = `${canonicalBase}${pathname}`
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
      name: business.name.value, url: canonicalBase, description: business.category.value,
      telephone: `+91${business.phone.value}`,
      address: { '@type': 'PostalAddress', streetAddress: business.address.value, addressLocality: 'Meerut', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
      geo: { '@type': 'GeoCoordinates', latitude: business.coordinates.latitude, longitude: business.coordinates.longitude },
      sameAs: [business.mapsUrl.value, business.justdialUrl.value],
    })
    document.head.append(schema)
  }, [pathname])
  return null
}
