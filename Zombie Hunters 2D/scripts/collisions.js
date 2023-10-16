let obstacles = [];

function circRect(x, y, rad, rx, ry, rw, rh) {
  let testX = x;
  let testY = y;

  if (x < rx) testX = rx;
  // test left edge
  else if (x > rx + rw) testX = rx + rw; // right edge
  if (y < ry) testY = ry;
  // top edge
  else if (y > ry + rh) testY = ry + rh; // bottom edge

  let d = dist(x, y, testX, testY);

  if (d <= rad) {
    return true;
  }

  return false;
}

function smack(x, y, rad) {
  numberOfHits = 0;
  obstacles.forEach((obstacle) => {
    if (circRect(x, y, rad, obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
      numberOfHits++;
    }
  });
  if (this.numberOfHits !== 0) {
    return false;
  } else {
    return true;
  }
}

function looky(rx, ry, rw, rl, x, y, zx, zy) {
  rx = floor(rx);
  ry = floor(ry);
  rw = floor(rw);
  rl = floor(rl);
  x = floor(x);
  y = floor(y);
  zx = floor(zx);
  zy = floor(zy);
  this.playerRight = false;
  this.playerLeft = false;
  this.playerTop = false;
  this.playerBottom = false;
  this.zombieRight = false;
  this.zombieLeft = false;
  this.zombieTop = false;
  this.zombieBottom = false;

  for (i = rx; i < rx + rw; i++) {
    if (i == x) {
      if (y < ry) {
        //there are on top off the rectangle
        this.playerTop = true;
      } else if (y > ry + rl) {
        //they are at the bottom of the rectangle
        this.playerBottom = true;
      }
    }
  }
  for (i = ry; i < ry + rl; i++) {
    if (i == y) {
      if (x < rx) {
        //there are on the left of the rectangle
        this.playerLeft = true;
      } else if (x > rx + rw) {
        //they are on the right of the rectangle
        this.playerRight = true;
      }
    }
  }

  //zombie pos
  for (i = rx; i < rx + rw; i++) {
    if (i == zx) {
      if (zy < ry) {
        //there are on top off the rectangle
        this.zombieTop = true;
      } else if (zy > ry + rl) {
        //they are at the bottom of the rectangle
        this.zombieBottom = true;
      }
    }
  }
  for (i = ry; i < ry + rl; i++) {
    if (i == zy) {
      if (zx < rx) {
        //there are on the left of the rectangle
        this.zombieLeft = true;
      } else if (zx > rx + rw) {
        //they are on the right of the rectangle
        this.zombieRight = true;
      }
    }
  }
  if ((this.playerLeft && this.zombieRight) || (this.zombieLeft && this.playerRight) || (this.playerTop && this.zombieBottom) || (this.zombieTop && this.playerBottom)) {
    return true;
  }
}

function vision(x, y, zx, zy) {
  numberOfHits = 0;
  obstacles.forEach((obstacle) => {
    if (looky(obstacle.x, obstacle.y, obstacle.width, obstacle.height, x, y, zx, zy)) {
      numberOfHits++;
    }
  });
  if (this.numberOfHits !== 0) {
    return false;
  } else {
    return true;
  }
}

function buildObstacle(x, y, width, height) {
  rect(x, y, width, height);
  obstacles.push({
    x: x,
    y: y,
    width: width,
    height: height,
  });
}
