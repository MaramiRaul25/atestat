var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight - 200;
ctx.canvas.width = (window.innerHeight - 200) * 1.7;
var ballRadius = 8;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 4;
var dy = -4;
var paddleHeight = 10;
var paddleWidth = 150;
var paddleX = (canvas.width - paddleWidth) / 2;
var brickRowCount = 11;
var brickColumnCount = 6;
var brickWidth = 70;
var brickHeight = 15;
var brickPadding = 35;
var brickOffsetTop = 35;
var brickOffsetLeft = 35;
var score = 0;
var lives = 5;
var level = 4;
var bricks = [];
var brickColor = "#FA1E46";
var pause = false;
var randomN = 1;

//-DOCUMENT EVENTS-
document.addEventListener("mousemove", mouseMoveHandler, false);

document.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    if (pause) draw();
    pause = !pause;
  }
});

//-MOUSE MOVEMENT-
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width)
    paddleX = relativeX - paddleWidth / 2;
}

//-DETECTARE COLIZIUNI-
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score += 100;
          if (checkWin()) {
            level++;
            if (level === 6) {
              alert("YOU WON!");
              document.location.reload();
            }
            initializeBricks();
          }
        }
      }
    }
  }
}

//-INITIALIZARE CARAMIZI-
function initializeBricks() {
  paddleWidth -= 20;
  switch (level) {
    case 1:
      brickColor = "#0DDBD4";
      for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
          if (c == 2 || r == 2 || r == 8)
            bricks[c][r] = { x: 0, y: 0, status: 1 };
          else bricks[c][r] = { x: 0, y: 0, status: 0 };
        }
      }
      break;
    case 2:
      brickColor = "#38C20A";
      for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
          if (c == 0 || c == brickColumnCount - 1 || r % 2 == 0)
            bricks[c][r] = { x: 0, y: 0, status: 1 };
          else bricks[c][r] = { x: 0, y: 0, status: 0 };
        }
      }
      break;
    case 3:
      brickColor = "#DBD82F";
      for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
          if (
            (c > r && c < brickRowCount / 2 && r < brickRowCount / 2) ||
            c + r >= brickRowCount
          )
            bricks[c][r] = { x: 0, y: 0, status: 0 };
          else bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
      }
      break;
    case 4:
      brickColor = "#EB7000";
      for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
          if (
            (c >= 1 && c <= 4 && r >= 2 && r <= 9) ||
            ((c == 0 || c == 5) && r == 7)
          )
            bricks[c][r] = { x: 0, y: 0, status: 1 };
          else bricks[c][r] = { x: 0, y: 0, status: 0 };
        }
      }
      bricks[1][9] = { x: 0, y: 0, status: 0 };
      bricks[4][9] = { x: 0, y: 0, status: 0 };
      bricks[1][3] = { x: 0, y: 0, status: 0 };
      bricks[1][4] = { x: 0, y: 0, status: 0 };
      bricks[1][5] = { x: 0, y: 0, status: 0 };
      bricks[1][6] = { x: 0, y: 0, status: 0 };
      bricks[4][3] = { x: 0, y: 0, status: 0 };
      bricks[4][4] = { x: 0, y: 0, status: 0 };
      bricks[4][5] = { x: 0, y: 0, status: 0 };
      bricks[4][6] = { x: 0, y: 0, status: 0 };
      break;
    case 5:
      brickColor = "#EB1601";
      for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
          if (
            ((c == 0 || c == brickColumnCount - 1) && r == 5) ||
            ((c == 1 || c == brickColumnCount - 2) && r >= 4 && r <= 6) ||
            ((c == 2 || c == brickColumnCount - 3) && r >= 3 && r <= 7)
          )
            bricks[c][r] = { x: 0, y: 0, status: 1 };
          else bricks[c][r] = { x: 0, y: 0, status: 0 };
        }
      }
      break;
    default:
      break;
  }
}

initializeBricks();

//-DESENARE MINGE-
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#accc2b";
  ctx.fill();
  ctx.closePath();
}

//-DESENARE PADELA-
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#11DBF0";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        drawBorder(brickX, brickY, brickWidth, brickHeight, 2);
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "bold 22px Pixel";
  ctx.fillStyle = "#EBC900";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "bold 22px Pixel";
  ctx.fillStyle = "#EBC900";
  ctx.fillText("Lives: " + lives, canvas.width - 80, 20);
}

function drawLevels() {
  ctx.font = "bold 22px Pixel";
  ctx.fillStyle = "#EBC900";
  ctx.fillText("Level: " + level, canvas.width - 80, 50);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  drawLevels();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 10;
        dy = -10;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  x += dx;
  y += dy;
  if (!pause) {
    requestAnimationFrame(draw);
  }
}

draw();

function checkWin() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        return false;
      }
    }
  }
  return true;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function drawBorder(xPos, yPos, width, height, thickness) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(
    xPos - thickness,
    yPos - thickness,
    width + thickness * 2,
    height + thickness * 2
  );
}
