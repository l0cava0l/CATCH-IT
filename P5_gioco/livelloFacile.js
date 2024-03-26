let moles;
let score;
let moleimg;
let sfondo;
let lastMoleTime;

function preload() {
  moleimg = loadImage('./img/talpaa.png');
  sfondo = loadImage('./img/home2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  moles = [];
  score = 0;
  lastMoleTime = millis();
  moles.push(new Mole(width / 3, height / 3)); 
  moles.push(new Mole(2 * width / 3, height / 3)); 
  moles.push(new Mole(width / 3, 2 * height / 3)); 
  moles.push(new Mole(2 * width / 3, 2 * height / 3));
}

class Mole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = false;
    this.hitboxWidth = 80;
    this.hitboxHeight = 80;
    this.radius = 50;
    this.imageSize = 240; 
  }

  draw() {   
    fill(0);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    if (this.active) {
      image(moleimg, this.x - this.imageSize / 2, this.y - this.imageSize / 2, this.imageSize, this.imageSize);
    }     
  }

  checkHit(x, y) {
    return (x > this.x - this.hitboxWidth / 2 && x < this.x + this.hitboxWidth / 2 &&
            y > this.y - this.hitboxHeight / 2 && y < this.y + this.hitboxHeight / 2);
  }  
}

function draw() {
  background(sfondo);
  textSize(30);
  fill(0);
  textAlign(CENTER); 
  text('SCORE: ' + score, width / 2, 630);
  for (let mole of moles) {
    mole.draw();
  }
  
  if (millis() - lastMoleTime > 3000) {
    let mole = random(moles);
    mole.active = true;
    lastMoleTime = millis();
  }
}

function mouseClicked() {
  for (let mole of moles) {
    if (mole.active && mole.checkHit(mouseX, mouseY)) {
      score++;
      mole.active = false;
    }
  }
}
