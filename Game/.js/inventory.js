// ============ INVENTORY SYSTEM ============

const Inventory = {
  maxMissionItems: 3,
  maxCollectibles: 20,
  
  init() {
    GameState.inventory = {
      missionItems: [],
      collectibles: [],
      achievements: []
    };
  },
  
  addItem(item) {
    switch (item.type) {
      case ITEM_TYPES.MISSION:
        if (GameState.inventory.missionItems.length < this.maxMissionItems) {
          if (!GameState.inventory.missionItems.some(i => i.id === item.id)) {
            GameState.inventory.missionItems.push(item);
            UI.updateInventory();
            return true;
          }
        }
        break;
      case ITEM_TYPES.COLLECTIBLE:
        if (GameState.inventory.collectibles.length < this.maxCollectibles) {
          if (!GameState.inventory.collectibles.some(i => i.id === item.id)) {
            GameState.inventory.collectibles.push(item);
            UI.updateInventory();
            return true;
          }
        }
        break;
      case ITEM_TYPES.ACHIEVEMENT:
        if (!GameState.inventory.achievements.some(i => i.id === item.id)) {
          GameState.inventory.achievements.push(item);
          UI.updateInventory();
          return true;
        }
        break;
    }
    return false;
  },
  
  removeItem(itemId) {
    const missionIndex = GameState.inventory.missionItems.findIndex(i => i.id === itemId);
    if (missionIndex !== -1) {
      GameState.inventory.missionItems.splice(missionIndex, 1);
      UI.updateInventory();
      return true;
    }
    
    const collectibleIndex = GameState.inventory.collectibles.findIndex(i => i.id === itemId);
    if (collectibleIndex !== -1) {
      GameState.inventory.collectibles.splice(collectibleIndex, 1);
      UI.updateInventory();
      return true;
    }
    
    return false;
  },
  
  hasItem(itemId) {
    return GameState.inventory.missionItems.some(i => i.id === itemId) ||
           GameState.inventory.collectibles.some(i => i.id === itemId);
  },
  
  getMissionItems() {
    return GameState.inventory.missionItems;
  },
  
  getCollectibles() {
    return GameState.inventory.collectibles;
  },
  
  getAchievements() {
    return GameState.inventory.achievements;
  },
  
  getItemCount() {
    return GameState.inventory.missionItems.length + GameState.inventory.collectibles.length;
  },
  
  clear() {
    GameState.inventory.missionItems = [];
    GameState.inventory.collectibles = [];
    GameState.inventory.achievements = [];
    UI.updateInventory();
  }
};

// Initialize inventory
Inventory.init();
      
