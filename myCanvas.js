var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


function Ball(radius, x, y, dx, dy, name, callback) {
    this.radius = radius;
    this.name = name;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.onhit = callback;
}

/* Balls */
balls = [];
var n = 8;
for(var i=0; i < n; i++){
    balls.push(new Ball(15, canvas.width/2, canvas.height-30, Math.random() * 4 - 2, Math.random() * 4 - 2, i+1, function () {
        alert('Träff på boll ' + this.name + '!');
    }));
}



/* Avatar */
var avatarHeight = 30;
var avatarWidth = 30;
var avatarX = (canvas.width-avatarWidth)/2;
var avatarY = (canvas.height-avatarHeight)/2;

/* Score */
var myScore;
var gameover = false;

/* keypressed */
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }

    else if(e.keyCode == 40) {
        downPressed = true;
    }

    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }

    else if(e.keyCode == 38) {
        upPressed = false;
    }

    else if(e.keyCode == 40) {
        downPressed = false;
    }

    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


function drawAvatar() {
    ctx.beginPath()
    ctx.rect(avatarX, avatarY, avatarWidth,avatarHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#33adff";
    ctx.fill();
    ctx.closePath();
}

function bounce(ball) {
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }

    if(ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if(ball.y + ball.dy > canvas.height-ball.radius) {
        ball.dy = -ball.dy;
    }
}

function colliding(ball) {
    var midx = avatarX + avatarWidth / 2;
    var midy = avatarY + avatarHeight / 2;
    var difx = midx - (ball.x + ball.dx);
    var dify = midy - (ball.y + ball.dy);
    var d = Math.sqrt(difx * difx + dify * dify);
    return ( d < (ball.radius + avatarWidth / 2));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (b) {
        drawBall(b);
        if(!gameover) {
            bounce(b);
            if (colliding(b)) {
                b.onhit();
                alert("GAME OVER");
                gameover = true;
//                window.reload(true);
            }
            b.x += b.dx;
            b.y += b.dy;
        }
    });
    drawAvatar();



    /*if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
        */


    /* Game over
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        alert("GAME OVER");
        document.location.reload();
    }
    */






    if(!gameover) {
        if (rightPressed && avatarX < canvas.width - avatarWidth) {
            avatarX += 2;
        }

        else if (leftPressed && avatarX > 0) {
            avatarX -= 2;
        }

        if (upPressed && avatarY > 0) {
            avatarY -= 2;
        }

        else if (downPressed && avatarY < canvas.height - avatarHeight) {
            avatarY += 2;
        }
    }

}

setInterval(draw, 2);

