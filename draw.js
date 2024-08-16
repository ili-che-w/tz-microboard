import { Spell, Player } from './players.js'

const playerwins = [
  document.getElementById('player1wins'),
  document.getElementById('player2wins')
]

const refreshPlayersStatistics = () => {
  playerwins.forEach((elem) => (elem.innerText = 0))
}

const refreshField = (ctx) => {}

export class Drawing {
  constructor(ctx, canvasHeight, canvasWidth) {
    this.ctx = ctx
    this.canvasHeight = canvasHeight
    this.canvasWidth = canvasWidth

    this.running = false
    this.animationFrameId = null

    this.playerRadius = 30

    this.players = [
      new Player(1, this.playerRadius, 'rgb(0 0 200)', Math.random() * 2, true, 'right'),
      new Player(
        2,
        this.canvasWidth - this.playerRadius,
        'rgb(200 0 0)',
        Math.random() * 2,
        false,
        'left'
      )
    ]
    this.spells = []

    this.clearField()
  }

  clearField() {
    // erase all drawing
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    // delete all spells
    this.spells = []

    // players initial state
    this.players.forEach((player) => player.init(this.ctx))
  }

  toggle() {
    if (this.animationFrameId === null) {
      let start = 0

      const animate = (timestamp) => {
        this.running = true
        const elapsed = timestamp - start

        if (elapsed > 10) {
          start = timestamp
          this.draw()
        }

        this.animationFrameId = window.requestAnimationFrame(animate)
      }

      animate()
    } else {
      // stop animation
      window.cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
      this.running = false

      // clear field
      this.clearField()

      // refresh players statistics
      refreshPlayersStatistics()
    }
  }

  draw() {
    const topLimit = 0,
      bottomLimit = this.canvasHeight

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    this.players.forEach((player) => {
      player.paint(this.ctx)

      const { id, x, y, lastFired, fireInterval, fireDirection } = player

      if (y + this.playerRadius >= bottomLimit || y - this.playerRadius <= topLimit) {
        player.up = !player.up
      }

      const time = new Date().getTime()
      const diff = time - lastFired

      if (diff >= fireInterval) {
        const spellDirection = fireDirection === 'right',
          spellId = this.spells.length + 1,
          newSpell = new Spell(spellId, x, y, 'rgb(0 200 0)', spellDirection, id)

        this.spells.push(newSpell)
        player.spellsCount++
        player.lastFired = time
      }
    })

    this.spells.forEach((spell) => {
      spell.paint(this.ctx)

      const { id, x, y, playerId } = spell

      const playersAtField = this.players.filter((player) => player.id !== playerId)

      playersAtField.forEach((player) => {
        const cnd1 = player.x - this.playerRadius <= x && x <= player.x + this.playerRadius,
          cnd2 = player.y - this.playerRadius <= y && y <= player.y + this.playerRadius

        if (cnd1 && cnd2) {
          player.hurtsCount++
          this.spells = this.spells.filter((spell) => spell.id !== id)

          const winner = this.players.find((p) => p.id === playerId)
          winner.winsCount++
          playerwins[winner.id - 1].innerText = winner.winsCount
        }
      })
    })
  }
}
