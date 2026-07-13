// ============================================================================
// NAMED CONSTANTS & TILE SYSTEM CONFIGURATION
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

const mapData = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,4,4,4,4,4,4,4,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,7,0,0,0,7,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,4,0,0,4,0,0,1,1,1,1,0,0,9,0,9,0,9,0,9,0,1,1,1,1,0,0,9,0,0,9,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,9,0,0,0,0,1,1,1,1,0,9,0,0,0,0,0,9,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,9,0,0,9,0,0,9,0,1,1],
  [1,1,1,1,0,0,7,0,0,0,7,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,1,1,1,1,0,0,9,0,9,0,9,0,9,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,4,4,4,4,4,4,4,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,9,0,0,9,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,9,0,0,0,0,0,0,0,0,9,0,0,1,1],
  [1,1,1,1,0,8,0,0,8,0,0,8,0,0,8,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,9,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,9,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,6,6,6,6,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,8,0,0,8,0,0,8,0,0,8,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,6,6,6,6,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,6,6,6,6,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,9,0,0,0,0,0,0,0,0,9,0,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,5,0,0,5,0,0,5,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,0,0,5,0,0,5,0,0,5,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,9,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,6,6,6,6,6,6,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,6,6,6,6,6,6,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,6,6,6,6,6,6,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,6,6,6,6,6,6,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,6,6,6,6,6,6,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,6,6,6,6,6,6,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,9,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,0,0,5,0,0,0,0,0,0,0,5,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,9,0,0,9,0,0,9,0,0,0,0,1,1,1,1,1,1,1,0,9,5,0,0,5,0,0,5,0,0,5,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,5,0,0,5,0,0,5,0,0,5,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,9,9,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,5,0,0,5,0,0,5,0,0,5,0,0,9,0,1,1],
  [1,1,1,1,0,0,5,0,0,0,0,0,0,0,5,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,5,0,0,5,0,0,5,0,0,0,1,1,1,1,1,1,1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,5,0,0,5,0,0,5,0,0,5,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,7,7,7,7,7,7,7,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,9,0,0,0,0,0,9,0,0,0,0,1,1,1,1,1,1,1,0,9,5,0,0,5,0,0,5,0,0,5,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// Give the player a dedicated spawn point in the middle of the Central Hall
mapData[36][40] = SPAWN;

// ============================================================================
// ROOM ZONES
// ============================================================================
const ROOM_ZONES = [
    { name: "🏥 Medical Bay",           r1:3,  c1:3,  r2:15, c2:13 },
    { name: "📡 Control Room",          r1:3,  c1:16, r2:15, c2:26 },
    { name: "🤖 AI Core",               r1:3,  c1:29, r2:17, c2:50 },
    { name: "🛏️ Crew Quarters",         r1:3,  c1:53, r2:15, c2:64 },
    { name: "🍽️ Cafeteria",             r1:3,  c1:67, r2:15, c2:78 },
    { name: "🧪 Bio Lab",               r1:18, c1:3,  r2:34, c2:17 },
    { name: "⚙️ Engine Room",           r1:18, c1:63, r2:31, c2:78 },
    { name: "🔋 Power Reactor",         r1:34, c1:63, r2:49, c2:78 },
    { name: "🌐 Central Hall",          r1:20, c1:20, r2:53, c2:60 },
    { name: "🚀 Airlock & Docking Bay", r1:57, c1:3,  r2:71, c2:18 },
    { name: "🌌 Observation Deck",      r1:57, c1:21, r2:71, c2:38 },
    { name: "🛠️ Workshop",              r1:57, c1:41, r2:71, c2:55 },
    { name: "📦 Storage",               r1:57, c1:61, r2:71, c2:78 },
];

function getRoomNameAt(px, py) {
    const col = Math.floor((px + 30) / TILE_SIZE);
    const row = Math.floor((py + 30) / TILE_SIZE);
    for (const zone of ROOM_ZONES) {
        if (row > zone.r1 && row < zone.r2 && col > zone.c1 && col < zone.c2) {
            return zone.name;
        }
    }
    return null;
}

// ============================================================================
// DOM MAP RENDERING & TRACKING
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

// ============================================================================
// GAME STATES & PARAMETERS
// ============================================================================
let playerX = 0;
let playerY = 0;
let camX = 0;
let camY = 0;

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

// Dedicated Spawn Search Engine
(function locateSpawn() {
    let fallbackX = -1, fallbackY = -1;
    for (let r = 0; r < mapData.length; r++) {
        for (let c = 0; c < mapData[r].length; c++) {
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

// Instant Initial Camera Setup
camX = game.clientWidth / 2 - playerX - 30;
camY = game.clientHeight / 2 - playerY - 30;
world.style.transform = `translate(${camX}px, ${camY}px)`;

checkRoomEntry();

const minimapCanvas = document.getElementById("minimapCanvas");
const miniCtx = minimapCanvas.getContext("2d");

function updateMiniMap(){
    miniCtx.clearRect(0, 0, 120, 120);
    const scale = 1.5; // Fixed from 0.12 so it spans completely across the 120px canvas

    for(let y = 0; y < mapData.length; y++){
        for(let x = 0; x < mapData[y].length; x++){
            if(mapData[y][x] == 1){ 
                miniCtx.fillStyle = "#00ffff"; // Cyan walls
            } else {
                miniCtx.fillStyle = "#1e293b"; // Clean modern floor space contrast color
            }
            miniCtx.fillRect(x * scale, y * scale, scale, scale);
        }
    }

    miniCtx.fillStyle = "red";
    miniCtx.beginPath();
    miniCtx.arc(
        (playerX / TILE_SIZE) * scale,
        (playerY / TILE_SIZE) * scale,
        3,
        0,
        Math.PI * 2
    );
    miniCtx.fill();
}

// Update minimap once at start
updateMiniMap();

// ============================================================================
// SYSTEM ENGINE LOGIC (COLLISION & AUTOMATIC DOORS)
// ============================================================================
function checkWalkable(x, y) {
    const padding = 12;
    const points = [
        { x: x + padding, y: y + padding },
        { x: x + 60 - padding, y: y + padding },
        { x: x + padding, y: y + 60 - padding },
        { x: x + 60 - padding, y: y + 60 - padding }
    ];

    for (let p of points) {
        const col = Math.floor(p.x / TILE_SIZE);
        const row = Math.floor(p.y / TILE_SIZE);

        if (!mapData[row] || mapData[row][col] === undefined) return false;
        const tile = mapData[row][col];

        if (tile !== FLOOR && tile !== DOOR && tile !== SPAWN) {
            return false;
        }
    }
    return true;
}

function updateDoors() {
    const pCenterX = playerX + 30;
    const pCenterY = playerY + 30;

    for (let key in doorElements) {
        const [r, c] = key.split("_").map(Number);
        const doorCenterX = c * TILE_SIZE + 25;
        const doorCenterY = r * TILE_SIZE + 25;

        const dist = Math.hypot(pCenterX - doorCenterX, pCenterY - doorCenterY);
        if (dist < TILE_SIZE * 1.5) {
            doorElements[key].classList.add("open");
        } else {
            doorElements[key].classList.remove("open");
        }
    }
}

// ============================================================================
// INVENTORY & ITEM INTERACTION SYSTEM
// ============================================================================
// 1. Drop Pool Database
const itemDropPool = [
    "💳 Admin Security ID Card",
    "🔧 Titanium Multitool Wrench",
    "🔋 High-Capacity Plasma Battery",
    "🧪 Glowing Alien Bio-Sample",
    "💾 Encrypted Mainframe Data Drive",
    "🩺 Advanced Medical Scanner",
    "🌌 Anti-Gravity Boots Element",
    "🛰️ Communications Hub Backup Fuse",
    "☕ Spaceship Crew's Lost Coffee Mug",
    "💎 Rare Asteroid Crystal Fragment"
];

// 2. State & DOM Elements Tracking
const playerInventory = [];
let nearbyItem = null; // Stores item location data { row, col, type }

const actionContainer = document.getElementById("action-container");
const btnAction = document.getElementById("btn-action");
const bagGrid = document.getElementById("bag-grid");

// Scan the area directly in front/around the player for crates or terminals
function checkNearbyItems() {
    const pCenterX = playerX + 30;
    const pCenterY = playerY + 30;
    
    let closestItem = null;
    let minDistance = TILE_SIZE * 1.5; // Radius distance to trigger the hand button

    // Scan nearby tile indices to save processing loops
    const startRow = Math.max(0, Math.floor(playerY / TILE_SIZE) - 2);
    const endRow = Math.min(mapData.length - 1, Math.floor(playerY / TILE_SIZE) + 2);
    const startCol = Math.max(0, Math.floor(playerX / TILE_SIZE) - 2);
    const endCol = Math.min(mapData[0].length - 1, Math.floor(playerX / TILE_SIZE) + 2);

    for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
            const tileType = mapData[r][c];
            
            // Look for interactive objects: CRATE (5) or TERMINAL (4)
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

    // Show or hide the Hand Action button based on proximity
    if (nearbyItem) {
        if (nearbyItem.type === CRATE) btnAction.textContent = "🖐️ PICK UP CRATE";
        if (nearbyItem.type === TERMINAL) btnAction.textContent = "🖐️ ACCESS DATA";
        actionContainer.classList.remove("hidden");
    } else {
        actionContainer.classList.add("hidden");
    }
}

// Handle the interaction action click
if (btnAction) {
    btnAction.addEventListener("click", () => {
        if (!nearbyItem) return;

        const { row, col, type } = nearbyItem;
        let itemName = "";

        if (type === CRATE) {
            // Pick a completely random item from our unique list!
            const randomIndex = Math.floor(Math.random() * itemDropPool.length);
            itemName = itemDropPool[randomIndex];
            
            // Change tile to FLOOR (0) in data grid so it vanishes visually from the map
            mapData[row][col] = FLOOR;
            
            // Clear visual class from the DOM element grid
            const tileIndex = row * mapData[0].length + col;
            const tileDOM = mapContainer.children[tileIndex];
            if (tileDOM) {
                tileDOM.className = "tile floor";
            }
        } else if (type === TERMINAL) {
            itemName = `💾 Downloaded Security Logs`;
            // Keep the terminal on screen, but you can only download from it once!
            // Change its map data type to a static DECOR (9) so it can't be reused
            mapData[row][col] = DECOR; 
        }

        // Add to array state
        playerInventory.push(itemName);
        updateInventoryHUD();

        // Re-check loops immediately to hide button since item was taken
        checkNearbyItems();
        updateMiniMap(); // Keep map visuals updated if objects are cleared
    });
}

const bagGrid = document.getElementById("bag-grid");

function updateInventoryHUD() {

    bagGrid.innerHTML = "";

    for(let i = 0; i < 27; i++){

        const slot = document.createElement("div");
        slot.className = "bag-slot";

        if(playerInventory[i]){
            slot.textContent = playerInventory[i];
            slot.draggable = true;
        }

        bagGrid.appendChild(slot);
    }

}
  


// ============================================================================
// INPUT CONTROLLERS (VIRTUAL JOYSTICK & KEYBOARD ENGINE)
// ============================================================================
const joystickContainer = document.getElementById('joystick-container');
const joystickBase = document.getElementById('joystick-base');
const joystickThumb = document.getElementById('joystick-thumb');

let joystickActive = false;
let joystickStartX = 0;
let joystickStartY = 0;
const maxDistance = 50; 

// Track keyboard inputs perfectly alongside joystick
const activeKeys = new Set();

function evaluateKeyboardVector() {
    // Only run keyboard inputs if joystick isn't actively being dragged
    if (joystickActive) return;

    inputDir.x = 0;
    inputDir.y = 0;

    if (activeKeys.has("up"))    inputDir.y = -1;
    if (activeKeys.has("down"))  inputDir.y = 1;
    if (activeKeys.has("left"))  inputDir.x = -1;
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
    joystickThumb.style.transform = 'translate(0px, 0px)';
    evaluateKeyboardVector(); // Return control to keyboard checks if any keys were held
}

// Touch listeners
joystickContainer.addEventListener('touchstart', handleJoystickStart, { passive: false });
window.addEventListener('touchmove', handleJoystickMove, { passive: false });
window.addEventListener('touchend', handleJoystickEnd);

// Mouse listeners for browser testing
joystickContainer.addEventListener('mousedown', handleJoystickStart);
window.addEventListener('mousemove', handleJoystickMove);
window.addEventListener('mouseup', handleJoystickEnd);

// Keyboard listeners
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") activeKeys.add("up");
    if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") activeKeys.add("down");
    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") activeKeys.add("left");
    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") activeKeys.add("right");
    evaluateKeyboardVector();
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") activeKeys.delete("up");
    if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") activeKeys.delete("down");
    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") activeKeys.delete("left");
    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") activeKeys.delete("right");
    evaluateKeyboardVector();
});

// ============================================================================
// MAIN GAME LOOP
// ============================================================================
let lastTime = performance.now();

function gameLoop(currentTime) {
    let dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    if (dt > 0.1) dt = 0.1; 

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
        updateMiniMap(); // Optimized: Only redraw mini-map grid when coordinates change!
    } 

    // Smooth Lerp Camera Follow System
    let targetCamX = game.clientWidth / 2 - playerX - 30;
    let targetCamY = game.clientHeight / 2 - playerY - 30;

    camX += (targetCamX - camX) * CAMERA_LERP;
    camY += (targetCamY - camY) * CAMERA_LERP;

    world.style.transform = `translate(${camX}px, ${camY}px)`;

    requestAnimationFrame(gameLoop);
}

// Start game loops
requestAnimationFrame(gameLoop);

window.addEventListener("resize", () => {
    camX = game.clientWidth / 2 - playerX - 30;
    camY = game.clientHeight / 2 - playerY - 30;
});
