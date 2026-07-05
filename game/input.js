const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");

let moveX = 0;
let moveY = 0;

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
