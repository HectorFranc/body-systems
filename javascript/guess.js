// Global variables
var lifes = 3
var preload, setup, mouseClicked, drawNext

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

function initializer (IMG, boxesOriginal, IMGWidth, IMGHeight, thereWasAPastLevel, isThereNextLevel, nextLevelConfig = () => {}) {
  // Local variables
  let boxesCopy = boxesOriginal.slice(0, boxesOriginal.length)
  boxesCopy.sort(() => Math.random() - 0.5)
  let imchoosing = false
  let actualchoosing

  // P5js functions
  setup = () => {
    createCanvas(IMGWidth, IMGHeight)
    document.getElementById('lifes').innerHTML = '❤ '.repeat(lifes)
    drawNext = () => {
      if(lifes >= 0) {
        if (!imchoosing) {
          image(IMG, 0, 0, IMGWidth, IMGHeight)
          for (let i = 0; i < boxesOriginal.length; i++) {
            boxesOriginal[i].draw()
          }
          if (boxesCopy.length > 0) {
            let boxesCopyInstance = boxesCopy.pop()
            actualchoosing = boxesCopyInstance.answer
            document.getElementById('partDescription').innerHTML = boxesCopyInstance.description
          } else {
            if (isThereNextLevel) {
              // Next Level
              initializer(...nextLevelConfig)
            } else {
              document.getElementById('notice').innerHTML = '¡¡¡GANASTE!!!'
              document.getElementById('partDescription').style.display = 'none'
              document.getElementById('defaultCanvas0').style.display = 'none'
            }
          }
          imchoosing = true
        }
      } else {
        // Game Over
        document.getElementById('notice').innerHTML = 'GAME OVER'
        document.getElementById('notice').style.color = 'red'
        document.getElementById('partDescription').style.display = 'none'
        document.getElementById('defaultCanvas0').style.display = 'none'
      }
    }
    drawNext()
  }

  preload = () => {
    if(thereWasAPastLevel){
      IMG = loadImage(IMG, setup)
    } else {
      IMG = loadImage(IMG)
    }
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
    drawNext()
  }

  if (thereWasAPastLevel) {
    preload()
  }
}

// Calling
let level3 = ['img/respiratorio.jpg', [
  new Box(20, 20, 'Answer', 'Description'),
  new Box(20, 20, 'Answer', 'Description'),
  new Box(20, 20, 'Answer', 'Description'),
  new Box(20, 20, 'Answer', 'Description'),
  new Box(20, 20, 'Answer', 'Description'),
  new Box(20, 20, 'Answer', 'Description')
], 16*55, 9*55, true, false]

let level2 = ['img/circulatorio.jpg', [
  new Box(670, 80, 'Corazón', 'Es el órgano principal del aparato circulatorio, impulsa la sangre a través de las arterias.', 200, 50, 30),
  new Box(50, 302, 'Venas', 'Es un vaso sanguíneo que conduce la sangre desde los capilares hasta el corazón. Generalmente, se caracterizan porque contienen sangre desoxigenada.', 200, 50, 30),
  new Box(675, 210, 'Arterias', 'Es cada uno de los vasos que llevan la sangre con oxígeno desde el corazón hacia los capilares del cuerpo.', 190, 50, 30),
  new Box(75, 85, 'Vasos\nCapilares', 'Son vasos sanguíneos que surgen como pequeñas ramificaciones de las arterias a lo largo de todo el cuerpo y cerca de la superficie de la piel. Llevan nutrientes y oxígeno a la célula y traen de ésta los productos de desecho.', 150, 100, 30)
], 16 * 55, 9 * 55, true, true, level3]

let level1 = ['img/neurona.jpg', [
  new Box(175, 35, 'Dendrita', 'Son terminales de las neuronas y sirven como receptores de impulsos nerviosos provenientes desde un axón perteneciente a otra neurona.', 250, 50, 30),
  new Box(310, 165, 'Axón', 'Es una prolongación de las neuronas especializadas en conducir el impulso nervioso desde el cuerpo celular o soma hacia otra célula.', 250, 50, 30),
  new Box(195, 360, 'Núcleo', 'Orgánulo que contiene la mayor parte del material genético celular, organizado en varias moléculas extraordinariamente largas y lineales de ADN.', 250, 50, 30),
  new Box(78, 415, 'Soma', 'Es el cuerpo celular de la neurona, el cual contiene el núcleo rodeado por el citoplasma.', 285, 50, 30),
  new Box(420, 420, 'Mielina', 'Sustancia que envuelve y protege los axones de ciertas células nerviosas y cuya función principal es la de aumentar la velocidad de transmisión del impulso nervioso.', 250, 50, 30),
  new Box(420, 90, 'Nodo de Ranvier', 'Interrupciones que ocurren a intervalos regulares a lo largo de la longitud del axón en la vaina de mielina que lo envuelve.', 250, 50, 30),
  new Box(480, 360, 'Célula de Schwann', 'Células que recubren a las prolongaciones (axones) de las neuronas formándoles una vaina aislante de mielina.', 250, 50, 27),
  new Box(610, 300, 'Sinapsis', 'Región de comunicación entre el axón de una neurona y las dendritas o el cuerpo de otra.', 250, 50, 30)
], 16 * 55, 9 * 55, false, true, level2]

initializer(...level1)
