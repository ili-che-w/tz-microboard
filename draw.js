class Circle {
  constructor(x, y, fillStyle, step) {
    this.x = x
    this.y = y
    this.fillStyle = fillStyle
    this.step = step
    this.size = 30
  }

  paint(ctx) {
    ctx.fillStyle = this.fillStyle
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true)
    ctx.fill()

    this.x += this.step
  }
}

export const draw = (ctx) => {
  const objects = [
    new Circle(75, 75, 'rgb(0 0 200)', 18),
    new Circle(375, 75, 'rgb(200 0 0)', -19)
  ]

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    objects.forEach((object) => object.paint(ctx))
  }

  let start = 0

  const animate = (timestamp) => {
    const elapsed = timestamp - start

    if (elapsed > 200) {
      start = timestamp
      tick()
    }

    window.requestAnimationFrame(animate)
  }

  animate()
}
