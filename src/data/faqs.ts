import type { SourceStatus } from './business'

export type Faq = { question: string; answer: string; status: SourceStatus }

export const faqs: Faq[] = [
  { question: 'What tailoring services are available?', answer: 'The supplied listing identifies Tailoring / Salwar Kameez Tailoring. Other categories on this preview are sample ideas and need confirmation with the shop.', status: 'verified' },
  { question: 'How can I book a consultation?', answer: 'Please visit the shop at Sadar Chowk Bazar to discuss your garment. Online appointment enquiries are a demo interaction until a receiving method is confirmed.', status: 'verified' },
  { question: 'How much does Salwar Kameez stitching cost?', answer: 'Prices are not confirmed. The preview price ranges are illustrative samples only; contact or visit the shop for current pricing.', status: 'demo' },
  { question: 'Can I bring my own fabric?', answer: 'This policy needs confirmation. You can ask at the shop before planning your garment.', status: 'needs_confirmation' },
  { question: 'How long does stitching take?', answer: 'Turnaround times have not been confirmed. Any estimates shown in the preview are sample values only.', status: 'demo' },
  { question: 'Can I request custom designs?', answer: 'Custom design availability needs confirmation. The preview shows sample inspiration only.', status: 'needs_confirmation' },
  { question: 'Do you provide alterations?', answer: 'Alteration services have not been confirmed. Please check directly with the shop.', status: 'needs_confirmation' },
  { question: 'Where is Renuka Tailors located?', answer: 'Near Baldev Di Haati, Sadar Chowk Bazar, Meerut, Uttar Pradesh, India.', status: 'verified' },
]
