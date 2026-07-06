let trainDoorOpen = false;

const story = {
  phase: "station",
  timer: 0,
  controlsLocked: false,
  introShown: false
};

const cutsceneEl = document.getElementById("cutscene");
const cutsceneTextEl = document.getElementById("cutsceneText");
const blackoutEl = document.getElementById("blackout");
const flashEl = document.getElementById("flash");

function showMessage(text, autoHideMs) {
  cutsceneTextEl.textContent = text;
  cutsceneEl.classList.add("visible");
  if (autoHideMs) {
    setTimeout(function () {
      if (cutsceneTextEl.textContent === text) {
        cutsceneEl.classList.remove("visible");
      }
    }, autoHideMs);
  }
}

function hideMessage() {
  cutsceneEl.classList.remove("visible");
}

function nearestTileDist(tileVal) {
  let best = Infinity;
  for (let y = 0; y < worldMap.length; y++) {
    for (let x = 0; x < worldMap[y].length; x++) {
      if (worldMap[y][x] === tileVal) {
        const dx = (x + 0.5) - player.x;
        const dy = (y + 0.5) - player.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < best) best = d;
      }
    }
  }
  return best;
}

function applyShake() {
  const mag = 5;
  canvas.style.transform =
    "translate(" + ((Math.random() - 0.5) * mag) + "px," + ((Math.random() - 0.5) * mag) + "px)";
}

function clearShake() {
  canvas.style.transform = "";
}

function updateStory(dt) {
  story.timer += dt;

  switch (story.phase) {
    case "station":
      if (!story.introShown) {
        story.introShown = true;
        showMessage("Waiting for the train...", 3000);
      }
      if (nearestTileDist(TRAIN_DOOR_TILE) < 2.0) {
        story.phase = "arriving";
        story.timer = 0;
        story.controlsLocked = true;
        showMessage("A train roars into the station...");
      }
      break;

    case "arriving":
      applyShake();
      if (story.timer > 2400) {
        clearShake();
        trainDoorOpen = true;
        showMessage("The doors slide open. Get on board.", 2200);
        story.phase = "boarding";
        story.timer = 0;
        story.controlsLocked = false;
      }
      break;

    case "boarding":
      if (player.y > 4.3) {
        story.phase = "attacked";
        story.timer = 0;
        story.controlsLocked = true;
        showMessage("Something lunges out of the dark!");
        flashEl.classList.add("hit");
      }
      break;

    case "attacked":
      if (story.timer > 350) {
        flashEl.classList.remove("hit");
      }
      if (story.timer > 800) {
        blackoutEl.classList.add("visible");
      }
      if (story.timer > 2600) {
        worldMap = trainMap;
        for (const key in doors) delete doors[key];
        player.x = 1.5;
        player.y = 1.5;
        player.angle = 0;
        showMessage("You wake up... somewhere else on the train.", 3200);
        story.phase = "waking";
        story.timer = 0;
      }
      break;

    case "waking":
      if (story.timer > 700) {
        blackoutEl.classList.remove("visible");
      }
      if (story.timer > 3300) {
        story.controlsLocked = false;
        story.phase = "playing";
      }
      break;

    case "playing":
      break;
  }
}
