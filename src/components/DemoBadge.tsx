import type { ReactNode } from 'react'
import { DEMO_MODE, type SourceStatus } from '../data/business'

export function DemoBadge({ status = 'demo', children }: { status?: SourceStatus; children?: ReactNode }) {
  if (!DEMO_MODE || status === 'verified') return null
  const label = status === 'needs_confirmation' ? 'NEEDS CONFIRMATION' : 'DEMO'
  return <span className="demo-badge">{children ?? label}</span>
}

export function PreviewBanner() {
  if (!DEMO_MODE) return null
  return <div className="preview-bar"><span className="preview-dot" /> PREVIEW WEBSITE <span className="preview-divider">/</span> SAMPLE CONTENT</div>
}
