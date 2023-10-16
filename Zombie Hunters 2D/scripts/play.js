function play() {
  showMap();
  showEntities();
  minigun();
  grenade();
  healthUI();
  showShop();
  gunUI();
  newRound();
}

function showMap() {
  //map
  image(dirt, 0, 0);
  dirt.resize(width - width * 0.1, height);

  // bottom left crates
  fill(29.4, 42.5, 12.5);
  buildObstacle(width * 0.02, height - height * 0.23514851, width * 0.033333333, height * 0.06188119);
  buildObstacle(width * 0.03333, height - height * 0.24752475, width * 0.033333333, height * 0.06188119);
  buildObstacle(width * 0.02, height - height * 0.24752475, width * 0.033333333, height * 0.06188119);
  buildObstacle(width * 0.026666666666666666, height - height * 0.25990099, width * 0.033333333, height * 0.06188119);

  // bottom right crates
  buildObstacle(width - width * 0.22, height - height * 0.2970297, width * 0.033333333, height * 0.06188119);
  buildObstacle(width - width * 0.2333333333333333, height - height * 0.30940594, width * 0.033333333, height * 0.06188119);
  buildObstacle(width - width * 0.22, height - height * 0.30940594, width * 0.033333333, height * 0.06188119);
  buildObstacle(width - width * 0.226666666666, height - height * 0.32178218, width * 0.033333333, height * 0.06188119);

  // top middle crates
  buildObstacle(width * 0.36, height * 0.0998, width * 0.033333333, height * 0.06188119);
  buildObstacle(width * 0.367, height * 0.0908, width * 0.033333333, height * 0.06188119);
  buildObstacle(width * 0.3766, height * 0.0989, width * 0.033333333, height * 0.06188119);
  buildObstacle(width * 0.3657, height * 0.11, width * 0.033333333, height * 0.06188119);

  // center crates
  buildObstacle(width * 0.46, height * 0.5, width * 0.033333333, height * 0.06188119);
  buildObstacle(width * 0.47, height * 0.495, width * 0.033333333, height * 0.06188119);
  buildObstacle(width * 0.4766, height * 0.489, width * 0.033333333, height * 0.06188119);
  buildObstacle(width * 0.4657, height * 0.4771, width * 0.033333333, height * 0.06188119);
}

function showEntities() {
  //your character
  person.move();
  person.show();
  if (weapon == "knife") {
    person.knifeRadius();
  }

  //crates
  for (let i = 0; i < crates.length; i++) {
    crates[i].show();
    crates[i].give();
  }

  //zombies
  for (let i = 0; i < zombies.length; i++) {
    zombies[i].move();
    zombies[i].show();
    zombies[i].damage();
  }
}

function minigun() {
  if (weapon == "minigun") {
    if (firstMinigunShot == true) {
      minigunShots.play();
      firstMinigunShot = false;
    }
    if (!mouseIsPressed) {
      minigunShots.setVolume(0);
    }

    if (mouseIsPressed) {
      minigunShots.setVolume(1);
      for (let i = zombies.length - 1; i >= 0; i--) {
        if (zombies[i].contains(mouseX, mouseY) && vision(posX, posY, zombies[i].x, zombies[i].y)) {
          zombies[i].health -= 5;
          if (zombies[i].health <= 0) {
            zombies.splice(i, 1);
            coins += floor(random(2, 5));
          }
        }
      }
    }
  }

  if (minigunTimer == 0) {
    clearInterval(intervalId);
    minigunTimer = 15;
  }
}

function grenade() {
  if (drawGrenade) {
    fill(0);
    ellipse(grenadeX, grenadeY, width * 0.04);
    if (!grenadeHurt) {
      // bomb state
      for (let i = 0; i < 5; i++) {
        let p = new Particle();
        particles.push(p);
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) {
          particles.splice(i, 1);
        }
      }
    }
    if (grenadeHurt) {
      // explosion state
      fill(255, 0, 0);
      ellipse(grenadeX, grenadeY, width * 0.05333333 + width * 0.04333333);
      let d = floor(dist(posX, posY, grenadeX, grenadeY));
      if (d < width * 0.05333333 + width * 0.017) {
        health -= 25;
      }
      for (let i = 0; i < zombies.length; i++) {
        let d = floor(dist(zombies[i].x, zombies[i].y, grenadeX, grenadeY));
        if (d < width * 0.05333333 + width * 0.017) {
          zombies[i].health -= 40;
          if (zombies[i].health <= 0) {
            zombies.splice(i, 1);
          }
        }
      }
    }
  }
}

function healthUI() {
  fill(255);
  rect(width * 0.012, height * 0.022277223, width * 0.06933333, height * 0.02970297);
  fill(255, 0, 0);
  rect(width * 0.01333333, height * 0.02475248, width * (health / 1500), height * 0.02475248);
}

function showShop() {
  // nice bg & shop properties
  fill(255);
  rect(width - width * 0.1, 0, width * 0.1, height);
  fill(0);
  strokeWeight(0.5);
  stroke(0);

  // images
  image(coinImg, width - width * 0.1, 0);
  image(medkitImg, width - width * 0.1, height * 0.12376238);
  image(teleportImg, width - width * 0.1, height * 0.24752475);
  image(grenadeImg, width - width * 0.1, height * 0.37128713);
  image(minigunImg, width - width * 0.1, height * 0.625);
  [coinImg, medkitImg, teleportImg, grenadeImg, minigunImg].forEach((img) => {
    img.resize(width * 0.1, height * 0.123762376);
  });

  // number of object
  textSize(width * 0.01333333);
  textAlign(LEFT);
  text(medkits, width - width * 0.01333333, height * 0.14851485);
  text(teleports, width - width * 0.01333333, height * 0.27227723);
  text(grenades, width - width * 0.01333333, height * 0.3960396);
  text(minigunTimer, width - width * 0.02666667, height * 0.64356436);
  text("coins: " + coins, width - width * 0.07666667, height * 0.12376238);

  // cost of objects
  textSize(width * 0.016);
  text("35¢", width - width * 0.1, height * 0.24752475);
  text("35¢", width - width * 0.1, height * 0.37128713);
  text("50¢", width - width * 0.1, height * 0.4950495);
  text("70¢", width - width * 0.1, height * 0.74257425);

  // keybindings
  textSize(width * 0.00666667);
  text("press " + String.fromCharCode(medkitKeybind).toLowerCase() + " to use", width - width * 0.04666667, height * 0.24752475);
  text("press " + String.fromCharCode(teleportKeybind).toLowerCase() + " to use", width - width * 0.04666667, height * 0.37128713);
  text("press " + String.fromCharCode(grenadeKeybind).toLowerCase() + " to use", width - width * 0.04666667, height * 0.4950495);

  //musket
  if (musketBought == false) {
    image(musketImg, width - width * 0.1, height * 0.495049505);
    musketImg.resize(width * 0.1, height * 0.123762376);
    textSize(width * 0.016);
    text("70¢", width - width * 0.1, height * 0.618811881);
    textSize(width * 0.006666667);
    text("press " + String.fromCharCode(musketKeybind).toLowerCase() + " to use", width - width * 0.046666667, height * 0.618811881);
    textAlign(LEFT);
  } else {
    textAlign(LEFT);
    textSize(width * 0.01333333);
    text(musketAmmo, width - width * 0.01333333, height * 0.51980198);
    image(musketAmmoImg, width - width * 0.1, height * 0.4950495);
    musketAmmoImg.resize(width * 0.1, height * 0.123762376);
    textSize(width * 0.016);
    text("25¢", width - width * 0.1, height * 0.61881188);
    textSize(width * 0.006666667);
    text("press " + String.fromCharCode(musketKeybind).toLowerCase() + " to use", width - width * 0.046666667, height * 0.618811881);
    textAlign(LEFT);
  }
}

function gunUI() {
  textSize(width * 0.01333333);
  if (weapon == "shotgun") {
    image(shotgunImg, width - width * 0.1, height - height * 0.12376238);
    shotgunImg.resize(width * 0.1, height * 0.12376238);
    text(weapon, width - width * 0.08, height - height * 0.012376238);
    text(shotgunShells + "/5", width - width * 0.02666667, height - height * 0.0990099);
  } else if (weapon == "knife") {
    image(knifeImg, width - width * 0.1, height - height * 0.12376238);
    knifeImg.resize(width * 0.1, height * 0.12376238);
    text(weapon, width - width * 0.08, height - height * 0.012376238);
    text("∞ - infinite", width - width * 0.07333333, height - height * 0.0990099);
  } else if (weapon == "revolver") {
    image(revolverImg, width - width * 0.1, height - height * 0.12376238);
    revolverImg.resize(width * 0.1, height * 0.12376238);
    text(weapon, width - width * 0.09333333, height - height * 0.012376238);
    text(revolverBarrel + "/6", width - width * 0.02666667, height - height * 0.0990099);
  } else if (weapon == "musket") {
    image(musketImg, width - width * 0.1, height - height * 0.12376238);
    musketImg.resize(width * 0.1, height * 0.12376238);
    text(weapon, width - width * 0.09333333, height - height * 0.012376238);
    text(musketAmmo + "/8", width - width * 0.02666667, height - height * 0.0990099);
  }
}

function newRound() {
  //zombie code
  textSize(width * 0.02666667);
  text(zombieRound, (width - width * 0.1) / 2, height * 0.07425743);
  if (zombies.length == 0) {
    if (health !== 0 && health !== 100)
      if (health <= 90) {
        health += 10;
      } else {
        health = 100;
      }
    numOfZombies++;
    for (let i = 0; i < numOfZombies; i++) {
      zombies[i] = new Zombie(200, 200, 40);
    }
    zombieRound++;
  }

  // obstacle code
  obstacles = [];
}
