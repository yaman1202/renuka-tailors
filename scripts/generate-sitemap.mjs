import { mkdir, writeFile } from 'node:fs/promises'
import { loadEnv } from 'vite'

const env = loadEnv('production', process.cwd(), 'VITE_')
const siteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL)?.replace(/\/$/, '')
if (!siteUrl) {
  console.warn('VITE_SITE_URL is unset; sitemap.xml was not generated. Set it to the public website origin before deployment.')
  process.exit(0)
}

const routes = [
  '/', '/about', '/services', '/services/womens-wear', '/services/professional-tailoring',
  '/services/embroidery', '/services/fashion-design', '/gallery', '/pricing',
  '/testimonials', '/faq', '/appointment', '/contact', '/location', '/privacy', '/terms',
]
const urls = routes.map(route => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')
await mkdir('public', { recursive: true })
await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`Generated sitemap.xml with ${routes.length} URLs.`)
