declare module 'ogl' {
  export class Renderer {
    gl: WebGLRenderingContext & { canvas: HTMLCanvasElement }
    constructor(options?: { alpha?: boolean; antialias?: boolean; dpr?: number })
    setSize(width: number, height: number): void
    render(options: { scene: Transform; camera: Camera }): void
  }

  export class Camera {
    fov: number
    aspect: number
    position: Vec3
    constructor(gl: WebGLRenderingContext)
    perspective(options: { aspect: number }): void
  }

  export class Transform {}

  export class Plane {
    constructor(gl: WebGLRenderingContext, options?: { heightSegments?: number; widthSegments?: number })
  }

  export class Texture {
    image: TexImageSource | null
    constructor(gl: WebGLRenderingContext, options?: { generateMipmaps?: boolean })
  }

  export class Program {
    uniforms: Record<string, { value: number | number[] | Texture }>
    constructor(gl: WebGLRenderingContext, options: {
      depthTest?: boolean
      depthWrite?: boolean
      vertex: string
      fragment: string
      uniforms?: Record<string, { value: number | number[] | Texture }>
      transparent?: boolean
    })
  }

  export class Mesh {
    position: Vec3
    rotation: Vec3
    scale: Vec3
    program: Program
    constructor(gl: WebGLRenderingContext, options: { geometry: Plane; program: Program })
    setParent(parent: Transform | Mesh): void
  }

  class Vec3 {
    x: number
    y: number
    z: number
    set(x: number, y: number, z: number): void
  }
}
