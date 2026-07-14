// ================================================================
//  AURORA SPACE STATION 
// ================================================================

(function() {
    "use strict";

    // ─── Constants ────────────────────────────────────────────────
    const TILE_SIZE = 50;
    const COLS = 80;
    const ROWS = 72;

    const FLOOR = 0;
    const WALL = 1;
    const DOOR = 2;
    const WINDOW = 3;
    const TERMINAL = 4;
    const CRATE = 5;
    const REACTOR = 6;
    const MEDICAL = 7;
    const LAB = 8;
    const DECOR = 9;
    const SPAWN = 10;

    // ─── Room definitions (r1,r2,c1,c2) ─────────────────────────
    const ROOM_DEFS = [
        { name: "🌌 Observation Deck",    r1: 3,  r2: 9,  c1: 3,  c2: 14 },
        { name: "🏥 Medical Bay",         r1: 10, r2: 16, c1: 3,  c2: 14 },
        { name: "📡 Control Room",        r1: 3,  r2: 16, c1: 17, c2: 27 },
        { name: "🤖 AI Core",             r1: 3,  r2: 18, c1: 30, c2: 42 },
        { name: "🛏️ Crew Quarters",       r1: 3,  r2: 9,  c1: 47, c2: 58 },
        { name: "🍽️ Cafeteria",           r1: 10, r2: 17, c1: 47, c2: 58 },
        { name: "🧪 Bio Lab",             r1: 19, r2: 35, c1: 3,  c2: 17 },
        { name: "🌐 Central Hall",        r1: 20, r2: 54, c1: 20, c2: 60 },
        { name: "📡 Communications Hub",  r1: 19, r2: 30, c1: 63, c2: 77 },
        { name: "⚙️ Engine Room",         r1: 19, r2: 35, c1: 63, c2: 77 },
        { name: "🔋 Power Reactor",       r1: 36, r2: 52, c1: 63, c2: 77 },
        { name: "🚀 Airlock & Docking Bay", r1:57, r2:71, c1:3,  c2:19 },
        { name: "🌌 Observation Deck",    r1:57, r2:71, c1:22, c2:39 },
        { name: "🛠️ Workshop",            r1:57, r2:71, c1:42, c2:56 },
        { name: "📦 Storage",             r1:57, r2:71, c1:61, c2:77 },
    ];

    // ─── Build mapData ───────────────────────────────────────────
    const mapData = [];
    for (let r = 0; r < ROWS; r++) {
        const row = [];
        for (let c = 0; c < COLS; c++) row.push(WALL);
        mapData.push(row);
    }

    // Carve rooms
    for (const room of ROOM_DEFS) {
        for (let r = room.r1; r < room.r2; r++) {
            for (let c = room.c1; c < room.c2; c++) {
                mapData[r][c] = FLOOR;
            }
        }
    }

    // Place decorative and interactive tiles
    const place = (r, c, type) => { if (r>=0 && r<ROWS && c>=0 && c<COLS) mapData[r][c] = type; };
    // Medical Bay
    place(12, 6, MEDICAL); place(13, 10, MEDICAL);
    // Control Room
    place(5, 20, TERMINAL); place(8, 22, TERMINAL); place(12, 18, TERMINAL);
    // AI Core
    place(6, 35, TERMINAL); place(10, 38, TERMINAL); place(14, 32, TERMINAL);
    // Crew Quarters
    place(5, 50, DECOR); place(7, 54, DECOR);
    // Cafeteria
    place(12, 50, DECOR); place(14, 54, DECOR);
    // Bio Lab
    place(22, 6, LAB); place(26, 10, LAB); place(30, 14, LAB);
    // Central Hall
    place(36, 40, SPAWN);
    place(28, 30, TERMINAL); place(42, 50, TERMINAL); place(48, 35, TERMINAL);
    // Communications Hub
    place(22, 68, TERMINAL); place(26, 72, TERMINAL);
    // Engine Room
    place(22, 74, REACTOR); place(28, 66, REACTOR);
    // Power Reactor
    place(40, 68, REACTOR); place(44, 72, REACTOR); place(48, 66, REACTOR);
    // Airlock
    place(62, 8, DECOR); place(66, 12, DECOR);
    // Observation Deck (lower)
    place(62, 28, WINDOW); place(66, 32, WINDOW);
    // Workshop
    place(62, 46, CRATE); place(66, 50, CRATE); place(62, 52, CRATE);
    // Storage
    place(62, 66, CRATE); place(66, 70, CRATE); place(62, 74, CRATE);
    // Mission critical crates
    place(60, 65, CRATE);  // Wrench crate
    place(63, 46, CRATE);  // Locker crate

    // Doors
    const doorPositions = [
        [9,8],[9,9], [16,8],[16,9], [16,20],[16,21],[16,22],
        [8,27],[9,27], [18,35],[18,36],[18,37],
        [9,52],[9,53], [17,52],[17,53],
        [19,17],[19,18], [22,60],[23,60],
        [24,62],[25,62], [35,70],[35,71],
        [52,70],[52,71], [54,8],[54,9],
        [54,30],[54,31], [54,48],[54,49],
        [54,68],[54,69], [62,19],[63,19],
        [62,39],[63,39], [62,56],[63,56],
    ];
    for (const [r,c] of doorPositions) mapData[r][c] = DOOR;

    // Windows
    const windowPos = [[3,14],[4,14],[3,27],[4,27],[3,42],[4,42],[3,58],[4,58]];
    for (const [r,c] of windowPos) mapData[r][c] = WINDOW;

    // ─── Room zones for banner ──────────────────────────────────
    const ROOM_ZONES = ROOM_DEFS.map(r => ({ name: r.name, r1: r.r1, r2: r.r2, c1: r.c1, c2: r.c2 }));
    function getRoomNameAt(px, py) {
        const col = Math.floor((px + 30) / TILE_SIZE);
        const row = Math.floor((py + 30) / TILE_SIZE);
        for (const zone of ROOM_ZONES) {
            if (row >= zone.r1 && row < zone.r2 && col >= zone.c1 && col < zone.c2) return zone.name;
        }
        return null;
    }

    // ─── Get references to existing DOM elements ────────────────
    const game = document.getElementById("game");
    const world = document.getElementById("world");
    const mapContainer = document.getElementById("map");
    const player = document.getElementById("player");
    const roomBanner = document.getElementById("room-banner");
    const minimapCanvas = document.getElementById("minimapCanvas");
    const actionContainer = document.getElementById("action-container");
    const btnAction = document.getElementById("btn-action");
    const bagBtn = document.getElementById("bagBtn");
    const bagBadge = document.getElementById("bagBadge");
    const bagWindow = document.getElementById("bagWindow");
    const bagGrid = document.getElementById("bagGrid");
    const closeBagBtn = document.getElementById("closeBag");
    const joystickContainer = document.getElementById("joystick-container");
    const joystickBase = document.getElementById("joystick-base");
    const joystickThumb = document.getElementById("joystick-thumb");
    const missionOverlay = document.getElementById("missionOverlay");
    const missionPopupContent = document.getElementById("missionPopupContent");
    const missionContinueBtn = document.getElementById("missionContinueBtn");
    const missionToast = document.getElementById("missionToast");

    // ─── Render tiles ────────────────────────────────────────────
    const doorElements = {};
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.style.width = "50px";
            tile.style.height = "50px";
            tile.style.border = "1px solid #2a3146";
            tile.style.transition = "background 0.15s, border-color 0.15s";
            const cell = mapData[r][c];
            switch (cell) {
                case WALL: tile.style.background = "#3d4a6b"; tile.style.borderColor = "#4a5a7a"; tile.style.boxShadow = "inset 0 0 8px rgba(0,0,0,0.5)"; break;
                case DOOR: tile.style.background = "#2a3a5a"; tile.style.borderColor = "#4a7a9a"; tile.style.position = "relative"; doorElements[`${r}_${c}`] = tile; break;
                case WINDOW: tile.style.background = "#1a2a3a"; tile.style.borderColor = "#4a8aaa"; tile.style.boxShadow = "inset 0 0 20px rgba(80,180,255,0.15)"; break;
                case TERMINAL: tile.style.background = "#1a2a3a"; tile.style.borderColor = "#4a9aff"; tile.style.boxShadow = "inset 0 0 20px rgba(74,154,255,0.2)"; break;
                case CRATE: tile.style.background = "#2a3a2a"; tile.style.borderColor = "#5a7a4a"; tile.style.boxShadow = "inset 0 0 12px rgba(80,180,60,0.2)"; break;
                case REACTOR: tile.style.background = "#2a1a1a"; tile.style.borderColor = "#ff6a3a"; tile.style.boxShadow = "inset 0 0 30px rgba(255,100,50,0.25)"; break;
                case MEDICAL: tile.style.background = "#1a2a2a"; tile.style.borderColor = "#3aaa7a"; tile.style.boxShadow = "inset 0 0 20px rgba(58,170,122,0.2)"; break;
                case LAB: tile.style.background = "#1a1a2a"; tile.style.borderColor = "#8a5aff"; tile.style.boxShadow = "inset 0 0 20px rgba(138,90,255,0.2)"; break;
                case DECOR: tile.style.background = "#1a2230"; tile.style.borderColor = "#3a4a5a"; break;
                case SPAWN: tile.style.background = "#1a2a3a"; tile.style.borderColor = "#4affaa"; tile.style.boxShadow = "inset 0 0 30px rgba(74,255,170,0.15)"; break;
                default: tile.style.background = "#232b40"; tile.style.borderColor = "#2c3550"; break;
            }
            // Add icons
            if (cell === DOOR) {
                const dot = document.createElement("span");
                dot.style.position = "absolute";
                dot.style.inset = "6px";
                dot.style.background = "#4a7a9a";
                dot.style.borderRadius = "3px";
                dot.style.opacity = "0.8";
                dot.style.transition = "opacity 0.35s, transform 0.35s";
                tile.appendChild(dot);
                tile._doorDot = dot;
            } else if (cell === WINDOW) {
                const icon = document.createElement("span");
                icon.textContent = "✦";
                icon.style.color = "rgba(120,200,255,0.25)";
                icon.style.fontSize = "20px";
                icon.style.display = "flex";
                icon.style.alignItems = "center";
                icon.style.justifyContent = "center";
                icon.style.height = "100%";
                tile.appendChild(icon);
            } else if (cell === TERMINAL) {
                const icon = document.createElement("span");
                icon.textContent = "⌨";
                icon.style.color = "#4a9aff";
                icon.style.fontSize = "26px";
                icon.style.display = "flex";
                icon.style.alignItems = "center";
                icon.style.justifyContent = "center";
                icon.style.height = "100%";
                icon.style.opacity = "0.8";
                tile.appendChild(icon);
            } else if (cell === CRATE) {
                const icon = document.createElement("span");
                icon.textContent = "📦";
                icon.style.fontSize = "28px";
                icon.style.display = "flex";
                icon.style.alignItems = "center";
                icon.style.justifyContent = "center";
                icon.style.height = "100%";
                tile.appendChild(icon);
            } else if (cell === REACTOR) {
                const icon = document.createElement("span");
                icon.textContent = "⚡";
                icon.style.fontSize = "30px";
                icon.style.display = "flex";
                icon.style.alignItems = "center";
                icon.style.justifyContent = "center";
                icon.style.height = "100%";
                icon.style.color = "#ff6a3a";
                tile.appendChild(icon);
            } else if (cell === MEDICAL) {
                const icon = document.createElement("span");
                icon.textContent = "🩺";
                icon.style.fontSize = "28px";
                icon.style.display = "flex";
                icon.style.alignItems = "center";
                icon.style.justifyContent = "center";
                icon.style.height = "100%";
                tile.appendChild(icon);
            } else if (cell === LAB) {
                const icon = document.createElement("span");
                icon.textContent = "🧪";
                icon.style.fontSize = "28px";
                icon.style.display = "flex";
                icon.style.alignItems = "center";
                icon.style.justifyContent = "center";
                icon.style.height = "100%";
                tile.appendChild(icon);
            } else if (cell === DECOR) {
                const icon = document.createElement("span");
                icon.textContent = "◆";
                icon.style.color = "#4a5a7a";
                icon.style.fontSize = "16px";
                icon.style.display = "flex";
                icon.style.alignItems = "center";
                icon.style.justifyContent = "center";
                icon.style.height = "100%";
                icon.style.opacity = "0.4";
                tile.appendChild(icon);
            } else if (cell === SPAWN) {
                const icon = document.createElement("span");
                icon.textContent = "◆";
                icon.style.color = "#4affaa";
                icon.style.fontSize = "24px";
                icon.style.display = "flex";
                icon.style.alignItems = "center";
                icon.style.justifyContent = "center";
                icon.style.height = "100%";
                icon.style.opacity = "0.6";
                tile.appendChild(icon);
            }
            mapContainer.appendChild(tile);
        }
    }

    // ─── Game state ──────────────────────────────────────────────
    let playerX = 0, playerY = 0;
    let camX = 0, camY = 0;
    const MOVE_SPEED = 220;
    const CAMERA_LERP = 0.1;
    const inputDir = { x: 0, y: 0 };
    let isWalking = false;

    let currentRoomName = null;
    let bannerHideTimer = null;

    function showRoomBanner(name) {
        roomBanner.textContent = name;
        roomBanner.classList.add("show");
        clearTimeout(bannerHideTimer);
        bannerHideTimer = setTimeout(() => {
            roomBanner.classList.remove("show");
        }, 2800);
    }

    function checkRoomEntry() {
        const roomName = getRoomNameAt(playerX, playerY);
        if (roomName && roomName !== currentRoomName) {
            currentRoomName = roomName;
            showRoomBanner(roomName);
        } else if (!roomName) {
            currentRoomName = null;
        }
    }

    // Spawn
    (function locateSpawn() {
        let fallbackX = -1, fallbackY = -1;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (mapData[r][c] === SPAWN) {
                    playerX = c * TILE_SIZE - 5;
                    playerY = r * TILE_SIZE - 5;
                    return;
                }
                if (mapData[r][c] === FLOOR && fallbackX === -1) {
                    fallbackX = c * TILE_SIZE - 5;
                    fallbackY = r * TILE_SIZE - 5;
                }
            }
        }
        playerX = fallbackX;
        playerY = fallbackY;
    })();

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    camX = game.clientWidth / 2 - playerX - 30;
    camY = game.clientHeight / 2 - playerY - 30;
    world.style.transform = `translate(${camX}px, ${camY}px)`;
    checkRoomEntry();

    // Minimap
    const miniCtx = minimapCanvas.getContext("2d");
    function updateMiniMap() {
        miniCtx.clearRect(0, 0, 120, 120);
        const scale = 120 / Math.max(COLS, ROWS);
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (mapData[y][x] === WALL) miniCtx.fillStyle = "#3d4a6b";
                else if (mapData[y][x] === DOOR) miniCtx.fillStyle = "#4a7a9a";
                else miniCtx.fillStyle = "#1e2538";
                miniCtx.fillRect(x * scale, y * scale, Math.ceil(scale), Math.ceil(scale));
            }
        }
        for (const room of ROOM_DEFS) {
            miniCtx.strokeStyle = "rgba(100,200,255,0.08)";
            miniCtx.lineWidth = 0.5;
            miniCtx.strokeRect(room.c1 * scale, room.r1 * scale, (room.c2 - room.c1) * scale, (room.r2 - room.r1) * scale);
        }
        miniCtx.fillStyle = "#4affaa";
        miniCtx.shadowColor = "#4affaa";
        miniCtx.shadowBlur = 8;
        miniCtx.beginPath();
        miniCtx.arc((playerX / TILE_SIZE) * scale, (playerY / TILE_SIZE) * scale, 2.5, 0, Math.PI * 2);
        miniCtx.fill();
        miniCtx.shadowBlur = 0;
    }
    updateMiniMap();

    // ─── Collision & doors ──────────────────────────────────────
    function checkWalkable(x, y) {
        const padding = 12;
        const points = [
            { x: x + padding, y: y + padding },
            { x: x + 60 - padding, y: y + padding },
            { x: x + padding, y: y + 60 - padding },
            { x: x + 60 - padding, y: y + 60 - padding }
        ];
        for (const p of points) {
            const col = Math.floor(p.x / TILE_SIZE);
            const row = Math.floor(p.y / TILE_SIZE);
            if (!mapData[row] || mapData[row][col] === undefined) return false;
            const tile = mapData[row][col];
            if (tile === DOOR && isDoorLocked(row, col)) return false;
            if (tile !== FLOOR && tile !== DOOR && tile !== SPAWN) return false;
        }
        return true;
    }

    function updateDoors() {
        const pCenterX = playerX + 30;
        const pCenterY = playerY + 30;
        for (const key in doorElements) {
            const [r, c] = key.split("_").map(Number);
            const doorCenterX = c * TILE_SIZE + 25;
            const doorCenterY = r * TILE_SIZE + 25;
            const dist = Math.hypot(pCenterX - doorCenterX, pCenterY - doorCenterY);
            const el = doorElements[key];
            if (dist < TILE_SIZE * 1.5) {
                el.style.background = "#1a2a3a";
                el.style.borderColor = "#3a9a7a";
                if (el._doorDot) {
                    el._doorDot.style.opacity = "0.2";
                    el._doorDot.style.transform = "scaleX(0.3)";
                }
            } else {
                el.style.background = "#2a3a5a";
                el.style.borderColor = "#4a7a9a";
                if (el._doorDot) {
                    el._doorDot.style.opacity = "0.8";
                    el._doorDot.style.transform = "scaleX(1)";
                }
            }
        }
    }

    // ─── Inventory ───────────────────────────────────────────────
    const itemDropPool = [
        "🔋 High-Capacity Plasma Battery",
        "🧪 Glowing Alien Bio-Sample",
        "🩺 Advanced Medical Scanner",
        "🌌 Anti-Gravity Boots Element",
        "🛰️ Comms Hub Backup Fuse",
        "☕ Lost Coffee Mug",
        "💎 Rare Asteroid Crystal",
    ];
    const playerInventory = [];
    let nearbyItem = null;

    function updateBagBadge() {
        bagBadge.textContent = playerInventory.length;
    }

    function updateInventoryHUD() {
        bagGrid.innerHTML = "";
        for (let i = 0; i < 27; i++) {
            const slot = document.createElement("div");
            slot.className = "slot";
            slot.style.aspectRatio = "1/1";
            slot.style.background = "rgba(20,34,56,0.7)";
            slot.style.borderRadius = "10px";
            slot.style.border = "1px solid rgba(100,200,255,0.08)";
            slot.style.display = "flex";
            slot.style.alignItems = "center";
            slot.style.justifyContent = "center";
            slot.style.fontSize = "12px";
            slot.style.color = "#8ab4d4";
            slot.style.textAlign = "center";
            slot.style.padding = "4px";
            slot.style.wordBreak = "break-word";
            slot.style.lineHeight = "1.2";
            slot.style.minHeight = "44px";
            if (playerInventory[i]) {
                slot.textContent = playerInventory[i];
                slot.style.background = "rgba(30,50,80,0.5)";
                slot.style.borderColor = "rgba(100,200,255,0.15)";
            }
            bagGrid.appendChild(slot);
        }
        updateBagBadge();
    }

    function checkNearbyItems() {
        const pCenterX = playerX + 30;
        const pCenterY = playerY + 30;
        let closestItem = null;
        let minDistance = TILE_SIZE * 1.5;
        const startRow = Math.max(0, Math.floor(playerY / TILE_SIZE) - 2);
        const endRow = Math.min(ROWS - 1, Math.floor(playerY / TILE_SIZE) + 2);
        const startCol = Math.max(0, Math.floor(playerX / TILE_SIZE) - 2);
        const endCol = Math.min(COLS - 1, Math.floor(playerX / TILE_SIZE) + 2);
        for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
                const tileType = mapData[r][c];
                if (tileType === CRATE || tileType === TERMINAL) {
                    const itemCenterX = c * TILE_SIZE + 25;
                    const itemCenterY = r * TILE_SIZE + 25;
                    const dist = Math.hypot(pCenterX - itemCenterX, pCenterY - itemCenterY);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestItem = { row: r, col: c, type: tileType };
                    }
                }
            }
        }
        nearbyItem = closestItem;
        if (nearbyItem) {
            if (nearbyItem.type === CRATE) btnAction.textContent = "🖐️ PICK UP CRATE";
            if (nearbyItem.type === TERMINAL) btnAction.textContent = "🖐️ ACCESS DATA";
            actionContainer.classList.remove("hidden");
        } else {
            actionContainer.classList.add("hidden");
        }
    }

    function clearTileToFloor(row, col) {
        mapData[row][col] = FLOOR;
        const tileIndex = row * COLS + col;
        const tileDOM = mapContainer.children[tileIndex];
        if (tileDOM) {
            tileDOM.style.background = "#232b40";
            tileDOM.style.borderColor = "#2c3550";
            tileDOM.innerHTML = "";
        }
    }

    // ─── Mission system ──────────────────────────────────────────
    const missionState = {
        hasWrench: false,
        hasIdCard: false,
        terminalHacked: false,
        hasDataDrive: false,
        aiCoreAccessGrantedShown: false,
        aiCoreCinematicPlayed: false
    };

    const WRENCH_CRATE = { row: 60, col: 65 };
    const LOCKER_CRATE = { row: 63, col: 46 };
    const CONTROL_ROOM_ZONE = { r1: 3, r2: 16, c1: 17, c2: 27 };
    const SERVER_RACK_TILE = { row: 24, col: 69 };
    const CONTROL_ROOM_DOOR_TILES = [[16,20],[16,21]];
    const AI_CORE_DOOR_TILES = [[18,35],[18,36],[18,37]];
    const AI_CORE_ROOM_NAME = "🤖 AI Core";

    let missionInteractTarget = null;

    function isInsideZone(row, col, zone) {
        return row >= zone.r1 && row < zone.r2 && col >= zone.c1 && col < zone.c2;
    }

    function isDoorLocked(row, col) {
        if (CONTROL_ROOM_DOOR_TILES.some(([r,c]) => r===row && c===col)) {
            return !missionState.hasIdCard;
        }
        if (AI_CORE_DOOR_TILES.some(([r,c]) => r===row && c===col)) {
            return !(missionState.hasIdCard && missionState.hasDataDrive);
        }
        return false;
    }

    let toastHideTimer = null;
    function showToast(message, duration = 3000, variantClass = null) {
        if (!missionToast) return;
        missionToast.innerHTML = message.replace(/\n/g, "<br>");
        missionToast.className = variantClass || "";
        void missionToast.offsetWidth;
        missionToast.classList.add("show");
        clearTimeout(toastHideTimer);
        toastHideTimer = setTimeout(() => {
            missionToast.classList.remove("show");
        }, duration);
    }

    function openMissionPopup(html, { showContinue = false, continueLabel = "CONTINUE", onContinue = null } = {}) {
        missionPopupContent.innerHTML = html;
        missionOverlay.classList.remove("mission-hidden");
        if (showContinue) {
            missionContinueBtn.textContent = continueLabel;
            missionContinueBtn.classList.remove("mission-hidden");
            missionContinueBtn.onclick = () => {
                missionContinueBtn.onclick = null;
                if (onContinue) onContinue();
            };
        } else {
            missionContinueBtn.classList.add("mission-hidden");
            missionContinueBtn.onclick = null;
        }
    }

    function closeMissionPopup() {
        missionOverlay.classList.add("mission-hidden");
        missionPopupContent.innerHTML = "";
        missionContinueBtn.classList.add("mission-hidden");
        missionContinueBtn.onclick = null;
    }

    function playSequence(frames, onDone) {
        let i = 0;
        function next() {
            if (i >= frames.length) {
                closeMissionPopup();
                if (onDone) onDone();
                return;
            }
            const frame = frames[i++];
            openMissionPopup(frame.html, {
                showContinue: !!frame.showContinue,
                continueLabel: frame.continueLabel || "CONTINUE",
                onContinue: next
            });
            if (frame.onShow) frame.onShow();
            if (frame.duration && !frame.showContinue) {
                setTimeout(next, frame.duration);
            }
        }
        next();
    }

    function handleMissionInteract(row, col, type) {
        // Wrench crate
        if (type === CRATE && row === WRENCH_CRATE.row && col === WRENCH_CRATE.col) {
            clearTileToFloor(row, col);
            missionState.hasWrench = true;
            playerInventory.push("🔧 Titanium Multitool Wrench");
            updateInventoryHUD();
            showToast("🔧 Titanium Multitool Wrench added to inventory.", 3200);
            return true;
        }
        // Locker crate
        if (type === CRATE && row === LOCKER_CRATE.row && col === LOCKER_CRATE.col) {
            if (!missionState.hasWrench) {
                showToast("🔒 The maintenance locker is jammed.\nYou need a tool to force it open.", 3200, "mp-error");
                return true;
            }
            clearTileToFloor(row, col);
            missionState.hasIdCard = true;
            playerInventory.push("💳 Admin Security ID Card");
            updateInventoryHUD();
            showToast("🔧 Wrench used to force the locker open!\n💳 Admin Security ID Card added.", 3800, "mp-success");
            return true;
        }
        // Control Room terminal
        if (type === TERMINAL && isInsideZone(row, col, CONTROL_ROOM_ZONE) && !missionState.terminalHacked) {
            missionState.terminalHacked = true;
            mapData[row][col] = DECOR;
            const tileIndex = row * COLS + col;
            const tileDOM = mapContainer.children[tileIndex];
            if (tileDOM) {
                tileDOM.style.background = "#1a2230";
                tileDOM.style.borderColor = "#3a4a5a";
                tileDOM.innerHTML = "<span style='color:#4a5a7a;font-size:16px;display:flex;align-items:center;justify-content:center;height:100%;opacity:0.4;'>◆</span>";
            }
            playTerminalHackSequence();
            return true;
        }
        return false;
    }

    function playTerminalHackSequence() {
        playSequence([
            {
                html: `
                    <span class="mp-title">DOWNLOADING SECURITY LOGS...</span>
                    <div class="mp-progress-track" style="width:100%;height:6px;background:rgba(100,200,255,0.08);border-radius:10px;margin:24px 0 12px;overflow:hidden;">
                        <div class="mp-progress-fill" id="mpProgressFill" style="width:0%;height:100%;background:linear-gradient(90deg,#4a9aff,#4affaa);border-radius:10px;transition:width 2.2s cubic-bezier(0.22,1,0.36,1);"></div>
                    </div>
                `,
                duration: 2400,
                onShow: () => {
                    requestAnimationFrame(() => {
                        const fill = document.getElementById("mpProgressFill");
                        if (fill) fill.style.width = "100%";
                    });
                }
            },
            { html: `<span class="mp-title" style="color:#4affaa;">DOWNLOAD COMPLETE</span>`, duration: 900 },
            {
                html: `
                    <span class="mp-title" style="color:#ffaa4a;">⚠ WARNING</span>
                    Station AI is in Emergency Lockdown.<br>
                    AI Core Access Restricted.<br><br>
                    Required:<br>
                    ✔ Admin Security ID Card<br>
                    ✔ Encrypted Mainframe Data Drive<br><br>
                    <span style="color:#6a8aaa;">— MISSION UPDATED —</span><br>
                    Find the Encrypted Mainframe Data Drive.
                `,
                showContinue: true
            }
        ], () => {
            showToast("🎯 New Objective:\nFind the Encrypted Mainframe Data Drive.", 3800);
        });
    }

    function handleServerRackInteract() {
        if (missionState.hasDataDrive) return;
        missionState.hasDataDrive = true;
        playerInventory.push("💾 Encrypted Mainframe Data Drive");
        updateInventoryHUD();
        showToast("💾 Encrypted Mainframe Data Drive added to inventory.", 3400, "mp-success");
        missionInteractTarget = null;
        actionContainer.classList.add("hidden");
    }

    const doorMessageCooldowns = {};
    function checkLockedDoorApproach(doorTiles, isLocked, message, cooldownKey) {
        if (!isLocked) return;
        const pCenterX = playerX + 30;
        const pCenterY = playerY + 30;
        const near = doorTiles.some(([r, c]) => {
            const dx = pCenterX - (c * TILE_SIZE + 25);
            const dy = pCenterY - (r * TILE_SIZE + 25);
            return Math.hypot(dx, dy) < TILE_SIZE * 1.4;
        });
        if (!near) return;
        const now = performance.now();
        if (!doorMessageCooldowns[cooldownKey] || now - doorMessageCooldowns[cooldownKey] > 4000) {
            doorMessageCooldowns[cooldownKey] = now;
            showToast(message, 2800, "mp-error");
        }
    }

    function playAICoreCinematic() {
        playSequence([
            { html: `<span class="mp-title">BOOTING AI...</span>`, duration: 1500 },
            { html: `<span class="mp-title" style="color:#4affaa;">WELCOME ADMINISTRATOR</span>`, duration: 1500 },
            { html: `<span class="mp-title" style="color:#ff6a6a;">ERROR ERROR</span>`, duration: 1300 },
            {
                html: `
                    <span class="mp-title" style="color:#ff6a6a;">🚨 EMERGENCY ALERT</span>
                    A classified object has been stolen.<br>
                    Security footage corrupted.<br>
                    Project PETRI-CHOR is classified.<br>
                    Administrator clearance insufficient.
                `,
                showContinue: true
            },
            {
                html: `
                    <span class="mp-title" style="color:#6a8aaa;">— MISSION UPDATED —</span>
                    • Restore Power<br>
                    • Repair Communications<br>
                    • Locate Missing Crew Member<br>
                    • Unlock Project PETRI-CHOR
                `,
                showContinue: true
            },
            {
                html: `
                    <span class="mp-title">📡 UNKNOWN TRANSMISSION</span>
                    <em>"Don't trust the AI."</em><br><br>
                    <span style="color:#6a8aaa;">— SIGNAL LOST —</span><br>
                    TO BE CONTINUED...
                `,
                showContinue: true,
                continueLabel: "CLOSE"
            }
        ]);
    }

    function missionSystemUpdate() {
        const pCenterX = playerX + 30;
        const pCenterY = playerY + 30;

        // Server rack proximity
        const rackCenterX = SERVER_RACK_TILE.col * TILE_SIZE + 25;
        const rackCenterY = SERVER_RACK_TILE.row * TILE_SIZE + 25;
        const rackDist = Math.hypot(pCenterX - rackCenterX, pCenterY - rackCenterY);
        if (missionState.terminalHacked && !missionState.hasDataDrive && rackDist < TILE_SIZE * 1.5) {
            missionInteractTarget = "serverRack";
            btnAction.textContent = "🖐️ ACCESS SERVER RACK";
            actionContainer.classList.remove("hidden");
        } else if (missionInteractTarget === "serverRack") {
            missionInteractTarget = null;
        }

        // Control Room door
        checkLockedDoorApproach(
            CONTROL_ROOM_DOOR_TILES,
            !missionState.hasIdCard,
            "🚫 ACCESS DENIED\nAdministrator ID Required",
            "controlRoom"
        );

        // AI Core door
        const aiCoreReady = missionState.hasIdCard && missionState.hasDataDrive;
        if (!missionState.aiCoreAccessGrantedShown) {
            checkLockedDoorApproach(
                AI_CORE_DOOR_TILES,
                !aiCoreReady,
                "🔒 AI CORE SEALED\nSecurity Clearance Insufficient",
                "aiCore"
            );
        }
        if (aiCoreReady && !missionState.aiCoreAccessGrantedShown) {
            const nearDoor = AI_CORE_DOOR_TILES.some(([r, c]) => {
                const dx = pCenterX - (c * TILE_SIZE + 25);
                const dy = pCenterY - (r * TILE_SIZE + 25);
                return Math.hypot(dx, dy) < TILE_SIZE * 3;
            });
            if (nearDoor) {
                missionState.aiCoreAccessGrantedShown = true;
                AI_CORE_DOOR_TILES.forEach(([r, c]) => {
                    const doorEl = doorElements[`${r}_${c}`];
                    if (doorEl) {
                        doorEl.style.background = "#7affbb";
                        doorEl.style.borderColor = "#00ff88";
                        doorEl.style.boxShadow = "0 0 30px #00ff8866";
                        setTimeout(() => {
                            doorEl.style.background = "";
                            doorEl.style.borderColor = "";
                            doorEl.style.boxShadow = "";
                        }, 1000);
                    }
                });
                showToast("✅ ACCESS GRANTED\nWelcome Administrator.", 3400, "mp-success");
            }
        }
        if (currentRoomName === AI_CORE_ROOM_NAME && aiCoreReady && !missionState.aiCoreCinematicPlayed) {
            missionState.aiCoreCinematicPlayed = true;
            playAICoreCinematic();
        }
    }

// ─── Interaction button ─────────────────────────────────────
    btnAction.addEventListener("click", () => {
        if (missionInteractTarget === "serverRack") {
            handleServerRackInteract();
            return;
        }
        if (!nearbyItem) return;
        const { row, col, type } = nearbyItem;
        if (handleMissionInteract(row, col, type)) {
            checkNearbyItems();
            updateMiniMap();
            return;
        }
        let itemName = "";
        if (type === CRATE) {
            const randomIndex = Math.floor(Math.random() * itemDropPool.length);
            itemName = itemDropPool[randomIndex];
            mapData[row][col] = FLOOR;
            const tileIndex = row * COLS + col;
            const tileDOM = mapContainer.children[tileIndex];
            if (tileDOM) {
                tileDOM.style.background = "#232b40";
                tileDOM.style.borderColor = "#2c3550";
                tileDOM.innerHTML = "";
            }
        } else if (type === TERMINAL) {
            itemName = "💾 Downloaded Security Logs";
            mapData[row][col] = DECOR;
            const tileIndex = row * COLS + col;
            const tileDOM = mapContainer.children[tileIndex];
            if (tileDOM) {
                tileDOM.style.background = "#1a2230";
                tileDOM.style.borderColor = "#3a4a5a";
                tileDOM.innerHTML = "<span style='color:#4a5a7a;font-size:16px;display:flex;align-items:center;justify-content:center;height:100%;opacity:0.4;'>◆</span>";
            }
        }
        playerInventory.push(itemName);
        updateInventoryHUD();
        checkNearbyItems();
        updateMiniMap();
    });

    // ─── Backpack window ─────────────────────────────────────────
    bagBtn.addEventListener("click", () => {
        updateInventoryHUD();
        bagWindow.style.display = "block";
    });
    closeBagBtn.addEventListener("click", () => {
        bagWindow.style.display = "none";
    });

    // ─── Input (joystick + keyboard) ────────────────────────────
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches ||
                         "ontouchstart" in window ||
                         navigator.maxTouchPoints > 0;

    let joystickActive = false;
    let joystickStartX = 0, joystickStartY = 0;
    const maxDistance = 50;
    const activeKeys = new Set();

    function evaluateKeyboardVector() {
        if (joystickActive) return;
        inputDir.x = 0;
        inputDir.y = 0;
        if (activeKeys.has("up")) inputDir.y = -1;
        if (activeKeys.has("down")) inputDir.y = 1;
        if (activeKeys.has("left")) inputDir.x = -1;
        if (activeKeys.has("right")) inputDir.x = 1;
        if (inputDir.x !== 0 || inputDir.y !== 0) {
            isWalking = true;
            player.classList.add("walking");
            if (inputDir.x < 0) player.style.transform = "scaleX(-1)";
            if (inputDir.x > 0) player.style.transform = "scaleX(1)";
        } else {
            isWalking = false;
            player.classList.remove("walking");
        }
    }

    function handleJoystickStart(e) {
        joystickActive = true;
        player.classList.add("walking");
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const rect = joystickBase.getBoundingClientRect();
        joystickStartX = rect.left + rect.width / 2;
        joystickStartY = rect.top + rect.height / 2;
        handleJoystickMove(e);
    }

    function handleJoystickMove(e) {
        if (!joystickActive) return;
        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        let deltaX = clientX - joystickStartX;
        let deltaY = clientY - joystickStartY;
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance > maxDistance) {
            deltaX = (deltaX / distance) * maxDistance;
            deltaY = (deltaY / distance) * maxDistance;
            distance = maxDistance;
        }
        joystickThumb.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        if (distance > 10) {
            inputDir.x = deltaX / maxDistance;
            inputDir.y = deltaY / maxDistance;
            isWalking = true;
            if (inputDir.x < 0) player.style.transform = "scaleX(-1)";
            if (inputDir.x > 0) player.style.transform = "scaleX(1)";
        } else {
            inputDir.x = 0;
            inputDir.y = 0;
            isWalking = false;
        }
    }

    function handleJoystickEnd() {
        joystickActive = false;
        isWalking = false;
        inputDir.x = 0;
        inputDir.y = 0;
        player.classList.remove("walking");
        joystickThumb.style.transform = "translate(0px, 0px)";
        evaluateKeyboardVector();
    }

    if (isTouchDevice) {
        joystickContainer.style.display = "flex";
        joystickContainer.addEventListener("touchstart", handleJoystickStart, { passive: false });
        window.addEventListener("touchmove", handleJoystickMove, { passive: false });
        window.addEventListener("touchend", handleJoystickEnd);
    } else {
        joystickContainer.style.display = "none";
    }

    window.addEventListener("keydown", (e) => {
        const k = e.key.toLowerCase();
        if (k === "arrowup" || k === "w") activeKeys.add("up");
        if (k === "arrowdown" || k === "s") activeKeys.add("down");
        if (k === "arrowleft" || k === "a") activeKeys.add("left");
        if (k === "arrowright" || k === "d") activeKeys.add("right");
        evaluateKeyboardVector();
    });
    window.addEventListener("keyup", (e) => {
        const k = e.key.toLowerCase();
        if (k === "arrowup" || k === "w") activeKeys.delete("up");
        if (k === "arrowdown" || k === "s") activeKeys.delete("down");
        if (k === "arrowleft" || k === "a") activeKeys.delete("left");
        if (k === "arrowright" || k === "d") activeKeys.delete("right");
        evaluateKeyboardVector();
    });

    // ─── Game loop ──────────────────────────────────────────────
    let lastTime = performance.now();

    function gameLoop(currentTime) {
        let dt = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        if (dt > 0.1) dt = 0.1;

        if (isWalking) {
            let nextX = playerX + inputDir.x * MOVE_SPEED * dt;
            let nextY = playerY + inputDir.y * MOVE_SPEED * dt;
            if (checkWalkable(nextX, playerY)) playerX = nextX;
            if (checkWalkable(playerX, nextY)) playerY = nextY;
            player.style.left = playerX + "px";
            player.style.top = playerY + "px";
            updateDoors();
            checkRoomEntry();
            checkNearbyItems();
            missionSystemUpdate();
            updateMiniMap();
        }

        const targetCamX = game.clientWidth / 2 - playerX - 30;
        const targetCamY = game.clientHeight / 2 - playerY - 30;
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

    // Initial HUD
    updateInventoryHUD();
    checkNearbyItems();

});
