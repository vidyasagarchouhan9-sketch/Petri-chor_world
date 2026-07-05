const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

let time = 0;

function gameLoop() {
  time += 0.02;

  // Background
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ceiling
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

  // Floor
  ctx.fillStyle = "#333";
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

  // Title
  ctx.fillStyle = "#00f0ff";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Petri-Chor: Escape", canvas.width / 2, 60);

  // Coming Soon
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Arial";
  ctx.fillText("2.5D Engine Loading...", canvas.width / 2, 100);

  requestAnimationFrame(gameLoop);
}

gameLoop();
