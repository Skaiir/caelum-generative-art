export const paintTiles = (canvas, ctx, cellSize, cellGap, cellsCallback) => {
  let canvasSize = canvas.width
  ctx.globalCompositeOperation = 'darker'
  ctx.fillStyle = 'rgb(3, 2, 3)'
  ctx.globalAlpha = 0.04
  ctx.fillRect(0, 0, canvasSize, canvasSize)
  ctx.globalAlpha = 1
  ctx.globalCompositeOperation = 'source-over'

  const cellCount = Math.floor((canvasSize - cellGap) / (cellSize + cellGap))
  ctx.fillStyle = 'rgba(200, 256, 200, 0.6)'

  const randomCells = cellsCallback(cellCount)

  for (let i = 0; i < randomCells.length; i++) {
    let xStart = cellGap + (cellSize + cellGap) * randomCells[i][0]
    let yStart = cellGap + (cellSize + cellGap) * randomCells[i][1]
    ctx.fillRect(xStart, yStart, cellSize, cellSize)
  }
}
