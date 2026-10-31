import type { SourceStatus } from './business'

export const deliveryEstimates: { service: string; estimate: string; status: SourceStatus }[] = [
  { service: 'Basic stitching', estimate: '5–7 days', status: 'demo' },
  { service: 'Standard custom outfits', estimate: '7–12 days', status: 'demo' },
  { service: 'Detailed designer garments', estimate: '12–20 days', status: 'demo' },
  { service: 'Simple alterations', estimate: '2–4 days', status: 'demo' },
]
