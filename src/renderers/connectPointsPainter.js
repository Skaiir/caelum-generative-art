import { Vector2 } from '../logic/vectors'

export const paintPointConnections = (
  canvas,
  ctx,
  points,
  conditionCallback = () => true,
  styleCallback = () => {}
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const particleCount = points.length

  ctx.lineWidth = 1
  ctx.strokeStyle = 'rgba(50, 100, 200, 0.5)'

  for (let a = 0; a < particleCount; a++) {
    const pa = points[a]
    for (let b = a + 1; b < particleCount; b++) {
      const pb = points[b]

      if (!conditionCallback(pa, pb)) continue
      styleCallback(pa, pb, ctx)

      ctx.beginPath()
      ctx.moveTo(pa.x * canvas.width, pa.y * canvas.height)
      ctx.lineTo(pb.x * canvas.width, pb.y * canvas.height)
      ctx.stroke()
    }
  }
}

export const colorSets = {
  redBlue: {
    min: [0, 0, 256, 0],
    max: [256, 0, 0, 0.5],
  },
  redYellow: {
    min: [150, 0, 0, 0],
    max: [256, 256, 200, 0.5],
  },
  gold: {
    min: [],
    max: [],
  },
}

export const proximityColorStyle = (
  maxPaintDistance,
  rgbaMin,
  rgbaMax,
  proximityFactorMap = (x) => x
) => {
  return (pa, pb, ctx) => {
    const distance = Vector2.distanceBetween(pa, pb)
    const proximityFactor = proximityFactorMap(
      Math.max(maxPaintDistance - distance, 0) / maxPaintDistance
    )
    const rgba = [...Array(4).keys()].map(
      (k) => rgbaMin[k] + proximityFactor * (rgbaMax[k] - rgbaMin[k])
    )
    ctx.strokeStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
  }
}
