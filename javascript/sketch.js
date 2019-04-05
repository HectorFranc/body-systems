var globalAnswer = []
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
    globalAnswer.push(this.answer)
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
    return this.isInThisBox(mousX, mousY) && this.answer === answer
  }
}

// My variables
var IMG = 'img/neurona.jpg'
var boxesOriginal = [
  new Box(175, 35, 'Dendritas', 'Descripción de dendritas', 250, 50, 30),
  new Box(310, 165, 'Axón', 'Descripción de Axón', 250, 50, 30),
  new Box(195, 360, 'Núcleo', 'Descripción de Núcleo', 250, 50, 30),
  new Box(78, 415, 'Cuerpo celular', 'Descripción de Cuerpo celular', 285, 50, 30),
  new Box(420, 420, 'Mielina', 'Descripción de Mielina', 250, 50, 30),
  new Box(610, 300, 'Sinapsis', 'Descripción de Sinapsis', 250, 50, 30)
]
var boxesCopy = boxesOriginal.slice(0, boxesOriginal.length)
boxesCopy.sort(() => Math.random() - 0.5)
var imchoosing = false
var actualchoosing;

// P5js functions
function preload () {
  IMG = loadImage(IMG)
}

function setup () {
  createCanvas(16 * 55, 9 * 55)
}

function draw () {
  if (!imchoosing) {
    image(IMG, 0, 0, 16 * 55, 9 * 55)
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
    }
    imchoosing = true
  } else {
    if (mouseIsPressed) {
      for (let i = 0; i < boxesOriginal.length; i++) {
        if (boxesOriginal[i].isCorrectAnswer(mouseX, mouseY, actualchoosing)) {
          boxesOriginal[i].hasBeenAnswered = true
          document.getElementById('notice').innerHTML += '✔ '
          imchoosing = false
        }
      }
    }
  }
}
