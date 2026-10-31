import type { SourceStatus } from './business'

export type ServiceItem = { name: string; slug?: string; status: SourceStatus }
export type ServiceCategory = {
  name: string
  slug: string
  path: string
  status: SourceStatus
  description: string
  image: string
  items: ServiceItem[]
}

export const services: ServiceCategory[] = [
  {
    name: "Women's Wear", slug: 'womens-wear', path: '/services/womens-wear', status: 'demo',
    description: 'A sample catalogue of tailored silhouettes, from everyday staples to occasion dressing.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    items: ['Salwar Kameez', 'Straight Suits', 'Anarkali Suits', 'Palazzo Suits', 'Punjabi Suits', 'Party Wear Suits', 'Churidar Suits', 'Blouse Stitching', 'Saree Blouses', 'Kurtis', 'Dresses', 'Gowns', 'Lehenga Stitching'].map((name, index) => ({ name, slug: index === 0 ? 'salwar-kameez' : undefined, status: index === 0 ? 'verified' : 'demo' })),
  },
  {
    name: "Men's Wear", slug: 'mens-wear', path: '/services/mens-wear', status: 'demo',
    description: "Illustrative men's tailoring categories for a future confirmed service list.",
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85',
    items: ['Shirts', 'Trousers', 'Formal Wear', 'Blazers', 'Waistcoats', 'Kurta Pyjama', 'Custom Suits'].map(name => ({ name, status: 'demo' })),
  },
  {
    name: 'Kids Wear', slug: 'kids-wear', path: '/services/kids-wear', status: 'demo',
    description: 'A sample edit of occasion and traditional wear ideas for children.',
    image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=1200&q=85',
    items: ['Kids Dresses', 'Traditional Wear', 'Birthday Outfits', 'Festive Wear'].map(name => ({ name, status: 'demo' })),
  },
  {
    name: 'Salwar Kameez', slug: 'salwar-kameez', path: '/services/salwar-kameez', status: 'verified',
    description: 'The listed tailoring category. Visit the shop to discuss your preferred silhouette, fabric and fit.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?auto=format&fit=crop&w=1200&q=85',
    items: ['Salwar Kameez', 'Straight Suits', 'Anarkali Suits', 'Palazzo Suits', 'Punjabi Suits', 'Churidar Suits'].map((name, index) => ({ name, status: index === 0 ? 'verified' : 'demo' })),
  },
  {
    name: 'Custom Tailoring', slug: 'custom-tailoring', path: '/services/custom-tailoring', status: 'demo',
    description: 'A sample landing page for discussing made-to-measure ideas; availability requires confirmation.',
    image: 'https://images.unsplash.com/photo-1708234165852-89c978e5e33d?auto=format&fit=crop&w=1400&q=85',
    items: ['Custom Designs', 'Party Wear', 'Festive Clothing', 'Special Occasion Outfits'].map(name => ({ name, status: 'demo' })),
  },
  {
    name: 'Alterations', slug: 'alterations', path: '/services/alterations', status: 'demo',
    description: 'Sample adjustment and repair categories shown for preview only.',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=85',
    items: ['Length Adjustment', 'Waist Adjustment', 'Sleeve Alterations', 'Fitting Corrections', 'Garment Repairs'].map(name => ({ name, status: 'demo' })),
  },
  {
    name: 'Designer Wear', slug: 'designer-wear', path: '/services/designer-wear', status: 'demo',
    description: 'A sample inspiration category for distinctive festive and occasion looks.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    items: ['Custom Designs', 'Party Wear', 'Festive Clothing', 'Special Occasion Outfits'].map(name => ({ name, status: 'demo' })),
  },
]
