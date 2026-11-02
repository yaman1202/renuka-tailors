import type { EditorialPhoto } from './photos'

export type CollectionStyle = 'Traditional' | 'Modern' | 'Bridal' | 'Party' | 'Embroidery' | 'Simple'

export type CollectionPhoto = EditorialPhoto & {
  id: number
  styles: CollectionStyle[]
  source: string
}

export type GarmentCollection = {
  slug: string
  title: string
  shortTitle: string
  intro: string
  photos: CollectionPhoto[]
}

type PhotoSpec = [id: number, title: string, styles: CollectionStyle[]]

const definitions: Omit<GarmentCollection, 'photos'>[] = [
  { slug: 'blouse', title: 'Blouse', shortTitle: 'Blouses', intro: 'Explore blouse silhouettes and finishing ideas to discuss with the tailoring team.' },
  { slug: 'lehenga', title: 'Lehenga', shortTitle: 'Lehengas', intro: 'A set of lehenga references for colour, proportion and occasion styling.' },
  { slug: 'gown', title: 'Gown', shortTitle: 'Gowns', intro: 'Occasion gown ideas, from clean lines to more detailed looks.' },
  { slug: 'salwar-kameez', title: 'Salwar Kameez', shortTitle: 'Salwar Kameez', intro: 'Salwar kameez references across classic, everyday and occasion styles.' },
  { slug: 'kurti', title: 'Kurti', shortTitle: 'Kurtis', intro: 'Kurti ideas with different cuts, colours and levels of detail.' },
  { slug: 'bridal-wear', title: 'Bridal Wear', shortTitle: 'Bridal Wear', intro: 'Wedding and ceremony looks for a design conversation with the team.' },
  { slug: 'designer-wear', title: 'Designer Wear', shortTitle: 'Designer Wear', intro: 'Distinctive Indian wear references with thoughtful colour and finishing.' },
  { slug: 'suit', title: 'Suit', shortTitle: 'Suits', intro: 'Suit references for celebrations, daily wear and personal style.' },
]

const specs: Record<string, PhotoSpec[]> = {
  blouse: [
    [35399684, 'Classic blouse styling', ['Traditional']], [29026116, 'A modern blouse look', ['Modern', 'Simple']],
    [15384798, 'Embroidered finish', ['Embroidery', 'Traditional']], [19282458, 'A statement blouse', ['Party', 'Modern']],
    [20839074, 'Traditional blouse styling', ['Traditional', 'Simple']], [33328181, 'An occasion blouse', ['Bridal', 'Embroidery']],
    [17184881, 'A clean blouse pairing', ['Simple', 'Modern']], [12308956, 'Bridal blouse reference', ['Bridal', 'Traditional']],
    [37026633, 'Contemporary blouse look', ['Modern', 'Party']], [19567865, 'Green blouse with white sari', ['Traditional', 'Embroidery']],
  ],
  lehenga: [
    [33359858, 'A classic lehenga silhouette', ['Traditional', 'Bridal']], [17154866, 'Embroidered occasion wear', ['Embroidery', 'Party']],
    [13162240, 'A traditional lehenga', ['Traditional']], [14553132, 'Bridal lehenga styling', ['Bridal', 'Embroidery']],
    [14683828, 'A modern festive look', ['Modern', 'Party']], [8881954, 'A simple lehenga silhouette', ['Simple', 'Traditional']],
    [32761638, 'A richly detailed look', ['Bridal', 'Embroidery']], [37396069, 'Lehenga for a celebration', ['Party', 'Traditional']],
    [12835249, 'Contemporary lehenga styling', ['Modern']], [35441227, 'Traditional bridal styling', ['Bridal', 'Traditional']],
  ],
  gown: [
    [5185596, 'A modern occasion gown', ['Modern', 'Party']], [5922729, 'A detailed formal look', ['Embroidery', 'Party']],
    [5922732, 'A simple gown silhouette', ['Simple', 'Modern']], [8881959, 'A gown for celebrations', ['Party']],
    [8532219, 'A traditional occasion look', ['Traditional', 'Embroidery']], [28609625, 'Bridal gown styling', ['Bridal', 'Party']],
    [8532213, 'Classic formal wear', ['Traditional', 'Simple']], [13363376, 'A contemporary gown', ['Modern']],
    [33222438, 'An embroidered evening look', ['Embroidery', 'Party']], [33787066, 'A bridal occasion gown', ['Bridal', 'Traditional']],
  ],
  'salwar-kameez': [
    [25184995, 'Classic salwar kameez', ['Traditional', 'Embroidery']], [26973349, 'A simple suit style', ['Simple']],
    [22064201, 'An occasion salwar look', ['Party', 'Traditional']], [13584944, 'Traditional suit styling', ['Traditional']],
    [25184992, 'A modern suit look', ['Modern', 'Simple']], [20690517, 'Embroidered suit detail', ['Embroidery']],
    [20690520, 'A simple traditional look', ['Simple', 'Traditional']], [26973351, 'Suit styling for a celebration', ['Party']],
    [25184994, 'Contemporary salwar kameez', ['Modern', 'Embroidery']], [33667895, 'Blue embroidered salwar suit', ['Traditional', 'Embroidery']],
  ],
  kurti: [
    [28213774, 'A classic kurti look', ['Simple', 'Traditional']], [28512776, 'Contemporary kurti styling', ['Modern']],
    [22064197, 'Kurti for an occasion', ['Party']], [28213745, 'Embroidered kurti style', ['Embroidery']],
    [22064230, 'Traditional kurti styling', ['Traditional']], [14256948, 'A clean modern look', ['Modern', 'Simple']],
    [35445207, 'Pink embroidered kurti', ['Embroidery', 'Party']], [20788490, 'A simple kurti silhouette', ['Simple']],
    [22064228, 'Traditional occasion wear', ['Traditional', 'Party']], [35521738, 'A modern detailed look', ['Modern', 'Embroidery']],
  ],
  'bridal-wear': [
    [18694636, 'Traditional wedding styling', ['Traditional', 'Bridal']], [37597037, 'Embroidered bridal wear', ['Embroidery', 'Bridal']],
    [27500773, 'A bridal celebration look', ['Party', 'Bridal']], [8607551, 'Contemporary bridal style', ['Modern', 'Bridal']],
    [37597721, 'A classic wedding look', ['Traditional', 'Bridal']], [28044200, 'Bridal embroidery reference', ['Embroidery', 'Bridal']],
    [36951359, 'A modern ceremony look', ['Modern', 'Bridal']], [31467296, 'Wedding wear for a celebration', ['Party', 'Bridal']],
    [36098425, 'Traditional bridal detail', ['Traditional', 'Embroidery']], [27155542, 'A formal bridal look', ['Bridal', 'Party']],
  ],
  'designer-wear': [
    [37043527, 'A contemporary statement', ['Modern', 'Party']], [35441224, 'Traditional designer styling', ['Traditional', 'Embroidery']],
    [17503286, 'A detailed occasion look', ['Embroidery', 'Party']], [28522218, 'A classic designer look', ['Traditional']],
    [13192047, 'Modern runway styling', ['Modern']], [40529902, 'A look for a celebration', ['Party', 'Bridal']],
    [13057815, 'Embroidered designer wear', ['Embroidery', 'Bridal']], [32441366, 'A traditional silhouette', ['Traditional', 'Simple']],
    [34010355, 'Contemporary Indian wear', ['Modern', 'Simple']], [13039869, 'A richly worked look', ['Embroidery', 'Party']],
  ],
  suit: [
    [34933700, 'A classic suit look', ['Traditional', 'Simple']], [30196701, 'A modern suit silhouette', ['Modern']],
    [30912322, 'Embroidered suit styling', ['Embroidery']], [30912301, 'Suit for a celebration', ['Party', 'Traditional']],
    [30912405, 'A simple traditional suit', ['Simple', 'Traditional']], [32484149, 'A contemporary suit look', ['Modern', 'Party']],
    [34933670, 'A detailed occasion suit', ['Embroidery', 'Party']], [35485445, 'A bridal suit reference', ['Bridal', 'Traditional']],
    [40635389, 'An understated suit style', ['Simple', 'Modern']], [30912268, 'Traditional festive wear', ['Traditional', 'Embroidery']],
  ],
}

const altLabel: Record<string, string> = {
  blouse: 'woman wearing an Indian blouse and sari',
  lehenga: 'woman wearing a lehenga',
  gown: 'woman wearing an occasion gown',
  'salwar-kameez': 'woman wearing a salwar kameez',
  kurti: 'woman wearing a kurti',
  'bridal-wear': 'bride wearing traditional Indian wedding attire',
  'designer-wear': 'woman wearing designer Indian clothing',
  suit: 'woman wearing a traditional suit',
}

export const collections: GarmentCollection[] = definitions.map((definition) => ({
  ...definition,
  photos: specs[definition.slug].map(([id, title, styles], index) => ({
    id,
    title,
    alt: `Photo ${index + 1}: ${altLabel[definition.slug]}.`,
    note: `Pexels photo ${id} · style reference only`,
    src: `/images/collections/${definition.slug}-${String(index + 1).padStart(2, '0')}.jpg`,
    styles,
    source: `https://www.pexels.com/photo/${id}/`,
  })),
}))

export const collectionStyles: CollectionStyle[] = ['Traditional', 'Modern', 'Bridal', 'Party', 'Embroidery', 'Simple']
