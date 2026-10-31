export type SourceStatus = 'verified' | 'demo' | 'needs_confirmation'

// Preview mode is enabled by default. Set VITE_DEMO_MODE=false for a production-mode check.
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false'

export const business = {
  name: { value: 'Renuka Tailors', status: 'verified' as const },
  signboardName: { value: 'Renuka Tailor', status: 'verified' as const },
  category: { value: 'Tailoring / Salwar Kameez Tailoring', status: 'verified' as const },
  address: { value: 'Near Baldev Di Haati, Sadar Chowk Bazar, Meerut, Uttar Pradesh, India', status: 'verified' as const },
  coordinates: { latitude: 28.996372, longitude: 77.6992851, status: 'verified' as const },
  mapsUrl: { value: 'https://www.google.com/maps/place/Renuka+Tailors/@28.996526,77.6989746,19.34z/data=!4m6!3m5!1s0x390c65a9e22f886b:0x30d9fb8a41185972!8m2!3d28.996372!4d77.6992851', status: 'verified' as SourceStatus },
  directionsUrl: { value: 'https://www.google.com/maps/dir/?api=1&destination=28.996372,77.6992851', status: 'verified' as SourceStatus },
  justdialUrl: { value: 'https://www.justdial.com/Meerut/Renuka-Tailors-Near-Baldev-Di-Haati-Sadar-Chowk-Bazar/9999PX121-X121-091217164736-S1V7_BZDET', status: 'verified' as SourceStatus },
  phone: { value: '', status: 'needs_confirmation' as SourceStatus },
  email: { value: '', status: 'needs_confirmation' as SourceStatus },
  whatsapp: { value: '', status: 'needs_confirmation' as SourceStatus },
  whatsappTemplates: { values: [
    'Hello Renuka Tailors, I would like to enquire about stitching services.',
    'I would like to know the estimated price for a Salwar Kameez.',
    'I would like to arrange a consultation.',
  ], status: 'demo' as SourceStatus },
  storefrontImage: { value: '', status: 'needs_confirmation' as SourceStatus },
  enquiryEndpoint: { value: '', status: 'needs_confirmation' as SourceStatus },
} satisfies Record<string, unknown>

export function isVisibleInCurrentMode(status: SourceStatus) {
  return status === 'verified' || DEMO_MODE
}
