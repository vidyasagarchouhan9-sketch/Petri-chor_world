const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function update() {

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

  // Collision
  if (worldMap[Math.floor(newY)][Math.floor(newX)] === 0) {
    player.x = newX;
    player.y = newY;
  }

}


function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00f0ff";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Petri-Chor Prototype", canvas.width / 2, 50);

  ctx.font = "20px Arial";
  ctx.fillText(
    `X: ${player.x.toFixed(2)}  Y: ${player.y.toFixed(2)}`,
    canvas.width / 2,
    90
  );

  ctx.fillText(
    `Angle: ${player.angle.toFixed(2)}`,
    canvas.width / 2,
    120
  );
  drawMiniMap();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();









