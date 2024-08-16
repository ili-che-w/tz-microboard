import { Spell, Player } from './players.js'

const playerRadius = 30
const playerwins = [
  document.getElementById('player1wins'),
  document.getElementById('player2wins')
]

export const draw = (ctx, canvasHeight, canvasWidth) => {
  const players = [
    new Player(1, playerRadius, 'rgb(0 0 200)', 0.5, true, 'right'),
    new Player(2, canvasWidth - playerRadius, 'rgb(200 0 0)', 2, false, 'left')
  ]
  let spells = []

  const topLimit = 0,
    bottomLimit = canvasHeight

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    players.forEach((player) => {
      player.paint(ctx)

      const { id, x, y, lastFired, fireInterval, fireDirection } = player

      if (y + playerRadius >= bottomLimit || y - playerRadius <= topLimit) {
        player.up = !player.up
      }

      const time = new Date().getTime()
      const diff = time - lastFired

      if (diff >= fireInterval) {
        const spellDirection = fireDirection === 'right',
          spellId = spells.length + 1,
          newSpell = new Spell(spellId, x, y, 'rgb(0 200 0)', spellDirection, id)

        spells.push(newSpell)
        player.spellsCount++
        player.lastFired = time
      }
    })

    spells.forEach((spell) => {
      spell.paint(ctx)

      const { id, x, y, playerId } = spell

      const playersAtField = players.filter((player) => player.id !== playerId)

      playersAtField.forEach((player) => {
        const cnd1 = player.x - playerRadius <= x && x <= player.x + playerRadius,
          cnd2 = player.y - playerRadius <= y && y <= player.y + playerRadius

        if (cnd1 && cnd2) {
          console.log('popadanie', player.id)
          player.hurtsCount++
          spells = spells.filter((spell) => spell.id !== id)

          const winner = players.find((p) => p.id === playerId)
          winner.winsCount++
          playerwins[winner.id - 1].innerText = winner.winsCount
        }
      })
    })
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
