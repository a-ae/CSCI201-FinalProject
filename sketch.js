/* 
 * Aaron Smith
 * 12/12/2023
 */

// constants
const WINDOW_LENGTH = 800;
const WINDOW_HEIGHT = 800; // window dimensions
const BOX_LENGTH = 100;
const BOX_HEIGHT = 50; // score box dimensions

//important global variables
var balls = [];
var score = 0;
var difficulty = 3;

function preload() {
  // preload sound file if any
}

// loads canvas
function setup() {
  createCanvas(WINDOW_LENGTH, WINDOW_HEIGHT);
}

// draws and updates the player's score
function scoreBox() {
  strokeWeight(4);
  rect(0, 0, BOX_LENGTH, BOX_HEIGHT);
  
  textSize(20);
  fill(0, 0, 0);
  
  textAlign(LEFT);
  text(score.toString(), 4, BOX_HEIGHT / 2)
}

// ensures the ball list is always filled to capacity, capacity based on difficulty
function fillBallList() {
  while (balls.length < difficulty) {
    balls.push(new Ball());
  }
}

// increments difficulty every 5 points
function updateDifficulty() {
  if (score % 5 == 0) {
    difficulty++;
  }
}

// check if the cursor is touching a ball

function draw() {
  background(0);
  scoreBox();
  fillBallList();
  
  for (var i = 0; i < balls.length; i++) {
    balls[i].display();
    
    // replaces balls that leave the window & adds score
    if (balls[i].outsideWindow()) {
      balls[i] = new Ball();
      score++;
      updateDifficulty();
    }
    
    // checks if cursor is touching green, and ends game
    var pixel = get(mouseX, mouseY);
    if (pixel[1] == 255) {
      background(0, 0, 0);
      textSize(60);
      text('Great Job! Score: '+score, 20, 250);
      noLoop();
      return;
    }
    
    balls[i].move();
  }
}

class Ball {
  constructor() {
    // determines which edge of the screen to create a ball on
    var spawnEdge = floor(random(0, 4));
    
    if (spawnEdge == 0) { // spawns on the left
      this.ballX = 0;
      this.ballY = random(0, WINDOW_HEIGHT);
      this.speedX = random(1, 5);
      this.speedY = random(-5, 5);
        
    }
    if (spawnEdge == 1) { // spawns on the top
      this.ballX = random(0, WINDOW_LENGTH);
      this.ballY = 0;
      this.speedX = random(-5, 5);
      this.speedY = random(1, 5);
      
    }
      
    if (spawnEdge == 2) { // spawns on the right
      this.ballX = WINDOW_LENGTH;
      this.ballY = random(0, WINDOW_HEIGHT);
      this.speedX = random(0, -5);
      this.speedY = random(-5, 5);
      
    }
      
    else { // spawns on the bottom
      this.ballX = random(0, WINDOW_LENGTH);
      this.ballY = WINDOW_HEIGHT;
      this.speedX = random(-5, 5);
      this.speedY = random(-5, 0);
      
    }
    
  
    this.size = random(10, 100);
    
    this.red = 0;
    this.green = 255;
    this.blue = 0;
    
    this.alpha = 255;
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  // returns boolean based on if the ball is outside the window
  outsideWindow() {
    if (((this.ballX + this.size / 2) < 0 || (this.ballX - this.size / 2) > WINDOW_LENGTH) || ((this.ballY + this.size / 2) < 0) || (this.ballY - this.size / 2) > WINDOW_HEIGHT) {
      return true;
    }
    return false;
  }
  
  move() {
    this.ballX += this.speedX;
    this.ballY += this.speedY;
  }
}