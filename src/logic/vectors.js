export class Vector2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static randomUnitVector() {
    const angle = Math.random() * Math.PI * 2
    return new Vector2(Math.cos(angle), Math.sin(angle))
  }

  static distanceBetween(v1, v2) {
    return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2)
  }

  add(v) {
    return new Vector2(this.x + v.x, this.y + v.y)
  }

  sub(v) {
    return new Vector2(this.x - v.x, this.y - v.y)
  }

  mul(a) {
    return new Vector2(this.x * a, this.y * a)
  }

  normalized() {
    const len = Math.sqrt(this.x ^ 2, this.y ^ 2)
    return this.mul(1 / len)
  }

  rotateAboutPoint(center, angle) {
    const radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (this.x - center.x) + sin * (this.y - center.y) + center.x,
      ny = cos * (this.y - center.y) - sin * (this.x - center.x) + center.y
    return new Vector2(nx, ny)
  }
}
