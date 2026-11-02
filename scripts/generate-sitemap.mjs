import { mkdir, writeFile } from 'node:fs/promises'
import { loadEnv } from 'vite'

const env = loadEnv('production', process.cwd(), 'VITE_')
const configuredSiteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL)?.trim()
if (!configuredSiteUrl) {
  console.warn('VITE_SITE_URL is unset; sitemap.xml was not generated. Set it to the public website origin before deployment.')
  process.exit(0)
}
const parsedSiteUrl = new URL(configuredSiteUrl)
if (!['http:', 'https:'].includes(parsedSiteUrl.protocol) || parsedSiteUrl.pathname !== '/' || parsedSiteUrl.search || parsedSiteUrl.hash) {
  throw new Error('VITE_SITE_URL must be an absolute HTTP(S) origin without a path, query, or fragment.')
}
const siteUrl = parsedSiteUrl.origin

const routes = [
  '/', '/about', '/services', '/services/womens-wear', '/services/professional-tailoring',
  '/services/salwar-suits', '/services/saree-blouses', '/services/embroidery', '/services/fashion-design',
  '/services/lehengas', '/services/gowns-dresses',
  '/collections', '/collections/blouse', '/collections/lehenga', '/collections/gown',
  '/collections/salwar-kameez', '/collections/kurti', '/collections/bridal-wear',
  '/collections/designer-wear', '/collections/suit', '/pricing', '/testimonials', '/faq',
  '/blog', '/blog/prepare-for-a-blouse-fitting', '/blog/plan-a-tailoring-visit',
  '/blog/choosing-embroidery-details', '/blog/use-a-style-reference-well',
  '/appointment', '/contact', '/location', '/privacy', '/terms',
]
const urls = routes.map(route => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')
await mkdir('dist', { recursive: true })
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`Generated sitemap.xml with ${routes.length} URLs.`)
