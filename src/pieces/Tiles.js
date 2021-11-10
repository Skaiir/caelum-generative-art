import { paintTiles } from '../renderers/tilePainter'

export default class Tiles {
  constructor(canvas, canvasSize, cellGap, cellSize) {
    this.canvas = canvas
    this.canvasSize = canvasSize
    this.cellGap = cellGap
    this.cellSize = cellSize
    this.ctx = canvas.getContext('2d')
    canvas.width = canvasSize
    canvas.height = canvasSize
    this.ctx.fillStyle = 'rgba(200, 256, 200, 0)'
    this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize)
  }

  static title = 'Tiles'

  static createRenderer(canvas) {
    return new Tiles(canvas, 398, 2, 4)
  }

  getRandomCells(probability, cellCount) {
    return [...Array(cellCount ** 2).keys()]
      .filter((k) => Math.random() < probability)
      .map((k) => [Math.floor(k / cellCount), k % cellCount])
  }

  renderStep() {
    paintTiles(
      this.canvas,
      this.ctx,
      this.cellSize,
      this.cellGap,
      (cellCount) => this.getRandomCells(0.01, cellCount)
    )
  }
}
