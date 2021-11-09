import { RecursiveShapes } from '../logic/recursiveShapes'
import { Vector2 } from '../logic/vectors'
import {
  paintPointConnections,
  proximityColorStyle,
  colorSets,
} from '../renderers/connectPointsPainter'

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
    return new Squares(canvas, 400, 0.3)
  }

  renderStep() {
    paintPointConnections(
      this.canvas,
      this.ctx,
      [...this.particleSet.getPoints()],
      (pa, pb) => Vector2.distanceBetween(pa, pb) < this.maxDist,
      proximityColorStyle(
        this.maxDist,
        colorSets.redYellow.min,
        colorSets.redYellow.max,
        (x) => x ** 2
      )
    )
    this.particleSet.step()
  }
}
