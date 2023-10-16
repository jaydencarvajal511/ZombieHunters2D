function start() {
  if (keyIsDown(32)) {
    gamePhase = "play";
  }
  background(255);

  image(gameLogo, 0, 0);
  gameLogo.resize(width, height);
  noFill();

  image(gearImg, width - width * 0.13, height - height * 0.24);
  gearImg.resize(width * 0.13, height * 0.24);

  textAlign(CENTER);
  strokeWeight(4);
  fill(0);
  noStroke();
  textAlign(LEFT);
  textSize(width * (04 / 100));
  text("Press SPACE to start!", width * 0.03, height - height * 0.1);
}
