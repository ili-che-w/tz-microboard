class Circle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.fillStyle = color
  }

  paint(ctx) {
    ctx.fillStyle = this.fillStyle
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.fill()
  }
}

export class Spell extends Circle {
  constructor(id, x, y, color, moveRight, playerId) {
    super(x, y, 15, color)

    this.id = id
    this.speed = 10

    this.moveRight = moveRight
    this.playerId = playerId
  }

  paint(ctx) {
    super.paint(ctx)
    this.x += this.moveRight ? this.speed : -this.speed
  }
}

export class Player extends Circle {
  constructor(id, x, color, speed, up, fireDirection) {
    super(x, 225, 30, color)

    this.initialPos = 225
    this.id = id
    this.speed = speed
    this.up = up
    this.fireDirection = fireDirection

    this.spellsCount = 0
    this.hurtsCount = 0
    this.winsCount = 0
    this.lastFired = 0
    this.fireInterval = 5000
  }

  init(ctx) {
    this.y = this.initialPos
    super.paint(ctx)
  }

  paint(ctx) {
    super.paint(ctx)
    this.y += this.up ? this.speed : -this.speed
  }
}
