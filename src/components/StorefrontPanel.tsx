import { MapPin } from 'lucide-react'
import { business } from '../data/business'

export function StorefrontPanel() {
  const hasPhoto = business.storefrontImage.status === 'verified' && Boolean(business.storefrontImage.value)
  return <div className="storefront-panel">
    {hasPhoto ? <img className="storefront-photo" src={business.storefrontImage.value} alt="Renuka Tailors storefront in Meerut" /> : <div className="placeholder-art" role="img" aria-label="Illustrated storefront placeholder; actual Renuka Tailors photo not supplied"><div className="placeholder-sun" /><div className="shop-front"><div className="shop-sign">Renuka <span>TAILOR</span></div><div className="shop-window"><span /><span /><span /></div><div className="shop-door" /></div></div>}
    <div className="placeholder-caption"><span>THE MEERUT STOREFRONT</span><span>{hasPhoto ? 'VERIFIED SHOP PHOTO' : 'ILLUSTRATION · PHOTO NEEDED'}</span></div><span className="map-pin"><MapPin size={19} /></span>
  </div>
}
