import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import type { EditorialPhoto } from '../data/photos'

type PhotoGalleryProps = {
  photos: EditorialPhoto[]
  label?: string
  className?: string
  showNotes?: boolean
}

export function PhotoGallery({ photos, label = 'Open image', className = '', showNotes = true }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const activePhoto = selectedIndex === null ? null : photos[selectedIndex]

  useEffect(() => {
    if (selectedIndex === null) {
      triggerRef.current?.focus()
      triggerRef.current = null
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowRight') setSelectedIndex((index) => index === null ? null : (index + 1) % photos.length)
      if (event.key === 'ArrowLeft') setSelectedIndex((index) => index === null ? null : (index - 1 + photos.length) % photos.length)
      if (event.key === 'Tab' && dialogRef.current) {
        const controls = dialogRef.current.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [selectedIndex, photos.length])

  return <>
    <div className={`photo-gallery ${className}`}>
      {photos.map((photo, index) => <figure className={`photo-gallery-item photo-gallery-item-${index + 1}`} key={photo.src}>
        <button className="photo-gallery-trigger" type="button" onClick={(event) => { triggerRef.current = event.currentTarget; setSelectedIndex(index) }} aria-label={`${label}: ${photo.title}`}>
          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" style={photo.position ? { objectPosition: photo.position } : undefined} />
          <span className="photo-gallery-caption"><span><strong>{photo.title}</strong>{showNotes && <small>{photo.note ?? 'Style reference'}</small>}</span><Expand size={17} aria-hidden="true" /></span>
        </button>
      </figure>)}
    </div>

    {activePhoto && <div className="lightbox-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedIndex(null) }}>
      <div className="lightbox-dialog" role="dialog" aria-modal="true" aria-label={`${activePhoto.title} photo preview`} tabIndex={-1} ref={dialogRef}>
        <button className="lightbox-close" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close image preview"><X size={22} /></button>
        <button className="lightbox-nav lightbox-prev" type="button" onClick={() => setSelectedIndex((selectedIndex! - 1 + photos.length) % photos.length)} aria-label="Previous image"><ArrowLeft size={21} /></button>
        <img className="lightbox-image" src={activePhoto.src} alt={activePhoto.alt} />
        <button className="lightbox-nav lightbox-next" type="button" onClick={() => setSelectedIndex((selectedIndex! + 1) % photos.length)} aria-label="Next image"><ArrowRight size={21} /></button>
        <div className="lightbox-caption"><strong>{activePhoto.title}</strong><span>{showNotes && `${activePhoto.note ?? 'Style reference'} · `}{selectedIndex! + 1} of {photos.length}</span></div>
      </div>
    </div>}
  </>
}
