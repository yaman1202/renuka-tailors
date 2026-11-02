export type EditorialPhoto = {
  src: string
  alt: string
  title: string
  note?: string
  position?: string
}

export const collectionPhotos: EditorialPhoto[] = [
  { src: '/images/hero-saree.jpg', alt: 'Model wearing a teal and purple sari in a studio portrait', title: 'Sari styling', note: 'A colour and drape reference', position: 'center top' },
  { src: '/images/bridal-saree.jpg', alt: 'Bride wearing traditional red and gold wedding attire', title: 'Bridal wear', note: 'A formal occasion reference', position: 'center 12%' },
  { src: '/images/collection-lehenga.webp', alt: 'Bride wearing a detailed champagne embroidered lehenga', title: 'Bridal lehenga', note: 'A silhouette reference', position: 'center 28%' },
  { src: '/images/collection-saree-blouse.webp', alt: 'Woman in a red blouse with a patterned sari', title: 'Saree blouse', note: 'A blouse and sari pairing', position: 'center 20%' },
  { src: '/images/collection-anarkali.webp', alt: 'Model wearing a pale blue embroidered long dress', title: 'Anarkali suits', note: 'A colour and embroidery reference', position: 'center 10%' },
  { src: '/images/embroidered-sari.jpg', alt: 'Model wearing an embroidered teal traditional outfit', title: 'Embroidery detail', note: 'A threadwork reference', position: 'center 14%' },
  { src: '/images/collection-salwar.webp', alt: 'Model wearing a traditional embroidered salwar suit', title: 'Salwar suits', note: 'A traditional wear reference', position: 'center 12%' },
  { src: '/images/collection-gown.webp', alt: 'Woman wearing an elegant occasion gown', title: 'Occasion dresses', note: 'A special occasion reference', position: 'center 12%' },
  { src: '/images/collection-embroidery.webp', alt: 'Close detail of embroidery on richly coloured fabric', title: 'Embroidered fabrics', note: 'A colour and texture reference', position: 'center' },
  { src: '/images/teal-saree.jpg', alt: 'Woman wearing a teal traditional outfit', title: 'Women’s ethnic wear', note: 'A traditional styling reference', position: 'center 12%' },
  { src: '/images/collection-ethnic.webp', alt: 'Woman wearing a festive Indian outfit with detailed embroidery', title: 'Festive wear', note: 'An occasion wear reference', position: 'center 12%' },
  { src: '/images/collection-festive.webp', alt: 'Woman wearing a richly coloured traditional outfit', title: 'Contemporary Indian fashion', note: 'A styling reference', position: 'center 12%' },
]

export type ServicePhoto = EditorialPhoto & {
  slug: string
  description: string
}

export const servicePhotos: ServicePhoto[] = [
  { slug: 'womens-wear', src: '/images/service-womenswear.webp', alt: 'Bride in a detailed traditional outfit', title: 'Women’s Wear', description: 'Discuss traditional and contemporary women’s garments with the team.', position: 'center 5%', note: 'Discuss design and tailoring' },
  { slug: 'salwar-suits', src: '/images/service-salwar.webp', alt: 'Woman wearing an embroidered salwar suit', title: 'Salwar Suits', description: 'Talk through suit styles, fabric and finishing for your occasion.', position: 'center 5%', note: 'Style reference' },
  { slug: 'saree-blouses', src: '/images/service-blouse.webp', alt: 'Saree blouse with detailed back design', title: 'Saree Blouses', description: 'Bring your blouse idea and discuss fit, neckline and detailing.', position: 'center', note: 'Style reference' },
  { slug: 'lehengas', src: '/images/collection-lehenga.webp', alt: 'Bride wearing a detailed champagne embroidered lehenga', title: 'Lehengas', description: 'Discuss a lehenga design and the details you would like included.', position: 'center 28%', note: 'Style reference' },
  { slug: 'gowns-dresses', src: '/images/collection-gown.webp', alt: 'Woman wearing an elegant occasion gown', title: 'Gowns and Dresses', description: 'Talk with the team about occasion dresses and design options.', position: 'center 12%', note: 'Style reference' },
  { slug: 'embroidery', src: '/images/service-embroidery.webp', alt: 'Close-up of intricate embroidery on fabric', title: 'Embroidery Work', description: 'Ask about embroidery styles and decorative garment details.', position: 'center', note: 'Style reference' },
]

export const craftPhotos: EditorialPhoto[] = [
  { src: '/images/sewing-detail.jpg', alt: 'Hands guiding fabric through a sewing machine', title: 'Machine stitching', note: 'Illustrative reference', position: 'center 30%' },
  { src: '/images/craft-hand-stitch.webp', alt: 'Hands sewing fabric with a needle and thread', title: 'Hand finishing', note: 'Illustrative reference', position: 'center 44%' },
  { src: '/images/craft-embroidery-hands.webp', alt: 'Hands working on detailed embroidery', title: 'Embroidery work', note: 'Illustrative reference', position: 'center 40%' },
  { src: '/images/craft-embroidery-hoop.webp', alt: 'Decorative embroidery in a fabric hoop', title: 'Thread and texture', note: 'Illustrative reference', position: 'center' },
  { src: '/images/craft-machine-stitch.webp', alt: 'Tailor guiding cloth under an industrial machine', title: 'Machine work', note: 'Illustrative reference', position: 'center 34%' },
  { src: '/images/craft-tailor-workshop.webp', alt: 'Tailor workshop with fabric and sewing equipment', title: 'At the worktable', note: 'Illustrative reference', position: 'center 38%' },
]

export const aboutPhotos: EditorialPhoto[] = [
  { src: '/images/collection-salwar.webp', alt: 'Woman wearing an embroidered mustard salwar suit', title: 'Traditional styling', note: 'Illustrative style reference', position: 'center 12%' },
  { src: '/images/about-embroidered-fabric.webp', alt: 'Decorative detail on embroidered fabric', title: 'Fabric detail', note: 'Illustrative craft reference', position: 'center' },
]

export const featuredPhoto: EditorialPhoto = {
  src: '/images/featured-collection-banner.webp',
  alt: 'Woman wearing a coral traditional outfit',
  title: 'Occasion wear',
  note: 'Illustrative style reference',
  position: 'center 14%',
}

export const heroPhoto = {
  src: '/images/hero-purple-saree.jpg',
  alt: 'Woman wearing a deep purple sari with gold embroidery and traditional jewellery against a red backdrop',
}
