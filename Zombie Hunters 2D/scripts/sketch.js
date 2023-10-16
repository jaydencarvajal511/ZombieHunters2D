function preload() {
  // imgs
  dirt = loadImage("images/dirt.JPG");
  musketAmmoImg = loadImage("images/bullets.png");
  minigunImg = loadImage("images/LMG.png");
  grenadeImg = loadImage("images/grenade.png");
  musketImg = loadImage("images/musket.png");
  teleportImg = loadImage("images/teleporticon.png");
  coinImg = loadImage("images/coin.png");
  medkitImg = loadImage("images/medkit.png");
  gearImg = loadImage("images/gearicon.png");
  gameLogo = loadImage("images/gamelogo.jpg");
  shotgunImg = loadImage("images/shotgun.jpeg");
  knifeImg = loadImage("images/knife.jpeg");
  revolverImg = loadImage("images/revolver.JPG");
  // sounds
  hit = loadSound("audio/kick.m4a");
  shotgunShot = loadSound("audio/shotgun shot.mp3");
  shotgunCocking = loadSound("audio/shotgun cock.mp3");
  drawRevolver = loadSound("audio/pistol cock.mp3");
  pistolShot = loadSound("audio/pistol shot.mp3");
  reloadPistol = loadSound("audio/reload.mp3");
  drawKnife = loadSound("audio/draw knife.mp3");
  stab = loadSound("audio/stab.mp3");
  minigunShots = loadSound("audio/LMG Shots.mp3");
  musketShot = loadSound("audio/musket shot.mp3");
  dryFire = loadSound("audio/dry fire.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  person = new Person();
  for (let i = 0; i < 1; i++) {
    crates[i] = new Crate();
  }
  for (let i = 0; i < numOfZombies; i++) {
    zombies[i] = new Zombie(200, 200, 40);
  }
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  r = width * 0.02;
  cursor(CROSS);
  if (gamePhase == "play") {
    play();
  } else if (gamePhase == "pause") {
    textAlign(CENTER);
    text("you are paused", width / 2, height / 2);
    text("hit space to unpause", width / 2, height / 2 - height * 0.06188119);
    textAlign(LEFT);
  } else if (gamePhase == "start") {
    start();
  } else if (gamePhase == "dead") {
    background(255, 0, 0);
    textAlign(CENTER);
    textSize(width * 0.03333333);
    text("Man That Really Sucks That U Died LOL", width / 2, height / 2);
    text("you died on round " + numOfZombies, width / 2, height / 2 + height * 0.06188119);
    text("press SPACE to play again", width / 2, height / 2 + height * 0.24752475);
    text("High Score: " + localStorage.getItem("highScore"), width / 2, height / 2 + height * 0.37128713);
  }
}

function mouseClicked() {
  if (gamePhase == "play") {
    if (mouseX < width - width * 0.1) {
      if (weapon == "revolver") {
        if (revolverBarrel > 0) {
          revolverBarrel--;
          pistolShot.setVolume(revolverSoundFXVolume);
          pistolShot.play();
          for (let i = zombies.length - 1; i >= 0; i--) {
            if (zombies[i].contains(mouseX, mouseY) && vision(posX, posY, zombies[i].x, zombies[i].y)) {
              zombies[i].health -= 25;
              if (zombies[i].health <= 0) {
                zombies.splice(i, 1);
                coins += floor(random(2, 5));
              }
            }
          }
        } else {
          dryFire.setVolume(revolverSoundFXVolume);
          dryFire.play();
        }
      } else if (weapon == "knife") {
        for (let i = zombies.length - 1; i >= 0; i--) {
          if (zombies[i].contains(mouseX, mouseY) && zombies[i].hitZone(posX, posY) && vision(posX, posY, zombies[i].x, zombies[i].y)) {
            zombies[i].health -= 10;
            stab.setVolume(knifeSoundFXVolume);
            stab.play();
            if (zombies[i].health <= 0) {
              zombies.splice(i, 1);
              coins += floor(random(2, 5));
            }
          }
        }
      } else if (weapon == "shotgun") {
        if (shotgunShells > 0) {
          for (let i = zombies.length - 1; i >= 0; i--) {
            zombies[i].distBetween();
            if (zombies[i].health <= 0) {
              zombies.splice(i, 1);
              coins += floor(random(2, 5));
            }
          }
        } else {
          dryFire.setVolume(revolverSoundFXVolume);
          dryFire.play();
        }
        if (shotgunShells !== 0) {
          shotgunShot.setVolume(shotgunSoundFXVolume);
          shotgunShot.play();
          shotgunShells--;
        }
      } else if (weapon == "musket") {
        if (musketAmmo > 0) {
          musketAmmo--;
          musketShot.setVolume(musketSoundFXVolume);
          musketShot.play();
          for (let i = zombies.length - 1; i >= 0; i--) {
            if (zombies[i].contains(mouseX, mouseY) && vision(posX, posY, zombies[i].x, zombies[i].y)) {
              zombies[i].health -= 60;
              if (zombies[i].health <= 0) {
                zombies.splice(i, 1);
                coins += floor(random(2, 5));
              }
            }
          }
        } else {
          dryFire.setVolume(revolverSoundFXVolume);
          dryFire.play();
        }
      }
    }
    if (mouseX > width - width * 0.1) {
      if (mouseY < height * 0.24752475 && mouseY > height * 0.12376238) {
        if (coins >= 35) {
          medkits++;
          coins -= 35;
        }
      } else if (mouseY < height * 0.37128713 && mouseY > height * 0.24752475) {
        if (coins >= 35) {
          teleports++;
          coins -= 35;
        }
      } else if (mouseY < height * 0.4950495 && mouseY > height * 0.37128713) {
        if (coins >= 50) {
          grenades++;
          coins -= 50;
        }
      } else if (mouseY < height * 0.61881188 && mouseY > height * 0.4950495) {
        if (musketBought == false) {
          if (coins >= 70) {
            musketBought = true;
            coins -= 70;
          }
        } else {
          if (coins >= 25) {
            musketAmmo = 8;
            coins -= 25;
          }
        }
      } else if (mouseY < height * 0.74257426 && mouseY > height * 0.61881188) {
        if (coins >= 70 && minigunTimer == 15) {
          coins -= 70;
          weapon = "minigun";
          setTimeout(function () {
            weapon = "shotgun";
          }, minigunTimer * 1000);
          intervalId = setInterval(function () {
            minigunTimer--;
          }, 1000);
        }
      }
    }
  } else if (gamePhase == "start") {
    if (mouseX > width - width * 0.13 && mouseY > height - height * 0.24) {
      window.location.href = "/hub/hub.html";
    }
  }
}

function keyPressed() {
  if (gamePhase == "play") {
    if (keyCode == toggleKeybind) {
      if (weapon == "knife" || weapon == "musket") {
        drawRevolver.setVolume(revolverEquipSoundFXVolume);
        drawRevolver.play();
        weapon = "revolver";
      }
      if (weapon == "revolver") {
        shotgunCocking.setVolume(shotgunEquipSoundFXVolume);
        shotgunCocking.play();
        weapon = "shotgun";
      } else if (weapon == "shotgun") {
        drawRevolver.setVolume(revolverEquipSoundFXVolume);
        drawRevolver.play();
        weapon = "revolver";
      }
    } else if (keyCode == knifeKeybind) {
      drawKnife.setVolume(knifeEquipSoundFXVolume);
      drawKnife.play();
      weapon = "knife";
    } else if (keyCode == medkitKeybind) {
      if (medkits > 0) {
        if (health <= 60) {
          health += 40;
        } else {
          health = 100;
        }
        medkits--;
      }
    } else if (keyCode == teleportKeybind) {
      if (teleports > 0) {
        posX = mouseX;
        posY = mouseY;
        teleports--;
      }
    } else if (keyCode == musketKeybind) {
      weapon = "musket";
    } else if (keyCode == grenadeKeybind) {
      if (grenades > 0) {
        if (!drawGrenade) {
          grenades--;
          grenadeX = mouseX;
          grenadeY = mouseY;
          drawGrenade = true;
          setTimeout(function () {
            grenadeHurt = true;
            setTimeout(function () {
              grenadeHurt = false;
              drawGrenade = false;
            }, 2500);
          }, 1000);
        }
      }
    }
  } else if (gamePhase == "dead") {
    if (keyCode == 32) {
      location.reload();
    }
  } else if (gamePhase == "pause") {
    if (keyCode == 32) {
      gamePhase = "play";
    }
  }
}
