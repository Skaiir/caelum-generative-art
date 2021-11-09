import { RecursiveShapes } from '../logic/recursiveShapes'
import { Vector2 } from '../logic/vectors'
import { renderProximityLines } from '../renderers/proximityLineRenderer'

export default class Squares {
  constructor(canvas, size, maxDist) {
    canvas.width = size
    canvas.height = size
    this.canvas = canvas
    this.maxDist = maxDist
    this.ctx = canvas.getContext('2d')
    this.particleSet = new RecursiveShapes(
      new Vector2(0.5, 0.5),
      1,
      0.25,
      3,
      0.5,
      -3
    )
  }

  static createRenderer(canvas) {
    return new Squares(canvas, 400, 0.4)
  }

  renderStep() {
    renderProximityLines(
      this.canvas,
      this.ctx,
      [...this.particleSet.getPoints()],
      this.maxDist
    )
    this.particleSet.step()
  }
}
