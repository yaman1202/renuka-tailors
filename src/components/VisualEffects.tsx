import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const revealSelector = [
  'main > section:not(.home-hero)',
  '.photo-gallery-item',
  '.collection-entry',
  '.service-page-card',
  '.journal-card',
  '.steps-grid article',
  '.why-grid article',
  '.founder-profile',
].join(', ')

const tiltSelector = '.photo-gallery-trigger, .collection-entry, .service-page-card, .journal-card'
const magneticSelector = '.button, .site-header nav .nav-contact'

export function VisualEffects() {
  const cursorRef = useRef<HTMLSpanElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!targets.length || !('IntersectionObserver' in window) || reducedMotion.matches) return

    const show = (target: HTMLElement) => {
      target.classList.remove('motion-reveal-pending')
      target.classList.add('motion-revealed')
      observer.unobserve(target)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) show(entry.target as HTMLElement)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' })

    targets.forEach((target, index) => {
      target.style.setProperty('--motion-delay', `${(index % 5) * 55}ms`)
      target.classList.add('motion-reveal-pending')
      observer.observe(target)
    })

    const revealAll = () => {
      observer.disconnect()
      targets.forEach((target) => {
        target.classList.remove('motion-reveal-pending')
        target.classList.add('motion-revealed')
      })
    }
    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) revealAll()
    }
    reducedMotion.addEventListener('change', onMotionPreferenceChange)

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', onMotionPreferenceChange)
      targets.forEach((target) => {
        target.classList.remove('motion-reveal-pending', 'motion-revealed')
        target.style.removeProperty('--motion-delay')
      })
    }
  }, [pathname])

  useEffect(() => {
    const cursor = cursorRef.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!cursor || !finePointer.matches || reducedMotion.matches) return

    let frame = 0
    let pointerX = 0
    let pointerY = 0
    let activeCard: HTMLElement | null = null
    let activeMagnet: HTMLElement | null = null

    const resetCard = () => {
      activeCard?.style.setProperty('--card-tilt-x', '0deg')
      activeCard?.style.setProperty('--card-tilt-y', '0deg')
      activeCard = null
    }
    const resetMagnet = () => {
      activeMagnet?.style.setProperty('--magnet-x', '0px')
      activeMagnet?.style.setProperty('--magnet-y', '0px')
      activeMagnet = null
    }
    const hideCursor = () => {
      cursor.classList.remove('is-visible', 'is-interactive')
      document.documentElement.classList.remove('has-visual-cursor')
      resetCard()
      resetMagnet()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches) {
        hideCursor()
        return
      }
      pointerX = event.clientX
      pointerY = event.clientY

      const element = event.target instanceof Element ? event.target : null
      const nextCard = element?.closest<HTMLElement>(tiltSelector) ?? null
      const nextMagnet = element?.closest<HTMLElement>(magneticSelector) ?? null
      if (nextCard !== activeCard) resetCard()
      if (nextMagnet !== activeMagnet) resetMagnet()
      activeCard = nextCard
      activeMagnet = nextMagnet

      document.documentElement.classList.add('has-visual-cursor')
      cursor.classList.add('is-visible')
      cursor.classList.toggle('is-interactive', Boolean(activeMagnet))
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        frame = 0
        cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`

        if (activeCard) {
          const bounds = activeCard.getBoundingClientRect()
          const x = Math.max(-1, Math.min(1, ((pointerX - bounds.left) / bounds.width - 0.5) * 2))
          const y = Math.max(-1, Math.min(1, ((pointerY - bounds.top) / bounds.height - 0.5) * 2))
          activeCard.style.setProperty('--card-tilt-x', `${x * 3.2}deg`)
          activeCard.style.setProperty('--card-tilt-y', `${y * -3.2}deg`)
        }

        if (activeMagnet) {
          const bounds = activeMagnet.getBoundingClientRect()
          const x = (pointerX - bounds.left - bounds.width / 2) / bounds.width
          const y = (pointerY - bounds.top - bounds.height / 2) / bounds.height
          activeMagnet.style.setProperty('--magnet-x', `${x * 4}px`)
          activeMagnet.style.setProperty('--magnet-y', `${y * 3}px`)
        }
      })
    }

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hideCursor()
    }
    const onPreferenceChange = () => {
      if (reducedMotion.matches) hideCursor()
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerout', onPointerOut)
    window.addEventListener('blur', hideCursor)
    reducedMotion.addEventListener('change', onPreferenceChange)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerout', onPointerOut)
      window.removeEventListener('blur', hideCursor)
      reducedMotion.removeEventListener('change', onPreferenceChange)
      hideCursor()
    }
  }, [])

  return <span className="visual-cursor" aria-hidden="true" ref={cursorRef} />
}
