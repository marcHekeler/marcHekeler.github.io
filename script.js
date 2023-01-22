// definitions
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var cellLength = 16;
var speedCounter = 0;

const snake = {
    x: 0,
    y: 0,
}

function fillCell(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * cellLength, y * cellLength, cellLength - 1, cellLength - 1);
}

function moveSnake() {
    
    if(speedCounter++ < 4) {
        window.requestAnimationFrame(moveSnake);
        return;
    }
    speedCounter = 0;

    fillCell(snake.x, snake.y, 'black');
    snake.x = snake.x === 24 ? 0 : snake.x + 1;
    fillCell(snake.x, snake.y, 'green');
    window.requestAnimationFrame(moveSnake);
}

// start
window.requestAnimationFrame(moveSnake);