import { getPlayers } from './players.js'

export const draw = (ctx) => {
  const players = getPlayers()

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    players.forEach((player) => player.paint(ctx))
  }

  let start = 0

  const animate = (timestamp) => {
    const elapsed = timestamp - start

    if (elapsed > 10) {
      start = timestamp
      tick()
    }

    window.requestAnimationFrame(animate)
  }

  animate()
}
