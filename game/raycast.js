function castRays() {
  const w = canvas.width;
  const h = canvas.height;

  const rayCount = Math.max(120, Math.floor(w / 3));
  const rayStep = w / rayCount;

  const grad = ctx.createLinearGradient(0, 0, 0, h / 2);
  grad.addColorStop(0, "#0a0a1a");
  grad.addColorStop(1, "#1c2b3a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h / 2);

  const floorGrad = ctx.createLinearGradient(0, h / 2, 0, h);
  floorGrad.addColorStop(0, "#141414");
  floorGrad.addColorStop(1, "#050505");
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, h / 2, w, h / 2);

  for (let i = 0; i < rayCount; i++) {
    const rayAngle = player.angle - player.fov / 2 + (i / rayCount) * player.fov;

    const rayDirX = Math.cos(rayAngle);
    const rayDirY = Math.sin(rayAngle);

    let mapX = Math.floor(player.x);
    let mapY = Math.floor(player.y);

    const deltaDistX = rayDirX === 0 ? 1e30 : Math.abs(1 / rayDirX);
    const deltaDistY = rayDirY === 0 ? 1e30 : Math.abs(1 / rayDirY);

    let stepX, stepY;
    let sideDistX, sideDistY;

    if (rayDirX < 0) {
      stepX = -1;
      sideDistX = (player.x - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1 - player.x) * deltaDistX;
    }

    if (rayDirY < 0) {
      stepY = -1;
      sideDistY = (player.y - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1 - player.y) * deltaDistY;
    }

    let hit = 0;
    let side = 0;
    let tile = 1;
    let guard = 0;

    while (hit === 0 && guard < 64) {
      guard++;
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
      }

      if (
        mapY < 0 || mapY >= worldMap.length ||
        mapX < 0 || mapX >= worldMap[0].length
      ) {
        hit = 1;
        tile = 1;
        break;
      }

          const cellVal = worldMap[mapY][mapX];

      if (cellVal > 0) {
        if (isDoorTile(cellVal)) {
          const door = getDoor(mapX, mapY);
          if (door.progress > 0.9) {
            continue;
          }
        }
        hit = 1;
        tile = cellVal;
      }
    }

    let perpDist;
    if (side === 0) {
      perpDist = (mapX - player.x + (1 - stepX) / 2) / (rayDirX || 1e-9);
    } else {
      perpDist = (mapY - player.y + (1 - stepY) / 2) / (rayDirY || 1e-9);
    }
    perpDist = Math.abs(perpDist) * Math.cos(rayAngle - player.angle);
    perpDist = Math.max(perpDist, 0.0001);

    const lineHeight = Math.min(h * 3, h / perpDist);
    const drawStart = (h - lineHeight) / 2;

    const base = wallColors[tile] || wallColors[1];
    const shade = side === 1 ? 0.65 : 1;
    const fog = Math.max(0, 1 - perpDist / 12);
    const brightness = shade * (0.35 + 0.65 * fog);

    const r = Math.floor(base[0] * brightness);
    const g = Math.floor(base[1] * brightness);
    const b = Math.floor(base[2] * brightness);

    ctx.fillStyle = `rgb(${r},${g},${b})`;
    const x = Math.floor(i * rayStep);
    ctx.fillRect(x, drawStart, Math.ceil(rayStep) + 1, lineHeight);
  }
}

function drawMiniMap() {

    const scale = 10;
    const ox = canvas.width - worldMap[0].length * scale - 20;
    const oy = 20;

    ctx.globalAlpha = 0.75;

    for(let y=0; y<worldMap.length; y++){

        for(let x=0; x<worldMap[y].length; x++){

            if(worldMap[y][x]>0){
                ctx.fillStyle="#00f0ff";
            }else{
                ctx.fillStyle="#222";
            }

            ctx.fillRect(
                x*scale+ox,
                y*scale+oy,
                scale-1,
                scale-1
            );

        }

    }

    ctx.fillStyle="red";

    ctx.beginPath();

    ctx.arc(
        player.x*scale+ox,
        player.y*scale+oy,
        3,
        0,
        Math.PI*2
    );

    ctx.fill();
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(
        player.x * scale + ox,
        player.y * scale + oy
    );

    ctx.lineTo(
        player.x * scale + ox + Math.cos(player.angle) * 12,
        player.y * scale + oy + Math.sin(player.angle) * 12
    );

    ctx.stroke();
    ctx.globalAlpha = 1;
}
