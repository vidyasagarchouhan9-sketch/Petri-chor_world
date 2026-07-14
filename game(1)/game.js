// ============================================================================
// AURORA SPACE STATION - FULL GAME FILE
// Updated map based on provided floor plan image
// ============================================================================

const TILE_SIZE = 50;

const FLOOR    = 0;
const WALL     = 1;
const DOOR     = 2;
const WINDOW   = 3;
const TERMINAL = 4;
const CRATE    = 5;
const REACTOR  = 6;
const MEDICAL  = 7;
const LAB      = 8;
const DECOR    = 9;
const SPAWN    = 10;

// ============================================================================
// NEW MAP - Aurora Space Station Floor Plan
// ============================================================================
const mapData = [
  Array(80).fill(1), Array(80).fill(1), Array(80).fill(1), Array(80).fill(1),
  // Row 4
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  // Row 5 - Medical Bay
  [1,1,1,1,0,0,7,0,0,0,0,0,0,1,1,1,1,0,4,4,4,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,4,0,0,4,0,0,1,1,1,1,0,0,9,0,9,0,9,0,9,0,1,1,1,1,0,0,9,0,0,9,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,9,0,0,0,0,1,1,1,1,0,9,0,0,0,0,0,9,0,1,1,1,1,0,0,0,0,0,0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,7,0,0,0,7,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,9,0,0,9,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,4,4,4,4,4,4,4,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,0,8,0,0,8,0,0,0,0,0,8,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,6,6,6,6,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,9,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,6,6,6,6,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,9,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,6,6,6,6,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,5,0,0,5,0,0,5,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,6,6,6,6,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,9,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,5,0,0,5,0,0,5,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,6,6,6,6,6,6,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,6,6,6,6,6,6,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,6,6,6,6,6,6,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,9,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  Array(80).fill(1), Array(80).fill(1), Array(80).fill(1), Array(80).fill(1)
];

// Spawn in Central Hall
mapData[15][40] = SPAWN;

// ============================================================================
// ROOM ZONES
// ============================================================================
const ROOM_ZONES = [
  { name: "🏥 Medical Bay",           r1:4,  c1:4,  r2:12, c2:13 },
  { name: "🔋 Power Reactor",         r1:5,  c1:38, r2:11, c2:45 },
  { name: "🛏️ Crew Quarters",         r1:4,  c1:53, r2:12, c2:64 },
  { name: "🍽️ Cafeteria",             r1:4,  c1:67, r2:12, c2:78 },
  { name: "🌐 Central Hall",          r1:13, c1:20, r2:25, c2:55 },
  { name: "🤖 AI Core",               r1:13, c1:29, r2:20, c2:45 },
  { name: "📡 Control Room",          r1:4,  c1:16, r2:12, c2:26 },
  { name: "🧪 Bio Lab",               r1:20, c1:4,  r2:30, c2:17 },
  { name: "🛠️ Workshop",              r1:25, c1:40, r2:35, c2:55 },
  { name: "📦 Storage",               r1:25, c1:60, r2:35, c2:78 },
  { name: "⚙️ Engine Room",           r1:35, c1:60, r2:50, c2:78 },
  { name: "🚀 Airlock & Docking Bay", r1:35, c1:4,  r2:45, c2:18 },
  { name: "🌌 Observation Deck",      r1:35, c1:20, r2:45, c2:38 },
];

function getRoomNameAt(px, py) {
  const col = Math.floor((px + 30) / TILE_SIZE);
  const row = Math.floor((py + 30) / TILE_SIZE);
  for (const zone of ROOM_ZONES) {
    if (row >= zone.r1 && row <= zone.r2 && col >= zone.c1 && col <= zone.c2) {
      return zone.name;
    }
  }
  return null;
}

// ============================================================================
// MAP CONTAINER & RENDER SYSTEMS
// ============================================================================
const mapContainer = document.getElementById("map");
const doorElements = {};

mapData.forEach((row, rInd) => {
  row.forEach((cell, cInd) => {
    let tile = document.createElement("div");
    tile.className = "tile";

    switch(cell) {
      case WALL:     tile.classList.add("wall"); break;
      case DOOR:     tile.classList.add("door"); doorElements[`${rInd}_${cInd}`] = tile; break;
      case WINDOW:   tile.classList.add("window"); break;
      case TERMINAL: tile.classList.add("terminal"); break;
      case CRATE:    tile.classList.add("crate"); break;
      case REACTOR:  tile.classList.add("reactor"); break;
      case MEDICAL:  tile.classList.add("med-eq"); break;
      case LAB:      tile.classList.add("lab-eq"); break;
      case DECOR:    tile.classList.add("deco"); break;
      case SPAWN:    tile.classList.add("spawn"); break;
      default:       tile.classList.add("floor"); break;
    }
    mapContainer.appendChild(tile);
  });
});

// === GAME STATE ===
let playerX = 0, playerY = 0;
let camX = 0, camY = 0;
const MOVE_SPEED = 220;
const CAMERA_LERP = 0.1;
const inputDir = { x: 0, y: 0 };
let isWalking = false;

const player = document.getElementById("player");
const world = document.getElementById("world");
const game = document.getElementById("game");
const roomBanner = document.getElementById("room-banner");

let currentRoomName = null;
let bannerHideTimer = null;

function showRoomBanner(name) {
  if (!roomBanner) return;
  roomBanner.textContent = name;
  roomBanner.classList.add("show");
  clearTimeout(bannerHideTimer);
  bannerHideTimer = setTimeout(() => roomBanner.classList.remove("show"), 2800);
}

function checkRoomEntry() {
  const roomName = getRoomNameAt(playerX, playerY);
  if (roomName && roomName !== currentRoomName) {
    currentRoomName = roomName;
    showRoomBanner(roomName);
  } else if (!roomName) currentRoomName = null;
}

// Spawn player
(function locateSpawn() {
  for (let r = 0; r < mapData.length; r++) {
    for (let c = 0; c < mapData[r].length; c++) {
      if (mapData[r][c] === SPAWN) {
        playerX = c * TILE_SIZE + 10;
        playerY = r * TILE_SIZE + 10;
        return;
      }
    }
  }
})();

camX = game.clientWidth / 2 - playerX - 30;
camY = game.clientHeight / 2 - playerY - 30;
world.style.transform = `translate(${camX}px, ${camY}px)`;
checkRoomEntry();

// Minimap
const minimapCanvas = document.getElementById("minimapCanvas");
const miniCtx = minimapCanvas ? minimapCanvas.getContext("2d") : null;

function updateMiniMap() {
  if (!miniCtx) return;
  miniCtx.clearRect(0, 0, 120, 120);
  const scale = 1.2;
  for(let y = 0; y < mapData.length; y++){
    for(let x = 0; x < mapData[y].length; x++){
      miniCtx.fillStyle = mapData[y][x] === 1 ? "#00ffff" : "#1e293b";
      miniCtx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
  miniCtx.fillStyle = "red";
  miniCtx.beginPath();
  miniCtx.arc((playerX / TILE_SIZE) * scale, (playerY / TILE_SIZE) * scale, 3, 0, Math.PI * 2);
  miniCtx.fill();
}
updateMiniMap();

// ============================================================================
// COLLISION & DOOR SYSTEMS
// ============================================================================
function checkWalkable(x, y) {
  const radius = 15; // Player physical collision circle
  const checkPoints = [
    { x: x - radius, y: y - radius },
    { x: x + radius, y: y - radius },
    { x: x - radius, y: y + radius },
    { x: x + radius, y: y + radius }
  ];

  for (let pt of checkPoints) {
    let c = Math.floor(pt.x / TILE_SIZE);
    let r = Math.floor(pt.y / TILE_SIZE);

    // Map bounds validation
    if (r < 0 || r >= mapData.length || c < 0 || c >= mapData[0].length) {
      return false;
    }

    let tile = mapData[r][c];
    if (tile === WALL || tile === WINDOW || tile === CRATE || tile === REACTOR || tile === MEDICAL || tile === LAB || tile === DECOR) {
      return false;
    }
    if (tile === DOOR) {
      let doorKey = `${r}_${c}`;
      if (doorElements[doorKey] && !doorElements[doorKey].classList.contains("open")) {
        return false;
      }
    }
  }
  return true;
}

function updateDoors() {
  const detectRange = 100;
  for (let key in doorElements) {
    let [r, c] = key.split("_").map(Number);
    let doorPx = c * TILE_SIZE + TILE_SIZE / 2;
    let doorPy = r * TILE_SIZE + TILE_SIZE / 2;

    let dist = Math.hypot((playerX + 30) - doorPx, (playerY + 30) - doorPy);

    if (dist < detectRange) {
      doorElements[key].classList.add("open");
    } else {
      doorElements[key].classList.remove("open");
    }
  }
}

// ============================================================================
// INTEREST POINTS & INTERACTION MECHANICS
// ============================================================================
let nearbyItem = null;
const interactPrompt = document.getElementById("interact-prompt");

function checkNearbyItems() {
  const range = 80;
  nearbyItem = null;
  if (interactPrompt) interactPrompt.classList.remove("show");

  let px = playerX + 30;
  let py = playerY + 30;

  for (let r = 0; r < mapData.length; r++) {
    for (let c = 0; c < mapData[r].length; c++) {
      let tile = mapData[r][c];
      if (tile === TERMINAL || tile === REACTOR || tile === MEDICAL || tile === LAB) {
        let itemPx = c * TILE_SIZE + TILE_SIZE / 2;
        let itemPy = r * TILE_SIZE + TILE_SIZE / 2;
        let dist = Math.hypot(px - itemPx, py - itemPy);

        if (dist < range) {
          nearbyItem = { type: tile, r, c };
          if (interactPrompt) {
            interactPrompt.textContent = "Press [E] to Interact";
            interactPrompt.classList.add("show");
          }
          return;
        }
      }
    }
  }
}

function interactWithItem() {
  if (!nearbyItem) return;
  console.log("Interacting with station feature: ", nearbyItem);
}

// ============================================================================
// INPUT MANAGEMENT & CONTROLS
// ============================================================================
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  if (e.key.toLowerCase() === "e") {
    interactWithItem();
  }
  updateInputDir();
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
  updateInputDir();
});

function updateInputDir() {
  inputDir.x = 0;
  inputDir.y = 0;

  if (keys["w"] || keys["arrowup"])    inputDir.y = -1;
  if (keys["s"] || keys["arrowdown"])  inputDir.y = 1;
  if (keys["a"] || keys["arrowleft"])  inputDir.x = -1;
  if (keys["d"] || keys["arrowright"]) inputDir.x = 1;

  // Normalize inputs for diagonal movement speeds
  if (inputDir.x !== 0 && inputDir.y !== 0) {
    inputDir.x *= 0.7071;
    inputDir.y *= 0.7071;
  }

  isWalking = (inputDir.x !== 0 || inputDir.y !== 0);
  if (isWalking) {
    player.classList.add("walking");
  } else {
    player.classList.remove("walking");
  }
}

// ============================================================================
// CORE GAME LOOP
// ============================================================================
let lastTime = performance.now();

function gameLoop(timestamp) {
  let dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  if (isWalking) {
    let nextX = playerX + inputDir.x * MOVE_SPEED * dt;
    let nextY = playerY + inputDir.y * MOVE_SPEED * dt;

    if (checkWalkable(nextX, playerY)) {
      playerX = nextX;
    }
    if (checkWalkable(playerX, nextY)) {
      playerY = nextY;
    }

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    updateDoors();
    checkRoomEntry();
    checkNearbyItems();
    updateMiniMap();
  }

  // Smooth Camera Follow
  let targetCamX = game.clientWidth / 2 - playerX - 30;
  let targetCamY = game.clientHeight / 2 - playerY - 30;

  camX += (targetCamX - camX) * CAMERA_LERP;
  camY += (targetCamY - camY) * CAMERA_LERP;

  world.style.transform = `translate(${camX}px, ${camY}px)`;

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

window.addEventListener("resize", () => {
  camX = game.clientWidth / 2 - playerX - 30;
  camY = game.clientHeight / 2 - playerY - 30;
});

console.log("%cAurora Space Station loaded successfully!", "color: cyan; font-size: 16px;");
   
