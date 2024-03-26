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
  lastMoleTime = millis(); // tempo ultima talpa
  moles.push(new Mole(width / 4, height / 3)); // colonna 1, file 1
  moles.push(new Mole(width / 4, 2 * height / 3)); // colonna 1, file 2
  moles.push(new Mole(width / 2, height / 3)); // colonna 2, file 1
  moles.push(new Mole(width / 2, 2 * height / 3)); // colonna 2, file 2
  moles.push(new Mole(3 * width / 4, height / 3)); // colonna 3, file 1
  moles.push(new Mole(3 * width / 4, 2 * height / 3)); // colonna 3, file 2
}

class Mole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = false;
    this.startTime = 0; // tempo di inizio per la talpa
    this.hitboxWidth = 80; //dimensione della hitbox (larghezza)
    this.hitboxHeight = 80; //dimensione della hitbox (lunghezza)
    this.radius = 50; //ellisse
    this.imageSize = 240; // Nuova dimensione dell'immagine
  }

  draw() {
    fill(0);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2); // Modifica la dimensione dell'ellisse
    if (this.active) {
      image(moleimg, this.x - this.imageSize / 2, this.y - this.imageSize / 2, this.imageSize, this.imageSize);
    }
  }

  checkHit(x, y) {
    return (x > this.x - this.hitboxWidth / 2 && x < this.x + this.hitboxWidth / 2 &&
      y > this.y - this.hitboxHeight / 2 && y < this.y + this.hitboxHeight / 2);
  }

  press() {
    if (this.active) {
      this.active = false;
      return true; // Indica che la talpa è stata colpita
    }
    return false; // Indica che la talpa non è stata colpita
  }
}

function draw() {
  background(sfondo);
  textSize(30);
  fill(0);
  textAlign(CENTER); 
  text('SCORE: ' + score, width / 2, 630);

  for (let i = moles.length - 1; i >= 0; i--) {
    let mole = moles[i];
    mole.draw();

    if (mole.active && millis() - mole.startTime > 1000) {
      if (!mole.press()) {
        score++; // Aumenta il punteggio solo se la talpa non è stata colpita manualmente
      }
    }
  }

  // Genera casualmente l'attivazione di una talpa ogni 3 secondi
  if (millis() - lastMoleTime > 1500) {
    let mole = random(moles);
    mole.active = true;
    mole.startTime = millis(); // Imposta il tempo di inizio per la talpa
    lastMoleTime = millis(); // Aggiorna il tempo dell'ultima talpa generata
  }
}

function mouseClicked() {
  for (let i = moles.length - 1; i >= 0; i--) {
    let mole = moles[i];
    if (mole.checkHit(mouseX, mouseY)) {
      if (mole.press()) {
        score++; // Aumenta il punteggio solo se la talpa è stata colpita manualmente
      }
    }
  }
}
