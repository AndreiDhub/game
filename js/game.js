var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image(); 
var fg = new Image(); 
var pipeUp = new Image(); 
var pipeBottom = new Image(); 

bird.src = "img/bird.png"; 
bg.src = "img/bg.png"; 
fg.src = "img/fg.png"; 
pipeUp.src = "img/pipeUp.png"; 
pipeBottom.src = "img/pipeBottom.png"; 

var gap = 90;

document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -=25;
    }

    var pipe = [];

    pipe[0] = {
        x : cvs.width,
        y : 0
    }

var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height

            });
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
               || yPos + bird.height >= pipe[i].y + pipeUp.height + 
               gap) || yPos + bird.height >= cvs.height - fg.height) {
                   location.reload();
               }
    }

   

    ctx.drawImage(fg, 0,cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;
    requestAnimationFrame(draw);

}

pipeBottom.onload = draw;
