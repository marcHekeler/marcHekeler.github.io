// definitions
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var squareLength = 16;

function fillSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * squareLength, y * squareLength, squareLength - 1, squareLength - 1);
}

// start 
fillSquare(0, 0, 'green');
