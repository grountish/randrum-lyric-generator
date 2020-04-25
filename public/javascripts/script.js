let angle = 100
let despl = 190
let escalar = 170
let vel = 0.01

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  frameRate(4)
}

function draw() {
  some(ellipse, windowWidth / 700, windowWidth / 700,170)
  some(line, windowWidth / 300, 120, 190)
  some(line, 610, windowHeight / 100, 100)
}

function some(form, widthx, heighty, col) {
  let x = despl + cos(angle) * escalar
  let y = despl + sin(angle) * escalar
  noFill()
  smooth()
  strokeWeight(random(1410));
  stroke(random(col), random(col), random(col), random(col))
  form(x + mouseX, y + mouseY, widthx, heighty)
  angle++
  angle += vel + 2
}