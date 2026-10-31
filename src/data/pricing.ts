import type { SourceStatus } from './business'

export type PriceEstimate = { service: string; category: string; low: number; high: number; status: SourceStatus }

export const pricing: PriceEstimate[] = [
  { service: 'Basic Salwar Suit', category: "Women's Wear", low: 700, high: 1200, status: 'demo' },
  { service: 'Straight Suit', category: "Women's Wear", low: 900, high: 1500, status: 'demo' },
  { service: 'Anarkali Suit', category: "Women's Wear", low: 1500, high: 3000, status: 'demo' },
  { service: 'Palazzo Suit', category: "Women's Wear", low: 1000, high: 1800, status: 'demo' },
  { service: 'Blouse Stitching', category: "Women's Wear", low: 500, high: 1000, status: 'demo' },
  { service: 'Kurti Stitching', category: "Women's Wear", low: 600, high: 1100, status: 'demo' },
  { service: 'Saree Blouse', category: "Women's Wear", low: 500, high: 1200, status: 'demo' },
  { service: "Men's Shirt", category: "Men's Wear", low: 600, high: 1000, status: 'demo' },
  { service: "Men's Trousers", category: "Men's Wear", low: 500, high: 900, status: 'demo' },
  { service: 'Kids Wear', category: 'Kids Wear', low: 500, high: 1200, status: 'demo' },
  { service: 'Basic Alteration', category: 'Alterations', low: 150, high: 400, status: 'demo' },
  { service: 'Complex Alteration', category: 'Alterations', low: 300, high: 800, status: 'demo' },
  { service: 'Custom Designer Outfit', category: 'Custom & Designer', low: 2000, high: 5000, status: 'demo' },
]

export const priceDisclaimer = 'These are sample demonstration estimates, not confirmed Renuka Tailors prices. Final pricing depends on garment design, fabric, detailing and consultation.'
