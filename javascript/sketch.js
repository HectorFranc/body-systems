var globalAnswer = []
// My own functions
class Box {
  constructor (posX, posY, answer, description) {
    this.x = posX
    this.y = posY
    this.width = 80
    this.height = 25
    this.answer = answer
    this.hasBeenAnswered = false
    this.description = description
    globalAnswer.push(this.answer)
  }
  draw () {
    fill(255, 255, 255)
    stroke(0, 0, 0)
    rect(this.x, this.y, this.width, this.height)
    if (this.hasBeenAnswered) {
      fill(0, 0, 0)
      text(this.answer, this.x + 5, this.y + this.height / 2)
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
var IMG = 'https://i.pinimg.com/originals/12/18/71/121871080cc510e8b89ef2cca4ab1492.jpg'
var boxesOriginal = [
  new Box(20, 20, 'Hola', 'Esta es una descripcion hola'),
  new Box(400, 10, 'Bye', 'Esta es una descripcion bye'),
  new Box(200, 80, 'Siiii', 'Esta es una descripcion siii'),
  new Box(300, 150, 'Jejeje', 'Esta es una descripcion jejeje')
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
