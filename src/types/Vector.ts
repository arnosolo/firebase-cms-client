export class Vector2 {
  x: number;
  y: number;
  constructor(x?: number, y?:number) {
    this.x = x ?? 0
    this.y = y ?? 0
  }

  // Vres = Va + Vb
  static add(a: Vector2, b:Vector2, res: Vector2) {
    res.x = a.x + b.x
    res.y = a.y + b.y
  }

  // Vres = Va - Vb
  static sub(a: Vector2, b:Vector2, res: Vector2) {
    res.x = a.x - b.x
    res.y = a.y - b.y
  }

  // Vres = Va * scale
  static multiply(a: Vector2, scale: number, res: Vector2) {
    res.x = a.x * scale
    res.y = a.y * scale
  }

  add(another: Vector2) {
    this.x += another.x
    this.y += another.y
  }

  sub(another: Vector2) {
    this.x -= another.x
    this.y -= another.y
  }
} 