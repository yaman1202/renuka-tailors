import type { SourceStatus } from './business'

export type Testimonial = { name: string; quote: string; rating: number; category: string; status: SourceStatus }

export const testimonials: Testimonial[] = [
  { name: 'Sample Customer 01', quote: 'The outfit fit beautifully and the finishing looked elegant.', rating: 5, category: 'Salwar Kameez', status: 'demo' },
  { name: 'Sample Customer 02', quote: 'A pleasant tailoring experience with attention to the design.', rating: 5, category: 'Custom Wear', status: 'demo' },
  { name: 'Sample Customer 03', quote: 'Loved the overall look and finishing of the outfit.', rating: 5, category: 'Festive Wear', status: 'demo' },
]
