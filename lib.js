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
    speed: 3,
    currentFrame: 0,
    currentDir: 0,
    animX: 0,
    attacking: false
}

var sword = {
    x: 375,
    y: 520,
    w: 50,
    h: 50,
    animX: 8,
    currentDir: 0,
    damage: 15,
    canAttack: true
}

var enemy = {
    x: 500,
    y: 200,
    w: 50,
    h: 50,
    hp: 100
}


var knightSheet = document.getElementById("knightSheet");
var enemySheet = document.getElementById("enemySheet");
knightSheet.onload = function() {
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
}

var swordImg = document.getElementById("sword");
var carpet = document.getElementById("carpet");


var currentRoom = spawnRoom;


// animation loop
requestAnimationFrame(currentRoom);

function spawnRoom() {
    // move player by xspeed and yspeed
    player.x += player.xSpeed;
    player.y += player.ySpeed;

    if (sword.currentDir == 0) {
        sword.x = player.x;
        sword.y = player.y-44;
    } else if (sword.currentDir == 1) {
        sword.x = player.x+44;
        sword.y = player.y;
    } else if (sword.currentDir == 2) {
        sword.x = player.x;
        sword.y = player.y+44;
    } else if (sword.currentDir == 3) {
        sword.x = player.x-44;
        sword.y = player.y;
    } 

    ctx.clearRect(0, 0, cnv.width, cnv.height);

    ctx.fillStyle = "red";
    ctx.fillRect(300, 0, 200, 600);

    var pat = ctx.createPattern(carpet, 'repeat-y');

    ctx.rect(300, 0, 25, 600);
    ctx.fillStyle = pat;
    ctx.fill();

    // draw player
    ctx.drawImage(knightSheet, player.animX, 0, 8, 8, player.x, player.y, player.w, player.h);

    // draw sword
    if (player.attacking) {
        ctx.drawImage(swordImg, sword.animX, 0, 8, 8, sword.x, sword.y, sword.w, sword.h);
    }

    // draw enemy
    ctx.drawImage(enemySheet, 0, 0, 8, 8, enemy.x, enemy.y, enemy.w, enemy.h);



    // request next animation frame
    requestAnimationFrame(currentRoom);
}

// key event listeners
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
    if (!event.repeat) {
        // movement
        if (event.key == "w") {
            player.ySpeed = -player.speed;
            player.currentDir = 0;
            walkFrame();
        } else if (event.key == "a") {
            player.xSpeed = -player.speed;
            player.currentDir = 3;
            walkFrame();
        } else if (event.key == "s") {
            player.ySpeed = player.speed;
            player.currentDir = 2;
            walkFrame();
        } else if (event.key == "d") {
            player.xSpeed = player.speed;
            player.currentDir = 1;
            walkFrame();
        } else if (event.key == "ArrowUp") {
            attack(0);
        } else if (event.key == "ArrowLeft") {
            attack(3);
        } else if (event.key == "ArrowDown") {
            attack(2);
        } else if (event.key == "ArrowRight") {
            attack(1);
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
        walkFrame();
        walkAnim();
    }, 250);
}

function walkFrame() {
    if (player.currentFrame < 1) {
        player.currentFrame++;
    } else if (player.currentFrame == 1) {
        player.currentFrame--;
    }
    player.animX = player.currentDir * 24 + player.currentFrame * 8;

}

function attack(dir) {
    if (sword.canAttack) {
        sword.currentDir = dir;

        swordAnim();
        player.attacking = true;
        sword.canAttack = false;

        var hit = hitDetect(enemy, sword);
        if (hit) {
            if (enemy.hp < sword.damage) {
                enemy.hp = 0;
            } else {
                enemy.hp -= sword.damage;
            }
            console.log(enemy.hp);
        }
        
        setTimeout(function () {
            player.attacking = false;
        }, 100)

        setTimeout(function () {
            sword.canAttack = true
        }, 600)
    }
}


function swordAnim() {
    sword.animX = sword.currentDir * 8;
}

function hitDetect(e1, e2) {
    if (e1.x < e2.x + e2.w &&
        e1.x + e1.w > e2.x &&
        e1.y < e2.y + e2.h &&
        e1.h + e1.y > e2.y) {
            return true;
        } else {
            return false;
        }

}

