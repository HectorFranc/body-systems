// Global variables
var lifes = 3;
var preload, setup, mouseClicked, draw;

// My own functions
class Box {
  constructor (posX, posY, answer, description, width=80, height=25, textSize=16) {
    this.x = posX
    this.y = posY
    this.width = width
    this.height = height
    this.answer = answer
    this.hasBeenAnswered = false
    this.description = description
    this.textSize = textSize
  }
  draw () {
    fill(255, 255, 255)
    stroke(0, 0, 0)
    rect(this.x, this.y, this.width, this.height)
    if (this.hasBeenAnswered) {
      fill(0, 0, 0)
      textSize(this.textSize)
      text(this.answer, this.x + 5, this.y + this.height / 2 + 5)
    }
  }
  isInThisBox (mousX, mousY) {
    return (mousX >= this.x && mousX <= this.x + this.width) && (mousY >= this.y && mousY <= this.y + this.height)
  }
  isCorrectAnswer (mousX, mousY, answer) {
    if (this.isInThisBox(mousX, mouseY)) {
      if (this.answer === answer) {
        return true
      } else {
        lifes--
        if (lifes >= 0) {
          document.getElementById('lifes').innerHTML = '❤ '.repeat(lifes)
        }
        return false
      }
    } else {
      return false
    }
  }
}

function initializer (IMG, boxesOriginal, IMGWidth, IMGHeight) {
  // Local variables
  let boxesCopy = boxesOriginal.slice(0, boxesOriginal.length)
  boxesCopy.sort(() => Math.random() - 0.5)
  let imchoosing = false
  let actualchoosing;
  // P5js functions
  preload = () => {IMG = loadImage(IMG)}

  setup = () => {
    createCanvas(IMGWidth, IMGHeight)
    document.getElementById('lifes').innerHTML = '❤ '.repeat(lifes)
  }

  mouseClicked = () => {
    if (imchoosing) {
      for (let i = 0; i < boxesOriginal.length; i++) {
        if (boxesOriginal[i].isCorrectAnswer(mouseX, mouseY, actualchoosing)) {
          boxesOriginal[i].hasBeenAnswered = true
          imchoosing = false
        }
      }
    }
  }

  draw = () => {
    if(lifes >= 0) {
      if (!imchoosing) {
        image(IMG, 0, 0, IMGWidth, IMGHeight)
        for (let i = 0; i < boxesOriginal.length; i++) {
          boxesOriginal[i].draw()
        }
        if (boxesCopy.length > 0) {
          let boxesCopyInstance = boxesCopy.pop()
          actualchoosing = boxesCopyInstance.answer
          document.getElementById('actualPart').innerHTML = actualchoosing
          document.getElementById('partDescription').innerHTML = boxesCopyInstance.description
        } else {
          document.getElementById('notice').innerHTML = '¡¡¡GANASTE!!!'
          document.getElementById('actualPart').style.display = 'none'
          document.getElementById('partDescription').style.display = 'none'
          document.getElementById('defaultCanvas0').style.display = 'none'
        }
        imchoosing = true
      }
    } else {
      // Game Over
      document.getElementById('notice').innerHTML = 'GAME OVER'
      document.getElementById('notice').style.color = 'red'
      document.getElementById('actualPart').style.display = 'none'
      document.getElementById('partDescription').style.display = 'none'
      document.getElementById('defaultCanvas0').style.display = 'none'
    }
  }
}

// Calling
initializer('img/neurona.jpg', [
  new Box(175, 35, 'Dendritas', 'Descripción de dendritas', 250, 50, 30),
  new Box(310, 165, 'Axón', 'Descripción de Axón', 250, 50, 30),
  new Box(195, 360, 'Núcleo', 'Descripción de Núcleo', 250, 50, 30),
  new Box(78, 415, 'Cuerpo celular', 'Descripción de Cuerpo celular', 285, 50, 30),
  new Box(420, 420, 'Mielina', 'Descripción de Mielina', 250, 50, 30),
  new Box(610, 300, 'Sinapsis', 'Descripción de Sinapsis', 250, 50, 30)
], 16 * 55, 9 * 55)
