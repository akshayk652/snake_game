const speed = 50;
let snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  ]
let dx = 0;
let dy = 0;
let score = 0;
let appleX;
let appleY;
const play_area = document.getElementById("play-area");
const ctx = play_area.getContext("2d");
main();
createApple();
//Checks for key press.
document.addEventListener("keydown", changeDirection);
//main function
function main() {
  if (gameOver()){ 
    return document.getElementById("game-over").innerHTML = "Game Over!";
  }
  setTimeout(function repeat() { // Continous Printing snake cells.
    direction = false;
    clearCanvas(); // Create canvas.
    drawApple(); // Draw bait/apple.
    increaseSnake(); // Update snake length.
    draw(); // Draw snake cells.
    main(); // Call main function again.
    
  }, speed)
  
}
function clearCanvas() {
  
  ctx.fillStyle = "rgb(255, 249, 241)";
  ctx.strokestyle = "black";
  ctx.fillRect(0, 0, play_area.width, play_area.height);
  ctx.strokeRect(0, 0, play_area.width, play_area.height);
}
// Creates random coordinates for bait/apple.
function createApple() {
  appleX = randomNo(0, play_area.width - 20);
  appleY = randomNo(0, play_area.height - 20);
  snake.forEach(function isOverlapping(part) { // Checks if bait is not present at the same place as snake's body.
    const overlap = part.x == appleX && part.y == appleY;
    if(overlap) createApple(); 
  });
}
// Draw bait/apple on the canvas.
function drawApple() {
  ctx.fillStyle = "red";
  ctx.strokestyle = "black";
  ctx.fillRect(appleX, appleY, 10, 10);
  ctx.strokeRect(appleX, appleY, 10, 10);
}
// Draw snake.
function draw() {
  snake.forEach(drawSnake)
}
// Draw snake cells.
function drawSnake(snakePart) {
  ctx.fillStyle = "yellow";
  ctx.strokestyle = "black";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
// Increase Snake according to horizontal velocity and vertical velocity.
function increaseSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  
  if (snake[0].x === appleX && snake[0].y === appleY) {
    score += 10;
    // Display score on screen
    document.getElementById('score').innerHTML = score;
    createApple();
  } else {
    snake.pop();
  }
}
// Return True if snake head touches the wall or itself else false.
function gameOver() {
  for (let i = 4 ; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }

  return (snake[0].x < 0) || (snake[0].x > play_area.width - 10) || (snake[0].y < 0) || (snake[0].y > play_area.height - 10)
  
}
// Generates a random no. which is multiple of 10.
function randomNo(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
  }
// Define Snake direction.
function changeDirection(event) {

  if (direction) return;// Checks for multiple keys.
  direction = true;
  var pressedKey = event.keyCode;
 
  if (pressedKey === 37 && dx !== 10) {
    dx = -10;
    dy = 0;
  }
  if (pressedKey === 38 && dy !== 10) {
    dx = 0;
    dy = -10;
  }
  if (pressedKey === 39 && dx !== -10) {
    dx = 10;
    dy = 0;
  }
  if (pressedKey === 40 && dy !== -10) {
    dx = 0;
    dy = 10;
  }
}
// Reset game/refresh.
function reset(){
  location.reload();
}