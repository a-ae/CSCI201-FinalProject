/*
 *
 *
 *
 */



// constants
const WINDOW_HEIGHT = 800;
const WINDOW_LENGTH = 800; // window dimensions

// important globals variables
var balls = [];
var numBalls = 1;

function setup() {
  createCanvas(WINDOW_HEIGHT, WINDOW_LENGTH);
  
  for (var i = 0; i < numBalls; i++) {
    balls[i] = new Ball();
  }
}

function preload() {
  //preload sound file if any
}

function draw() {
  background(0);
  
  for (var i = 0; i < balls.length; i++) {
    balls[i].display();
    if (balls[i].checkForOffScreen()) {
      balls[i] = new Ball();
      break;
    }
    balls[i].moveBall();
  }

}

function getMousePos(ball) {
  
  var x = event.clientX
  var y = event.clientY
  
  if (x == ball.ballX && y == ball.ballY) {
    return true
  }
  return false
}

class Ball {
  
  constructor() {
    /**
    this.ballX = random(10, 100)
    this.ballY = random(10, 100)
    
    this.speedY = random(-5, 5)
    this.speedX = random(-5, 5)
    
    this.size = random(100)
    
    this.red = random(225)
    this.blue = random(225)
    this.green = random(225)
    */
    
    // decides whether ball will spawn at the left, right, top, or bottom of the screen
    var side = floor(random(0, 4))
    
    // assign appropriate speeds based on spawn region so ball doesn't go right back off screen
    if (side == 0) { // ceiling
      this.ballX = random(0, WINDOW_LENGTH);
      this.ballY = 0;
      this.speedX = random(-10, 10)
      this.speedY = random(0, 10)
    }
      
    if (side == 1) { // floor
      this.ballX = random(0, WINDOW_LENGTH)
      this.ballY = WINDOW_HEIGHT
      this.speedX = random(-10, 10)
      this.speedY = random(-10, 0)
    }
    
    if (side == 2) { // left
      this.ballX = 0;
      this.ballY = random(0, WINDOW_HEIGHT);
      this.speedX = random(0, 10)
      this.speedY = random(-10, 10)
    }
    
    else { // right
      this.ballX = WINDOW_LENGTH;
      this.ballY = random(0, WINDOW_HEIGHT)
      this.speedX = random(-10, 0);
      this.speedY = random(-10, 10)
    }
    
    this.size = random(50, 150);
    
    this.red = 0;
    this.blue = 0;
    this.green = 225;
  }
  
  display() {
    fill(this.red, this.green, this.blue)
    ellipse(this.ballX, this.ballY, this.size)
  }
  
  checkForOffScreen() {
    if ((((this.ballX + (this.size / 2)) < 0) || ((this.ballX - (this.size / 2)) > WINDOW_LENGTH)) || (((this.ballY + (this.size / 2)) < 0) || ((this.ballY - (this.size / 2)) > WINDOW_HEIGHT))) {
      return true;
    }
    return false;
  }
  
  moveBall() {
    this.ballX += this.speedX;
    this.ballY += this.speedY;
  }
}