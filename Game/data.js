/* ================================================================
   DERELICT — game data
   All rooms, doors, items, missions and achievements live here.
   Coordinates are in "world units" (px at 1:1 zoom).

   LAYOUT: a real spaceship "spine" — Central Hall is the hub, with a
   vertical corridor running north through Comms Hub, Control Room,
   AI Core, up to the Observation Deck; a west wing through Bio Lab,
   Medical Bay, to the Empty Room; a south dead-end into Crew Quarters;
   and an east wing through Cafeteria, Storage, Workshop, Engine Room,
   Power Reactor, down to the Airlock & Docking Bay. The Hidden Vault
   is a secret side-room off Storage, reachable only through the
   hidden passage revealed by the loose wall panel.
   ================================================================ */

const ROOMS = {
  CENTRAL_HALL:     { id:'CENTRAL_HALL',     name:'Central Hall',          icon:'🏛️', x:-350, y:-300,  w:700, h:600, empty:false },

  // north spine: Central Hall -> Comms Hub -> Control Room -> AI Core -> Observation Deck
  COMMS_HUB:        { id:'COMMS_HUB',        name:'Communications Hub',    icon:'📡', x:-220, y:-910,  w:440, h:320, empty:false },
  CONTROL_ROOM:     { id:'CONTROL_ROOM',     name:'Control Room',          icon:'💻', x:-220, y:-1410, w:440, h:320, empty:false },
  AI_CORE:          { id:'AI_CORE',          name:'AI Core',               icon:'🤖', x:-220, y:-1910, w:440, h:320, empty:false },
  OBSERVATION_DECK: { id:'OBSERVATION_DECK', name:'Observation Deck',      icon:'🔭', x:-220, y:-2410, w:440, h:320, empty:false },

  // west wing: Central Hall -> Bio Lab -> Medical Bay -> Empty Room
  BIO_LAB:          { id:'BIO_LAB',          name:'Bio Lab',               icon:'🧪', x:-970, y:-160,  w:440, h:320, empty:false },
  MEDICAL_BAY:      { id:'MEDICAL_BAY',      name:'Medical Bay',           icon:'🏥', x:-970, y:340,   w:440, h:320, empty:false },
  EMPTY_ROOM:       { id:'EMPTY_ROOM',       name:'Empty Room',            icon:'🌑', x:-940, y:850,   w:380, h:300, empty:true  },

  // south dead-end
  CREW_QUARTERS:    { id:'CREW_QUARTERS',    name:'Crew Quarters',         icon:'🛏️', x:-220, y:590,   w:440, h:320, empty:false, start:true },

  // east wing: Central Hall -> Cafeteria -> Storage -> Workshop -> Engine Room -> Power Reactor -> Airlock
  CAFETERIA:        { id:'CAFETERIA',        name:'Cafeteria',             icon:'🍽️', x:530,  y:-160,  w:440, h:320, empty:false },
  STORAGE:          { id:'STORAGE',          name:'Storage',               icon:'📦', x:530,  y:340,   w:440, h:320, empty:false },
  WORKSHOP:         { id:'WORKSHOP',         name:'Workshop',              icon:'🔧', x:530,  y:840,   w:440, h:320, empty:false },
  ENGINE_ROOM:      { id:'ENGINE_ROOM',      name:'Engine Room',           icon:'⚙️', x:530,  y:1340,  w:440, h:320, empty:false },
  POWER_REACTOR:    { id:'POWER_REACTOR',    name:'Power Reactor',         icon:'☢️', x:530,  y:1840,  w:440, h:320, empty:false },
  AIRLOCK_DOCKING:  { id:'AIRLOCK_DOCKING',  name:'Airlock & Docking Bay', icon:'🚀', x:530,  y:2340,  w:440, h:320, empty:false },

  // secret room, reachable only via the hidden passage found in Storage
  HIDDEN_VAULT:     { id:'HIDDEN_VAULT',     name:'Hidden Vault',          icon:'❓', x:1130, y:340,   w:440, h:320, empty:false, secret:true },
};

/* Doors: each connects two rooms via a corridor rect (walkable area) and
   sits at a single point (the gate). locked doors block the corridor
   until `requires` is satisfied (an item id and/or a minimum mission step). */
const DOORS = [
  // north spine
  { id:'d1', a:'CENTRAL_HALL', b:'COMMS_HUB',    gate:{x:0,   y:-445},  corridor:{x:-70,  y:-590,  w:140, h:290} },
  { id:'d2', a:'COMMS_HUB',    b:'CONTROL_ROOM', gate:{x:0,   y:-1000}, corridor:{x:-70,  y:-1090, w:140, h:180},
             locked:true, requires:{item:'ID_CARD'} },
  { id:'d3', a:'CONTROL_ROOM', b:'AI_CORE',      gate:{x:0,   y:-1500}, corridor:{x:-70,  y:-1590, w:140, h:180},
             locked:true, requires:{item:'DATA_DRIVE'} },
  { id:'d4', a:'AI_CORE',      b:'OBSERVATION_DECK', gate:{x:0, y:-2000}, corridor:{x:-70, y:-2090, w:140, h:180} },

  // west wing
  { id:'d5', a:'CENTRAL_HALL', b:'BIO_LAB',      gate:{x:-440, y:0},   corridor:{x:-530, y:-70,  w:180, h:140} },
  { id:'d6', a:'BIO_LAB',      b:'MEDICAL_BAY',  gate:{x:-750, y:250}, corridor:{x:-820, y:160,  w:140, h:180} },
  { id:'d7', a:'MEDICAL_BAY',  b:'EMPTY_ROOM',   gate:{x:-750, y:755}, corridor:{x:-820, y:660,  w:140, h:190} },

  // south dead-end
  { id:'d8', a:'CENTRAL_HALL', b:'CREW_QUARTERS', gate:{x:0, y:445}, corridor:{x:-70, y:300, w:140, h:290} },

  // east wing
  { id:'d9',  a:'CENTRAL_HALL',  b:'CAFETERIA',       gate:{x:440, y:0},    corridor:{x:350, y:-70,  w:180, h:140} },
  { id:'d10', a:'CAFETERIA',     b:'STORAGE',         gate:{x:750, y:250},  corridor:{x:680, y:160,  w:140, h:180} },
  { id:'d11', a:'STORAGE',       b:'WORKSHOP',        gate:{x:750, y:750},  corridor:{x:680, y:660,  w:140, h:180} },
  { id:'d12', a:'WORKSHOP',      b:'ENGINE_ROOM',     gate:{x:750, y:1250}, corridor:{x:680, y:1160, w:140, h:180} },
  { id:'d13', a:'ENGINE_ROOM',   b:'POWER_REACTOR',   gate:{x:750, y:1750}, corridor:{x:680, y:1660, w:140, h:180} },
  { id:'d14', a:'POWER_REACTOR', b:'AIRLOCK_DOCKING', gate:{x:750, y:2250}, corridor:{x:680, y:2160, w:140, h:180} },

  // secret passage, found via the loose wall panel in Storage
  { id:'d15', a:'STORAGE', b:'HIDDEN_VAULT', gate:{x:1050, y:500}, corridor:{x:970, y:430, w:160, h:140},
              locked:true, secret:true, requires:{flag:'vaultUnlocked'} },
];

/* Mission / collectible items */
const ITEMS = {
  WRENCH:      { id:'WRENCH',      name:'Titanium Multitool Wrench', icon:'🔧', mission:true },
  ID_CARD:     { id:'ID_CARD',     name:'Admin Security ID Card',    icon:'💳', mission:true },
  DATA_DRIVE:  { id:'DATA_DRIVE',  name:'Encrypted Mainframe Data Drive', icon:'💾', mission:true },

  TEDDY:       { id:'TEDDY',       name:'Space Teddy',    icon:'🧸', mission:false },
  DUCK:        { id:'DUCK',        name:'Rubber Duck',    icon:'🦆', mission:false },
  ROCK:        { id:'ROCK',        name:'Alien Rock',     icon:'🪨', mission:false },
  BADGE:       { id:'BADGE',       name:"Captain's Badge",icon:'🏅', mission:false },
  PIZZA:       { id:'PIZZA',       name:'Space Pizza',    icon:'🍕', mission:false },
  BATTERY:     { id:'BATTERY',     name:'Plasma Battery', icon:'🔋', mission:false },
  SAMPLE:      { id:'SAMPLE',      name:'Alien Sample',   icon:'🧬', mission:false },
};

/* Interactive objects placed inside rooms. Positions are offsets from the
   room's top-left corner. Unchanged in behaviour from the previous layout —
   only which room they live in / their offset moved to fit the new map. */
const INTERACTIVES = [
  { id:'crewLocker', room:'CREW_QUARTERS', x:60,  y:60,  icon:'🗄️', label:'Personal Locker',
    kind:'locker', locked:false, note:'A dented locker with your name half-scratched off.' },
  { id:'crewCrate',  room:'CREW_QUARTERS', x:330, y:220, icon:'📦', label:'Supply Crate', kind:'crate' },

  { id:'medScanner', room:'MEDICAL_BAY', x:200, y:60, icon:'🩻', label:'Medical Scanner', kind:'flavor',
    note:'Vitals nominal. You have been asleep for 47 days.' },
  { id:'medCrate',   room:'MEDICAL_BAY', x:60,  y:220,icon:'📦', label:'Medical Crate', kind:'crate' },

  { id:'cafCrate',   room:'CAFETERIA', x:60, y:220, icon:'📦', label:'Ration Crate', kind:'crate' },
  { id:'cafLog',     room:'CAFETERIA', x:330,y:60,  icon:'📺', label:'Wall Terminal', kind:'log',
    note:'LOG: "Day 12. The coffee machine gained sentience. It refuses to make decaf. Send help."' },

  { id:'bioTerminal',room:'BIO_LAB', x:60, y:60,  icon:'💻', label:'Bio Terminal', kind:'flavor',
    note:'Culture samples show unusual crystalline growth patterns.' },
  { id:'bioCrate',   room:'BIO_LAB', x:330,y:220, icon:'📦', label:'Sample Case', kind:'crate' },

  { id:'ctrlTerminal', room:'CONTROL_ROOM', x:200, y:150, icon:'💻', label:'Control Terminal', kind:'hackTerminal' },

  { id:'aiConsole',  room:'AI_CORE', x:200, y:150, icon:'🤖', label:'AI Core Console', kind:'aiConsole' },

  { id:'telescope',  room:'OBSERVATION_DECK', x:200, y:60, icon:'🔭', label:'Telescope', kind:'flavor',
    note:'Through the eyepiece: a thousand unblinking stars, and something moving between them.' },
  { id:'obsBadge',   room:'OBSERVATION_DECK', x:60, y:220, icon:'🏅', label:'Something glinting', kind:'collectible', item:'BADGE' },

  { id:'storageLocker', room:'STORAGE', x:200, y:150, icon:'🔒', label:'Maintenance Locker', kind:'locker',
    locked:true, requires:'WRENCH', gives:'ID_CARD' },
  { id:'panel',      room:'STORAGE', x:20, y:280, icon:'🔘', label:'Loose Wall Panel', kind:'secretSwitch' },

  { id:'toolbench',  room:'WORKSHOP', x:200, y:150, icon:'🛠️', label:'Tool Bench', kind:'give', gives:'WRENCH' },

  { id:'serverRack', room:'COMMS_HUB', x:200, y:150, icon:'🖥️', label:'Server Rack', kind:'serverRack' },

  { id:'vaultRock',  room:'HIDDEN_VAULT', x:150, y:150, icon:'🪨', label:'Odd Rock', kind:'collectible', item:'ROCK' },
  { id:'vaultLog',   room:'HIDDEN_VAULT', x:330, y:60, icon:'📺', label:'Old Terminal', kind:'log',
    note:'LOG: "If you found this room, congratulations. The cake was a lie anyway."' },

  { id:'engConsole', room:'ENGINE_ROOM', x:60, y:60, icon:'🔧', label:'Maintenance Console', kind:'flavor',
    note:'Engine output stable. Someone left a wrench-shaped dent in the panel.' },
  { id:'engCrate',   room:'ENGINE_ROOM', x:330,y:220,icon:'📦', label:'Parts Crate', kind:'crate' },

  { id:'reactorConsole', room:'POWER_REACTOR', x:200, y:150, icon:'☢️', label:'Reactor Console', kind:'reactor' },

  { id:'dockConsole', room:'AIRLOCK_DOCKING', x:200, y:150, icon:'🚀', label:'Docking Console', kind:'ending' },

  // both non-mission collectibles that used to live in two separate empty
  // rooms now share the single Empty Room from the new layout
  { id:'emptyTeddy', room:'EMPTY_ROOM', x:110, y:150, icon:'🧸', label:'Something soft', kind:'collectible', item:'TEDDY' },
  { id:'emptyDuck',  room:'EMPTY_ROOM', x:260, y:150, icon:'🦆', label:'Something small', kind:'collectible', item:'DUCK' },
];

/* Crate loot tables (non-mission collectibles + occasional flavour finds) */
const CRATE_LOOT = ['PIZZA', 'BATTERY', 'SAMPLE', null, null]; // null = empty crate

/* Mission progression (11 steps) — UNCHANGED */
const MISSIONS = [
  { id:1,  title:'Wake Up',              desc:'Get your bearings in Crew Quarters.' },
  { id:2,  title:'Explore',              desc:'Make your way to the Central Hall.' },
  { id:3,  title:'Find the Wrench',      desc:'Search the Workshop for a tool.' },
  { id:4,  title:'Unlock the Locker',    desc:'Use the wrench on the Storage locker.' },
  { id:5,  title:'Get the ID Card',      desc:'Retrieve the admin ID card from the locker.' },
  { id:6,  title:'Enter Control Room',   desc:'Use your ID card to unlock the Control Room.' },
  { id:7,  title:'Hack the Terminal',    desc:'Access the mainframe from the Control Terminal.' },
  { id:8,  title:'Find the Data Drive',  desc:'Pull the encrypted drive from the Comms Hub server rack.' },
  { id:9,  title:'Unlock the AI Core',   desc:'Insert the data drive to open the AI Core.' },
  { id:10, title:'Restore the AI',       desc:'Activate the AI Core console.' },
  { id:11, title:'Reach the Airlock',    desc:'Head to the Docking Bay to complete your escape.' },
];

const ACHIEVEMENTS = {
  FIRST_STEPS:  { id:'FIRST_STEPS',  name:'First Steps',  desc:'Leave Crew Quarters for the first time.', icon:'👣' },
  EXPLORER:     { id:'EXPLORER',     name:'Explorer',      desc:'Visit every room on the station.',        icon:'🗺️' },
  ENGINEER:     { id:'ENGINEER',     name:'Engineer',      desc:'Inspect the Reactor Console.',             icon:'🔧' },
  HACKER:       { id:'HACKER',       name:'Hacker',        desc:'Successfully hack the mainframe.',         icon:'💻' },
  AI_RESTORER:  { id:'AI_RESTORER',  name:'AI Restorer',   desc:'Restore the station AI.',                  icon:'🤖' },
  STATION_SAVIOR:{id:'STATION_SAVIOR',name:'Station Savior',desc:'Complete the escape.',                    icon:'🏆' },
  SECRET_FINDER:{ id:'SECRET_FINDER',name:'Curious Mind',  desc:'Find the Hidden Vault.',                   icon:'❓' },
  COLLECTOR:    { id:'COLLECTOR',    name:'Collector',     desc:'Find every collectible aboard the station.', icon:'🎁' },
};

const ALL_ROOM_IDS = Object.keys(ROOMS);
const ALL_COLLECTIBLE_IDS = ['TEDDY','DUCK','ROCK','BADGE','PIZZA','BATTERY','SAMPLE'];
