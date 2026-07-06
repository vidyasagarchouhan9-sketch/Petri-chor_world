const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", function () {
  setTimeout(resize, 100);
});
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", resize);
}
resize();

function tryMove(newX, newY) {
  const pad = 0.2;

  if (isWalkable(newX + Math.sign(newX - player.x) * pad, player.y) || Math.sign(newX - player.x) === 0) {
    if (isWalkable(newX, player.y)) {
      player.x = newX;
    }
  }

  if (isWalkable(player.x, newY + Math.sign(newY - player.y) * pad) || Math.sign(newY - player.y) === 0) {
    if (isWalkable(player.x, newY)) {
      player.y = newY;
    }
  }
}

function update(dt) {

  updateStory(dt);
  updateDoors();

  if (story.controlsLocked) {
    return;
  }

  player.running = !!(keys["shift"] || runActive);
  player.moveSpeed = player.running ? player.runSpeed : player.walkSpeed;

  if (keys["arrowleft"] || keys["a"]) {
    player.angle -= player.turnSpeed;
  }

  if (keys["arrowright"] || keys["d"]) {
    player.angle += player.turnSpeed;
  }

  let newX = player.x;
  let newY = player.y;

  if (keys["arrowup"] || keys["w"]) {
    newX += Math.cos(player.angle) * player.moveSpeed;
    newY += Math.sin(player.angle) * player.moveSpeed;
  }

  if (keys["arrowdown"] || keys["s"]) {
    newX -= Math.cos(player.angle) * player.moveSpeed;
    newY -= Math.sin(player.angle) * player.moveSpeed;
  }

  if (moveY < -0.1) {
    newX += Math.cos(player.angle) * player.moveSpeed * -moveY;
    newY += Math.sin(player.angle) * player.moveSpeed * -moveY;
  } else if (moveY > 0.1) {
    newX -= Math.cos(player.angle) * player.moveSpeed * moveY;
    newY -= Math.sin(player.angle) * player.moveSpeed * moveY;
  }

  if (Math.abs(moveX) > 0.1) {
    const strafeAngle = player.angle + Math.PI / 2;
    newX += Math.cos(strafeAngle) * player.moveSpeed * moveX;
    newY += Math.sin(strafeAngle) * player.moveSpeed * moveX;
  }

  tryMove(newX, newY);
}


function draw() {
  castRays();
  drawMiniMap();
}

let lastTime = performance.now();
let fpsAccumulator = 0;
let fpsFrames = 0;
const fpsEl = document.getElementById("fps");

function gameLoop(now) {
  const dt = now - lastTime;
  lastTime = now;

  fpsAccumulator += dt;
  fpsFrames++;
  if (fpsAccumulator >= 500) {
    const fps = Math.round((fpsFrames * 1000) / fpsAccumulator);
    if (fpsEl) fpsEl.textContent = "FPS: " + fps;
    fpsAccumulator = 0;
    fpsFrames = 0;
  }

    update(dt);
  draw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
