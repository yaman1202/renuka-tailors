import type { SourceStatus } from './business'

export const businessHours: { day: string; hours: string; status: SourceStatus }[] = [
  { day: 'Monday–Saturday', hours: '10:00 AM – 8:00 PM', status: 'demo' },
  { day: 'Sunday', hours: '11:00 AM – 5:00 PM', status: 'demo' },
]
