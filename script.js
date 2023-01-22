// definitions
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var cellLength = 16;
var speedCounter = 0;

const snake = {
    cells: [
        {x: 3, y:0},
        {x: 2, y:0},
        {x: 1, y:0},
        {x: 0, y:0}
    ],
    length: 4,
}

function fillCell({x, y}, color) {
    context.fillStyle = color;
    context.fillRect(x * cellLength, y * cellLength, cellLength - 1, cellLength - 1);
}

function moveSnake() {
    
    if(speedCounter++ < 4) {
        window.requestAnimationFrame(moveSnake);
        return;
    }
    speedCounter = 0;

    fillCell(snake.cells[snake.length-1], 'black');
    const newX = snake.cells[0].x === 24 ? 0 : snake.cells[0].x +1;
    const newY = snake.cells[0].y;
    snake.cells.unshift({x: newX, y: newY});
    snake.cells.pop();
    fillCell(snake.cells[0], 'green');
    window.requestAnimationFrame(moveSnake);
}

// start
window.requestAnimationFrame(moveSnake);