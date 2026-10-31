import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { DEMO_MODE, business } from './data/business'
import { PageHero, PageTitle } from './components/EditorialPage'

export function PolicyPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const privacy = kind === 'privacy'
  return <main className="page-main"><PageHero eyebrow="WEBSITE INFORMATION · DRAFT" title={privacy ? 'A note on' : 'Using this'} emphasis={privacy ? 'privacy.' : 'website.'} description="Draft website information for owner review before public launch." image="https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1800&q=85" />
    <section className="page-section policy-page"><PageTitle eyebrow={privacy ? '01 / PRIVACY NOTICE' : '01 / WEBSITE TERMS'} title={privacy ? 'Your information' : 'A clear'} emphasis={privacy ? 'in this preview.' : 'preview.'}><p>DRAFT — These notes describe the current preview website and need owner review before public publication.</p></PageTitle>
      {privacy ? <div className="policy-copy"><h3>Demo enquiries</h3><p>{DEMO_MODE ? 'When preview mode is on, enquiry details stay in the current page session. The demo form does not transmit or save them to a business system.' : 'The enquiry form is currently disabled because no approved receiving endpoint has been configured.'} Please do not enter measurements or sensitive personal information.</p><h3>External links and media</h3><p>The website links to Google Maps and Justdial and loads editorial images and typefaces from external providers. Opening those links or loading those services may connect your browser to the providers under their own policies.</p><h3>Questions</h3><p>A verified privacy contact has not been supplied. Visit Renuka Tailors at {business.address.value} for current contact information.</p></div> : <div className="policy-copy"><h3>Preview information</h3><p>Demo categories, prices, delivery estimates, opening hours, reviews and editorial posts are sample content. They are not confirmed offers, prices, service guarantees or customer statements.</p><h3>Appointments</h3><p>{DEMO_MODE ? 'Submitting the preview enquiry form does not create an appointment and does not send a message.' : 'Online enquiries are unavailable until an approved receiving method is configured.'} Visit Renuka Tailors to discuss a garment in person.</p><h3>External listings</h3><p>Map and directory links open third-party websites. Their content and terms are managed by those providers.</p></div>}
      <p className="policy-update">Draft for owner review · {business.name.value}</p><Link className="text-link dark-link" to="/contact">Contact and store details <ArrowUpRight size={15} /></Link>
    </section>
  </main>
}
