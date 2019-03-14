/**
 * README:
 * Remember to use this script with defer, so it will run only AFTER the DOM is loaded.
 * If you don't want to use it with defer or you want to use it with async remember to
 * call initCutter when the DOM is fully loaded or it won't work
 * */

let mainCard;
let mainPic;
let cutter;

let cutterInitialized = false;

function loadCutter(){
    if(document.readyState !== "complete" || cutterInitialized) return;
    cutterInitialized = true;

    mainCard = document.getElementById("main-card");
    mainPic = document.getElementById("main-pic");
    cutter = document.getElementById("main-card-cutter");
    cutter.style.transformOrigin = "bottom right";
    cutter.style.transition = "transform 0.5s ease";

    resizeCutter();
}

function resizeCutter(){
    if(document.readyState === "complete" && cutterInitialized) {
        const b = mainPic.offsetLeft + mainPic.width / 2;
        const c = mainCard.clientHeight - (mainPic.offsetTop + mainPic.height / 2);

        const radians = Math.atan(b / c);

        const degree = radians * 180 / Math.PI;

        cutter.style.transform = "rotate(" + degree + "deg)";
    }
}

loadCutter();
