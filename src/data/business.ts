export type SourceStatus = 'verified' | 'demo' | 'needs_confirmation'

export const business = {
  name: { value: 'Renuka Tailors', status: 'verified' as const },
  founder: { value: 'Vijay Gautam', status: 'verified' as const },
  established: { value: 1998, status: 'verified' as const },
  category: { value: "Women's wear and professional tailoring", status: 'verified' as const },
  address: { value: 'Near Baldev Di Haati, Sadar Chowk Bazar, Meerut, Uttar Pradesh, India', status: 'verified' as const },
  coordinates: { latitude: 28.996372, longitude: 77.6992851, status: 'verified' as const },
  mapsUrl: { value: 'https://www.google.com/maps/place/Renuka+Tailors/@28.996372,77.6967102,17z/data=!4m8!3m7!1s0x390c65a9e22f886b:0x30d9fb8a41185972!8m2!3d28.996372!4d77.6992851!9m1!1b1!16s%2Fg%2F11fy_d9x6w?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D', status: 'verified' as SourceStatus },
  directionsUrl: { value: 'https://www.google.com/maps/dir/?api=1&destination=28.996372,77.6992851', status: 'verified' as SourceStatus },
  justdialUrl: { value: 'https://www.justdial.com/Meerut/Renuka-Tailors-Near-Baldev-Di-Haati-Sadar-Chowk-Bazar/9999PX121-X121-091217164736-S1V7_BZDET', status: 'verified' as SourceStatus },
  phone: { value: '9927144263', status: 'verified' as SourceStatus },
  secondPhone: { value: '7906501679', status: 'verified' as SourceStatus },
  email: { value: '', status: 'needs_confirmation' as SourceStatus },
  whatsapp: { value: '919927144263', status: 'verified' as SourceStatus },
  whatsappTemplates: { values: ['Hello Renuka Tailors, I would like to enquire about women’s wear and tailoring.'], status: 'verified' as SourceStatus },
  reviewUrl: { value: 'https://www.google.com/maps/place/Renuka+Tailors/@28.996372,77.6967102,17z/data=!4m8!3m7!1s0x390c65a9e22f886b:0x30d9fb8a41185972!8m2!3d28.996372!4d77.6992851!9m1!1b1!16s%2Fg%2F11fy_d9x6w?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D', status: 'verified' as SourceStatus },
  storefrontImage: { value: '', status: 'needs_confirmation' as SourceStatus },
  enquiryEndpoint: { value: '', status: 'needs_confirmation' as SourceStatus },
} satisfies Record<string, unknown>
