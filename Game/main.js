/* ================================================================
   DERELICT — main engine
   ================================================================ */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const mmCanvas = document.getElementById('minimapCanvas');
const mmCtx = mmCanvas.getContext('2d');

const playerImg = new Image();
playerImg.src = 'walk.png';
const PLAYER_SPRITE_H = 74;
const PLAYER_SPRITE_W = PLAYER_SPRITE_H * (194/299); // native aspect ratio of walk.png

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

/* ---------------------------------------------------------------
   STATE
   --------------------------------------------------------------- */
const startRoom = ROOMS.CREW_QUARTERS;
const state = {
  screen: 'menu', // menu | instructions | credits | playing | paused
  player: { x: startRoom.x + startRoom.w/2, y: startRoom.y + startRoom.h/2, r: 16, speed: 220, facing: 'down' },
  camera: { x: 0, y: 0 },
  keys: {},
  joystick: { active:false, dx:0, dy:0 },
  currentRoom: 'CREW_QUARTERS',
  inventory: [],
  missionStep: 1,
  flags: { vaultUnlocked:false, controlHacked:false, aiRestored:false, gameEnded:false, warnedEngine:false, lockerUnlocked:false },
  visitedRooms: new Set(['CREW_QUARTERS']),
  openedCrates: new Set(),
  achievements: new Set(),
  notifications: [],
  achievementQueue: [],
  nearestInteractive: null,
  lastDeniedAt: 0,
  time: 0,
  debug: false,
};

const CRATE_LOOT_MAP = { crewCrate:null, medCrate:null, cafCrate:'PIZZA', bioCrate:'SAMPLE', engCrate:'BATTERY' };
const EXPLORER_ROOMS = ALL_ROOM_IDS.filter(id => !ROOMS[id].secret);

/* Precompute walkable rects (rooms + corridors) and door lookup */
const ROOM_LIST = Object.values(ROOMS);
const WALKABLE = [...ROOM_LIST.map(r => ({x:r.x, y:r.y, w:r.w, h:r.h})), ...DOORS.map(d => d.corridor)];

function doorRequirementsMet(door){
  if (!door.locked) return true;
  const req = door.requires || {};
  if (req.flag && !state.flags[req.flag]) return false;
  if (req.item && !state.inventory.includes(req.item)) return false;
  if (req.step && state.missionStep < req.step) return false;
  return true;
}
function isDoorLocked(door){ return door.locked && !doorRequirementsMet(door); }

function doorBarrierRect(door){
  const c = door.corridor;
  const horizontal = c.w > c.h; // wide corridor = travelling horizontally
  const THICK = 24;
  if (horizontal){
    return { x: door.gate.x - THICK/2, y: door.gate.y - c.h/2, w: THICK, h: c.h };
  } else {
    return { x: door.gate.x - c.w/2, y: door.gate.y - THICK/2, w: c.w, h: THICK };
  }
}

function insideExpanded(px,py,rect,margin){
  return px >= rect.x - margin && px <= rect.x + rect.w + margin &&
         py >= rect.y - margin && py <= rect.y + rect.h + margin;
}

function isWalkable(px,py,margin){
  for (const rect of WALKABLE){ if (insideExpanded(px,py,rect,margin)) return true; }
  return false;
}

function blockedByLockedDoor(px,py,margin){
  for (const door of DOORS){
    if (!isDoorLocked(door)) continue; // locked doors always block, whether or not they're rendered yet
    const rect = doorBarrierRect(door);
    if (insideExpanded(px,py, rect, margin)) return true;
  }
  return false;
}

function doorVisible(door){
  if (!door.secret) return true;
  return doorRequirementsMet(door) || state.flags.vaultUnlocked; // reveal once unlocked
}

function roomAt(px,py){
  for (const r of ROOM_LIST){ if (px>=r.x && px<=r.x+r.w && py>=r.y && py<=r.y+r.h) return r; }
  return null;
}

/* ---------------------------------------------------------------
   INPUT
   --------------------------------------------------------------- */
window.addEventListener('keydown', e => {
  state.keys[e.key.toLowerCase()] = true;
  if (state.screen !== 'playing') return;
  if (e.key.toLowerCase() === 'e') doInteract();
  if (e.key.toLowerCase() === 'b') toggleInventory();
  if (e.key === 'Escape') togglePause();
  if (e.key === '`') { state.debug = !state.debug; document.getElementById('debugOverlay').style.display = state.debug ? 'block':'none'; }
});
window.addEventListener('keyup', e => { state.keys[e.key.toLowerCase()] = false; });

/* Virtual joystick (touch) */
const joyBase = document.getElementById('joystickBase');
const joyKnob = document.getElementById('joystickKnob');
let joyTouchId = null;
function joyStart(e){
  const t = e.changedTouches ? e.changedTouches[0] : e;
  joyTouchId = e.changedTouches ? t.identifier : 'mouse';
  state.joystick.active = true;
  moveJoystick(t);
}
function moveJoystick(t){
  const rect = joyBase.getBoundingClientRect();
  const cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
  let dx = t.clientX - cx, dy = t.clientY - cy;
  const max = rect.width/2;
  const dist = Math.min(Math.hypot(dx,dy), max);
  const ang = Math.atan2(dy,dx);
  const kx = Math.cos(ang)*dist, ky = Math.sin(ang)*dist;
  joyKnob.style.transform = `translate(${kx}px, ${ky}px)`;
  state.joystick.dx = kx / max;
  state.joystick.dy = ky / max;
}
function joyEnd(){
  state.joystick.active = false;
  state.joystick.dx = 0; state.joystick.dy = 0;
  joyKnob.style.transform = 'translate(0px,0px)';
  joyTouchId = null;
}
joyBase.addEventListener('touchstart', e => { e.preventDefault(); joyStart(e); }, {passive:false});
joyBase.addEventListener('touchmove', e => {
  e.preventDefault();
  for (const t of e.changedTouches) if (t.identifier === joyTouchId) moveJoystick(t);
}, {passive:false});
joyBase.addEventListener('touchend', e => { e.preventDefault(); joyEnd(); }, {passive:false});

document.getElementById('actionBtn').addEventListener('touchstart', e => { e.preventDefault(); AUDIO.click(); doInteract(); });
document.getElementById('actionBtn').addEventListener('click', () => { AUDIO.click(); doInteract(); });
document.getElementById('bagBtn').addEventListener('click', () => { AUDIO.click(); toggleInventory(); });
document.getElementById('pauseBtn').addEventListener('click', () => { AUDIO.click(); togglePause(); });

/* show touch controls only on touch devices */
if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0){
  document.getElementById('touchControls').style.display = 'none';
}

/* ---------------------------------------------------------------
   NOTIFICATIONS / ACHIEVEMENTS
   --------------------------------------------------------------- */
function notify(text, kind='info'){
  const el = document.createElement('div');
  el.className = `toast toast-${kind}`;
  el.textContent = text;
  document.getElementById('notifications').appendChild(el);
  requestAnimationFrame(()=> el.classList.add('show'));
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=> el.remove(), 400); }, 3200);
}

function unlockAchievement(id){
  if (state.achievements.has(id)) return;
  state.achievements.add(id);
  const a = ACHIEVEMENTS[id];
  AUDIO.achievement();
  const el = document.createElement('div');
  el.className = 'achievement-toast';
  el.innerHTML = `<span class="ach-icon">${a.icon}</span><div><b>Achievement Unlocked</b><br>${a.name} — <i>${a.desc}</i></div>`;
  document.getElementById('achievementLayer').appendChild(el);
  requestAnimationFrame(()=> el.classList.add('show'));
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=> el.remove(), 500); }, 4200);
}

/* ---------------------------------------------------------------
   MISSION SYSTEM
   --------------------------------------------------------------- */
function currentMission(){ return MISSIONS[state.missionStep - 1]; }

function renderMissionBanner(){
  const m = currentMission();
  document.getElementById('missionTitle').textContent = m ? `${m.id}. ${m.title}` : 'Free roam';
  document.getElementById('missionDesc').textContent = m ? m.desc : 'The station is yours to explore.';
  document.getElementById('missionDots').innerHTML = MISSIONS.map(mm =>
    `<span class="dot ${mm.id < state.missionStep ? 'done' : mm.id === state.missionStep ? 'active' : ''}"></span>`).join('');
}

function advanceMission(){
  if (state.missionStep >= MISSIONS.length) return;
  state.missionStep++;
  renderMissionBanner();
  const m = currentMission();
  notify(`Objective updated: ${m.title}`, 'mission');
}

function checkMissionProgress(){
  // loop so that completing several conditions in one action (e.g. a locker
  // that both unlocks and gives an item) advances through all eligible steps
  let keepGoing = true;
  while (keepGoing){
    keepGoing = false;
    switch(state.missionStep){
      case 1:
        advanceMission(); keepGoing = true; // waking up completes as soon as the game starts
        break;
      case 2:
        if (state.visitedRooms.has('CENTRAL_HALL')){ advanceMission(); keepGoing = true; }
        break;
      case 3:
        if (state.inventory.includes('WRENCH')){ advanceMission(); keepGoing = true; }
        break;
      case 4:
        if (state.flags.lockerUnlocked){ advanceMission(); keepGoing = true; }
        break;
      case 5:
        if (state.inventory.includes('ID_CARD')){ advanceMission(); keepGoing = true; }
        break;
      case 6:
        if (state.visitedRooms.has('CONTROL_ROOM')){ advanceMission(); keepGoing = true; }
        break;
      case 7:
        if (state.flags.controlHacked){ advanceMission(); keepGoing = true; }
        break;
      case 8:
        if (state.inventory.includes('DATA_DRIVE')){ advanceMission(); keepGoing = true; }
        break;
      case 9:
        if (state.visitedRooms.has('AI_CORE')){ advanceMission(); keepGoing = true; }
        break;
      case 10:
        if (state.flags.aiRestored){ advanceMission(); keepGoing = true; }
        break;
    }
  }
}

/* ---------------------------------------------------------------
   INVENTORY
   --------------------------------------------------------------- */
function giveItem(id){
  if (state.inventory.includes(id)) return;
  state.inventory.push(id);
  AUDIO.pickup();
  notify(`Picked up: ${ITEMS[id].icon} ${ITEMS[id].name}`, 'item');
  renderInventory();
  checkCollectorAchievement();
}
function checkCollectorAchievement(){
  if (ALL_COLLECTIBLE_IDS.every(id => state.inventory.includes(id))) unlockAchievement('COLLECTOR');
}
function renderInventory(){
  const grid = document.getElementById('inventoryGrid');
  if (state.inventory.length === 0){
    grid.innerHTML = `<div class="inv-empty">No items yet. Go explore the station.</div>`;
    return;
  }
  grid.innerHTML = state.inventory.map(id => {
    const it = ITEMS[id];
    return `<div class="inv-slot" title="${it.name}"><span class="inv-icon">${it.icon}</span><span class="inv-name">${it.name}</span></div>`;
  }).join('');
}
function toggleInventory(){
  const panel = document.getElementById('inventoryPanel');
  panel.classList.toggle('open');
}

/* ---------------------------------------------------------------
   PAUSE / MENUS
   --------------------------------------------------------------- */
function togglePause(){
  if (document.getElementById('inventoryPanel').classList.contains('open')){
    document.getElementById('inventoryPanel').classList.remove('open');
    return;
  }
  if (state.screen === 'playing'){
    state.screen = 'paused';
    document.getElementById('pauseMenu').classList.add('open');
  } else if (state.screen === 'paused'){
    state.screen = 'playing';
    document.getElementById('pauseMenu').classList.remove('open');
  }
}

/* ---------------------------------------------------------------
   INTERACTIONS
   --------------------------------------------------------------- */
function findNearestInteractive(){
  let best = null, bestDist = 78;
  for (const obj of INTERACTIVES){
    if (obj.room !== state.currentRoom) continue;
    const room = ROOMS[obj.room];
    const wx = room.x + obj.x, wy = room.y + obj.y;
    const d = Math.hypot(state.player.x - wx, state.player.y - wy);
    if (d < bestDist){ bestDist = d; best = obj; }
  }
  return best;
}

function doInteract(){
  const obj = state.nearestInteractive;
  if (!obj) return;
  const room = ROOMS[obj.room];

  switch(obj.kind){
    case 'crate': {
      if (state.openedCrates.has(obj.id)){ notify('The crate is empty.', 'info'); return; }
      state.openedCrates.add(obj.id);
      AUDIO.crateOpen();
      const loot = CRATE_LOOT_MAP[obj.id];
      if (loot) giveItem(loot); else notify('The crate is empty. Just spare bolts.', 'info');
      break;
    }
    case 'give': {
      if (state.inventory.includes(obj.gives)){ notify('Nothing left here.', 'info'); return; }
      giveItem(obj.gives);
      break;
    }
    case 'collectible': {
      if (state.inventory.includes(obj.item)){ return; }
      giveItem(obj.item);
      break;
    }
    case 'locker': {
      if (!obj.locked){ notify(obj.note || 'Empty.', 'info'); return; }
      if (state.flags.lockerUnlocked && obj.id==='storageLocker'){ notify('Already unlocked.', 'info'); return; }
      if (obj.requires && !state.inventory.includes(obj.requires)){
        AUDIO.doorDenied();
        notify(`Locked. Requires: ${ITEMS[obj.requires].name}`, 'denied');
        return;
      }
      AUDIO.doorOpen();
      notify('Access Granted', 'granted');
      if (obj.id === 'storageLocker') state.flags.lockerUnlocked = true;
      if (obj.gives) giveItem(obj.gives);
      checkMissionProgress();
      break;
    }
    case 'log': notify(obj.note, 'log'); break;
    case 'flavor': {
      notify(obj.note, 'info');
      if (obj.id === 'engConsole') { /* flavor only */ }
      break;
    }
    case 'secretSwitch': {
      if (state.flags.vaultUnlocked){ notify('The panel is already loose.', 'info'); return; }
      state.flags.vaultUnlocked = true;
      AUDIO.doorOpen();
      notify('Something shifts behind the wall...', 'granted');
      unlockAchievement('SECRET_FINDER');
      break;
    }
    case 'hackTerminal': {
      if (state.flags.controlHacked){ notify('Mainframe already accessed.', 'info'); return; }
      if (!state.inventory.includes('ID_CARD')){ notify('Terminal requires admin clearance.', 'denied'); return; }
      playHackCinematic();
      break;
    }
    case 'serverRack': {
      if (!state.flags.controlHacked){ notify('ACCESS DENIED — mainframe still encrypted.', 'denied'); AUDIO.doorDenied(); return; }
      if (state.inventory.includes('DATA_DRIVE')){ notify('The rack is empty now.', 'info'); return; }
      giveItem('DATA_DRIVE');
      checkMissionProgress();
      break;
    }
    case 'aiConsole': {
      if (state.flags.aiRestored){ notify('The AI is already online.', 'info'); return; }
      if (!state.inventory.includes('DATA_DRIVE')){ notify('The console needs a data source.', 'denied'); return; }
      playAiBootCinematic();
      break;
    }
    case 'reactor': {
      notify('Reactor output stable. Core temperature nominal.', 'info');
      unlockAchievement('ENGINEER');
      break;
    }
    case 'ending': {
      if (state.missionStep < 11){ notify('Docking clamps still engaged. Restore the AI first.', 'denied'); return; }
      if (state.flags.gameEnded) { notify('The pod has already launched.', 'info'); return; }
      playEndingCinematic();
      break;
    }
  }
  renderInventory();
}

/* ---------------------------------------------------------------
   CINEMATICS
   --------------------------------------------------------------- */
const cineOverlay = document.getElementById('cinematicOverlay');
const cineText = document.getElementById('cinematicText');
const cineSkip = document.getElementById('cinematicSkip');

function playCinematic(lines, onComplete, opts={}){
  state.screen = 'cinematic';
  cineOverlay.classList.add('open');
  if (opts.className) cineOverlay.classList.add(opts.className);
  let i = 0;
  let typing = false;
  let charTimer = null;

  function typeLine(){
    typing = true;
    cineText.textContent = '';
    const line = lines[i];
    let c = 0;
    clearInterval(charTimer);
    charTimer = setInterval(()=>{
      cineText.textContent = line.slice(0, c+1);
      c++;
      AUDIO.terminalBeep && (c % 3 === 0) && AUDIO.tone(700+Math.random()*100, 0.02, 'square', 0.03);
      if (c >= line.length){ clearInterval(charTimer); typing = false; }
    }, opts.speed || 28);
  }
  function advance(){
    if (typing){ clearInterval(charTimer); cineText.textContent = lines[i]; typing = false; return; }
    i++;
    if (i >= lines.length){ finish(); return; }
    typeLine();
  }
  function finish(){
    clearInterval(charTimer);
    cineOverlay.classList.remove('open');
    if (opts.className) cineOverlay.classList.remove(opts.className);
    cineOverlay.removeEventListener('click', advance);
    cineSkip.removeEventListener('click', finish);
    state.screen = 'playing';
    if (onComplete) onComplete();
  }
  cineOverlay.addEventListener('click', advance);
  cineSkip.onclick = finish;
  typeLine();
}

function playIntroCinematic(){
  playCinematic([
    'SYSTEM: Emergency cryo-wake initiated.',
    'You are the last crew member aboard the deep-space station DERELICT.',
    'Life support: stable. Communications: offline. AI Core: unresponsive.',
    'Find a way to restore the station — and get yourself home.',
  ], () => { checkMissionProgress(); }, {className:'cine-intro'});
}

function playHackCinematic(){
  playCinematic([
    'ACCESSING MAINFRAME...',
    'BYPASSING FIREWALL LAYER 1... LAYER 2... LAYER 3...',
    'DECRYPTING ADMIN CREDENTIALS...',
    'ACCESS GRANTED.',
  ], () => {
    state.flags.controlHacked = true;
    AUDIO.hackSuccess();
    unlockAchievement('HACKER');
    checkMissionProgress();
    notify('Mainframe access granted.', 'granted');
  }, {className:'cine-hack', speed:22});
}

function playAiBootCinematic(){
  playCinematic([
    'AI CORE — REBOOTING...',
    'LOADING NEURAL LATTICE... 42%... 87%... 100%.',
    'AI: "...systems restored. Thank you for finding me."',
    'AI: "I am detecting a signal from beyond the debris field. You should see this."',
  ], () => {
    state.flags.aiRestored = true;
    AUDIO.speak('Systems restored. Thank you for finding me.', {pitch:0.5});
    unlockAchievement('AI_RESTORER');
    checkMissionProgress();
  }, {className:'cine-ai', speed:24});
}

function playEndingCinematic(){
  playCinematic([
    'Docking clamps release. The pod drifts free of the DERELICT.',
    'AI: "Station systems will hold. Good luck out there."',
    'STATION SAVIOR — you restored the DERELICT and found your way home.',
  ], () => {
    state.flags.gameEnded = true;
    unlockAchievement('STATION_SAVIOR');
    playTeaserCinematic();
  }, {className:'cine-ending', speed:26});
}

function playTeaserCinematic(){
  playCinematic([
    'Somewhere past the debris field, a second signal repeats itself...',
    'CHAPTER 2: DEEP SIGNAL',
    'TO BE CONTINUED...',
  ], () => { notify('Thanks for playing!', 'info'); }, {className:'cine-teaser', speed:34});
}

/* ---------------------------------------------------------------
   UPDATE LOOP
   --------------------------------------------------------------- */
let lastTime = performance.now();
function update(dt){
  state.time += dt;

  if (state.screen !== 'playing') return;

  // movement input
  let dx = 0, dy = 0;
  if (state.keys['w'] || state.keys['arrowup']) dy -= 1;
  if (state.keys['s'] || state.keys['arrowdown']) dy += 1;
  if (state.keys['a'] || state.keys['arrowleft']) dx -= 1;
  if (state.keys['d'] || state.keys['arrowright']) dx += 1;
  if (state.joystick.active){ dx += state.joystick.dx; dy += state.joystick.dy; }

  const len = Math.hypot(dx,dy);
  let moving = false;
  if (len > 0.15){
    moving = true;
    dx /= (len < 1 ? 1 : len); dy /= (len < 1 ? 1 : len);
    const p = state.player;
    const step = p.speed * dt;
    const nx = p.x + dx*step, ny = p.y + dy*step;

    if (isWalkable(nx, p.y, p.r) && !blockedByLockedDoor(nx, p.y, p.r)) p.x = nx;
    if (isWalkable(p.x, ny, p.r) && !blockedByLockedDoor(p.x, ny, p.r)) p.y = ny;

    if (Math.abs(dx) > Math.abs(dy)) p.facing = dx > 0 ? 'right' : 'left';
    else p.facing = dy > 0 ? 'down' : 'up';

    if (state.missionStep === 1) checkMissionProgress();
  }
  state.player.moving = moving;

  // footstep sfx throttling
  state._stepTimer = (state._stepTimer || 0) - dt;
  if (moving && state._stepTimer <= 0){ AUDIO.footstep(); state._stepTimer = 0.28; }

  // camera follow (lerp)
  state.camera.x += (state.player.x - state.camera.x) * Math.min(1, dt*6);
  state.camera.y += (state.player.y - state.camera.y) * Math.min(1, dt*6);

  // current room tracking
  const r = roomAt(state.player.x, state.player.y);
  if (r && r.id !== state.currentRoom){
    state.currentRoom = r.id;
    onEnterRoom(r);
  }

  // nearest interactive + prompt
  const obj = findNearestInteractive();
  state.nearestInteractive = obj;
  const prompt = document.getElementById('interactPrompt');
  if (obj){ prompt.style.display = 'block'; prompt.textContent = `[E] ${obj.label}`; }
  else prompt.style.display = 'none';

  // door proximity denial feedback
  for (const door of DOORS){
    if (!isDoorLocked(door)) continue;
    if (door.secret && !doorVisible(door)) continue;
    const d = Math.hypot(state.player.x - door.gate.x, state.player.y - door.gate.y);
    if (d < 70 && state.time - state.lastDeniedAt > 1.2){
      const rect = doorBarrierRect(door);
      if (insideExpanded(state.player.x, state.player.y, rect, state.player.r + 40)){
        state.lastDeniedAt = state.time;
        AUDIO.doorDenied();
        const req = door.requires;
        const reqText = req.item ? ITEMS[req.item].name : req.flag ? 'a hidden mechanism' : 'clearance';
        notify(`ACCESS DENIED — requires ${reqText}`, 'denied');
      }
    }
  }
}

function onEnterRoom(r){
  state.visitedRooms.add(r.id);
  showRoomBanner(r);
  if (state.visitedRooms.size === 2) unlockAchievement('FIRST_STEPS');
  if (EXPLORER_ROOMS.every(id => state.visitedRooms.has(id))) unlockAchievement('EXPLORER');
  if (r.id === 'HIDDEN_VAULT') unlockAchievement('SECRET_FINDER');
  checkMissionProgress();

  if (!state.flags.warnedEngine && (r.id === 'ENGINE_ROOM' || r.id === 'POWER_REACTOR')){
    state.flags.warnedEngine = true;
    triggerEmergencyWarning();
  }
}

let roomBannerTimer = null;
function showRoomBanner(r){
  const el = document.getElementById('roomBanner');
  el.innerHTML = `<span class="room-icon">${r.icon}</span> ${r.name}`;
  el.classList.add('show');
  clearTimeout(roomBannerTimer);
  roomBannerTimer = setTimeout(()=> el.classList.remove('show'), 2200);
}

function triggerEmergencyWarning(){
  AUDIO.alarm();
  document.body.classList.add('alarm-flash');
  notify('⚠ WARNING: Minor power fluctuation detected in Engine Room.', 'denied');
  setTimeout(()=> document.body.classList.remove('alarm-flash'), 2600);
}

/* ---------------------------------------------------------------
   RENDER
   --------------------------------------------------------------- */
const COLORS = {
  floor: '#5b616b',        // medium metallic grey
  floorAlt: '#545a63',
  floorCorridor: '#565c65',// opaque metallic corridor floor (no more see-through void)
  wall: '#2f333a',         // dark steel grey
  wallSeam: 'rgba(0,0,0,0.35)',
  doorBody: '#565b63',     // grey door leaf
  locked: '#ff3b5c',
  unlocked: '#3ff0e0',
};

/* Per-room lighting identity: a glow accent + a very soft ambient wash so
   each room reads as a distinct space without changing its layout. */
const ROOM_ACCENTS = {
  CENTRAL_HALL:      { glow:'#3ff0e0', ambient:'rgba(63,240,224,0.05)' },
  CREW_QUARTERS:     { glow:'#ffd9a0', ambient:'rgba(255,217,160,0.05)' },
  MEDICAL_BAY:       { glow:'#eaf6f6', ambient:'rgba(220,245,245,0.06)' },
  DERELICT_QUARTERS: { glow:'#6c7a8a', ambient:'rgba(108,122,138,0.04)' },
  CAFETERIA:         { glow:'#ffe27a', ambient:'rgba(255,226,122,0.05)' },
  BIO_LAB:           { glow:'#7dffb0', ambient:'rgba(125,255,176,0.05)' },
  CONTROL_ROOM:      { glow:'#5cc8ff', ambient:'rgba(92,200,255,0.05)' },
  AI_CORE:           { glow:'#8be9ff', ambient:'rgba(139,233,255,0.08)' },
  OBSERVATION_DECK:  { glow:'#9fd0ff', ambient:'rgba(159,208,255,0.05)' },
  STORAGE:           { glow:'#ffb347', ambient:'rgba(255,179,71,0.04)' },
  WORKSHOP:          { glow:'#ff8a3c', ambient:'rgba(255,138,60,0.07)' },
  COMMS_HUB:         { glow:'#3ff0e0', ambient:'rgba(63,240,224,0.05)' },
  EMPTY_ANNEX:       { glow:'#6c7a8a', ambient:'rgba(108,122,138,0.03)' },
  HIDDEN_VAULT:      { glow:'#ffd23f', ambient:'rgba(255,210,63,0.07)' },
  ENGINE_ROOM:       { glow:'#ff8a3c', ambient:'rgba(255,138,60,0.05)' },
  POWER_REACTOR:     { glow:'#8a6bff', ambient:'rgba(138,107,255,0.09)' }, // purple/blue energy
  AIRLOCK_DOCKING:   { glow:'#9fe8ff', ambient:'rgba(159,232,255,0.06)' },
};

/* Decorative window panels set into specific room walls. Purely visual —
   they don't affect collision, doors, or the map layout. This is the ONLY
   place the starfield/space shows through from inside the station. */
const WINDOWS = [
  { room:'OBSERVATION_DECK', side:'top',   inset:50, thickness:24, big:true },
  { room:'CENTRAL_HALL',     side:'top',   inset:120, thickness:18 },
  { room:'AIRLOCK_DOCKING',  side:'right', inset:50, thickness:18 },
  { room:'COMMS_HUB',        side:'top',   inset:70, thickness:16 },
  { room:'AI_CORE',          side:'top',   inset:70, thickness:16 },
];

function hexToRgb(hex){
  hex = hex.replace('#','');
  if (hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
  const num = parseInt(hex,16);
  return `${(num>>16)&255},${(num>>8)&255},${num&255}`;
}
function roundRectPath(c,x,y,w,h,r){
  c.beginPath();
  c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r);
  c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath();
}

function worldToScreen(x,y){
  return { x: x - state.camera.x + canvas.width/2, y: y - state.camera.y + canvas.height/2 };
}

function render(){
  drawSpaceVoid();

  ctx.save();
  ctx.translate(canvas.width/2 - state.camera.x, canvas.height/2 - state.camera.y);

  // corridors — fully opaque metallic decking, never see-through
  for (const door of DOORS){
    if (door.secret && !doorVisible(door)) continue;
    const c = door.corridor;
    ctx.fillStyle = COLORS.floorCorridor;
    ctx.fillRect(c.x, c.y, c.w, c.h);
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(c.x+1, c.y+1, c.w-2, c.h-2);
  }

  // rooms
  for (const r of ROOM_LIST){
    if (r.secret && !state.visitedRooms.has(r.id) && !state.flags.vaultUnlocked) continue;
    drawRoom(r);
  }

  // doors (drawn after rooms so they sit on top of walls)
  for (const door of DOORS){
    if (door.secret && !doorVisible(door)) continue;
    drawDoor(door);
  }

  // interactive objects
  for (const obj of INTERACTIVES){
    const room = ROOMS[obj.room];
    if (room.secret && !doorVisibleForRoom(room)) continue;
    drawInteractive(obj, room);
  }

  drawDust();
  drawPlayer();

  ctx.restore();

  drawMinimap();
  renderDebug();
}

function doorVisibleForRoom(room){
  if (!room.secret) return true;
  return state.visitedRooms.has(room.id) || state.flags.vaultUnlocked;
}

function drawRoom(r){
  const accent = ROOM_ACCENTS[r.id] || ROOM_ACCENTS.CENTRAL_HALL;
  const pulse = 0.5 + 0.5*Math.sin(state.time*1.1); // slow, subtle — not blinky
  const seed = Math.abs(Math.sin(r.x*0.013 + r.y*0.021)) * 1000;

  // base metallic floor
  ctx.fillStyle = COLORS.floor;
  ctx.fillRect(r.x, r.y, r.w, r.h);

  // metallic floor tiles (checker of subtly different shades = worn panels)
  const TILE = 52;
  for (let ty = r.y; ty < r.y+r.h; ty += TILE){
    for (let tx = r.x; tx < r.x+r.w; tx += TILE){
      const alt = (Math.round((tx-r.x)/TILE) + Math.round((ty-r.y)/TILE)) % 2 === 0;
      ctx.fillStyle = alt ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.05)';
      ctx.fillRect(tx, ty, Math.min(TILE, r.x+r.w-tx), Math.min(TILE, r.y+r.h-ty));
    }
  }
  ctx.strokeStyle = 'rgba(0,0,0,0.18)';
  ctx.lineWidth = 1;
  for (let gx = r.x; gx <= r.x+r.w; gx += TILE){ ctx.beginPath(); ctx.moveTo(gx,r.y); ctx.lineTo(gx,r.y+r.h); ctx.stroke(); }
  for (let gy = r.y; gy <= r.y+r.h; gy += TILE){ ctx.beginPath(); ctx.moveTo(r.x,gy); ctx.lineTo(r.x+r.w,gy); ctx.stroke(); }

  // soft reflective sheen across the metal floor
  const sheen = ctx.createLinearGradient(r.x, r.y, r.x+r.w, r.y+r.h);
  sheen.addColorStop(0, 'rgba(255,255,255,0.05)');
  sheen.addColorStop(0.5, 'rgba(255,255,255,0)');
  sheen.addColorStop(1, 'rgba(255,255,255,0.03)');
  ctx.fillStyle = sheen;
  ctx.fillRect(r.x, r.y, r.w, r.h);

  // light wear scuffs, deterministic per room (no flicker, just texture)
  for (let i=0;i<12;i++){
    const rx = r.x + ((seed*13+i*57) % (r.w-24)) + 12;
    const ry = r.y + ((seed*7+i*91) % (r.h-24)) + 12;
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.beginPath(); ctx.ellipse(rx, ry, 9+((i*13)%6), 3.5+((i*7)%3), i*0.7, 0, 7); ctx.fill();
  }

  // soft ambient room-tinted light wash — helps distinguish rooms
  const cx = r.x+r.w/2, cy = r.y+r.h/2;
  const ambientGrad = ctx.createRadialGradient(cx,cy,10,cx,cy,Math.max(r.w,r.h)*0.7);
  ambientGrad.addColorStop(0, accent.ambient);
  ambientGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = ambientGrad;
  ctx.fillRect(r.x, r.y, r.w, r.h);

  // dark steel walls with panel seams
  ctx.strokeStyle = COLORS.wall;
  ctx.lineWidth = 12;
  ctx.strokeRect(r.x, r.y, r.w, r.h);
  ctx.strokeStyle = COLORS.wallSeam;
  ctx.lineWidth = 1;
  const seam = 48;
  for (let gx = r.x+seam; gx < r.x+r.w; gx += seam){
    ctx.beginPath(); ctx.moveTo(gx, r.y-6); ctx.lineTo(gx, r.y+6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gx, r.y+r.h-6); ctx.lineTo(gx, r.y+r.h+6); ctx.stroke();
  }

  // glowing edge trim — only pronounced for "important" rooms, dim elsewhere
  const isFeatureRoom = r.id==='POWER_REACTOR' || r.id==='AI_CORE' || r.id==='HIDDEN_VAULT';
  ctx.strokeStyle = accent.glow;
  ctx.globalAlpha = isFeatureRoom ? (0.45 + 0.15*pulse) : 0.16;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(r.x+6, r.y+6, r.w-12, r.h-12);
  ctx.globalAlpha = 1;

  // reactor: dark metal core with purple/blue energy glow
  if (r.id === 'POWER_REACTOR'){
    const grad = ctx.createRadialGradient(cx,cy,10,cx,cy,200);
    grad.addColorStop(0, `rgba(138,107,255,${0.26+0.1*pulse})`);
    grad.addColorStop(1, 'rgba(138,107,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(r.x-80,r.y-80,r.w+160,r.h+160);
  }
  // AI core: white/black/cyan futuristic glow
  if (r.id === 'AI_CORE'){
    const grad = ctx.createRadialGradient(cx,cy,10,cx,cy,190);
    grad.addColorStop(0, `rgba(139,233,255,${0.22+0.12*pulse})`);
    grad.addColorStop(1, 'rgba(139,233,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(r.x-70,r.y-70,r.w+140,r.h+140);
  }

  // room label
  ctx.font = '600 15px "Rajdhani", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.textAlign = 'left';
  ctx.fillText(`${r.icon} ${r.name}`, r.x+16, r.y+26);

  // window panels set into this room's wall (space visible only here)
  drawWindowsForRoom(r);

  // decorative lights — fewer, dimmer, slower (no more excessive blinking)
  for (let i=0;i<2;i++){
    const bx = r.x + 40 + i*(r.w-80);
    const by = r.y + r.h - 18;
    const flicker = 0.55 + 0.45*Math.sin(state.time*0.6 + i*3 + seed);
    ctx.fillStyle = `rgba(${hexToRgb(accent.glow)},${0.3*flicker})`;
    ctx.beginPath(); ctx.arc(bx,by,3.5,0,7); ctx.fill();
  }
}

function windowRect(win){
  const r = ROOMS[win.room];
  if (win.side === 'top')    return { x:r.x+win.inset, y:r.y-2, w:r.w-2*win.inset, h:win.thickness };
  if (win.side === 'bottom') return { x:r.x+win.inset, y:r.y+r.h-win.thickness+2, w:r.w-2*win.inset, h:win.thickness };
  if (win.side === 'left')   return { x:r.x-2, y:r.y+win.inset, w:win.thickness, h:r.h-2*win.inset };
  return { x:r.x+r.w-win.thickness+2, y:r.y+win.inset, w:win.thickness, h:r.h-2*win.inset }; // right
}

function drawWindowsForRoom(r){
  for (const win of WINDOWS){ if (win.room === r.id) drawWindow(windowRect(win), win.big); }
}

const _winStarCache = {};
function drawWindow(rect, big){
  // deep space glass — the only place stars are visible from inside the station
  const grad = ctx.createLinearGradient(rect.x, rect.y, rect.x+rect.w, rect.y+rect.h);
  grad.addColorStop(0, '#05060c');
  grad.addColorStop(1, '#0a0e18');
  ctx.fillStyle = grad;
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);

  const key = `${rect.x}_${rect.y}_${rect.w}_${rect.h}`;
  if (!_winStarCache[key]){
    const pts = [];
    const n = big ? 30 : 14;
    for (let i=0;i<n;i++) pts.push({ x:Math.random()*rect.w, y:Math.random()*rect.h, s:Math.random()*1.3+0.3, tw:Math.random()*6 });
    _winStarCache[key] = pts;
  }
  for (const s of _winStarCache[key]){
    const alpha = 0.4 + 0.5*Math.sin(state.time*1.1 + s.tw);
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0,alpha)})`;
    ctx.beginPath(); ctx.arc(rect.x+s.x, rect.y+s.y, s.s, 0, 7); ctx.fill();
  }

  if (big){
    const px = rect.x+rect.w*0.72, py = rect.y+rect.h*0.5, pr = Math.min(rect.h*1.6, 22);
    const pgrad = ctx.createRadialGradient(px-pr*0.3, py-pr*0.3, 1, px, py, pr);
    pgrad.addColorStop(0,'#8fd6ff'); pgrad.addColorStop(0.6,'#3f6fb0'); pgrad.addColorStop(1,'#0a1830');
    ctx.fillStyle = pgrad;
    ctx.beginPath(); ctx.arc(px,py,pr,0,7); ctx.fill();
  } else {
    const nx = rect.x+rect.w*0.3, ny = rect.y+rect.h*0.5;
    const ngrad = ctx.createRadialGradient(nx,ny,1,nx,ny,Math.max(rect.w,rect.h)*0.9);
    ngrad.addColorStop(0,'rgba(138,107,255,0.22)');
    ngrad.addColorStop(1,'rgba(138,107,255,0)');
    ctx.fillStyle = ngrad;
    ctx.fillRect(rect.x-10, rect.y-10, rect.w+20, rect.h+20);
  }

  // metallic window frame with rivets
  ctx.strokeStyle = '#8b909a'; ctx.lineWidth = 4;
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1;
  ctx.strokeRect(rect.x+2, rect.y+2, rect.w-4, rect.h-4);
  ctx.fillStyle = '#c8ccd2';
  const rivetGap = 30;
  if (rect.w >= rect.h){
    for (let rx=rect.x+8; rx<rect.x+rect.w-4; rx+=rivetGap){
      ctx.beginPath(); ctx.arc(rx, rect.y+2, 1.6,0,7); ctx.fill();
      ctx.beginPath(); ctx.arc(rx, rect.y+rect.h-2, 1.6,0,7); ctx.fill();
    }
  } else {
    for (let ry=rect.y+8; ry<rect.y+rect.h-4; ry+=rivetGap){
      ctx.beginPath(); ctx.arc(rect.x+2, ry, 1.6,0,7); ctx.fill();
      ctx.beginPath(); ctx.arc(rect.x+rect.w-2, ry, 1.6,0,7); ctx.fill();
    }
  }
}

function drawDoor(door){
  const locked = isDoorLocked(door);
  const c = door.corridor;
  const horizontal = c.w > c.h;
  const distToPlayer = Math.hypot(state.player.x-door.gate.x, state.player.y-door.gate.y);
  const openAmt = (!locked && distToPlayer < 150) ? Math.min(1,(150-distToPlayer)/90) : 0;
  const glow = locked ? COLORS.locked : COLORS.unlocked;

  ctx.save();
  ctx.translate(door.gate.x, door.gate.y);

  const leafLen = (horizontal ? c.h : c.w) / 2 - 6;
  const thickness = 18;

  // dark steel frame around the doorway
  ctx.fillStyle = '#26292f';
  if (horizontal) ctx.fillRect(-thickness/2-3, -leafLen-8, thickness+6, leafLen*2+16);
  else ctx.fillRect(-leafLen-8, -thickness/2-3, leafLen*2+16, thickness+6);

  // grey metal leaves
  ctx.fillStyle = COLORS.doorBody;
  ctx.shadowColor = glow;
  ctx.shadowBlur = 9;
  if (horizontal){
    const gap = openAmt * leafLen;
    ctx.fillRect(-thickness/2, -leafLen, thickness, leafLen-gap);
    ctx.fillRect(-thickness/2, gap, thickness, leafLen-gap);
  } else {
    const gap = openAmt * leafLen;
    ctx.fillRect(-leafLen, -thickness/2, leafLen-gap, thickness);
    ctx.fillRect(gap, -thickness/2, leafLen-gap, thickness);
  }
  ctx.shadowBlur = 0;

  // glowing cyan/red edge trim on each leaf
  ctx.strokeStyle = glow;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.85;
  if (horizontal){
    const gap = openAmt * leafLen;
    ctx.strokeRect(-thickness/2, -leafLen, thickness, leafLen-gap);
    ctx.strokeRect(-thickness/2, gap, thickness, leafLen-gap);
  } else {
    const gap = openAmt * leafLen;
    ctx.strokeRect(-leafLen, -thickness/2, leafLen-gap, thickness);
    ctx.strokeRect(gap, -thickness/2, leafLen-gap, thickness);
  }
  ctx.globalAlpha = 1;

  // scanner sweep for locked doors
  if (locked){
    const sweep = (Math.sin(state.time*2.2) + 1) / 2;
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = '#ff3b5c';
    if (horizontal) ctx.fillRect(-thickness/2, -leafLen + sweep*leafLen*2 - 3, thickness, 6);
    else ctx.fillRect(-leafLen + sweep*leafLen*2 - 3, -thickness/2, 6, thickness);
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

/* themed badge + glow color per interactive kind (terminals green/cyan,
   reactor purple/blue, crates yellow/black hazard stripe, etc.) */
function interactiveTheme(obj){
  switch(obj.kind){
    case 'hackTerminal': case 'serverRack': case 'bioTerminal':
      return { bg:'#22262c', glow:'#57ffb0' };
    case 'aiConsole': return { bg:'#1c1f24', glow:'#8be9ff' };
    case 'reactor':   return { bg:'#22242b', glow:'#8a6bff' };
    case 'crate':     return { bg:'#5a5f68', glow:'#ffcc33', stripe:true };
    case 'locker':    return { bg:'#4d525a', glow:'#5cc8ff' };
    case 'give':      return { bg:'#3a3d44', glow:'#ff8a3c' };
    case 'secretSwitch': return { bg:'#3a3d44', glow:'#ffd23f' };
    case 'log':       return { bg:'#2a2d33', glow:'#7fd8ff' };
    case 'collectible': return { bg:null, glow:'#ffd23f' };
    default: return { bg:'#33373f', glow:'#3ff0e0' };
  }
}

function drawInteractive(obj, room){
  const wx = room.x + obj.x, wy = room.y + obj.y;
  const used = (obj.kind==='crate' && state.openedCrates.has(obj.id)) ||
               (obj.kind==='collectible' && state.inventory.includes(obj.item)) ||
               (obj.kind==='give' && state.inventory.includes(obj.gives));
  const isNearest = state.nearestInteractive === obj;
  const theme = interactiveTheme(obj);

  ctx.save();
  ctx.globalAlpha = used ? 0.3 : 1;

  if (theme.bg){
    ctx.fillStyle = theme.bg;
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 1;
    roundRectPath(ctx, wx-22, wy-22, 44, 44, 6);
    ctx.fill(); ctx.stroke();
    if (theme.stripe){
      ctx.save();
      roundRectPath(ctx, wx-22, wy-22, 44, 44, 6);
      ctx.clip();
      ctx.strokeStyle = '#ffcc33'; ctx.lineWidth = 6;
      for (let i=-40;i<44;i+=12){
        ctx.beginPath(); ctx.moveTo(wx-22+i, wy-22); ctx.lineTo(wx-22+i+44, wy+22); ctx.stroke();
      }
      ctx.restore();
    }
  }

  if (!used){
    const glowR = isNearest ? 26 : 16;
    const g = ctx.createRadialGradient(wx,wy,1,wx,wy,glowR);
    g.addColorStop(0, `${theme.glow}aa`);
    g.addColorStop(1, `${theme.glow}00`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(wx,wy,glowR,0,7); ctx.fill();
  }

  if (isNearest){
    ctx.beginPath();
    ctx.arc(wx, wy, 34 + 3*Math.sin(state.time*5), 0, 7);
    ctx.strokeStyle = '#3ff0e0';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.font = '26px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(obj.icon, wx, wy);
  ctx.restore();
}

/* ambient dust particles */
const DUST = Array.from({length: 90}, () => ({
  x: (Math.random()-0.5)*4000, y: (Math.random()-0.5)*3000,
  vx: (Math.random()-0.5)*6, vy: (Math.random()-0.5)*6, s: 1+Math.random()*2
}));
function drawDust(){
  ctx.fillStyle = 'rgba(220,230,240,0.12)';
  for (const p of DUST){
    if (Math.abs(p.x-state.player.x) > 900 || Math.abs(p.y-state.player.y) > 700) continue;
    p.x += p.vx * (1/60); p.y += p.vy * (1/60);
    ctx.beginPath(); ctx.arc(p.x,p.y,p.s,0,7); ctx.fill();
  }
}

/* ---------------- deep space backdrop (outside the hull only) ---------------- */
const STARS = Array.from({length: 160}, () => ({ x: Math.random(), y: Math.random(), s: Math.random()*2+0.4, tw: Math.random()*6 }));
const NEBULAE = [
  { x:0.15, y:0.22, r:260, color:'99,110,255' },
  { x:0.82, y:0.68, r:220, color:'255,120,180' },
];
const PLANETS = [
  { x:0.86, y:0.16, r:46, c1:'#ffdca8', c2:'#8a5a2a' },
  { x:0.07, y:0.78, r:28, c1:'#9fd6ff', c2:'#274a78' },
];
let driftT = 0;
function drawSpaceVoid(){
  const g = ctx.createLinearGradient(0,0,0,canvas.height);
  g.addColorStop(0, '#05060c'); g.addColorStop(1, '#0a0d16');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  for (const n of NEBULAE){
    const nx = n.x*canvas.width, ny = n.y*canvas.height;
    const grad = ctx.createRadialGradient(nx,ny,1,nx,ny,n.r);
    grad.addColorStop(0, `rgba(${n.color},0.12)`);
    grad.addColorStop(1, `rgba(${n.color},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(nx-n.r, ny-n.r, n.r*2, n.r*2);
  }
  for (const p of PLANETS){
    const px = p.x*canvas.width, py = p.y*canvas.height;
    const grad = ctx.createRadialGradient(px-p.r*0.3, py-p.r*0.3, 1, px, py, p.r);
    grad.addColorStop(0, p.c1); grad.addColorStop(1, p.c2);
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(px,py,p.r,0,7); ctx.fill();
  }
  for (const s of STARS){
    const alpha = 0.35 + 0.5*Math.sin(state.time*1.1 + s.tw);
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0,alpha)})`;
    ctx.beginPath(); ctx.arc(s.x*canvas.width, s.y*canvas.height, s.s, 0, 7); ctx.fill();
  }

  driftT += 0.0006;
  const satX = ((driftT*canvas.width*0.6) % (canvas.width+200)) - 100;
  ctx.save();
  ctx.translate(satX, canvas.height*0.3);
  ctx.rotate(0.3);
  ctx.fillStyle = 'rgba(200,205,215,0.5)';
  ctx.fillRect(-14,-3,28,6);
  ctx.fillRect(-3,-10,6,20);
  ctx.restore();

  const astX = ((driftT*canvas.width*0.35 + 300) % (canvas.width+300)) - 150;
  ctx.save();
  ctx.translate(astX, canvas.height*0.72);
  ctx.fillStyle = 'rgba(120,115,110,0.6)';
  ctx.beginPath(); ctx.ellipse(0,0,10,7,0.4,0,7); ctx.fill();
  ctx.restore();
}

let walkCycle = 0;
function drawPlayer(){
  const p = state.player;
  const moving = state._stepTimer !== undefined && (state.keys['w']||state.keys['a']||state.keys['s']||state.keys['d']||
    state.keys['arrowup']||state.keys['arrowdown']||state.keys['arrowleft']||state.keys['arrowright']||state.joystick.active);
  walkCycle += (moving ? 1 : 0) * 0.18;
  const bob = moving ? Math.sin(walkCycle) * 3 : 0;

  ctx.save();
  ctx.translate(p.x, p.y);

  // soft grounded shadow so the sprite reads as standing on the floor
  ctx.save();
  ctx.scale(1, 0.35);
  const shadowGrad = ctx.createRadialGradient(0, p.r*1.6, 2, 0, p.r*1.6, 26);
  shadowGrad.addColorStop(0, 'rgba(0,0,0,0.55)');
  shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = shadowGrad;
  ctx.beginPath(); ctx.arc(0, p.r*1.6, 26, 0, 7); ctx.fill();
  ctx.restore();

  // faint cyan presence glow behind the sprite
  const grad = ctx.createRadialGradient(0,0,2,0,0,30);
  grad.addColorStop(0,'rgba(63,240,224,0.35)');
  grad.addColorStop(1,'rgba(63,240,224,0)');
  ctx.fillStyle = grad;
  ctx.beginPath(); ctx.arc(0,0,30,0,7); ctx.fill();

  ctx.translate(0, bob);
  if (p.facing === 'left') ctx.scale(-1, 1); // sprite art faces right by default

  if (playerImg.complete && playerImg.naturalWidth){
    ctx.drawImage(playerImg, -PLAYER_SPRITE_W/2, -PLAYER_SPRITE_H + p.r*0.6, PLAYER_SPRITE_W, PLAYER_SPRITE_H);
  } else {
    // fallback while the image loads
    ctx.fillStyle = '#e8fdfb';
    ctx.strokeStyle = '#3ff0e0';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0,0,p.r,0,7); ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}

/* ---------------------------------------------------------------
   MINIMAP
   --------------------------------------------------------------- */
function drawMinimap(){
  mmCtx.clearRect(0,0,mmCanvas.width,mmCanvas.height);
  const scale = 0.045;
  const cx = mmCanvas.width/2, cy = mmCanvas.height/2;
  const ox = state.player.x*scale, oy = state.player.y*scale;

  mmCtx.save();
  mmCtx.translate(cx-ox, cy-oy);

  for (const r of ROOM_LIST){
    if (r.secret && !state.visitedRooms.has(r.id)) continue;
    const known = state.visitedRooms.has(r.id);
    mmCtx.fillStyle = known ? (r.id===state.currentRoom ? 'rgba(63,240,224,0.55)' : 'rgba(120,140,170,0.35)') : 'rgba(80,80,90,0.15)';
    mmCtx.fillRect(r.x*scale, r.y*scale, r.w*scale, r.h*scale);
    mmCtx.strokeStyle = r.id===state.currentRoom ? '#3ff0e0' : 'rgba(255,255,255,0.2)';
    mmCtx.lineWidth = r.id===state.currentRoom ? 2 : 1;
    mmCtx.strokeRect(r.x*scale, r.y*scale, r.w*scale, r.h*scale);
  }
  for (const door of DOORS){
    if (door.secret && !doorVisible(door)) continue;
    const locked = isDoorLocked(door);
    mmCtx.fillStyle = locked ? '#ff3b5c' : '#3ff0e0';
    mmCtx.beginPath();
    mmCtx.arc(door.gate.x*scale, door.gate.y*scale, 2.5, 0, 7);
    mmCtx.fill();
  }
  mmCtx.fillStyle = '#fff';
  mmCtx.beginPath();
  mmCtx.arc(state.player.x*scale, state.player.y*scale, 4, 0, 7);
  mmCtx.fill();
  mmCtx.restore();

  mmCtx.strokeStyle = 'rgba(63,240,224,0.6)';
  mmCtx.lineWidth = 2;
  mmCtx.strokeRect(1,1,mmCanvas.width-2,mmCanvas.height-2);
}

/* ---------------------------------------------------------------
   DEBUG OVERLAY
   --------------------------------------------------------------- */
function renderDebug(){
  if (!state.debug) return;
  const el = document.getElementById('debugOverlay');
  el.textContent =
`room: ${state.currentRoom}
player: ${state.player.x.toFixed(0)}, ${state.player.y.toFixed(0)}
mission step: ${state.missionStep}
inventory: ${state.inventory.join(', ') || '-'}
flags: ${JSON.stringify(state.flags)}
visited: ${state.visitedRooms.size}/${ALL_ROOM_IDS.length}
achievements: ${state.achievements.size}/${Object.keys(ACHIEVEMENTS).length}
console: OK`;
}

/* ---------------------------------------------------------------
   MAIN LOOP
   --------------------------------------------------------------- */
function loop(now){
  const dt = Math.min(0.05, (now - lastTime)/1000);
  lastTime = now;
  update(dt);
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

/* ---------------------------------------------------------------
   GAME LIFECYCLE (menu / new game / save / load)
   --------------------------------------------------------------- */
function resetState(){
  state.player.x = startRoom.x + startRoom.w/2;
  state.player.y = startRoom.y + startRoom.h/2;
  state.currentRoom = 'CREW_QUARTERS';
  state.inventory = [];
  state.missionStep = 1;
  state.flags = { vaultUnlocked:false, controlHacked:false, aiRestored:false, gameEnded:false, warnedEngine:false, lockerUnlocked:false };
  state.visitedRooms = new Set(['CREW_QUARTERS']);
  state.openedCrates = new Set();
  state.achievements = new Set();
  renderInventory();
  renderMissionBanner();
}

function startNewGame(){
  resetState();
  document.getElementById('mainMenu').classList.remove('open');
  state.screen = 'playing';
  AUDIO.startMusic();
  playIntroCinematic();
}

function resumeGame(save){
  state.player.x = save.player.x; state.player.y = save.player.y; state.player.facing = save.player.facing || 'down';
  state.currentRoom = save.currentRoom;
  state.inventory = save.inventory;
  state.missionStep = save.missionStep;
  state.flags = save.flags;
  state.visitedRooms = save.visitedRooms;
  state.openedCrates = save.openedCrates;
  state.achievements = save.achievements;
  renderInventory();
  renderMissionBanner();
  document.getElementById('mainMenu').classList.remove('open');
  state.screen = 'playing';
  AUDIO.startMusic();
  notify('Progress restored.', 'info');
}

document.getElementById('newGameBtn').addEventListener('click', () => { AUDIO.click(); startNewGame(); });
document.getElementById('continueBtn').addEventListener('click', () => {
  AUDIO.click();
  const save = SaveSystem.load();
  if (save) resumeGame(save); else startNewGame();
});
document.getElementById('instructionsBtn').addEventListener('click', () => {
  AUDIO.click();
  document.getElementById('mainMenu').classList.remove('open');
  document.getElementById('instructionsScreen').classList.add('open');
});
document.getElementById('creditsBtn').addEventListener('click', () => {
  AUDIO.click();
  document.getElementById('mainMenu').classList.remove('open');
  document.getElementById('creditsScreen').classList.add('open');
});
document.querySelectorAll('.back-to-menu').forEach(btn => btn.addEventListener('click', () => {
  AUDIO.click();
  document.querySelectorAll('.fullscreen-menu').forEach(m => m.classList.remove('open'));
  document.getElementById('mainMenu').classList.add('open');
}));

document.getElementById('resumeBtn').addEventListener('click', () => { AUDIO.click(); togglePause(); });
document.getElementById('saveBtn').addEventListener('click', () => {
  AUDIO.click();
  const ok = SaveSystem.save(state);
  notify(ok ? 'Game saved.' : 'Save failed.', ok ? 'granted' : 'denied');
});
document.getElementById('loadBtn').addEventListener('click', () => {
  AUDIO.click();
  const save = SaveSystem.load();
  if (!save){ notify('No save found.', 'denied'); return; }
  document.getElementById('pauseMenu').classList.remove('open');
  resumeGame(save);
});
document.getElementById('quitBtn').addEventListener('click', () => {
  AUDIO.click();
  document.getElementById('pauseMenu').classList.remove('open');
  document.getElementById('mainMenu').classList.add('open');
  state.screen = 'menu';
});

const musicToggle = document.getElementById('musicToggle');
const sfxToggle = document.getElementById('sfxToggle');
musicToggle.addEventListener('change', () => { AUDIO.toggleMusic(musicToggle.checked); saveSettings(); });
sfxToggle.addEventListener('change', () => { AUDIO.toggleSfx(sfxToggle.checked); saveSettings(); });
function saveSettings(){ SaveSystem.saveSettings({ music: musicToggle.checked, sfx: sfxToggle.checked }); }
(function loadSettings(){
  const s = SaveSystem.loadSettings();
  if (s){ musicToggle.checked = s.music; sfxToggle.checked = s.sfx; AUDIO.toggleMusic(s.music); AUDIO.toggleSfx(s.sfx); }
})();

document.getElementById('continueBtn').style.display = SaveSystem.hasSave() ? 'block' : 'none';

renderMissionBanner();
renderInventory();

