import type { SourceStatus } from './business'

export type GalleryImage = { src: string; alt: string; category: string; status: SourceStatus }

export const gallery: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85', alt: 'Traditional Indian occasion wear inspiration', category: 'Traditional Wear', status: 'demo' },
  { src: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85', alt: 'Indian fashion detail inspiration', category: 'Salwar Kameez', status: 'demo' },
  { src: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?auto=format&fit=crop&w=1200&q=85', alt: 'Festive outfit inspiration', category: 'Festive Looks', status: 'demo' },
  { src: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=85', alt: 'Textile and fabric inspiration', category: 'Blouses', status: 'demo' },
  { src: 'https://images.unsplash.com/photo-1708234165852-89c978e5e33d?auto=format&fit=crop&w=1400&q=85', alt: 'Seamstress guiding fabric through a sewing machine', category: 'Custom Designs', status: 'demo' },
  { src: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85', alt: 'Formal menswear inspiration', category: "Men's Wear", status: 'demo' },
]
