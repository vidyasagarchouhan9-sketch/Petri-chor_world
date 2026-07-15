// ============ GAME STATE & CONFIGURATION ============

const GameState = {
  // Game dimensions
  CANVAS_WIDTH: 1280,
  CANVAS_HEIGHT: 720,
  TILE_SIZE: 40,
  
  // Grid dimensions
  GRID_COLS: 64,
  GRID_ROWS: 36,
  
  // Player
  player: {
    x: 0,
    y: 0,
    speed: 5,
    direction: 'down',
    isMoving: false
  },
  
  // Camera
  camera: {
    x: 0,
    y: 0
  },
  
  // Game state
  currentRoom: '',
  gameStarted: false,
  gameCompleted: false,
  
  // Mission state
  currentMission: 0,
  missions: [],
  
  // Inventory
  inventory: {
    missionItems: [],
    collectibles: [],
    achievements: []
  },
  
  // World state
  doors: {},
  crates: {},
  interactiveObjects: {},
  
  // AI state
  ai: {
    isActive: false,
    bootProgress: 0,
    messages: []
  },
  
  // Time tracking
  playTime: 0,
  lastUpdate: 0
};

// Room definitions (constants)
const ROOMS = {
  CENTRAL_HALL: 'Central Hall',
  CREW_QUARTERS: 'Crew Quarters',
  MEDICAL_BAY: 'Medical Bay',
  CAFETERIA: 'Cafeteria',
  BIO_LAB: 'Bio Lab',
  STORAGE: 'Storage',
  WORKSHOP: 'Workshop',
  ENGINE_ROOM: 'Engine Room',
  POWER_REACTOR: 'Power Reactor',
  COMMUNICATIONS_HUB: 'Communications Hub',
  CONTROL_ROOM: 'Control Room',
  AI_CORE: 'AI Core',
  OBSERVATION_DECK: 'Observation Deck',
  AIRLOCK: 'Airlock & Docking Bay',
  // Extra empty rooms
  CORRIDOR_A: 'Corridor A',
  CORRIDOR_B: 'Corridor B',
  CORRIDOR_C: 'Corridor C',
  MAINTENANCE_1: 'Maintenance Tunnel 1',
  MAINTENANCE_2: 'Maintenance Tunnel 2'
};

// Door states
const DOOR_STATES = {
  LOCKED: 'locked',
  UNLOCKED: 'unlocked',
  OPEN: 'open',
  OPENING: 'opening',
  CLOSING: 'closing'
};

// Item types
const ITEM_TYPES = {
  MISSION: 'mission',
  COLLECTIBLE: 'collectible',
  ACHIEVEMENT: 'achievement'
};

// Mission items
const MISSION_ITEMS = {
  TITANIUM_WRENCH: { id: 'titanium_wrench', name: 'Titanium Multitool Wrench', icon: '🔧', type: ITEM_TYPES.MISSION },
  ADMIN_CARD: { id: 'admin_card', name: 'Admin Security ID Card', icon: '💳', type: ITEM_TYPES.MISSION },
  DATA_DRIVE: { id: 'data_drive', name: 'Encrypted Mainframe Data Drive', icon: '💾', type: ITEM_TYPES.MISSION }
};

// Collectibles
const COLLECTIBLES = {
  SPACE_TEDDY: { id: 'space_teddy', name: 'Space Teddy', icon: '🧸', type: ITEM_TYPES.COLLECTIBLE },
  RUBBER_DUCK: { id: 'rubber_duck', name: 'Rubber Duck', icon: '🦆', type: ITEM_TYPES.COLLECTIBLE },
  ALIEN_ROCK: { id: 'alien_rock', name: 'Alien Rock', icon: '🪨', type: ITEM_TYPES.COLLECTIBLE },
  CAPTAINS_BADGE: { id: 'captains_badge', name: "Captain's Badge", icon: '🏅', type: ITEM_TYPES.COLLECTIBLE },
  SPACE_PIZZA: { id: 'space_pizza', name: 'Space Pizza', icon: '🍕', type: ITEM_TYPES.COLLECTIBLE },
  PLASMA_BATTERY: { id: 'plasma_battery', name: 'Plasma Battery', icon: '🔋', type: ITEM_TYPES.COLLECTIBLE },
  ALIEN_SAMPLE: { id: 'alien_sample', name: 'Alien Sample', icon: '🧬', type: ITEM_TYPES.COLLECTIBLE }
};

// Achievements
const ACHIEVEMENTS = {
  FIRST_STEPS: { id: 'first_steps', name: 'First Steps', description: 'Take your first steps', icon: '👣' },
  EXPLORER: { id: 'explorer', name: 'Explorer', description: 'Discover all rooms', icon: '🗺️' },
  ENGINEER: { id: 'engineer', name: 'Engineer', description: 'Unlock the Workshop', icon: '🔧' },
  HACKER: { id: 'hacker', name: 'Hacker', description: 'Hack the terminal', icon: '💻' },
  AI_RESTORER: { id: 'ai_restorer', name: 'AI Restorer', description: 'Restore the AI Core', icon: '🤖' },
  STATION_SAVIOR: { id: 'station_savior', name: 'Station Savior', description: 'Complete Chapter 1', icon: '🏆' }
};

// Crate types
const CRATE_TYPES = {
  RANDOM: 'random',
  MISSION: 'mission',
  RARE: 'rare'
};

// Interactive object types
const OBJECT_TYPES = {
  TERMINAL: 'terminal',
  SERVER_RACK: 'server_rack',
  LOCKER: 'locker',
  MEDICAL_SCANNER: 'medical_scanner',
  REACTOR_CONSOLE: 'reactor_console',
  TELESCOPE: 'telescope'
};
  
