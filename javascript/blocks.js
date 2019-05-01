var actualScreen = 'start' // actualScreen could be start, game and end
var actualScale = {x:1, y:1} // It will be used for scale the canvas
var HWIDTH = 638 // Use instead width, for define a position on canvas
var HHEIGHT = 384 // Use instead height, for define a position on canvas

function setup () {
    // Create canvas with resolution 638x384
    createCanvas(HWIDTH, HHEIGHT)
}

function draw () {
    // Scale the canvas to the new size.
    scale(actualScale.x, actualScale.y)
    // Example
    background('red')
    ellipse(HWIDTH/2, HHEIGHT/2, 200)
}

function windowResized () {
    // When window is resized, resize canvas with new windowWidth/Height values
    resizeCanvas(windowWidth, windowHeight)
    // The reference resolution is 683x384, for scaling numerator is new width/height to scale
    actualScale.x = windowWidth/683
    actualScale.y = windowHeight/384
}

function mousePressed () {
    // actualScreen could be start, game and end
    if(actualScreen === 'start'){
        fullscreen(true)
    }
}