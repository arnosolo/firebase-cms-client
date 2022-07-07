import { Vector2 } from "./Vector";

export class Mover {
  private _canvas: HTMLCanvasElement | undefined;
  ctx: CanvasRenderingContext2D | undefined | null;
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  size: number;
  dt: number;
  color: string;
  strokeColor: string;

  constructor(config: {
    canvas?: HTMLCanvasElement,
    position?: Vector2,
    velocity?: Vector2,
    acceleration?: Vector2,
    size?: number,
    dt?: number,
    color?: string;
    strokeColor?: string;
  }) {
    const { canvas, position, size, velocity, dt, acceleration, color, strokeColor } = config
    this.canvas = canvas
    this.dt = dt ?? 0.02
    this.position = position ?? new Vector2()
    this.velocity = velocity ?? new Vector2()
    this.acceleration = acceleration ?? new Vector2()
    this.size = size ?? 40
    this.color = color ?? "#ffaa00"
    this.strokeColor = strokeColor ?? "#555"
  }

  get canvas() {
    return this._canvas
  }

  set canvas(newCanvas: HTMLCanvasElement | undefined) {
    this._canvas = newCanvas
    if(this._canvas) {
      this.ctx = this._canvas.getContext('2d')
      console.log('mover: I just been assigned to a canvas.');
    } else {
      console.warn('mover: I just been assigned to a canvas, but it is undefined. Please update it later.');
    }
  }

  update() {
    const deltaVelocity = new Vector2()
    Vector2.multiply(this.acceleration, this.dt, deltaVelocity)
    this.velocity.add(deltaVelocity)
    const deltaPosition = new Vector2()
    Vector2.multiply(this.velocity, this.dt, deltaPosition)
    this.position.add(deltaPosition)
  }

  show() {
    const { ctx } = this
    if (ctx) {
      ctx.save()
      ctx.fillStyle = this.color
      ctx.strokeStyle = this.strokeColor
      ctx.translate(this.position.x, this.position.y)
      ctx.beginPath()
      ctx.arc(0, 0, this.size, 0, Math.PI * 2)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
      ctx.restore()
    }
  }
}