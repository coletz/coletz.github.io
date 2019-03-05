let mainCard;
let mainPic;
let cutter;


function initCutter(){
    mainCard = document.getElementById("main-card");
    mainPic = document.getElementById("main-pic");
    cutter = document.getElementById("main-card-cutter");
    cutter.style.transformOrigin = "bottom right";
    resizeCutter();
}

function resizeCutter(){
    const b = mainPic.offsetLeft + mainPic.width/2;
    const c = mainCard.clientHeight - (mainPic.offsetTop + mainPic.height/2);

    const radians = Math.atan(b/c);

    const degree = radians * 180 / Math.PI;

    cutter.style.transform = "rotate("+degree+"deg)";
}
