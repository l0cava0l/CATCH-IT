let moles;
let score;
let moleimg;
let bombimg;
let sfondo;
let lastMoleTime;

function preload() {
  moleimg = loadImage('./img/talpaa.png');
  bombimg = loadImage('./img/bomba.png');
  sfondo = loadImage('./img/home2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  moles = [];
  score = 0;
  lastMoleTime = millis(); // tempo ultima talpa salita
  // Inizializzazione delle talpe
  moles.push(new Mole(width / 4, height / 3)); 
  moles.push(new Mole(width / 4, 2 * height / 3)); 
  moles.push(new Mole(width / 2, height / 3));
  moles.push(new Mole(width / 2, 2 * height / 3)); 
  moles.push(new Mole(3 * width / 4, height / 3)); 
  moles.push(new Mole(3 * width / 4, 2 * height / 3));
}

class Mole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = false;
    this.startTime = 0; //x capire da quando e disattiva dallo schermo
    this.hitboxWidth = 80; // dimensione della hitbox (larghezza)
    this.hitboxHeight = 80; // dimensione della hitbox (lunghezza)
    this.radius = 50; // ellisse (buchi neri)
    this.imageSize = 240;
    this.isABomb = false; // Indica se la talpa è una bomba
  }

  draw() {
    fill(0);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2); // Modifica la dimensione dell'ellisse (buchi neri)
    if (this.active) {
      if (this.isABomb) {
        image(bombimg, this.x - this.imageSize / 2, this.y - this.imageSize / 2, this.imageSize, this.imageSize); //centrare immagini a ellisse
      } else {
        image(moleimg, this.x - this.imageSize / 2, this.y - this.imageSize / 2, this.imageSize, this.imageSize);
      }
    }
  }

  checkHit(x, y) {
    return (x > this.x - this.hitboxWidth / 2 && x < this.x + this.hitboxWidth / 2 &&
      y > this.y - this.hitboxHeight / 2 && y < this.y + this.hitboxHeight / 2);
      // - uguale limite sinistro, + limite destro
  }

  press() {
    if (this.active) {
      this.active = false; // per far in modo che si possa premere una sola volta la talpa
      return true; // talpa colpita
    }
    return false; // talpa non colpita
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
    mole.startTime = millis(); //imposto tempo salita talpa
    mole.isABomb = random() < 0.35; //probabilita
    lastMoleTime = millis(); // Aggiorna il tempo mole
  }
}

function mouseClicked() {
  for (let i = moles.length-1; i>=0; i--) {
    let mole = moles[i];
    if (mole.checkHit(mouseX, mouseY)) {
      if (mole.press()) {
        if (mole.isABomb) { // Se la talpa è una bomba, termina il gioco
          gameOver();
        } else {
          score++; // Aumenta il punteggio solo se la talpa non è una bomba
        }
      }
    }
  }
}

function gameOver() {
  window.location.href = './gameOver.html';
  alert("GAME OVER score: " + score);
  score =0;
}
