var globalAnswer = []
// My own functions
class Box {
  constructor (posX, posY, answer) {
    this.x = posX
    this.y = posY
    this.width = 80
    this.height = 25
    this.answer = answer
    this.hasBeenAnswered = false
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
var IMG = 'img/test.jpg'
var boxesOriginal = [
  new Box(20, 20, 'Hola'),
  new Box(400, 10, 'Bye'),
  new Box(200, 80, 'Siiii'),
  new Box(300, 150, 'Jejeje')
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
  createCanvas(1000, 500)
}

function draw () {
  if (!imchoosing) {
    image(IMG, 0, 0)
    for (let i = 0; i < boxesOriginal.length; i++) {
      boxesOriginal[i].draw()
    }
    if (boxesCopy.length > 0) {
      actualchoosing = boxesCopy.pop().answer
    } else {
      document.getElementById('notice').innerHTML = 'GANASTE'
    }
    document.getElementById('actualPart').innerHTML = actualchoosing
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
