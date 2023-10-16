class Zombie {
  constructor() {
    if (numOfZombies > 4) {
      this.randomNumber = floor(random(0, 4));
    } else {
      this.randomNumber = 2;
    }
    if (this.randomNumber == 1) {
      this.red = 200;
      this.green = 22;
      this.blue = 12;
      this.speed = width * 0.00066667;
      this.hurt = 20;
      this.health = 100;
    } else if (this.randomNumber == 2 || this.randomNumber == 3) {
      this.red = 30;
      this.green = 115;
      this.blue = 20;
      this.speed = width * 0.00053333;
      this.hurt = 25;
      this.health = 120;
    } else {
      this.red = 120;
      this.green = 25;
      this.blue = 148;
      this.speed = width * 0.0004;
      this.hurt = 30;
      this.health = 150;
    }
    this.timer = 2;
    this.randomize();
  }

  randomize() {
    this.x = random(0, width - width * 0.1);
    this.y = random(0, height);
    if (this.x == posX || this.y == posY) {
      this.randomize();
    }
    if (!smack(this.x, this.y, width * 0.01666667)) {
      this.randomize();
    }
  }

  move() {
    if (this.x !== posX) {
      if (this.x > posX) {
        if (smack(this.x - this.speed, this.y, width * 0.01666667)) {
          this.x = this.x - this.speed;
        }
      } else if (this.x < posX) {
        if (smack(this.x + this.speed, this.y, width * 0.01666667)) {
          this.x = this.x + this.speed;
        }
      }
    }
    if (this.y !== posY) {
      if (this.y > posY) {
        if (smack(this.x, this.y - this.speed, width * 0.01666667)) {
          this.y = this.y - this.speed;
        }
      } else if (this.y < posY) {
        if (smack(this.x, this.y + this.speed, width * 0.01666667)) {
          this.y = this.y + this.speed;
        }
      }
    }
  }

  show() {
    fill(this.red, this.green, this.blue);
    ellipse(this.x, this.y, width * 0.03333333);
    fill(0);
    textSize(width * 0.00733333);
    text(this.health, this.x, this.y - 5);
  }

  damage() {
    if (cooldownReady) {
      let d = floor(dist(posX, posY, this.x, this.y));
      if (d < width * 0.02 + width * 0.01666667) {
        health -= this.hurt;
        hit.setVolume(zombieHitSoundFXVolume);
        hit.play();
        cooldownReady = false;
      }
    } else {
      if (frameCount % 60 == 0 && this.timer > 0) {
        this.timer--;
      }
      if (this.timer == 0) {
        cooldownReady = true;
        this.timer = 2;
      }
    }
    if (health <= 0) {
      gamePhase = "dead";
      if (numOfZombies > localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", numOfZombies);
      }
    }
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < width * 0.03333333) {
      return true;
    } else {
      return false;
    }
  }

  distBetween() {
    shotDist = dist(this.x, this.y, posX, posY);
    if (shotDist < width * 0.05) {
      shotgunDamage = 80;
    } else if (shotDist < width * 0.08333333 && shotDist > width * 0.05) {
      shotgunDamage = 60;
    } else if (shotDist < width * 0.1 && shotDist > width * 0.08333333) {
      shotgunDamage = 50;
    } else if (shotDist < width * 0.13333333 && shotDist > width * 0.1) {
      shotgunDamage = 30;
    } else if (shotDist < width * 0.16666667 && shotDist > width * 0.13333333) {
      shotgunDamage = 15;
    } else if (shotDist < width * 0.2 && shotDist > width * 0.16666667) {
      shotgunDamage = 10;
    } else if (shotDist > width * 0.2) {
      shotgunDamage = 5;
    }
    if (this.contains(mouseX, mouseY) && vision(posX, posY, this.x, this.y)) {
      this.health -= shotgunDamage;
    }
  }

  hitZone(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < width * 0.05) {
      return true;
    } else {
      return false;
    }
  }
}

class Crate {
  constructor() {
    this.randomize();
  }

  randomize() {
    this.x1 = random(0, width - width * 0.1);
    this.y1 = random(0, height);
    if (!smack(this.x1, this.y1, 15)) {
      this.randomize();
    }
  }

  show() {
    this.x = this.x1;
    this.y = this.y1;
    fill(80);
    ellipse(this.x, this.y, width * 0.02);
  }

  give() {
    let d = dist(posX, posY, this.x, this.y);
    if (d < width * 0.02 + width * 0.01) {
      fill(0);
      textAlign(CENTER);
      text("press " + String.fromCharCode(ammoKeybind).toLowerCase() + " to use", this.x, this.y + height * 0.01856436);
      if (keyIsDown(ammoKeybind)) {
        revolverBarrel = 6;
        shotgunShells = 5;
        for (let i = crates.length - 1; i >= 0; i--) {
          crates.splice(i, 1);
          reloadPistol.setVolume(reloadSoundFXVolume);
          reloadPistol.play();
        }
        for (let i = 0; i < 1; i++) {
          crates[i] = new Crate();
        }
      }
    }
  }
}

class Person {
  constructor() {}

  move() {
    if (keyIsDown(forwardKeybind) && keyIsDown(rightKeybind)) {
      if (smack(posX, posY - height * 0.00154703, r)) {
        posY = posY - height * 0.00154703;
      }
      if (smack(posX + width * 0.00083333, posY, r)) {
        posX = posX + width * 0.00083333;
      }
    } else if (keyIsDown(forwardKeybind) && keyIsDown(leftKeybind)) {
      if (smack(posX, posY - height * 0.00154703, r)) {
        posY = posY - height * 0.00154703;
      }
      if (smack(posX - width * 0.00083333, posY, r)) {
        posX = posX - width * 0.00083333;
      }
    } else if (keyIsDown(backwardsKeybind) && keyIsDown(rightKeybind)) {
      if (smack(posX, posY + height * 0.00154703, r)) {
        posY = posY + height * 0.00154703;
      }
      if (smack(posX + width * 0.00083333, posY, r)) {
        posX = posX + width * 0.00083333;
      }
    } else if (keyIsDown(backwardsKeybind) && keyIsDown(leftKeybind)) {
      if (smack(posX, posY + height * 0.00154703, r)) {
        posY = posY + height * 0.00154703;
      }
      if (smack(posX - width * 0.00083333, posY, r)) {
        posX = posX - width * 0.00083333;
      }
    } else if (keyIsDown(forwardKeybind)) {
      if (smack(posX, posY - height * 0.00247525, r)) {
        posY = posY - height * 0.00247525;
      }
    } else if (keyIsDown(backwardsKeybind)) {
      if (smack(posX, posY + height * 0.00247525, r)) {
        posY = posY + height * 0.00247525;
      }
    } else if (keyIsDown(rightKeybind)) {
      if (smack(posX + width * 0.00133333, posY, r)) {
        posX = posX + width * 0.00133333;
      }
    } else if (keyIsDown(leftKeybind)) {
      if (smack(posX - width * 0.00133333, posY, r)) {
        posX = posX - width * 0.00133333;
      }
    }

    //dont walk of walls
    if (posX > width - width * 0.1) {
      posX = width - width * 0.1;
    } else if (posX < 0) {
      posX = 0;
    } else if (posY > height) {
      posY = height;
    } else if (posY < 0) {
      posY = 0;
    }

    if (keyIsDown(27)) {
      gamePhase = "pause";
    }
  }

  knifeRadius() {
    noFill(220);
    ellipse(posX, posY, width * 0.06666667);
  }

  show() {
    fill(25);
    ellipse(posX, posY, width * 0.04);
    fill(255);
    textSize(width * 0.01333333);
    text("SWAT", posX - width * 0.0183, posY + height * 0.00618812);
  }
}

class Particle {
  constructor() {
    this.x = grenadeX;
    this.y = grenadeY;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, width * 0.01066667);
  }
}
