import { Vector2 } from '../logic/vectors'

export const renderProximityLines = (canvas, ctx, points, maxDist) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const particleCount = points.length

  ctx.lineWidth = 1
  ctx.strokeStyle = 'rgba(50, 100, 200, 0.5)'

  for (let a = 0; a < particleCount; a++) {
    const pa = points[a]
    for (let b = a + 1; b < particleCount; b++) {
      const pb = points[b]
      const dist = Vector2.distanceBetween(pa, pb)
      if (dist > maxDist) continue
      const proximityFactor = (maxDist - dist) / maxDist
      const red = 256 * proximityFactor
      const green = 0
      const blue = 256 * (1 - proximityFactor)
      ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${
        0.5 * proximityFactor
      })`
      ctx.beginPath()
      ctx.moveTo(pa.x * canvas.width, pa.y * canvas.height)
      ctx.lineTo(pb.x * canvas.width, pb.y * canvas.height)
      ctx.stroke()
    }
  }
}
