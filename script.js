const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;
let foodX;
let foodY;
let foodColor = "red";
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let snakeColor = "lime";
let velocityX = 0;
let velocityY = 0;
let gameOver = false;
let snakePos = [];

let dir = "right";
window.onload = function () {
  console.log("Inside script file");
  board = document.getElementById("board");
  board.width = blockSize * cols;
  board.height = blockSize * rows;

  getFoodLocation();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 100);
};

function update() {
  if (gameOver) {
    return;
  }

  context = board.getContext("2d");
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);
  context.fillStyle = foodColor;
  context.fillRect(foodX, foodY, blockSize, blockSize);
  // Keep snake moving

  if (dir == "right") {
    if (snakeX < board.width - blockSize) {
      snakeX += blockSize;
    } else {
      dir = "down";
    }
  }
  if (dir == "left") {
    if (snakeX > 0) {
      snakeX -= blockSize;
    } else {
      dir = "up";
    }
  }
  if (dir == "up") {
    if (snakeY > 0) {
      snakeY -= blockSize;
    } else {
      dir = "right";
    }
  }
  if (dir == "down") {
    if (snakeY < board.height - blockSize) {
      snakeY += blockSize;
    } else {
      dir = "left";
    }
  }
  moveSnake(dir);

  console.log(snakeX, snakeY);
  context.fillStyle = snakeColor;

  if (isSnakeMeetFood()) {
    snakePos.push([foodX, foodY]);
    getFoodLocation();
  }

  snakePos[0] = [snakeX, snakeY];
  for (let i = 0; i < snakePos.length; i++) {
    context.fillRect(snakePos[i][0], snakePos[i][1], blockSize, blockSize);
  }
}
function isSnakeMeetFood() {
  return snakeX == foodX && snakeY == foodY;
}
function checkErrorCases() {
  for (let i = 1; i < snakePos.length; i++) {
    if (snakeX == snakePos[i][0] && snakeY == snakePos[i][1]) {
      return true;
    }
  }
  return false;
}

function changeDirection(e) {
  moveSnake(e.key);
}
function getFoodLocation() {
  foodX = Math.floor(Math.random() * (cols - 1) * blockSize);
  foodY = Math.floor(Math.random() * (rows - 1) * blockSize);
  foodX = Math.floor(foodX / blockSize) * blockSize;
  foodY = Math.floor(foodY / blockSize) * blockSize;
}

function moveSnake(key) {
  console.log(key);
  if (key == "ArrowUp" && snakeY > 0) {
    velocityX = 0;
    velocityY = -1;
    dir = "up";
  } else if (key == "ArrowDown" && snakeY < board.height - blockSize) {
    velocityX = 0;
    velocityY = 1;
    dir = "down";
  } else if (key == "ArrowLeft" && snakeX > 0) {
    velocityX = -1;
    velocityY = 0;
    dir = "left";
  } else if (key == "ArrowRight" && snakeX < board.width - blockSize) {
    velocityX = 1;
    velocityY = 0;
    dir = "right";
  } else {
    velocityX = 0;
    velocityY = 0;
  }
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;

  for (let i = snakePos.length - 1; i > 0; i--) {
    if (
      snakePos[i][0] != snakePos[i - 1][0] ||
      snakePos[i][1] != snakePos[i - 1][1]
    )
      snakePos[i] = snakePos[i - 1];
  }
  snakePos[0] = [snakeX, snakeY];
  if (checkErrorCases()) {
    gameOver = true;
    alert("Game over!");
  }
}
