import { BouncyParticleSet } from '../logic/bouncyParticleSet'
import { renderProximityLines } from '../renderers/proximityLineRenderer'

export default class Links {
  constructor(canvas, size, count, minSpeed, maxSpeed, maxDist) {
    canvas.width = size
    canvas.height = size
    this.canvas = canvas
    this.maxDist = maxDist
    this.ctx = canvas.getContext('2d')
    this.particleSet = new BouncyParticleSet(count, minSpeed, maxSpeed)
  }

  static createRenderer(canvas) {
    return new Links(canvas, 300, 30, 0.03, 0.02, 0.35)
  }

  renderStep() {
    renderProximityLines(
      this.canvas,
      this.ctx,
      this.particleSet.particles.map((p) => p.pos),
      this.maxDist
    )
    this.particleSet.step()
  }
}
