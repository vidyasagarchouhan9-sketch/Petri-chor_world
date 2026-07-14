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
    { name: "📡 Communications Hub",    r1:19, c1:64, r2:29, c2:76 }, // carved out of Engine Room for the mission system
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

        // Mission System: a small number of doors can be locked by mission state.
        // isDoorLocked() defaults to false for every door not registered by a mission.
        if (tile === DOOR && isDoorLocked(row, col)) {
            return false;
        }

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
// NOTE: Mission-critical items (Wrench, ID Card, Data Drive) are NOT in this
// pool — they are placed at specific scripted locations by the Mission System
// further down in this file, so they can't be obtained early/randomly.
const itemDropPool = [
    "🔋 High-Capacity Plasma Battery",
    "🧪 Glowing Alien Bio-Sample",
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
const bagGrid = document.getElementById("bagGrid");
const bagBtn = document.getElementById("bagBtn");
const bagWindow = document.getElementById("bagWindow");
const closeBagBtn = document.getElementById("closeBag");

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
        // ---- MISSION SYSTEM HOOK: Communications Hub server rack ----
        // This target isn't a CRATE/TERMINAL tile, so it must be checked
        // before the normal nearbyItem guard below.
        if (missionInteractTarget === "serverRack") {
            handleServerRackInteract();
            return;
        }

        if (!nearbyItem) return;

        const { row, col, type } = nearbyItem;

        // ---- MISSION SYSTEM HOOK: scripted crate/terminal locations ----
        if (handleMissionInteract(row, col, type)) {
            checkNearbyItems();
            updateMiniMap();
            return;
        }

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

function updateInventoryHUD() {
    bagGrid.innerHTML = "";

    for(let i = 0; i < 27; i++){
        const slot = document.createElement("div");
        slot.className = "slot";

        if(playerInventory[i]){
            slot.textContent = playerInventory[i];
            slot.draggable = true;
        }

        bagGrid.appendChild(slot);
    }
}

// Wire up the backpack button to open/close the inventory window
if (bagBtn && bagWindow) {
    bagBtn.addEventListener("click", () => {
        updateInventoryHUD();
        bagWindow.style.display = "block";
    });
}
if (closeBagBtn && bagWindow) {
    closeBagBtn.addEventListener("click", () => {
        bagWindow.style.display = "none";
    });
}

// ============================================================================
// MISSION SYSTEM — OVERVIEW
// ============================================================================
// This section adds a scripted mission line on top of the existing systems.
// It does NOT modify graphics, camera, movement, joystick, minimap, or the
// inventory UI. It only:
//   - reuses the existing #btn-action interact button & nearbyItem detection
//   - reuses the existing playerInventory array + updateInventoryHUD()
//   - reuses the existing doorElements/updateDoors() visual door system
//   - adds a small isDoorLocked() check consumed by checkWalkable() above
//
// To add a FUTURE mission: add new state flags to missionState, new
// coordinates near the top, a branch in handleMissionInteract() (or a new
// dedicated interactable like the server rack), and a new sequence function
// played through playSequence(). Nothing else needs to change.
// ============================================================================

// ---------------------------------------------------------------------------
// MISSION SYSTEM: STATE
// ---------------------------------------------------------------------------
const missionState = {
    hasWrench: false,
    hasIdCard: false,
    terminalHacked: false,
    hasDataDrive: false,
    aiCoreAccessGrantedShown: false,
    aiCoreCinematicPlayed: false
};

// ---------------------------------------------------------------------------
// MISSION SYSTEM: SCRIPTED WORLD LOCATIONS
// ---------------------------------------------------------------------------
// Storage crate that always contains the wrench (instead of random loot)
const WRENCH_CRATE = { row: 59, col: 64 };

// Workshop crate reused as the "broken maintenance locker"
const LOCKER_CRATE = { row: 64, col: 45 };

// Control Room bounding box (matches the ROOM_ZONES entry above) — any
// terminal tile interacted with inside this box is treated as THE security
// terminal for the mission.
const CONTROL_ROOM_ZONE = { r1: 3, c1: 16, r2: 15, c2: 26 };

// Communications Hub glowing server rack (uses the existing reactor-style
// decoration tiles already on the map, purely as a proximity target — no
// map tiles or graphics are changed).
const SERVER_RACK_TILE = { row: 24, col: 69 };

// Doors that can be locked by mission state
const CONTROL_ROOM_DOOR_TILES = [[15, 20], [15, 21]];
const AI_CORE_DOOR_TILES = [[17, 38], [17, 39], [17, 40]];
const AI_CORE_ROOM_NAME = "🤖 AI Core"; // must match the ROOM_ZONES entry name

// Tracks a non-tile interactable target for the interact button (currently
// only the server rack; future missions can reuse this same pattern).
let missionInteractTarget = null;

// ---------------------------------------------------------------------------
// MISSION SYSTEM: SMALL HELPERS
// ---------------------------------------------------------------------------
function isInsideZone(row, col, zone) {
    return row > zone.r1 && row < zone.r2 && col > zone.c1 && col < zone.c2;
}

// Removes a consumed mission tile (crate/locker) the same way the base
// crate-pickup logic already does, so visuals stay perfectly consistent.
function clearTileToFloor(row, col) {
    mapData[row][col] = FLOOR;
    const tileIndex = row * mapData[0].length + col;
    const tileDOM = mapContainer.children[tileIndex];
    if (tileDOM) tileDOM.className = "tile floor";
}

// Called by checkWalkable() above. Returns true if the given DOOR tile
// should currently block movement. Any door not listed here is unaffected.
function isDoorLocked(row, col) {
    if (CONTROL_ROOM_DOOR_TILES.some(([r, c]) => r === row && c === col)) {
        return !missionState.hasIdCard;
    }
    if (AI_CORE_DOOR_TILES.some(([r, c]) => r === row && c === col)) {
        return !(missionState.hasIdCard && missionState.hasDataDrive);
    }
    return false;
}

// ---------------------------------------------------------------------------
// MISSION SYSTEM: POPUP / TOAST ENGINE (reusable for future missions)
// ---------------------------------------------------------------------------
const missionOverlay = document.getElementById("missionOverlay");
const missionPopupContent = document.getElementById("missionPopupContent");
const missionContinueBtn = document.getElementById("missionContinueBtn");
const missionToast = document.getElementById("missionToast");

let toastHideTimer = null;

// Short banner-style message (ACCESS DENIED, item pickups, etc.)
function showToast(message, duration = 3000, variantClass = null) {
    if (!missionToast) return;
    missionToast.innerHTML = message.replace(/\n/g, "<br>");
    missionToast.className = variantClass ? variantClass : "";

    void missionToast.offsetWidth; // restart transition on rapid re-triggers
    missionToast.classList.add("show");

    clearTimeout(toastHideTimer);
    toastHideTimer = setTimeout(() => {
        missionToast.classList.remove("show");
    }, duration);
}

// Big futuristic modal popup (terminal hacks, cinematics)
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

// Plays an ordered list of popup frames. Each frame:
//   { html, duration?: ms (auto-advance), showContinue?: bool,
//     continueLabel?: string, onShow?: fn }
// Frames with showContinue wait for the player to tap the button;
// frames with duration (and no showContinue) auto-advance.
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

// ---------------------------------------------------------------------------
// MISSION SYSTEM: STORAGE WRENCH + WORKSHOP LOCKER + CONTROL ROOM TERMINAL
// ---------------------------------------------------------------------------
// Called from the existing btnAction click handler. Returns true if it
// handled the interaction (so the default crate/terminal logic is skipped),
// or false to let the original generic logic run as before.
function handleMissionInteract(row, col, type) {

    // --- Storage: Titanium Multitool Wrench ---
    if (type === CRATE && row === WRENCH_CRATE.row && col === WRENCH_CRATE.col) {
        clearTileToFloor(row, col);
        missionState.hasWrench = true;
        playerInventory.push("🔧 Titanium Multitool Wrench");
        updateInventoryHUD();
        showToast("🔧 Titanium Multitool Wrench added to inventory.", 3200);
        return true;
    }

    // --- Workshop: Broken Maintenance Locker ---
    if (type === CRATE && row === LOCKER_CRATE.row && col === LOCKER_CRATE.col) {
        if (!missionState.hasWrench) {
            showToast("🔒 The maintenance locker is jammed.\nYou need a tool to force it open.", 3200, "mp-error");
            return true; // handled — locker stays put until the player has a wrench
        }
        clearTileToFloor(row, col);
        missionState.hasIdCard = true;
        playerInventory.push("💳 Admin Security ID Card");
        updateInventoryHUD();
        showToast("🔧 Wrench used to force the locker open!\n💳 Admin Security ID Card added to inventory.", 3800, "mp-success");
        return true;
    }

    // --- Control Room: Security Terminal ---
    if (type === TERMINAL && isInsideZone(row, col, CONTROL_ROOM_ZONE) && !missionState.terminalHacked) {
        missionState.terminalHacked = true;

        // Consume this terminal tile the same way the base logic normally would
        mapData[row][col] = DECOR;
        const tileIndex = row * mapData[0].length + col;
        const tileDOM = mapContainer.children[tileIndex];
        if (tileDOM) tileDOM.className = "tile deco";

        playTerminalHackSequence();
        return true;
    }

    return false; // not a mission tile — fall through to default behavior
}

// Terminal hack cinematic: download bar -> complete -> warning + objective
function playTerminalHackSequence() {
    playSequence([
        {
            html: `
                <span class="mp-title">DOWNLOADING SECURITY LOGS...</span>
                <div class="mp-progress-track"><div class="mp-progress-fill" id="mpProgressFill"></div></div>
            `,
            duration: 2400,
            onShow: () => {
                requestAnimationFrame(() => {
                    const fill = document.getElementById("mpProgressFill");
                    if (fill) fill.style.width = "100%";
                });
            }
        },
        {
            html: `<span class="mp-title mp-success">DOWNLOAD COMPLETE</span>`,
            duration: 900
        },
        {
            html: `
                <span class="mp-title mp-warning">⚠ WARNING</span>
                Station AI is in Emergency Lockdown.<br>
                AI Core Access Restricted.<br><br>
                Required:<br>
                ✔ Admin Security ID Card<br>
                ✔ Encrypted Mainframe Data Drive<br><br>
                <span class="mp-dim">— MISSION UPDATED —</span><br>
                Find the Encrypted Mainframe Data Drive.
            `,
            showContinue: true
        }
    ], () => {
        showToast("🎯 New Objective:\nFind the Encrypted Mainframe Data Drive.", 3800);
    });
}

// ---------------------------------------------------------------------------
// MISSION SYSTEM: COMMUNICATIONS HUB — GLOWING SERVER RACK
// ---------------------------------------------------------------------------
// Called directly from the interact button handler when missionInteractTarget
// is "serverRack" (see missionSystemUpdate() below for how that gets set).
function handleServerRackInteract() {
    if (missionState.hasDataDrive) return;

    missionState.hasDataDrive = true;
    playerInventory.push("💾 Encrypted Mainframe Data Drive");
    updateInventoryHUD();
    showToast("💾 Encrypted Mainframe Data Drive added to inventory.", 3400, "mp-success");

    missionInteractTarget = null;
    actionContainer.classList.add("hidden");
}

// ---------------------------------------------------------------------------
// MISSION SYSTEM: AI CORE ACCESS + CINEMATIC
// ---------------------------------------------------------------------------
const doorMessageCooldowns = {};

// Shows a throttled warning toast when the player approaches a locked door,
// so it doesn't spam while they stand next to it.
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

// AI Core boot-up cinematic, played once when the player first walks in
// with both required items.
function playAICoreCinematic() {
    playSequence([
        { html: `<span class="mp-title">BOOTING AI...</span>`, duration: 1500 },
        { html: `<span class="mp-title mp-success">WELCOME ADMINISTRATOR</span>`, duration: 1500 },
        { html: `<span class="mp-title mp-error">ERROR ERROR</span>`, duration: 1300 },
        {
            html: `
                <span class="mp-title mp-error">🚨 EMERGENCY ALERT</span>
                A classified object has been stolen.<br>
                Security footage corrupted.<br>
                Project PETRI-CHOR is classified.<br>
                Administrator clearance insufficient.
            `,
            showContinue: true
        },
        {
            html: `
                <span class="mp-title mp-dim">— MISSION UPDATED —</span>
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
                <span class="mp-dim">— SIGNAL LOST —</span><br>
                TO BE CONTINUED...
            `,
            showContinue: true,
            continueLabel: "CLOSE"
        }
    ]);
}

// ---------------------------------------------------------------------------
// MISSION SYSTEM: PER-FRAME UPDATE (called from the existing game loop)
// ---------------------------------------------------------------------------
function missionSystemUpdate() {
    const pCenterX = playerX + 30;
    const pCenterY = playerY + 30;

    // ---- Communications Hub: glowing server rack proximity ----
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

    // ---- Control Room door: ACCESS DENIED feedback ----
    checkLockedDoorApproach(
        CONTROL_ROOM_DOOR_TILES,
        !missionState.hasIdCard,
        "🚫 ACCESS DENIED\nAdministrator ID Required",
        "controlRoom"
    );

    // ---- AI Core door: locked feedback, access granted, cinematic ----
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

            // Door opening animation (flash) on the AI Core door tiles
            AI_CORE_DOOR_TILES.forEach(([r, c]) => {
                const doorEl = doorElements[`${r}_${c}`];
                if (doorEl) {
                    doorEl.classList.add("access-flash");
                    setTimeout(() => doorEl.classList.remove("access-flash"), 1000);
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

// ============================================================================
// INPUT CONTROLLERS (VIRTUAL JOYSTICK & KEYBOARD ENGINE)
// ============================================================================
const joystickContainer = document.getElementById('joystick-container');
const joystickBase = document.getElementById('joystick-base');
const joystickThumb = document.getElementById('joystick-thumb');

// Detect touch devices once at the top/middle cleanly
const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

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

if (isTouchDevice) {
    // Touch controls
    joystickContainer.addEventListener('touchstart', handleJoystickStart, { passive: false });
    window.addEventListener('touchmove', handleJoystickMove, { passive: false });
    window.addEventListener('touchend', handleJoystickEnd);
}

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
        missionSystemUpdate(); // Mission System: locked doors, server rack, cinematics
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

// ===============================
// DEVICE DETECTION VISUAL CONFIG
// ===============================
if (joystickContainer) {
    if (isTouchDevice) {
        joystickContainer.style.display = "flex";
    } else {
        joystickContainer.style.display = "none";
    }
}
