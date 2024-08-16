/**
 *
 */

import { draw } from './draw.js'

const canvas = document.getElementById('canvas')

if (canvas.getContext) {
  const ctx = canvas.getContext('2d')
  window.addEventListener('load', () => draw(ctx))
}
