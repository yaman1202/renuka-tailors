import { mkdir, writeFile } from 'node:fs/promises'

const siteUrl = process.env.VITE_SITE_URL?.replace(/\/$/, '')
if (!siteUrl) {
  console.warn('VITE_SITE_URL is unset; sitemap.xml was not generated. Set it to the public website origin before deployment.')
  process.exit(0)
}

const demoMode = process.env.VITE_DEMO_MODE !== 'false'
const verifiedRoutes = ['/', '/about', '/services', '/services/salwar-kameez', '/contact', '/location']
const demoRoutes = [
  '/services/womens-wear', '/services/mens-wear', '/services/kids-wear', '/services/custom-tailoring',
  '/services/alterations', '/services/designer-wear', '/gallery', '/pricing', '/testimonials', '/faq', '/blog',
  '/appointment',
  '/blog/choose-the-perfect-salwar-suit', '/blog/understanding-suit-styles', '/blog/choosing-a-blouse-design',
  '/blog/how-to-get-a-good-fit', '/blog/traditional-outfit-inspiration', '/blog/fabric-selection-notes',
]
const routes = demoMode ? [...verifiedRoutes, ...demoRoutes] : verifiedRoutes
const urls = routes.map(route => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')
await mkdir('public', { recursive: true })
await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`Generated sitemap.xml with ${routes.length} URLs.`)
