import { Vector2 } from './vectors'

class RecursionShape {
  constructor(anchors, radialVelocity, scale, depth, scaleRec, rotRec = 1) {
    this.rotation = 0
    this.radialVelocity = radialVelocity
    this.scale = scale
    this.children = []
    this.anchors = anchors

    if (depth > 0) {
      anchors.forEach(() =>
        this.children.push(
          new RecursionShape(
            anchors,
            radialVelocity * rotRec,
            scale * scaleRec,
            depth - 1,
            scaleRec,
            rotRec
          )
        )
      )
    }
  }

  step(delta) {
    this.rotation += delta * this.radialVelocity
    this.children.forEach((s) => s.step(delta))
  }

  *getPoints(center) {
    const hasChildren = this.children.length > 0
    for (let x = 0; x < this.anchors.length; x++) {
      // TODO scaling does not take into account center yet, assume the shape is already centered
      const newCenter = new Vector2(this.anchors[x][0], this.anchors[x][1])
        .mul(this.scale)
        .add(center)
        .rotateAboutPoint(center, this.rotation)

      yield newCenter

      if (hasChildren) {
        yield* this.children[x].getPoints(newCenter)
      }
    }
  }
}

export class RecursiveShapes {
  step() {
    const dummyDelta = 60 / 1000
    this.root.step(dummyDelta)
  }

  *getPoints() {
    yield* this.root.getPoints(this.initialPosition)
  }

  buildRegularShape(points) {
    const twoPi = Math.PI * 2
    const shape = []
    for (let x = 0; x < points; x++) {
      shape.push([
        Math.cos((twoPi * x) / points),
        Math.sin((twoPi * x) / points),
      ])
    }

    return shape
  }

  constructor(
    initialPosition,
    radialVelocity,
    initialScale,
    depth,
    scaleRec,
    rotRec
  ) {
    this.initialPosition = initialPosition

    this.root = new RecursionShape(
      this.buildRegularShape(3),
      radialVelocity,
      initialScale,
      depth,
      scaleRec,
      rotRec
    )
  }
}
