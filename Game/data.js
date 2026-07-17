/* ================================================================
DERELICT — game data
All rooms, doors, items, missions and achievements live here.
Coordinates are in "world units" (px at 1:1 zoom).
================================================================ */
const ROOMS = {
CENTRAL_HALL:     { id:'CENTRAL_HALL',     name:'Central Hall',          icon:'🏛️', x:-350,  y:-300,  w:700, h:600, empty:false },
CREW_QUARTERS:    { id:'CREW_QUARTERS',    name:'Crew Quarters',         icon:'🛏️', x:-950,  y:-160,  w:440, h:320, empty:false, start:true },
MEDICAL_BAY:      { id:'MEDICAL_BAY',      name:'Medical Bay',           icon:'🏥', x:-950,  y:-640,  w:440, h:320, empty:false },
DERELICT_QUARTERS:{ id:'DERELICT_QUARTERS',name:'Derelict Quarters',     icon:'🌑', x:-950,  y:320,   w:440, h:320, empty:true  },
CAFETERIA:        { id:'CAFETERIA',        name:'Cafeteria',             icon:'🍽️', x:510,   y:-160,  w:440, h:320, empty:false },
BIO_LAB:          { id:'BIO_LAB',          name:'Bio Lab',               icon:'🧪', x:510,   y:320,   w:440, h:320, empty:false },
CONTROL_ROOM:     { id:'CONTROL_ROOM',     name:'Control Room',          icon:'💻', x:510,   y:-640,  w:440, h:320, empty:false },
AI_CORE:          { id:'AI_CORE',          name:'AI Core',               icon:'🤖', x:510,   y:-1120, w:440, h:320, empty:false },
OBSERVATION_DECK: { id:'OBSERVATION_DECK', name:'Observation Deck',      icon:'🔭', x:1110,  y:-160,  w:440, h:320, empty:false },
STORAGE:          { id:'STORAGE',          name:'Storage',               icon:'📦', x:-220,  y:-780,  w:440, h:320, empty:false },
WORKSHOP:         { id:'WORKSHOP',         name:'Workshop',              icon:'🔧', x:-820,  y:-780,  w:440, h:320, empty:false },
COMMS_HUB:        { id:'COMMS_HUB',        name:'Communications Hub',    icon:'📡', x:380,   y:-780,  w:440, h:320, empty:false },
EMPTY_ANNEX:      { id:'EMPTY_ANNEX',      name:'Disused Annex',         icon:'🌑', x:-190,  y:-1240, w:380, h:300, empty:true  },
HIDDEN_VAULT:     { id:'HIDDEN_VAULT',     name:'Hidden Vault',          icon:'❓', x:-820,  y:-1260, w:440, h:320, empty:false, secret:true },
ENGINE_ROOM:      { id:'ENGINE_ROOM',      name:'Engine Room',           icon:'⚙️', x:-220,  y:460,   w:440, h:320, empty:false },
POWER_REACTOR:    { id:'POWER_REACTOR',    name:'Power Reactor',         icon:'☢️', x:-220,  y:940,   w:440, h:320, empty:false },
AIRLOCK_DOCKING:  { id:'AIRLOCK_DOCKING',  name:'Airlock & Docking Bay', icon:'🚀', x:380,   y:460,   w:440, h:320, empty:false },
};

/* Doors: each connects two rooms via a corridor rect (walkable area) and
sits at a single point (the gate). locked doors block the corridor
until `requires` is satisfied (an item id and/or a minimum mission step). */
const DOORS = [
{ id:'d1',  a:'CENTRAL_HALL', b:'CREW_QUARTERS',     gate:{x:-430, y:0},    corridor:{x:-510, y:-80,  w:160, h:160} },
{ id:'d2',  a:'CREW_QUARTERS',b:'MEDICAL_BAY',       gate:{x:-730, y:-240}, corridor:{x:-810, y:-320, w:160, h:160} },
{ id:'d3',  a:'CREW_QUARTERS',b:'DERELICT_QUARTERS', gate:{x:-730, y:240},  corridor:{x:-810, y:160,  w:160, h:160} },
{ id:'d4',  a:'CENTRAL_HALL', b:'CAFETERIA',         gate:{x:430,  y:0},    corridor:{x:350,  y:-80,  w:160, h:160} },
{ id:'d5',  a:'CAFETERIA',    b:'BIO_LAB',           gate:{x:730,  y:240},  corridor:{x:650,  y:160,  w:160, h:160} },
{ id:'d6',  a:'CAFETERIA',    b:'CONTROL_ROOM',      gate:{x:730,  y:-240}, corridor:{x:650,  y:-320, w:160, h:160},
locked:true, requires:{item:'ID_CARD'} },
{ id:'d7',  a:'CONTROL_ROOM', b:'AI_CORE',           gate:{x:730,  y:-720}, corridor:{x:650,  y:-800, w:160, h:160},
locked:true, requires:{item:'DATA_DRIVE', step:9} },
{ id:'d8',  a:'CAFETERIA',    b:'OBSERVATION_DECK',  gate:{x:1030, y:0},    corridor:{x:950,  y:-80,  w:160, h:160} },
{ id:'d9',  a:'CENTRAL_HALL', b:'STORAGE',           gate:{x:0,    y:-380}, corridor:{x:-80,  y:-460, w:160, h:160} },
{ id:'d10', a:'STORAGE',      b:'WORKSHOP',          gate:{x:-300, y:-620}, corridor:{x:-380, y:-700, w:160, h:160} },
{ id:'d11', a:'STORAGE',      b:'COMMS_HUB',         gate:{x:300,  y:-620}, corridor:{x:220,  y:-700, w:160, h:160} },
{ id:'d12', a:'STORAGE',      b:'EMPTY_ANNEX',       gate:{x:0,    y:-860}, corridor:{x:-80,  y:-940, w:160, h:160} },
{ id:'d13', a:'WORKSHOP',     b:'HIDDEN_VAULT',      gate:{x:-600, y:-860}, corridor:{x:-680, y:-940, w:160, h:160},
locked:true, secret:true, requires:{flag:'vaultUnlocked'} },
{ id:'d14', a:'CENTRAL_HALL', b:'ENGINE_ROOM',       gate:{x:0,    y:380},  corridor:{x:-80,  y:300,  w:160, h:160} },
{ id:'d15', a:'ENGINE_ROOM',  b:'POWER_REACTOR',     gate:{x:0,    y:860},  corridor:{x:-80,  y:780,  w:160, h:160} },
{ id:'d16', a:'ENGINE_ROOM',  b:'AIRLOCK_DOCKING',   gate:{x:300,  y:620},  corridor:{x:220,  y:540,  w:160, h:160} },
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
room's top-left corner. */
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
{ id:'bioTerminal',room:'BIO_LAB', x:60, y:60, icon:'💻', label:'Bio Terminal', kind:'flavor',
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
{ id:'annexDuck',  room:'EMPTY_ANNEX', x:150, y:150, icon:'🦆', label:'Something small', kind:'collectible', item:'DUCK' },
{ id:'vaultRock',  room:'HIDDEN_VAULT', x:150, y:150, icon:'🪨', label:'Odd Rock', kind:'collectible', item:'ROCK' },
{ id:'vaultLog',   room:'HIDDEN_VAULT', x:330, y:60, icon:'📺', label:'Old Terminal', kind:'log',
note:'LOG: "If you found this room, congratulations. The cake was a lie anyway."' },
{ id:'engConsole', room:'ENGINE_ROOM', x:60, y:60, icon:'🔧', label:'Maintenance Console', kind:'flavor',
note:'Engine output stable. Someone left a wrench-shaped dent in the panel.' },
{ id:'engCrate',   room:'ENGINE_ROOM', x:330,y:220,icon:'📦', label:'Parts Crate', kind:'crate' },
{ id:'reactorConsole', room:'POWER_REACTOR', x:200, y:150, icon:'☢️', label:'Reactor Console', kind:'reactor' },
{ id:'dockConsole', room:'AIRLOCK_DOCKING', x:200, y:150, icon:'🚀', label:'Docking Console', kind:'ending' },
{ id:'derelictTeddy', room:'DERELICT_QUARTERS', x:150, y:150, icon:'🧸', label:'Something soft', kind:'collectible', item:'TEDDY' },
];

/* Crate loot tables (non-mission collectibles + occasional flavour finds) */
const CRATE_LOOT = ['PIZZA', 'BATTERY', 'SAMPLE', null, null]; // null = empty crate

/* Mission progression (11 steps) */
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
