// ============ WORLD DEFINITION ============

class Room {
  constructor(name, x, y, width, height, description = '') {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.description = description;
    this.doors = [];
    this.crates = [];
    this.objects = [];
    this.lights = [];
    this.dustParticles = [];
    this.isLocked = false;
    this.discovered = false;
  }
  
  addDoor(door) {
    this.doors.push(door);
  }
  
  addCrate(crate) {
    this.crates.push(crate);
  }
  
  addObject(obj) {
    this.objects.push(obj);
  }
  
  containsPoint(px, py) {
    return px >= this.x && px < this.x + this.width && 
           py >= this.y && py < this.y + this.height;
  }
  
  getCenter() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
  }
}

class Door {
  constructor(id, x, y, width, height, connectsTo, initialState = DOOR_STATES.LOCKED) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.connectsTo = connectsTo;
    this.state = initialState;
    this.scannerColor = initialState === DOOR_STATES.LOCKED ? '#ff3b5c' : '#3ff0e0';
    this.animationProgress = 0;
    this.isHorizontal = width > height;
  }
  
  open() {
    if (this.state === DOOR_STATES.LOCKED) return false;
    this.state = DOOR_STATES.OPENING;
    this.animationProgress = 0;
    return true;
  }
  
  close() {
    this.state = DOOR_STATES.CLOSING;
    this.animationProgress = 0;
  }
  
  unlock() {
    this.state = DOOR_STATES.UNLOCKED;
    this.scannerColor = '#3ff0e0';
  }
  
  lock() {
    this.state = DOOR_STATES.LOCKED;
    this.scannerColor = '#ff3b5c';
  }
  
  updateAnimation(deltaTime) {
    if (this.state === DOOR_STATES.OPENING) {
      this.animationProgress += deltaTime * 3;
      if (this.animationProgress >= 1) {
        this.animationProgress = 1;
        this.state = DOOR_STATES.OPEN;
      }
    } else if (this.state === DOOR_STATES.CLOSING) {
      this.animationProgress -= deltaTime * 3;
      if (this.animationProgress <= 0) {
        this.animationProgress = 0;
        this.state = DOOR_STATES.UNLOCKED;
      }
    }
  }
  
  getOpenWidth() {
    if (this.isHorizontal) {
      return this.width * this.animationProgress;
    } else {
      return this.height * this.animationProgress;
    }
  }
  
  isPassable() {
    return this.state === DOOR_STATES.OPEN;
  }
}

class Crate {
  constructor(id, x, y, type = CRATE_TYPES.RANDOM) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 40;
    this.height = 40;
    this.isOpen = false;
    this.opened = false;
    this.animationProgress = 0;
    this.contents = this.getRandomContents();
  }
  
  getRandomContents() {
    const allItems = [...Object.values(MISSION_ITEMS), ...Object.values(COLLECTIBLES)];
    
    switch (this.type) {
      case CRATE_TYPES.MISSION:
        return [MISSION_ITEMS.TITANIUM_WRENCH, MISSION_ITEMS.ADMIN_CARD, MISSION_ITEMS.DATA_DRIVE]
          .filter(item => !GameState.inventory.missionItems.some(i => i.id === item.id));
      case CRATE_TYPES.RARE:
        return [COLLECTIBLES.ALIEN_SAMPLE, COLLECTIBLES.CAPTAINS_BADGE, COLLECTIBLES.PLASMA_BATTERY];
      default:
        const randomItems = [];
        const numItems = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numItems; i++) {
          const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
          if (!randomItems.includes(randomItem)) {
            randomItems.push(randomItem);
          }
        }
        return randomItems;
    }
  }
  
  open() {
    if (this.opened) return [];
    this.opened = true;
    this.isOpen = true;
    this.animationProgress = 0;
    return this.contents;
  }
  
  updateAnimation(deltaTime) {
    if (this.opened) {
      this.animationProgress += deltaTime * 2;
      if (this.animationProgress >= 1) {
        this.animationProgress = 1;
      }
    }
  }
  
  shouldDisappear() {
    return this.opened && this.animationProgress >= 1;
  }
}

class InteractiveObject {
  constructor(id, x, y, type, name = '', description = '') {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.name = name;
    this.description = description;
    this.width = 60;
    this.height = 60;
    this.isInteractable = true;
    this.isActive = false;
    this.animationProgress = 0;
    this.requirements = [];
  }
  
  canInteract(inventory) {
    if (this.requirements.length === 0) return true;
    for (const req of this.requirements) {
      const hasItem = inventory.missionItems.some(item => item.id === req);
      if (!hasItem) return false;
    }
    return true;
  }
}

// ============ WORLD LAYOUT ============

class World {
  constructor() {
    this.rooms = {};
    this.doors = {};
    this.crates = {};
    this.objects = {};
    this.playerStartPosition = { x: 0, y: 0 };
    this.init();
  }
  
  init() {
    this.createRooms();
    this.createDoors();
    this.createCrates();
    this.createObjects();
    
    const centralHall = this.rooms[ROOMS.CENTRAL_HALL];
    this.playerStartPosition = {
      x: centralHall.x + centralHall.width / 2,
      y: centralHall.y + centralHall.height / 2
    };
  }
  
  createRooms() {
    const roomSize = { width: 12, height: 10 };
    const spacing = 4;
    
    // Row 1 (Top)
    this.addRoom(ROOMS.OBSERVATION_DECK, 0, 0, roomSize.width, roomSize.height, 
      "A panoramic view of the cosmos. Stars twinkle beyond the reinforced glass.");
    this.addRoom(ROOMS.AIRLOCK, roomSize.width + spacing, 0, roomSize.width, roomSize.height,
      "The docking bay. Ships would connect here. Now silent and empty.");
    this.addRoom(ROOMS.COMMUNICATIONS_HUB, (roomSize.width + spacing) * 2, 0, roomSize.width, roomSize.height,
      "Satellite dishes and communication arrays. The station's link to the outside world.");
    
    // Row 2
    this.addRoom(ROOMS.AI_CORE, 0, roomSize.height + spacing, roomSize.width, roomSize.height,
      "The artificial intelligence core. Dark and silent... for now.");
    this.addRoom(ROOMS.CONTROL_ROOM, roomSize.width + spacing, roomSize.height + spacing, roomSize.width, roomSize.height,
      "Main control center. Monitors and terminals line the walls.");
    this.addRoom(ROOMS.POWER_REACTOR, (roomSize.width + spacing) * 2, roomSize.height + spacing, roomSize.width, roomSize.height,
      "The power source. A glowing reactor hums in the center.");
    
    // Row 3 - Central Hall (spans 3 rooms width)
    this.addRoom(ROOMS.CENTRAL_HALL, 0, (roomSize.height + spacing) * 2, roomSize.width * 3 + spacing * 2, roomSize.height,
      "The main hub. A large open space with corridors leading to all other areas.");
    
    // Row 4
    this.addRoom(ROOMS.MEDICAL_BAY, 0, (roomSize.height + spacing) * 3, roomSize.width, roomSize.height,
      "Medical equipment and beds. A place of healing... or experiments?");
    this.addRoom(ROOMS.CREW_QUARTERS, roomSize.width + spacing, (roomSize.height + spacing) * 3, roomSize.width, roomSize.height,
      "Where the crew would sleep. Personal items are scattered about.");
    this.addRoom(ROOMS.CAFETERIA, (roomSize.width + spacing) * 2, (roomSize.height + spacing) * 3, roomSize.width, roomSize.height,
      "The dining area. Tables and chairs. A faint smell of old food lingers.");
    
    // Row 5
    this.addRoom(ROOMS.BIO_LAB, 0, (roomSize.height + spacing) * 4, roomSize.width, roomSize.height,
      "Biological research lab. Strange specimens in containers.");
    this.addRoom(ROOMS.STORAGE, roomSize.width + spacing, (roomSize.height + spacing) * 4, roomSize.width, roomSize.height,
      "Storage room. Crates and supplies stacked neatly.");
    this.addRoom(ROOMS.WORKSHOP, (roomSize.width + spacing) * 2, (roomSize.height + spacing) * 4, roomSize.width, roomSize.height,
      "Workshop and engineering bay. Tools and parts everywhere.");
    
    // Row 6
    this.addRoom(ROOMS.ENGINE_ROOM, 0, (roomSize.height + spacing) * 5, roomSize.width * 3 + spacing * 2, roomSize.height,
      "The engine room. Massive machinery keeps the station operational.");
    
    // Extra empty rooms
    this.addRoom(ROOMS.CORRIDOR_A, -3, (roomSize.height + spacing) * 2, 3, roomSize.height, "A narrow maintenance corridor.");
    this.addRoom(ROOMS.CORRIDOR_B, roomSize.width * 3 + spacing * 2, (roomSize.height + spacing) * 2, 3, roomSize.height, "Another maintenance corridor.");
    this.addRoom(ROOMS.CORRIDOR_C, roomSize.width + spacing, roomSize.height + spacing, roomSize.width, 3, "A short connecting passage.");
    this.addRoom(ROOMS.MAINTENANCE_1, -3, (roomSize.height + spacing) * 3, 3, 3, "Maintenance access tunnel.");
    this.addRoom(ROOMS.MAINTENANCE_2, roomSize.width * 3 + spacing * 2, (roomSize.height + spacing) * 3, 3, 3, "Another maintenance tunnel.");
  }
  
  addRoom(name, gridX, gridY, gridWidth, gridHeight, description) {
    const room = new Room(
      name,
      gridX * GameState.TILE_SIZE,
      gridY * GameState.TILE_SIZE,
      gridWidth * GameState.TILE_SIZE,
      gridHeight * GameState.TILE_SIZE,
      description
    );
    this.rooms[name] = room;
  }
  
  createDoors() {
    const doorWidth = 40;
    const doorHeight = 10;
    
    // Central Hall doors
    this.addDoorBetweenRooms('door_central_medical', ROOMS.CENTRAL_HALL, ROOMS.MEDICAL_BAY, 240, 320, doorWidth, doorHeight, DOOR_STATES.UNLOCKED);
    this.addDoorBetweenRooms('door_central_crew', ROOMS.CENTRAL_HALL, ROOMS.CREW_QUARTERS, 360, 320, doorWidth, doorHeight, DOOR_STATES.UNLOCKED);
    this.addDoorBetweenRooms('door_central_cafeteria', ROOMS.CENTRAL_HALL, ROOMS.CAFETERIA, 480, 320, doorWidth, doorHeight, DOOR_STATES.UNLOCKED);
    this.addDoorBetweenRooms('door_central_ai', ROOMS.CENTRAL_HALL, ROOMS.AI_CORE, 240, 180, doorWidth, doorHeight, DOOR_STATES.LOCKED);
    this.addDoorBetweenRooms('door_central_control', ROOMS.CENTRAL_HALL, ROOMS.CONTROL_ROOM, 360, 180, doorWidth, doorHeight, DOOR_STATES.LOCKED);
    
    // Other connections
    this.addDoorBetweenRooms('door_medical_bio', ROOMS.MEDICAL_BAY, ROOMS.BIO_LAB, 240, 400, doorWidth, doorHeight, DOOR_STATES.UNLOCKED);
    this.addDoorBetweenRooms('door_crew_storage', ROOMS.CREW_QUARTERS, ROOMS.STORAGE, 360, 400, doorWidth, doorHeight, DOOR_STATES.UNLOCKED);
    this.addDoorBetweenRooms('door_cafeteria_workshop', ROOMS.CAFETERIA, ROOMS.WORKSHOP, 480, 400, doorWidth, doorHeight, DOOR_STATES.UNLOCKED);
    this.addDoorBetweenRooms('door_bio_storage', ROOMS.BIO_LAB, ROOMS.STORAGE, 240, 440, doorWidth, doorHeight, DOOR_STATES.UNLOCKED);
    this.addDoorBetweenRooms('door_storage_workshop', ROOMS.STORAGE, ROOMS.WORKSHOP, 360, 440, doorWidth, doorHeight, DOOR_STATES.UNLOCKED);
    this.addDoorBetweenRooms('door_ai_control', ROOMS.AI_CORE, ROOMS.CONTROL_ROOM, 240, 220, doorWidth, doorHeight, DOOR_STATES.LOCKED);
    this.addDoorBetweenRooms('door_control_comms', ROOMS.CONTROL_ROOM, ROOMS.COMMUNICATIONS_HUB, 360, 220, doorWidth, doorHeight, DOOR_STATES.LOCKED);
    this.addDoorBetweenRooms('door_comms_observation', ROOMS.COMMUNICATIONS_HUB, ROOMS.OBSERVATION_DECK, 480, 220, doorWidth, doorHeight, DOOR_STATES.UNLOCKED);
    this.addDoorBetweenRooms('door_observation_airlock', ROOMS.OBSERVATION_DECK, ROOMS.AIRLOCK, 240, 140, doorWidth, doorHeight, DOOR_STATES.LOCKED);
    this.addDoorBetweenRooms('door_airlock_comms', ROOMS.AIRLOCK, ROOMS.COMMUNICATIONS_HUB, 360, 140, doorWidth, doorHeight, DOOR_STATES.LOCKED);
    this.addDoorBetweenRooms('door_engine_reactor', ROOMS.ENGINE_ROOM, ROOMS.POWER_REACTOR, 480, 480, doorWidth, doorHeight, DOOR_STATES.LOCKED);
    this.addDoorBetweenRooms('door_corridor_a_central', ROOMS.CORRIDOR_A, ROOMS.CENTRAL_HALL, -10, 320, doorHeight, doorWidth, DOOR_STATES.UNLOCKED);
    this.addDoorBetweenRooms('door_corridor_b_central', ROOMS.CORRIDOR_B, ROOMS.CENTRAL_HALL, 580, 320, doorHeight, doorWidth, DOOR_STATES.UNLOCKED);
  }
  
  addDoorBetweenRooms(id, room1Name, room2Name, x, y, width, height, initialState) {
    const door = new Door(id, x, y, width, height, room2Name, initialState);
    this.doors[id] = door;
    this.rooms[room1Name].addDoor(door);
    
    const reverseDoor = new Door(`${id}_reverse`, x, y, width, height, room1Name, initialState);
    reverseDoor.state = initialState;
    this.rooms[room2Name].addDoor(reverseDoor);
  }
  
  createCrates() {
    this.addCrate(ROOMS.STORAGE, 'crate_storage_1', 300, 420, CRATE_TYPES.RANDOM);
    this.addCrate(ROOMS.STORAGE, 'crate_storage_2', 360, 420, CRATE_TYPES.RANDOM);
    this.addCrate(ROOMS.STORAGE, 'crate_storage_3', 420, 420, CRATE_TYPES.MISSION);
    this.addCrate(ROOMS.WORKSHOP, 'crate_workshop_1', 400, 420, CRATE_TYPES.RANDOM);
    this.addCrate(ROOMS.WORKSHOP, 'crate_workshop_2', 460, 420, CRATE_TYPES.RARE);
    this.addCrate(ROOMS.BIO_LAB, 'crate_bio_1', 180, 420, CRATE_TYPES.RANDOM);
    this.addCrate(ROOMS.ENGINE_ROOM, 'crate_engine_1', 200, 540, CRATE_TYPES.RANDOM);
    this.addCrate(ROOMS.ENGINE_ROOM, 'crate_engine_2', 360, 540, CRATE_TYPES.RANDOM);
    this.addCrate(ROOMS.CENTRAL_HALL, 'crate_central_1', 400, 340, CRATE_TYPES.RANDOM);
  }
  
  addCrate(roomName, id, x, y, type) {
    const crate = new Crate(id, x, y, type);
    this.crates[id] = crate;
    this.rooms[roomName].addCrate(crate);
  }
  
  createObjects() {
    this.addObject(ROOMS.CONTROL_ROOM, 'terminal_control', 400, 240, OBJECT_TYPES.TERMINAL, 'Main Control Terminal', 'Access the station control systems');
    this.addObject(ROOMS.COMMUNICATIONS_HUB, 'server_rack', 500, 240, OBJECT_TYPES.SERVER_RACK, 'Server Rack', 'Station communication servers');
    this.addObject(ROOMS.WORKSHOP, 'locker_workshop', 400, 380, OBJECT_TYPES.LOCKER, 'Maintenance Locker', 'Requires Titanium Multitool Wrench to open');
    this.addObject(ROOMS.MEDICAL_BAY, 'medical_scanner', 200, 380, OBJECT_TYPES.MEDICAL_SCANNER, 'Medical Scanner', 'Scan for biological anomalies');
    this.addObject(ROOMS.POWER_REACTOR, 'reactor_console', 400, 240, OBJECT_TYPES.REACTOR_CONSOLE, 'Reactor Console', 'Control the power reactor');
    this.addObject(ROOMS.OBSERVATION_DECK, 'telescope', 200, 240, OBJECT_TYPES.TELESCOPE, 'Observation Telescope', 'View the stars and planets');
    this.addObject(ROOMS.AI_CORE, 'ai_terminal', 200, 240, OBJECT_TYPES.TERMINAL, 'AI Core Terminal', 'Access the AI system');
  }
  
  addObject(roomName, id, x, y, type, name, description) {
    const obj = new InteractiveObject(id, x, y, type, name, description);
    this.objects[id] = obj;
    this.rooms[roomName].addObject(obj);
    
    if (id === 'locker_workshop') {
      obj.requirements = ['titanium_wrench'];
    }
  }
  
  getRoomAt(px, py) {
    for (const roomName in this.rooms) {
      const room = this.rooms[roomName];
      if (room.containsPoint(px, py)) {
        return room;
      }
    }
    return null;
  }
  
  getDoorAt(px, py) {
    for (const doorId in this.doors) {
      const door = this.doors[doorId];
      if (px >= door.x && px < door.x + door.width && py >= door.y && py < door.y + door.height) {
        return door;
      }
    }
    return null;
  }
  
  getCrateAt(px, py) {
    for (const crateId in this.crates) {
      const crate = this.crates[crateId];
      if (!crate.opened && px >= crate.x && px < crate.x + crate.width && py >= crate.y && py < crate.y + crate.height) {
        return crate;
      }
    }
    return null;
  }
  
  getObjectAt(px, py) {
    for (const objId in this.objects) {
      const obj = this.objects[objId];
      if (px >= obj.x && px < obj.x + obj.width && py >= obj.y && py < obj.y + obj.height) {
        return obj;
      }
    }
    return null;
  }
  
  canMoveTo(px, py) {
    if (px < 0 || py < 0 || px >= GameState.GRID_COLS * GameState.TILE_SIZE || py >= GameState.GRID_ROWS * GameState.TILE_SIZE) {
      return false;
    }
    
    const door = this.getDoorAt(px, py);
    if (door && !door.isPassable()) {
      return false;
    }
    
    return true;
  }
  
  update(deltaTime) {
    for (const doorId in this.doors) {
      this.doors[doorId].updateAnimation(deltaTime);
    }
    for (const crateId in this.crates) {
      this.crates[crateId].updateAnimation(deltaTime);
    }
  }
}

const world = new World();
          
