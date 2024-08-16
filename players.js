class Player {
  constructor(x, y, fillStyle, step, up, topLimit, bottomLimit) {
    this.x = x
    this.y = y
    this.fillStyle = fillStyle
    this.step = step
    this.up = up
    this.topLimit = topLimit
    this.bottomLimit = bottomLimit

    this.radius = 30
  }

  paint(ctx) {
    ctx.fillStyle = this.fillStyle

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.fill()

    // обработка направления движения
    const topBounce = this.y - this.radius <= this.topLimit,
      bottomBounce = this.y + this.radius >= this.bottomLimit

    if (topBounce || bottomBounce) {
      this.up = !this.up
    }

    // расчет следующего шага
    this.y += this.up ? this.step : -this.step
  }
}

export const getPlayers = () => [
  new Player(30, 225, 'rgb(0 0 200)', 0.5, true, 0, 450),
  new Player(570, 225, 'rgb(200 0 0)', 2, false, 0, 450)
]
