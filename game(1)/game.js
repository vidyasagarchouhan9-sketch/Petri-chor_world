// ================================================================
//  AURORA SPACE STATION – FULL GAME (self-contained)
//  Save as game.js and include in any HTML page.
//  It creates all DOM elements and runs the game.
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

    // ─── Build DOM ──────────────────────────────────────────────
    // Main containers
    const game = document.createElement("div");
    game.id = "game";
    game.style.position = "relative";
    game.style.width = "100vw";
    game.style.height = "100vh";
    game.style.background = "#0f1420";
    game.style.overflow = "hidden";
    document.body.appendChild(game);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#0b0f1a";
    document.body.style.overflow = "hidden";

    const world = document.createElement("div");
    world.id = "world";
    world.style.position = "absolute";
    world.style.top = "0";
    world.style.left = "0";
    world.style.willChange = "transform";
    game.appendChild(world);

    const mapContainer = document.createElement("div");
    mapContainer.id = "map";
    mapContainer.style.display = "grid";
    mapContainer.style.gridTemplateColumns = `repeat(${COLS}, ${TILE_SIZE}px)`;
    mapContainer.style.gridTemplateRows = `repeat(${ROWS}, ${TILE_SIZE}px)`;
    mapContainer.style.width = `${COLS * TILE_SIZE}px`;
    mapContainer.style.height = `${ROWS * TILE_SIZE}px`;
    mapContainer.style.background = "#1a1f2e";
    world.appendChild(mapContainer);

    const player = document.createElement("div");
    player.id = "player";
    player.style.position = "absolute";
    player.style.width = "50px";
    player.style.height = "50px";
    player.style.background = "radial-gradient(circle at 35% 35%, #6af, #1a5aaa)";
    player.style.borderRadius = "50%";
    player.style.border = "3px solid #8af";
    player.style.boxShadow = "0 0 30px rgba(100,170,255,0.4), inset 0 -4px 10px rgba(0,0,0,0.3)";
    player.style.zIndex = "10";
    player.style.pointerEvents = "none";
    player.style.transition = "transform 0.08s";
    world.appendChild(player);

    // Room banner
    const roomBanner = document.createElement("div");
    roomBanner.id = "room-banner";
    roomBanner.style.position = "fixed";
    roomBanner.style.top = "50%";
    roomBanner.style.left = "50%";
    roomBanner.style.transform = "translate(-50%, -50%) scale(0.85)";
    roomBanner.style.background = "rgba(10,16,30,0.92)";
    roomBanner.style.backdropFilter = "blur(16px)";
    roomBanner.style.padding = "16px 42px";
    roomBanner.style.borderRadius = "18px";
    roomBanner.style.border = "1px solid rgba(100,200,255,0.25)";
    roomBanner.style.boxShadow = "0 0 80px rgba(0,50,100,0.4)";
    roomBanner.style.color = "#b0e4ff";
    roomBanner.style.fontSize = "28px";
    roomBanner.style.fontWeight = "600";
    roomBanner.style.letterSpacing = "2px";
    roomBanner.style.textShadow = "0 0 30px rgba(100,200,255,0.3)";
    roomBanner.style.opacity = "0";
    roomBanner.style.pointerEvents = "none";
    roomBanner.style.transition = "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    roomBanner.style.zIndex = "100";
    roomBanner.style.whiteSpace = "nowrap";
    game.appendChild(roomBanner);

    // Minimap
    const minimapWrap = document.createElement("div");
    minimapWrap.id = "minimap-wrap";
    minimapWrap.style.position = "fixed";
    minimapWrap.style.bottom = "20px";
    minimapWrap.style.right = "20px";
    minimapWrap.style.width = "130px";
    minimapWrap.style.height = "130px";
    minimapWrap.style.background = "rgba(8,12,24,0.85)";
    minimapWrap.style.backdropFilter = "blur(8px)";
    minimapWrap.style.borderRadius = "16px";
    minimapWrap.style.border = "1px solid rgba(100,200,255,0.15)";
    minimapWrap.style.boxShadow = "0 4px 40px rgba(0,0,0,0.6)";
    minimapWrap.style.zIndex = "50";
    minimapWrap.style.padding = "5px";
    minimapWrap.style.pointerEvents = "none";
    const minimapCanvas = document.createElement("canvas");
    minimapCanvas.id = "minimapCanvas";
    minimapCanvas.width = 120;
    minimapCanvas.height = 120;
    minimapCanvas.style.width = "100%";
    minimapCanvas.style.height = "100%";
    minimapCanvas.style.borderRadius = "10px";
    minimapWrap.appendChild(minimapCanvas);
    game.appendChild(minimapWrap);

    // Action button
    const actionContainer = document.createElement("div");
    actionContainer.id = "action-container";
    actionContainer.style.position = "fixed";
    actionContainer.style.bottom = "110px";
    actionContainer.style.left = "50%";
    actionContainer.style.transform = "translateX(-50%)";
    actionContainer.style.zIndex = "60";
    actionContainer.style.pointerEvents = "none";
    actionContainer.classList.add("hidden");
    const btnAction = document.createElement("button");
    btnAction.id = "btn-action";
    btnAction.style.pointerEvents = "auto";
    btnAction.style.background = "rgba(10,20,40,0.85)";
    btnAction.style.backdropFilter = "blur(12px)";
    btnAction.style.border = "1px solid rgba(100,200,255,0.3)";
    btnAction.style.borderRadius = "60px";
    btnAction.style.padding = "14px 32px";
    btnAction.style.color = "#b0e4ff";
    btnAction.style.fontSize = "18px";
    btnAction.style.fontWeight = "600";
    btnAction.style.letterSpacing = "1px";
    btnAction.style.boxShadow = "0 4px 30px rgba(0,50,100,0.3)";
    btnAction.style.cursor = "pointer";
    btnAction.textContent = "🖐️ INTERACT";
    actionContainer.appendChild(btnAction);
    game.appendChild(actionContainer);

    // Backpack button
    const bagBtn = document.createElement("button");
    bagBtn.id = "bagBtn";
    bagBtn.style.position = "fixed";
    bagBtn.style.bottom = "30px";
    bagBtn.style.left = "30px";
    bagBtn.style.zIndex = "60";
    bagBtn.style.background = "rgba(10,20,40,0.85)";
    bagBtn.style.backdropFilter = "blur(12px)";
    bagBtn.style.border = "1px solid rgba(100,200,255,0.2)";
    bagBtn.style.borderRadius = "60px";
    bagBtn.style.padding = "14px 22px";
    bagBtn.style.color = "#b0e4ff";
    bagBtn.style.fontSize = "20px";
    bagBtn.style.fontWeight = "600";
    bagBtn.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
    bagBtn.style.cursor = "pointer";
    bagBtn.style.display = "flex";
    bagBtn.style.alignItems = "center";
    bagBtn.style.gap = "10px";
    const bagBadge = document.createElement("span");
    bagBadge.id = "bagBadge";
    bagBadge.style.background = "#4a9aff";
    bagBadge.style.color = "#fff";
    bagBadge.style.borderRadius = "30px";
    bagBadge.style.padding = "0 10px";
    bagBadge.style.fontSize = "14px";
    bagBadge.style.fontWeight = "700";
    bagBadge.style.minWidth = "22px";
    bagBadge.style.textAlign = "center";
    bagBadge.textContent = "0";
    bagBtn.appendChild(document.createTextNode("🎒 "));
    bagBtn.appendChild(bagBadge);
    game.appendChild(bagBtn);

    // Backpack window
    const bagWindow = document.createElement("div");
    bagWindow.id = "bagWindow";
    bagWindow.style.display = "none";
    bagWindow.style.position = "fixed";
    bagWindow.style.top = "50%";
    bagWindow.style.left = "50%";
    bagWindow.style.transform = "translate(-50%, -50%)";
    bagWindow.style.width = "90vw";
    bagWindow.style.maxWidth = "560px";
    bagWindow.style.maxHeight = "70vh";
    bagWindow.style.background = "rgba(8,14,28,0.96)";
    bagWindow.style.backdropFilter = "blur(24px)";
    bagWindow.style.borderRadius = "28px";
    bagWindow.style.border = "1px solid rgba(100,200,255,0.15)";
    bagWindow.style.boxShadow = "0 20px 80px rgba(0,0,0,0.8)";
    bagWindow.style.zIndex = "200";
    bagWindow.style.padding = "24px 20px 28px";
    bagWindow.style.overflowY = "auto";
    const title = document.createElement("h2");
    title.style.color = "#b0e4ff";
    title.style.fontSize = "22px";
    title.style.fontWeight = "600";
    title.style.textAlign = "center";
    title.style.marginBottom = "16px";
    title.style.letterSpacing = "2px";
    title.textContent = "🎒 INVENTORY";
    bagWindow.appendChild(title);
    const bagGrid = document.createElement("div");
    bagGrid.id = "bagGrid";
    bagGrid.style.display = "grid";
    bagGrid.style.gridTemplateColumns = "repeat(9, 1fr)";
    bagGrid.style.gap = "8px";
    bagGrid.style.marginBottom = "18px";
    bagWindow.appendChild(bagGrid);
    const closeBagBtn = document.createElement("button");
    closeBagBtn.id = "closeBag";
    closeBagBtn.style.display = "block";
    closeBagBtn.style.width = "100%";
    closeBagBtn.style.padding = "14px";
    closeBagBtn.style.background = "rgba(30,60,100,0.4)";
    closeBagBtn.style.border = "1px solid rgba(100,200,255,0.15)";
    closeBagBtn.style.borderRadius = "16px";
    closeBagBtn.style.color = "#b0e4ff";
    closeBagBtn.style.fontSize = "18px";
    closeBagBtn.style.fontWeight = "600";
    closeBagBtn.style.cursor = "pointer";
    closeBagBtn.textContent = "CLOSE";
    bagWindow.appendChild(closeBagBtn);
    game.appendChild(bagWindow);

    // Joystick
    const joystickContainer = document.createElement("div");
    joystickContainer.id = "joystick-container";
    joystickContainer.style.position = "fixed";
    joystickContainer.style.bottom = "30px";
    joystickContainer.style.left = "50%";
    joystickContainer.style.transform = "translateX(-50%)";
    joystickContainer.style.zIndex = "40";
    joystickContainer.style.display = "none";
    joystickContainer.style.touchAction = "none";
    const joystickBase = document.createElement("div");
    joystickBase.id = "joystick-base";
    joystickBase.style.width = "130px";
    joystickBase.style.height = "130px";
    joystickBase.style.borderRadius = "50%";
    joystickBase.style.background = "rgba(10,20,40,0.6)";
    joystickBase.style.backdropFilter = "blur(8px)";
    joystickBase.style.border = "2px solid rgba(100,200,255,0.12)";
    joystickBase.style.boxShadow = "0 0 50px rgba(0,0,0,0.4)";
    joystickBase.style.position = "relative";
    joystickBase.style.display = "flex";
    joystickBase.style.alignItems = "center";
    joystickBase.style.justifyContent = "center";
    const joystickThumb = document.createElement("div");
    joystickThumb.id = "joystick-thumb";
    joystickThumb.style.width = "56px";
    joystickThumb.style.height = "56px";
    joystickThumb.style.borderRadius = "50%";
    joystickThumb.style.background = "radial-gradient(circle at 40% 40%, #6af, #1a5aaa)";
    joystickThumb.style.border = "2px solid rgba(100,200,255,0.4)";
    joystickThumb.style.boxShadow = "0 0 30px rgba(100,170,255,0.2)";
    joystickThumb.style.position = "absolute";
    joystickThumb.style.top = "50%";
    joystickThumb.style.left = "50%";
    joystickThumb.style.transform = "translate(-50%, -50%)";
    joystickThumb.style.pointerEvents = "none";
    joystickBase.appendChild(joystickThumb);
    joystickContainer.appendChild(joystickBase);
    game.appendChild(joystickContainer);

    // Mission overlay
    const missionOverlay = document.createElement("div");
    missionOverlay.id = "missionOverlay";
    missionOverlay.style.position = "fixed";
    missionOverlay.style.inset = "0";
    missionOverlay.style.zIndex = "300";
    missionOverlay.style.display = "flex";
    missionOverlay.style.alignItems = "center";
    missionOverlay.style.justifyContent = "center";
    missionOverlay.style.background = "rgba(0,0,0,0.7)";
    missionOverlay.style.backdropFilter = "blur(6px)";
    missionOverlay.style.transition = "opacity 0.4s, visibility 0.4s";
    missionOverlay.style.opacity = "0";
    missionOverlay.style.visibility = "hidden";
    missionOverlay.style.padding = "20px";
    missionOverlay.classList.add("mission-hidden");
    const missionPopup = document.createElement("div");
    missionPopup.id = "missionPopup";
    missionPopup.style.background = "rgba(8,14,28,0.96)";
    missionPopup.style.backdropFilter = "blur(24px)";
    missionPopup.style.borderRadius = "32px";
    missionPopup.style.border = "1px solid rgba(100,200,255,0.12)";
    missionPopup.style.boxShadow = "0 30px 100px rgba(0,0,0,0.8)";
    missionPopup.style.maxWidth = "520px";
    missionPopup.style.width = "100%";
    missionPopup.style.padding = "36px 32px 32px";
    missionPopup.style.textAlign = "center";
    missionPopup.style.maxHeight = "80vh";
    missionPopup.style.overflowY = "auto";
    const missionPopupContent = document.createElement("div");
    missionPopupContent.id = "missionPopupContent";
    missionPopupContent.style.color = "#b8d8f0";
    missionPopupContent.style.fontSize = "18px";
    missionPopupContent.style.lineHeight = "1.7";
    missionPopupContent.style.letterSpacing = "0.3px";
    missionPopupContent.style.minHeight = "60px";
    const missionContinueBtn = document.createElement("button");
    missionContinueBtn.id = "missionContinueBtn";
    missionContinueBtn.style.marginTop = "24px";
    missionContinueBtn.style.padding = "14px 40px";
    missionContinueBtn.style.background = "rgba(30,70,130,0.5)";
    missionContinueBtn.style.border = "1px solid rgba(100,200,255,0.2)";
    missionContinueBtn.style.borderRadius = "60px";
    missionContinueBtn.style.color = "#b0e4ff";
    missionContinueBtn.style.fontSize = "16px";
    missionContinueBtn.style.fontWeight = "600";
    missionContinueBtn.style.letterSpacing = "2px";
    missionContinueBtn.style.cursor = "pointer";
    missionContinueBtn.style.width = "100%";
    missionContinueBtn.classList.add("mission-hidden");
    missionContinueBtn.textContent = "CONTINUE";
    missionPopup.appendChild(missionPopupContent);
    missionPopup.appendChild(missionContinueBtn);
    missionOverlay.appendChild(missionPopup);
    game.appendChild(missionOverlay);

    // Toast
    const missionToast = document.createElement("div");
    missionToast.id = "missionToast";
    missionToast.style.position = "fixed";
    missionToast.style.bottom = "180px";
    missionToast.style.left = "50%";
    missionToast.style.transform = "translateX(-50%) translateY(20px)";
    missionToast.style.zIndex = "80";
    missionToast.style.background = "rgba(8,14,28,0.92)";
    missionToast.style.backdropFilter = "blur(14px)";
    missionToast.style.borderRadius = "18px";
    missionToast.style.border = "1px solid rgba(100,200,255,0.12)";
    missionToast.style.padding = "16px 32px";
    missionToast.style.color = "#b0e4ff";
    missionToast.style.fontSize = "17px";
    missionToast.style.fontWeight = "500";
    missionToast.style.textAlign = "center";
    missionToast.style.lineHeight = "1.5";
    missionToast.style.boxShadow = "0 10px 60px rgba(0,0,0,0.6)";
    missionToast.style.opacity = "0";
    missionToast.style.pointerEvents = "none";
    missionToast.style.transition = "opacity 0.4s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    missionToast.style.maxWidth = "90vw";
    missionToast.style.whiteSpace = "pre-line";
    game.appendChild(missionToast);

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
        roomBanner.style.opacity = "1";
        roomBanner.style.transform = "translate(-50%, -50%) scale(1)";
        clearTimeout(bannerHideTimer);
        bannerHideTimer = setTimeout(() => {
            roomBanner.style.opacity = "0";
            roomBanner.style.transform = "translate(-50%, -50%) scale(0.85)";
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
        missionToast.style.opacity = "1";
        missionToast.style.transform = "translateX(-50%) translateY(0)";
        clearTimeout(toastHideTimer);
        toastHideTimer = setTimeout(() => {
            missionToast.style.opacity = "0";
            missionToast.style.transform = "translateX(-50%) translateY(20px)";
        }, duration);
    }

    function openMissionPopup(html, { showContinue = false, continueLabel = "CONTINUE", onContinue = null } = {}) {
        missionPopupContent.innerHTML = html;
        missionOverlay.style.opacity = "1";
        missionOverlay.style.visibility = "visible";
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
        missionOverlay.style.opacity = "0";
        missionOverlay.style.visibility = "hidden";
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
