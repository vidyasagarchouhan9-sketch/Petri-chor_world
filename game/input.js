const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");

let moveX = 0;
let moveY = 0;

joystick.addEventListener("touchmove", function(e){

    e.preventDefault();

    const rect = joystick.getBoundingClientRect();

    const touch = e.touches[0];

    let x = touch.clientX - rect.left - 60;
    let y = touch.clientY - rect.top - 60;

    const max = 35;

    const dist = Math.sqrt(x*x + y*y);

    if(dist > max){
        x = x / dist * max;
        y = y / dist * max;
    }

    stick.style.left = (35 + x) + "px";
    stick.style.top = (35 + y) + "px";

    moveX = x / max;
    moveY = y / max;

});

joystick.addEventListener("touchend", function(){

    stick.style.left = "35px";
    stick.style.top = "35px";

    moveX = 0;
    moveY = 0;

});
