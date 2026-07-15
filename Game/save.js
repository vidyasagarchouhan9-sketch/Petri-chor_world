/* ================================================================
   DERELICT — save system
   Persists progress to localStorage so players can resume later.
   ================================================================ */

const SAVE_KEY = 'derelict_save_v1';
const SETTINGS_KEY = 'derelict_settings_v1';

const SaveSystem = {
  hasSave(){
    try { return !!localStorage.getItem(SAVE_KEY); } catch(e){ return false; }
  },

  save(state){
    try {
      const data = {
        player: state.player,
        currentRoom: state.currentRoom,
        inventory: state.inventory,
        missionStep: state.missionStep,
        flags: state.flags,
        visitedRooms: Array.from(state.visitedRooms),
        openedDoors: Array.from(state.openedDoors),
        openedCrates: Array.from(state.openedCrates),
        collectedItems: Array.from(state.collectedItems),
        achievements: Array.from(state.achievements),
        savedAt: Date.now(),
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      return true;
    } catch(e){
      console.error('Save failed', e);
      return false;
    }
  },

  load(){
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      data.visitedRooms = new Set(data.visitedRooms || []);
      data.openedDoors = new Set(data.openedDoors || []);
      data.openedCrates = new Set(data.openedCrates || []);
      data.collectedItems = new Set(data.collectedItems || []);
      data.achievements = new Set(data.achievements || []);
      return data;
    } catch(e){
      console.error('Load failed', e);
      return null;
    }
  },

  clear(){
    try { localStorage.removeItem(SAVE_KEY); } catch(e){}
  },

  saveSettings(settings){
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch(e){}
  },

  loadSettings(){
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch(e){ return null; }
  }
};
