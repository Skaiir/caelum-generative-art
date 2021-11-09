import { Vector2 } from './vectors'
class Particle {
  static RandomParticle(velocityMin, velocityMax) {
    const velocityMul =
      velocityMin + (velocityMax - velocityMin) * Math.random()
    const velocityVec = Vector2.randomUnitVector().mul(velocityMul)
    return new Particle(new Vector2(Math.random(), Math.random()), velocityVec)
  }

  constructor(pos, velocity) {
    this.pos = pos
    this.velocity = velocity
  }

  step(deltaTime) {
    const expectedTravel = this.velocity.mul(deltaTime)
    const wrapResultX = BouncyParticleSet.ZigZagWrapCoord(
      this.pos.x,
      Math.abs(expectedTravel.x),
      expectedTravel.x > 0
    )
    const wrapResultY = BouncyParticleSet.ZigZagWrapCoord(
      this.pos.y,
      Math.abs(expectedTravel.y),
      expectedTravel.y > 0
    )

    this.pos = new Vector2(wrapResultX.newPos, wrapResultY.newPos)
    this.velocity = new Vector2(
      (wrapResultX.flip ? -1 : 1) * this.velocity.x,
      (wrapResultY.flip ? -1 : 1) * this.velocity.y
    )
  }
}

export class BouncyParticleSet {
  static ZigZagWrapCoord(position, distance, startPositive) {
    // travel of 2 returns to the same spot in our [0,1] domain
    let distanceToTravel = distance % 2
    let isPositiveTravel = startPositive
    let newPos = position

    while (distanceToTravel > 0) {
      const distanceToBoundary = isPositiveTravel ? 1 - newPos : newPos
      if (distanceToBoundary <= distanceToTravel) {
        newPos = isPositiveTravel ? 1 : 0
        distanceToTravel -= distanceToBoundary
        isPositiveTravel = !isPositiveTravel
      } else {
        newPos = newPos + (isPositiveTravel ? 1 : -1) * distanceToTravel
        distanceToTravel = 0
      }
    }

    return { newPos: newPos, flip: isPositiveTravel !== startPositive }
  }

  constructor(particleCount, velocityMin, velocityMax) {
    this.particles = Array.from({ length: particleCount }, () => {
      return Particle.RandomParticle(velocityMin, velocityMax)
    })
  }

  step() {
    const dummyDelta = 60 / 1000
    this.particles.forEach((p) => p.step(dummyDelta))
  }
}
