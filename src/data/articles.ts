export type JournalArticle = {
  slug: string
  title: string
  category: string
  summary: string
  minutes: number
  sections: { heading: string; paragraphs: string[]; points?: string[] }[]
}

export const journalArticles: JournalArticle[] = [
  {
    slug: 'prepare-for-a-blouse-fitting',
    title: 'A few things to bring to a blouse fitting',
    category: 'Fitting guide',
    summary: 'A reference photo and a little time to talk through fit can make a fitting easier.',
    minutes: 3,
    sections: [
      { heading: 'Bring the details you already know', paragraphs: ['If you have a design in mind, bring a clear photo or sketch. A second view can help explain the back, sleeve or neckline. If you are matching a sari or skirt, bring it along or show a photo in good light.'] },
      { heading: 'Talk about comfort as well as shape', paragraphs: ['Tell the tailor how you plan to wear the blouse and what feels comfortable to you. Consider sleeve length, neckline coverage and how easily you need to move your arms.'] },
      { heading: 'Allow time for a proper conversation', paragraphs: ['Different fabrics and designs can affect fit. Bring your questions, discuss the details with the team and ask when to come back for a fitting or collection.'] },
    ],
  },
  {
    slug: 'plan-a-tailoring-visit',
    title: 'Planning a visit to the tailor',
    category: 'Visit planning',
    summary: 'A short checklist to help you explain the garment, occasion and finish you have in mind.',
    minutes: 3,
    sections: [
      { heading: 'Start with the garment', paragraphs: ['Think about what you need made or altered, and when you hope to wear it. If you already have the fabric, bring it with you.'] },
      { heading: 'Bring useful references', paragraphs: ['A photo, sketch or garment you like can help explain the shape and details. Point out what you want to keep and what you would like changed.'] },
      { heading: 'Ask about the next steps', paragraphs: ['Discuss measurements, design choices and timing with the team. If your visit is time-sensitive, call ahead to ask about availability. Prices and timelines depend on the garment and work involved.'], points: ['Garment type and occasion', 'Fabric or reference images', 'Fit or finishing questions', 'Your preferred timing'] },
    ],
  },
  {
    slug: 'choosing-embroidery-details',
    title: 'Choosing embroidery details',
    category: 'Embroidery',
    summary: 'Placement, scale and contrast are good places to start when discussing embroidery.',
    minutes: 4,
    sections: [
      { heading: 'Decide where the detail should sit', paragraphs: ['Think about whether you want embroidery to draw attention to a neckline, sleeve, border or another part of the garment. A photo marked with the placement can make your idea easier to discuss.'] },
      { heading: 'Match the design to the garment', paragraphs: ['The fabric, garment shape and occasion all affect how a motif looks. Ask the team to talk through the scale and thread colours before settling on a design.'] },
      { heading: 'Keep a note of what matters most', paragraphs: ['If you have a preferred motif, colour or level of detail, share it at the start. The shop can discuss the available options for your garment.'] },
    ],
  },
  {
    slug: 'use-a-style-reference-well',
    title: 'How to use a style reference',
    category: 'Design ideas',
    summary: 'A reference is a starting point. A few notes help explain what you like about it.',
    minutes: 3,
    sections: [
      { heading: 'Show the part you like', paragraphs: ['It may be the neckline, sleeve, length, colour or embroidery. Tell the tailor which detail caught your eye so the conversation can focus on it.'] },
      { heading: 'Bring more than one view when you can', paragraphs: ['A front view and a close-up of a detail can help explain the design. If the photo shows a full outfit, say which garment or element you want to discuss.'] },
      { heading: 'Adapt the idea to your garment', paragraphs: ['A reference may use a different fabric or fit. Talk through what can work for your own garment, comfort and occasion before choosing the final details.'] },
    ],
  },
]
