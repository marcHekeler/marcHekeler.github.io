// definitions
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var squareLength = 16;
var speedCounter = 0;

const snake = {
    x: 0,
    y: 0,
}

function fillSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * squareLength, y * squareLength, squareLength - 1, squareLength - 1);
}

function moveSnake() {
    
    if(speedCounter++ < 4) {
        window.requestAnimationFrame(moveSnake);
        return;
    }
    speedCounter = 0;

    fillSquare(snake.x, snake.y, 'black');
    snake.x = snake.x === 24 ? 0 : snake.x + 1;
    fillSquare(snake.x, snake.y, 'green');
    window.requestAnimationFrame(moveSnake);
}

// start
window.requestAnimationFrame(moveSnake);