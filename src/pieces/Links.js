import { BouncyParticleSet } from '../logic/bouncyParticleSet'
import {
  paintPointConnections,
  colorSets,
  proximityColorStyle,
} from '../renderers/connectPointsPainter'
import { Vector2 } from '../logic/vectors'

export default class Links {
  constructor(canvas, size, count, minSpeed, maxSpeed, maxDist) {
    canvas.width = size
    canvas.height = size
    this.canvas = canvas
    this.maxDist = maxDist
    this.ctx = canvas.getContext('2d')
    this.particleSet = new BouncyParticleSet(count, minSpeed, maxSpeed)
  }

  static title = 'Links'

  static createRenderer(canvas) {
    return new Links(canvas, 350, 60, 0.03, 0.02, 0.5)
  }

  renderStep() {
    paintPointConnections(
      this.canvas,
      this.ctx,
      this.particleSet.particles.map((p) => p.pos),
      (pa, pb) => Vector2.distanceBetween(pa, pb) < this.maxDist,
      proximityColorStyle(
        this.maxDist,
        colorSets.redBlue.min,
        colorSets.redBlue.max,
        (x) => x ** 3
      )
    )
    this.particleSet.step()
  }
}
