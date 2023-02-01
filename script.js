"use-strict"
// definitions
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var cellLength = 16;
var speedCounter = 0;
var nextDirection;
var snake;
var applePosition;

function fillCell({x, y}, color) {
    context.fillStyle = color;
    context.fillRect(x * cellLength, y * cellLength, cellLength - 1, cellLength - 1);
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function placeApple() {
    var posX;
    var posY;
    do {
        posX = getRandomInteger(0, 24);
        posY = getRandomInteger(0, 24);
    } while (doesSnakeContainPosition({x: posX, y: posY}))
    applePosition = {x: posX, y: posY};
    fillCell(applePosition, 'green');
}

function resetGame() {
    snake = {
        cells: [
            {x: 0, y:0}
        ],
        length: 1,
        direction: 'r', // 'l', 'r', 'u', 'd'
    };
    nextDirection = 'r';
    context.clearRect(0,0,canvas.width,canvas.height);
    placeApple();
    document.getElementById('score').textContent = 0;
    document.getElementById('highscore').textContent = localStorage.getItem('highscore');
}

function getCurrentPosition() {
    return snake.cells[0];
}

function getNewX() {
    if(snake.direction === 'r') {
        return getCurrentPosition().x === 24 ? 0 : getCurrentPosition().x + 1;
    }
    if(snake.direction === 'l') {
        return getCurrentPosition().x === 0 ? 24 : getCurrentPosition().x - 1;
    }
    return getCurrentPosition().x;
}

function getNewY() {
    if(snake.direction === 'd') {
        return getCurrentPosition().y === 24 ? 0 : getCurrentPosition().y + 1;
    }
    if(snake.direction === 'u') {
        return getCurrentPosition().y === 0 ? 24 : getCurrentPosition().y - 1;
    }
    return getCurrentPosition().y;
}

function doesSnakeContainPosition({x, y}) {
    var ret = false;
    snake.cells.forEach((cell) => {
        if(cell.x === x && cell.y === y) {
            ret = true;
        }
    });
    return ret;
}

function snakeEatsApple({x, y}) {
    return applePosition.x === x && applePosition.y === y;
}

function moveSnake() {
    window.requestAnimationFrame(moveSnake);
    
    if(speedCounter++ < 5) {
        return;
    }
    speedCounter = 0;

    // clear last cell
    fillCell(snake.cells[snake.length-1], 'black');

    const newX = snake.cells[0].x === 24 ? 0 : snake.cells[0].x +1;
    const newY = snake.cells[0].y;

    // set nextDirection directly before changing direction
    snake.direction = nextDirection;
    const newPosition = {x: getNewX(), y: getNewY()};

    // check if new Position is within snake
    if(doesSnakeContainPosition(newPosition)) {
        if(!localStorage.getItem('highscore') || snake.length - 1 > localStorage.getItem('highscore')) {
            localStorage.setItem('highscore', snake.length - 1);
        }
        resetGame();
        return;
    };

    // add new cell to sake
    snake.cells.unshift(newPosition);
    if(snakeEatsApple(newPosition)) {
        document.getElementById('score').textContent = snake.length;
        snake.length += 1;
        placeApple();
    } else {
        snake.cells.pop();
    }

    // draw current cell
    fillCell(snake.cells[0], '#ee7f01');
}

document.addEventListener('keydown', function(e) {
    switch(e.key) {
        // left
        case 'ArrowLeft':
            if(snake.direction !== 'r') nextDirection = 'l';
            break;
        // up
        case 'ArrowUp':
            if(snake.direction !== 'd') nextDirection = 'u';
            break;
        // right
        case 'ArrowRight':
            if(snake.direction !== 'l') nextDirection = 'r';
            break;
        // down
        case 'ArrowDown':
            if(snake.direction !== 'u') nextDirection = 'd';
            break;
    };
});

// start
resetGame();
window.requestAnimationFrame(moveSnake);