import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type GalleryItem = {
  image: string
  text: string
  alt: string
  href: string
  description: string
}

type GalleryProps = {
  items: GalleryItem[]
  className: string
}

type ScreenSize = { width: number; height: number }
type Viewport = { width: number; height: number }
type GL = Renderer['gl']

function createTitleTexture(gl: GL, text: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 700
  canvas.height = 100
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to create circular gallery title texture')
  context.font = '600 34px Georgia, serif'
  context.fillStyle = '#ffffff'
  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.shadowColor = 'rgba(0, 0, 0, .7)'
  context.shadowBlur = 8
  context.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width - 30)

  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  return texture
}

class GalleryMedia {
  readonly plane: Mesh
  width = 0
  height = 0
  readonly program: Program
  readonly imageTexture: Texture
  readonly titleMesh: Mesh
  x = 0
  extra = 0
  widthTotal = 0
  speed = 0

  constructor(
    gl: GL,
    geometry: Plane,
    scene: Transform,
    screen: ScreenSize,
    viewport: Viewport,
    item: GalleryItem,
    index: number,
    length: number,
  ) {
    this.imageTexture = new Texture(gl, { generateMipmaps: true })
    this.program = new Program(gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);
          vec4 color = texture2D(tMap, uv);
          float distance = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, distance);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: this.imageTexture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1, 1] },
        uSpeed: { value: 0 },
        uTime: { value: Math.random() * 100 },
        uBorderRadius: { value: 0.04 },
      },
      transparent: true,
    })

    this.plane = new Mesh(gl, { geometry, program: this.program })
    this.plane.setParent(scene)
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      this.imageTexture.image = image
      this.program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight]
    }
    image.onerror = () => console.error(`Circular gallery image failed to load: ${item.image}`)
    image.src = item.image

    const titleTexture = createTitleTexture(gl, item.text)
    const titleGeometry = new Plane(gl)
    const titleProgram = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: titleTexture } },
      transparent: true,
    })
    this.titleMesh = new Mesh(gl, { geometry: titleGeometry, program: titleProgram })
    this.titleMesh.scale.set(6, 0.85, 1)
    this.titleMesh.position.y = -0.5
    this.titleMesh.setParent(this.plane)

    this.resize(screen, viewport, index, length)
  }

  resize(screen: ScreenSize, viewport: Viewport, index: number, length: number) {
    const scale = screen.height / 1500
    this.height = (viewport.height * (900 * scale)) / screen.height
    this.width = (viewport.width * (700 * scale)) / screen.width
    this.widthTotal = (this.width + 2) * length
    this.x = (this.width + 2) * index
    this.plane.scale.set(this.width, this.height, 1)
    this.program.uniforms.uPlaneSizes.value = [this.width, this.height]
    this.titleMesh.scale.set(this.width * 0.9, this.height * 0.15, 1)
    this.titleMesh.position.y = -this.height * 0.5 - this.height * 0.1
  }
}

class CircularGalleryEngine {
  private readonly container: HTMLElement
  private readonly renderer: Renderer
  private readonly camera: Camera
  private readonly scene = new Transform()
  private readonly media: GalleryMedia[] = []
  private readonly scroll = { current: 0, target: 0, last: 0 }
  private screen: ScreenSize
  private viewport: Viewport
  private frame = 0
  private pointerStart: { x: number; target: number } | null = null
  private readonly bend = 3.5
  private readonly scrollSpeed = 2.5
  private readonly scrollEase = 0.03
  private readonly onResize = () => this.resize()
  private visibilityObserver: IntersectionObserver | null = null
  private snapTimeout = 0
  private readonly onWheel = (event: WheelEvent) => {
    event.preventDefault()
    this.scroll.target += Math.sign(event.deltaY || event.deltaX) * this.scrollSpeed * 0.2
    window.clearTimeout(this.snapTimeout)
    this.snapTimeout = window.setTimeout(() => this.snapToItem(), 200)
  }
  private readonly onPointerDown = (event: PointerEvent) => {
    this.pointerStart = { x: event.clientX, target: this.scroll.current }
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  }
  private readonly onPointerMove = (event: PointerEvent) => {
    if (!this.pointerStart) return
    this.scroll.target = this.pointerStart.target + (this.pointerStart.x - event.clientX) * (this.scrollSpeed * 0.025)
  }
  private readonly onPointerUp = () => {
    this.pointerStart = null
    this.snapToItem()
  }

  constructor(container: HTMLElement, items: GalleryItem[]) {
    this.container = container
    const rect = container.getBoundingClientRect()
    this.screen = { width: rect.width, height: rect.height }
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 1.5) })
    this.renderer.gl.clearColor(0, 0, 0, 0)
    container.appendChild(this.renderer.gl.canvas)
    this.camera = new Camera(this.renderer.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
    this.viewport = { width: 1, height: 1 }
    this.resize()

    const geometry = new Plane(this.renderer.gl, { heightSegments: 50, widthSegments: 100 })
    const repeatedItems = [...items, ...items]
    repeatedItems.forEach((item, index) => {
      this.media.push(new GalleryMedia(
        this.renderer.gl,
        geometry,
        this.scene,
        this.screen,
        this.viewport,
        item,
        index,
        repeatedItems.length,
      ))
    })

    const canvas = this.renderer.gl.canvas
    canvas.addEventListener('wheel', this.onWheel, { passive: false })
    canvas.addEventListener('pointerdown', this.onPointerDown)
    canvas.addEventListener('pointermove', this.onPointerMove)
    canvas.addEventListener('pointerup', this.onPointerUp)
    canvas.addEventListener('pointercancel', this.onPointerUp)
    window.addEventListener('resize', this.onResize)
    if ('IntersectionObserver' in window) {
      this.visibilityObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (!this.frame) this.update()
        } else {
          window.cancelAnimationFrame(this.frame)
          this.frame = 0
        }
      }, { rootMargin: '100px' })
      this.visibilityObserver.observe(container)
    } else {
      this.update()
    }
  }

  private resize() {
    const rect = this.container.getBoundingClientRect()
    this.screen = { width: rect.width, height: rect.height }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({ aspect: this.screen.width / this.screen.height })
    const height = 2 * Math.tan((this.camera.fov * Math.PI) / 360) * this.camera.position.z
    this.viewport = { width: height * this.camera.aspect, height }
    this.media.forEach((media, index) => media.resize(this.screen, this.viewport, index, this.media.length))
  }

  private snapToItem() {
    const itemWidth = this.media[0]?.width
    if (!itemWidth) return
    this.scroll.target = Math.round(this.scroll.target / (itemWidth + 2)) * (itemWidth + 2)
  }

  private update = () => {
    this.scroll.current += (this.scroll.target - this.scroll.current) * this.scrollEase
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
    this.media.forEach((media) => {
      const x = media.x - this.scroll.current - media.extra
      media.plane.position.x = x
      const halfWidth = this.viewport.width / 2
      const radius = (halfWidth * halfWidth + this.bend * this.bend) / (2 * this.bend)
      const effectiveX = Math.min(Math.abs(x), halfWidth)
      const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX)
      media.plane.position.y = -arc
      media.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / radius)
      media.speed = this.scroll.current - this.scroll.last
      const time = media.program.uniforms.uTime.value
      if (typeof time === 'number') media.program.uniforms.uTime.value = time + 0.04
      media.program.uniforms.uSpeed.value = media.speed

      const offset = media.width / 2
      if (direction === 'right' && x + offset < -halfWidth) media.extra -= media.widthTotal
      if (direction === 'left' && x - offset > halfWidth) media.extra += media.widthTotal
    })
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.frame = window.requestAnimationFrame(this.update)
  }

  destroy() {
    window.cancelAnimationFrame(this.frame)
    window.clearTimeout(this.snapTimeout)
    this.visibilityObserver?.disconnect()
    window.removeEventListener('resize', this.onResize)
    const canvas = this.renderer.gl.canvas
    canvas.removeEventListener('wheel', this.onWheel)
    canvas.removeEventListener('pointerdown', this.onPointerDown)
    canvas.removeEventListener('pointermove', this.onPointerMove)
    canvas.removeEventListener('pointerup', this.onPointerUp)
    canvas.removeEventListener('pointercancel', this.onPointerUp)
    canvas.remove()
  }
}

export function CircularGallery({ items, className }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [motionReduced, setMotionReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [webglFailed, setWebglFailed] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setMotionReduced(preference.matches)
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container || motionReduced) return

    try {
      const gallery = new CircularGalleryEngine(container, items)
      return () => gallery.destroy()
    } catch (error) {
      console.error('Circular gallery could not initialize', error)
      setWebglFailed(true)
    }
  }, [items, motionReduced])

  const showFallback = motionReduced || webglFailed

  return (
    <div className={`circular-gallery ${className}${showFallback ? ' circular-gallery--fallback' : ''}`}>
      <div className="circular-gallery-canvas" ref={containerRef} aria-hidden="true" />
      {showFallback && (
        <div className="circular-gallery-fallback">
          {items.map((item) => (
            <Link className="circular-gallery-fallback-item" to={item.href} key={item.href}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
      )}
      {!showFallback && <nav className="circular-gallery-links" aria-label="Explore these options">
        {items.map((item) => (
          <Link to={item.href} key={item.href} aria-label={`${item.text}: ${item.description}`}>
            {item.text}
          </Link>
        ))}
      </nav>}
      {!showFallback && <span className="circular-gallery-hint" aria-hidden="true">DRAG OR SCROLL TO EXPLORE</span>}
    </div>
  )
}
