// definitions
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var squareLength = 16;

const snake = {
    x: 0,
    y: 0,
}

function clearCanvas() {
  context.clearRect(0,0,canvas.width,canvas.height);
}

function fillSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * squareLength, y * squareLength, squareLength - 1, squareLength - 1);
}

function moveSnake() {

    clearCanvas();
    snake.x = snake.x === 24 ? 0 : snake.x + 1;
    fillSquare(snake.x, snake.y, 'green');
    window.requestAnimationFrame(moveSnake);
}

// start
window.requestAnimationFrame(moveSnake);