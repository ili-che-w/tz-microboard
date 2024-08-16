/**
 *
 */

import { Drawing } from './draw.js'

const canvas = document.getElementById('canvas')
const start = document.getElementById('start')
const ctx = canvas.getContext('2d')

let started = false
const drawing = new Drawing(ctx, canvas.height, canvas.width)

const startGame = (e) => {
  if (ctx) {
    drawing.toggle()
    start.innerText = drawing.running ? 'Остановить игру' : 'Начать игру'
  }
}

start.addEventListener('click', startGame)
