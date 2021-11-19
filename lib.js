// archreaver library

// set up cnv and ctx
var cnv = document.getElementById("gameCnv");
var ctx = cnv.getContext("2d");

cnv.width = 800;
cnv.height = 600;

// global variables
var player = {
    x: 375,
    y: 550,
    w: 50,
    h: 50,
    xSpeed: 0,
    ySpeed: 0,
    speed: 2,
    currentFrame: 0,
    animX: 0
}
var knightPlr = document.getElementById("knightPlr");
knightPlr.onload = function() {
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
}

// animation loop
requestAnimationFrame(drawGame);

function drawGame() {
    // move player by xspeed and yspeed
    player.x += player.xSpeed;
    player.y += player.ySpeed;

    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // draw player
    ctx.fillStyle = "orange";
    ctx.drawImage(knightPlr, player.animX, 0, 8, 8, player.x, player.y, player.w, player.h);

    // request next animation frame
    requestAnimationFrame(drawGame);
}

// key event listeners
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
    if (!event.repeat) {
        if (event.key == "w") {
            player.ySpeed = -player.speed;
        } else if (event.key == "a") {
            player.xSpeed = -player.speed;
        } else if (event.key == "s") {
            player.ySpeed = player.speed;
        } else if (event.key == "d") {
            player.xSpeed = player.speed;
        }
    }
    
}

function keyupHandler(event) {
    if (event.key == "w" && player.ySpeed < 0) {
        player.ySpeed = 0;
    } else if (event.key == "a" && player.xSpeed < 0) {
        player.xSpeed = 0;
    } else if (event.key == "s" && player.ySpeed > 0) {
        player.ySpeed = 0;
    } else if (event.key == "d" && player.xSpeed > 0) {
        player.xSpeed = 0;
    }
}
walkAnim();
function walkAnim() {
    setTimeout(function () {
        if (player.currentFrame < 1) {
            player.currentFrame++;
        } else if (player.currentFrame == 1) {
            player.currentFrame--;
        }
        player.animX = player.currentFrame * 8;

        walkAnim();
    }, 250);
}