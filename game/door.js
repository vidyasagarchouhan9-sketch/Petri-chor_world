const doors = {};

function doorKey(x, y) {
  return x + "," + y;
}

function getDoor(x, y) {
  const key = doorKey(x, y);
  if (!doors[key]) {
    doors[key] = { progress: 0 };
  }
  return doors[key];
}

function updateDoors() {
  const speed = 0.045;

  for (let y = 0; y < worldMap.length; y++) {
    for (let x = 0; x < worldMap[y].length; x++) {
      const val = worldMap[y][x];

      if (isDoorTile(val)) {
        const door = getDoor(x, y);

        let target;
        if (val === TRAIN_DOOR_TILE) {
          target = typeof trainDoorOpen !== "undefined" && trainDoorOpen ? 1 : 0;
        } else {
          const dx = (x + 0.5) - player.x;
          const dy = (y + 0.5) - player.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          target = dist < 1.3 ? 1 : 0;
        }

        if (door.progress < target) {
          door.progress = Math.min(target, door.progress + speed);
        } else if (door.progress > target) {
          door.progress = Math.max(target, door.progress - speed);
        }
      }
    }
  }
}

function isWalkable(x, y) {
  const mx = Math.floor(x);
  const my = Math.floor(y);

  if (my < 0 || my >= worldMap.length || mx < 0 || mx >= worldMap[0].length) {
    return false;
  }

  const tile = worldMap[my][mx];

  if (tile === 0) {
    return true;
  }

  if (isDoorTile(tile)) {
    const door = getDoor(mx, my);
    return door.progress > 0.7;
  }

  return false;
}
