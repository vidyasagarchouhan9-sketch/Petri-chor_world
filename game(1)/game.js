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

// Split map representations to maintain a clean structure and prevent layout issues.
const mapPart1 = [
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
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1]
];

const mapPart2 = [
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
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const mapPart3 = [
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
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,9,9,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,1,1]
];

// Combine the parts to form the global game map representation
const mapData = mapPart1.concat(mapPart2, mapPart3);

// ============================================================================
// GAME WORLD RUNTIME STATE Variables
// ============================================================================
const game = document.getElementById("game");
const world = document.getElementById("world");
const minimapCanvas = document.getElementById("minimap");
const minimapCtx = minimapCanvas ? minimapCanvas.getContext("2d") : null;

const ROWS = mapData.length;
const COLS = mapData[0].length;

const WALKABLE_TILES = [FLOOR, DECOR, SPAWN];

let playerX = 150;
let playerY = 150;
let camX = 0;
let camY = 0;

const CAMERA_LERP = 0.08;
const MOVE_SPEED = 220; // Units per second

let inputDir = { x: 0, y: 0 };
let activeKeys = {};

// Diagnostics: Map validation
console.log(`Map Configured with Dimensions: ${COLS}x${ROWS}`);

// Spawn configuration finder
function locateSpawnPoint() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (mapData[r][c] === SPAWN) {
                playerX = c * TILE_SIZE + (TILE_SIZE / 2) - 15;
                playerY = r * TILE_SIZE + (TILE_SIZE / 2) - 15;
                console.log(`Spawn Override Initiated at Matrix: (${c}, ${r}) Pixel: (${playerX}, ${playerY})`);
                return;
            }
        }
    }
}
locateSpawnPoint();

// Dynamic DOM Elements references
const player = document.getElementById("player");
player.style.left = playerX + "px";
player.style.top = playerY + "px";

// ============================================================================
// LAYER GENERATOR & RENDER SUBSYSTEMS
// ============================================================================
function buildStructuralGrid() {
    const floorFragment = document.createDocumentFragment();
    const wallsFragment = document.createDocumentFragment();
    const decorsFragment = document.createDocumentFragment();

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const val = mapData[r][c];

            // Primary Floor Tile Placement (drawn everywhere except boundaries)
            if (val !== WALL) {
                const floorNode = document.createElement("div");
                floorNode.className = "tile floor";
                floorNode.style.left = (c * TILE_SIZE) + "px";
                floorNode.style.top = (r * TILE_SIZE) + "px";
                floorFragment.appendChild(floorNode);
            }

            if (val === WALL) {
                const wallNode = document.createElement("div");
                wallNode.className = "tile wall";
                wallNode.style.left = (c * TILE_SIZE) + "px";
                wallNode.style.top = (r * TILE_SIZE) + "px";
                wallsFragment.appendChild(wallNode);
            } else if (val === TERMINAL) {
                const termNode = document.createElement("div");
                termNode.className = "tile object terminal";
                termNode.style.left = (c * TILE_SIZE) + "px";
                termNode.style.top = (r * TILE_SIZE) + "px";
                termNode.dataset.row = r;
                termNode.dataset.col = c;
                decorsFragment.appendChild(termNode);
            } else if (val === CRATE) {
                const crateNode = document.createElement("div");
                crateNode.className = "tile object crate";
                crateNode.style.left = (c * TILE_SIZE) + "px";
                crateNode.style.top = (r * TILE_SIZE) + "px";
                crateNode.dataset.row = r;
                crateNode.dataset.col = c;
                decorsFragment.appendChild(crateNode);
            } else if (val === REACTOR) {
                const reactNode = document.createElement("div");
                reactNode.className = "tile object reactor";
                reactNode.style.left = (c * TILE_SIZE) + "px";
                reactNode.style.top = (r * TILE_SIZE) + "px";
                decorsFragment.appendChild(reactNode);
            } else if (val === MEDICAL) {
                const medNode = document.createElement("div");
                medNode.className = "tile object medical";
                medNode.style.left = (c * TILE_SIZE) + "px";
                medNode.style.top = (r * TILE_SIZE) + "px";
                decorsFragment.appendChild(medNode);
            } else if (val === LAB) {
                const labNode = document.createElement("div");
                labNode.className = "tile object lab-equipment";
                labNode.style.left = (c * TILE_SIZE) + "px";
                labNode.style.top = (r * TILE_SIZE) + "px";
                decorsFragment.appendChild(labNode);
            } else if (val === DECOR) {
                const decNode = document.createElement("div");
                decNode.className = "tile decor-plant";
                decNode.style.left = (c * TILE_SIZE) + "px";
                decNode.style.top = (r * TILE_SIZE) + "px";
                decorsFragment.appendChild(decNode);
            }
        }
    }

    world.appendChild(floorFragment);
    world.appendChild(wallsFragment);
    world.appendChild(decorsFragment);
    buildDoorsSubsystem();
}

// Door Subsystem dynamic entities
let interactiveDoors = [];
function buildDoorsSubsystem() {
    const doorFragment = document.createDocumentFragment();
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (mapData[r][c] === DOOR) {
                const doorNode = document.createElement("div");
                doorNode.className = "tile door-asset";
                doorNode.style.left = (c * TILE_SIZE) + "px";
                doorNode.style.top = (r * TILE_SIZE) + "px";

                const isHorizontal = (c > 0 && mapData[r][c - 1] === WALL) || (c < COLS - 1 && mapData[r][c + 1] === WALL);
                if (isHorizontal) {
                    doorNode.classList.add("horizontal");
                } else {
                    doorNode.classList.add("vertical");
                }

                doorFragment.appendChild(doorNode);
                interactiveDoors.push({
                    row: r,
                    col: c,
                    element: doorNode,
                    opened: false,
                    animProgress: 0,
                    locked: false // Can configure specific doors to be key locked
                });
            }
        }
    }
    world.appendChild(doorFragment);
}

// ============================================================================
// MOTION & PHYSICS / COLLISION RESOLUTION (Bounding box & Swept-Check)
// ============================================================================
function checkWalkable(px, py) {
    const playerSize = 28; 
    let checkPoints = [
        { x: px, y: py },
        { x: px + playerSize, y: py },
        { x: px, y: py + playerSize },
        { x: px + playerSize, y: py + playerSize }
    ];

    for (let pt of checkPoints) {
        let gridX = Math.floor(pt.x / TILE_SIZE);
        let gridY = Math.floor(pt.y / TILE_SIZE);

        if (gridX < 0 || gridX >= COLS || gridY < 0 || gridY >= ROWS) {
            return false;
        }

        let tileType = mapData[gridY][gridX];
        if (tileType === WALL || tileType === CRATE || tileType === REACTOR || tileType === LAB) {
            return false;
        }

        let matchingDoor = interactiveDoors.find(d => d.row === gridY && d.col === gridX);
        if (matchingDoor && !matchingDoor.opened) {
            return false;
        }
    }
    return true;
}

function updateDoors() {
    const sensorRange = 100;
    const centerPlayerX = playerX + 14;
    const centerPlayerY = playerY + 14;

    for (let door of interactiveDoors) {
        const doorCenterX = door.col * TILE_SIZE + 25;
        const doorCenterY = door.row * TILE_SIZE + 25;

        const dist = Math.hypot(centerPlayerX - doorCenterX, centerPlayerY - doorCenterY);

        if (dist < sensorRange) {
            if (!door.locked) {
                door.opened = true;
                door.element.classList.add("opened");
            }
        } else {
            door.opened = false;
            door.element.classList.remove("opened");
        }
    }
}

// ============================================================================
// ROOM DISCOVERY & AREA SENSOR SYSTEM
// ============================================================================
const AREA_ZONES = [
    { name: "Server Room Delta", r1: 4, r2: 14, c1: 17, c2: 25 },
    { name: "Bio-hazard Lab Area", r1: 21, r2: 30, c1: 4, c2: 16 },
    { name: "Primary Reactor Chamber", r1: 39, r2: 44, c1: 67, c2: 72 },
    { name: "Medical Ward 02", r1: 4, r2: 14, c1: 4, c2: 12 },
    { name: "Central Network Terminal", r1: 4, r2: 14, c1: 30, c2: 49 },
    { name: "Storage Sector Alpha", r1: 58, r2: 64, c1: 64, c2: 78 }
];

let lastDetectedRoom = "";
function checkRoomEntry() {
    const centerPlayerX = playerX + 14;
    const centerPlayerY = playerY + 14;
    const gridX = Math.floor(centerPlayerX / TILE_SIZE);
    const gridY = Math.floor(centerPlayerY / TILE_SIZE);

    let activeZone = AREA_ZONES.find(zone => 
        gridY >= zone.r1 && gridY <= zone.r2 && gridX >= zone.c1 && gridX <= zone.c2
    );

    if (activeZone) {
        if (lastDetectedRoom !== activeZone.name) {
            lastDetectedRoom = activeZone.name;
            triggerZoneBanner(activeZone.name);
        }
    } else {
        lastDetectedRoom = "";
    }
}

function triggerZoneBanner(name) {
    const overlay = document.getElementById("room-overlay");
    if (!overlay) return;
    overlay.innerText = name;
    overlay.classList.add("visible");
    setTimeout(() => {
        overlay.classList.remove("visible");
    }, 2800);
}

// ============================================================================
// MINIMAP DRAW ENGINE (OPTIMIZED STATS)
// ============================================================================
let cachedPlayerGridX = -1;
let cachedPlayerGridY = -1;

function initMiniMapCanvas() {
    if (!minimapCanvas) return;
    minimapCanvas.width = COLS * 3;
    minimapCanvas.height = ROWS * 3;
    drawStaticMiniMap();
}

function drawStaticMiniMap() {
    if (!minimapCtx) return;
    minimapCtx.fillStyle = "rgba(10, 20, 28, 0.85)";
    minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const val = mapData[r][c];
            if (val === WALL) {
                minimapCtx.fillStyle = "#1e3d59";
                minimapCtx.fillRect(c * 3, r * 3, 3, 3);
            } else if (val === REACTOR) {
                minimapCtx.fillStyle = "#ff5722";
                minimapCtx.fillRect(c * 3, r * 3, 3, 3);
            } else if (val === MEDICAL) {
                minimapCtx.fillStyle = "#00bcd4";
                minimapCtx.fillRect(c * 3, r * 3, 3, 3);
            } else if (val === DOOR) {
                minimapCtx.fillStyle = "#ffeb3b";
                minimapCtx.fillRect(c * 3, r * 3, 3, 3);
            }
        }
    }
}

function updateMiniMap() {
    if (!minimapCtx) return;

    let pGridX = Math.floor((playerX + 14) / TILE_SIZE);
    let pGridY = Math.floor((playerY + 14) / TILE_SIZE);

    if (pGridX === cachedPlayerGridX && pGridY === cachedPlayerGridY) {
        return; 
    }

    cachedPlayerGridX = pGridX;
    cachedPlayerGridY = pGridY;

    drawStaticMiniMap();

    // Render Blinking Radar Sweeper Indicator
    minimapCtx.fillStyle = "#00ffcc";
    minimapCtx.beginPath();
    minimapCtx.arc(pGridX * 3 + 1.5, pGridY * 3 + 1.5, 2.5, 0, Math.PI * 2);
    minimapCtx.fill();
}

// ============================================================================
// OBJECTS & INTERACTION CONTROLLER
// ============================================================================
let nearbyTerminal = null;
let nearbyCrate = null;

function checkNearbyItems() {
    const sensorRange = 65;
    const centerPlayerX = playerX + 14;
    const centerPlayerY = playerY + 14;

    nearbyTerminal = null;
    nearbyCrate = null;

    const termElements = document.querySelectorAll(".tile.terminal");
    termElements.forEach(elem => {
        let tx = parseInt(elem.style.left) + 25;
        let ty = parseInt(elem.style.top) + 25;
        let dist = Math.hypot(centerPlayerX - tx, centerPlayerY - ty);
        if (dist < sensorRange) {
            nearbyTerminal = {
                element: elem,
                row: elem.dataset.row,
                col: elem.dataset.col
            };
        }
    });

    const crateElements = document.querySelectorAll(".tile.crate");
    crateElements.forEach(elem => {
        let cx = parseInt(elem.style.left) + 25;
        let cy = parseInt(elem.style.top) + 25;
        let dist = Math.hypot(centerPlayerX - cx, centerPlayerY - cy);
        if (dist < sensorRange) {
            nearbyCrate = {
                element: elem,
                row: elem.dataset.row,
                col: elem.dataset.col
            };
        }
    });

    const interactionPrompt = document.getElementById("interaction-prompt");
    if (!interactionPrompt) return;

    if (nearbyTerminal) {
        interactionPrompt.innerText = "PRESS [E] TO ACCESS MAIN DECK TERMINAL";
        interactionPrompt.style.display = "block";
    } else if (nearbyCrate) {
        interactionPrompt.innerText = "PRESS [E] TO INSPECT SECURE CARGO CRATE";
        interactionPrompt.style.display = "block";
    } else {
        interactionPrompt.style.display = "none";
    }
}

// ============================================================================
// ADVENTURE MISSIONS & INTERACTIVE DIALOGUE ENGINE
// ============================================================================
let currentMissionStage = 0;
let objectiveBanner = document.getElementById("objective-text");
let keysCollected = 0;

function missionSystemUpdate() {
    if (currentMissionStage === 0) {
        setObjective("MISSION START: Locate and connect to Server Room Delta Terminal");
        currentMissionStage = 1;
    }
}

function setObjective(text) {
    if (objectiveBanner) {
        objectiveBanner.innerHTML = `<span class="blink">CRITICAL TASK:</span> ${text}`;
    }
}

function executeActionOnE() {
    if (nearbyTerminal) {
        handleTerminalInteraction(nearbyTerminal);
    } else if (nearbyCrate) {
        handleCrateInteraction(nearbyCrate);
    }
}

function handleTerminalInteraction(term) {
    if (currentMissionStage === 1 && term.row == 5 && term.col == 18) {
        triggerCinematicLog([
            "COSMIC RELAY SATELLITE SYSTEM ENGINE: Booting Terminal...",
            "Decrypting Sub-systems data... Success.",
            "ALERT: Primary Reactor cooling valve failure!",
            "Objective updated: Investigate Sector Alpha Vault.",
            "Access key registered on delta console..."
        ], () => {
            currentMissionStage = 2;
            keysCollected++;
            setObjective("STAGE 02: Locate secure cargo crate in Storage Sector Alpha");
        });
    } else {
        triggerCinematicLog([
            "STANDBY... Network link offline.",
            "Please check central power router in Delta Vault."
        ]);
    }
}

function handleCrateInteraction(crate) {
    if (currentMissionStage === 2) {
        triggerCinematicLog([
            "Inspecting storage pod container...",
            "Vault schematic blueprints retrieved!",
            "Warning: Biological anomalies detected in Sector Gamma Labs.",
            "Task: Return to command deck console."
        ], () => {
            currentMissionStage = 3;
            setObjective("FINAL STAGE: Return to base spawn point for hyper-drive escape sequence");
        });
    } else {
        triggerCinematicLog([
            "SECURE STEEL LOCKER CONTAINER",
            "Requires authorization keycard level B to open."
        ]);
    }
}

let cinemaTextArray = [];
let cinemaIndex = 0;
let cinemaCallback = null;

function triggerCinematicLog(dialogueLines, callback) {
    cinemaTextArray = dialogueLines;
    cinemaIndex = 0;
    cinemaCallback = callback;

    const modal = document.getElementById("cinematic-modal");
    if (!modal) return;
    modal.style.display = "flex";
    advanceDialogue();
}

function advanceDialogue() {
    const textElem = document.getElementById("cinematic-text");
    if (!textElem) return;

    if (cinemaIndex < cinemaTextArray.length) {
        textElem.innerText = cinemaTextArray[cinemaIndex];
        cinemaIndex++;
    } else {
        const modal = document.getElementById("cinematic-modal");
        if (modal) modal.style.display = "none";
        if (cinemaCallback) cinemaCallback();
    }
}

// Dialog Advance Hook
document.getElementById("cinematic-modal")?.addEventListener("click", advanceDialogue);

// ============================================================================
// RAW INPUT HANDLING SUB-SYSTEM
// ============================================================================
window.addEventListener("keydown", (e) => {
    activeKeys[e.key.toLowerCase()] = true;

    if (e.key.toLowerCase() === "e") {
        executeActionOnE();
    }
});

window.addEventListener("keyup", (e) => {
    delete activeKeys[e.key.toLowerCase()];
});

function evaluateKeyboardInput() {
    inputDir.x = 0;
    inputDir.y = 0;

    if (activeKeys["w"] || activeKeys["arrowup"])    inputDir.y = -1;
    if (activeKeys["s"] || activeKeys["arrowdown"])  inputDir.y = 1;
    if (activeKeys["a"] || activeKeys["arrowleft"])  inputDir.x = -1;
    if (activeKeys["d"] || activeKeys["arrowright"]) inputDir.x = 1;

    // Normalize diagonal velocity
    if (inputDir.x !== 0 && inputDir.y !== 0) {
        inputDir.x *= 0.7071;
        inputDir.y *= 0.7071;
    }
}

// ============================================================================
// MAIN LOOP ENGINE & RUNTIME PIPELINE
// ============================================================================
buildStructuralGrid();
initMiniMapCanvas();

let previousTime = performance.now();

function gameLoop(currentTime) {
    let dt = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    // Clamp dt to avoid extreme lags creating physics tunneling
    if (dt > 0.1) dt = 0.1;

    evaluateKeyboardInput();

    let isWalking = inputDir.x !== 0 || inputDir.y !== 0;
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
