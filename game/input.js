const keys = {};

window.addEventListener("keydown", function (e) {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", function (e) {
  keys[e.key.toLowerCase()] = false;
});

const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");

let moveX = 0;
let moveY = 0;

let joystickActive = false;
let activePointerId = null;

const rect0 = joystick.getBoundingClientRect();
const center = rect0.width / 2;
const max = center - stick.getBoundingClientRect().width / 2;

function updateStick(clientX, clientY) {
  const rect = joystick.getBoundingClientRect();

  let x = clientX - rect.left - center;
  let y = clientY - rect.top - center;

  const dist = Math.sqrt(x * x + y * y);

  if (dist > max) {
    x = (x / dist) * max;
    y = (y / dist) * max;
  }

  stick.style.left = (center + x) + "px";
  stick.style.top = (center + y) + "px";

  moveX = x / max;
  moveY = y / max;
}

function resetStick() {
  stick.style.left = center + "px";
  stick.style.top = center + "px";
  moveX = 0;
  moveY = 0;
  joystickActive = false;
  activePointerId = null;
}

joystick.addEventListener("touchstart", function (e) {
  e.preventDefault();
  const touch = e.touches[0];
  updateStick(touch.clientX, touch.clientY);
}, { passive: false });

joystick.addEventListener("touchmove", function (e) {
  e.preventDefault();
  const touch = e.touches[0];
  updateStick(touch.clientX, touch.clientY);
}, { passive: false });

joystick.addEventListener("touchend", resetStick);
joystick.addEventListener("touchcancel", resetStick);

joystick.addEventListener("pointerdown", function (e) {
  e.preventDefault();
  joystickActive = true;
  activePointerId = e.pointerId;
  joystick.setPointerCapture(e.pointerId);
  updateStick(e.clientX, e.clientY);
});

joystick.addEventListener("pointermove", function (e) {
  if (!joystickActive || e.pointerId !== activePointerId) return;
  updateStick(e.clientX, e.clientY);
});

joystick.addEventListener("pointerup", function (e) {
  if (e.pointerId !== activePointerId) return;
  resetStick();
});

joystick.addEventListener("pointercancel", resetStick);

const lookArea = document.getElementById("lookArea");
let lookActive = false;
let lookLastX = 0;
let lookPointerId = null;
const lookSensitivity = 0.005;

lookArea.addEventListener("touchstart", function (e) {
  const touch = e.touches[0];
  lookActive = true;
  lookLastX = touch.clientX;
}, { passive: true });

lookArea.addEventListener("touchmove", function (e) {
  if (!lookActive) return;
  const touch = e.touches[0];
  const dx = touch.clientX - lookLastX;
  lookLastX = touch.clientX;
  player.angle += dx * lookSensitivity;
}, { passive: true });

lookArea.addEventListener("touchend", function () {
  lookActive = false;
});

lookArea.addEventListener("pointerdown", function (e) {
  lookActive = true;
  lookPointerId = e.pointerId;
  lookLastX = e.clientX;
  lookArea.setPointerCapture(e.pointerId);
});

lookArea.addEventListener("pointermove", function (e) {
  if (!lookActive || e.pointerId !== lookPointerId) return;
  const dx = e.clientX - lookLastX;
  lookLastX = e.clientX;
  player.angle += dx * lookSensitivity;
});

lookArea.addEventListener("pointerup", function (e) {
  if (e.pointerId !== lookPointerId) return;
  lookActive = false;
  lookPointerId = null;
});

lookArea.addEventListener("pointercancel", function () {
  lookActive = false;
  lookPointerId = null;
});

const runBtn = document.getElementById("runBtn");
let runActive = false;

function setRun(active) {
  runActive = active;
  runBtn.classList.toggle("active", active);
}

runBtn.addEventListener("touchstart", function (e) {
  e.preventDefault();
  setRun(true);
}, { passive: false });

runBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  setRun(false);
});

runBtn.addEventListener("touchcancel", function () {
  setRun(false);
});

runBtn.addEventListener("pointerdown", function (e) {
  e.preventDefault();
  setRun(true);
});

runBtn.addEventListener("pointerup", function () {
  setRun(false);
});

runBtn.addEventListener("pointercancel", function () {
  setRun(false);
});

