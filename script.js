var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var squareLength = 16;

context.fillStyle = 'green';
context.fillRect(0, 0, squareLength - 1, squareLength - 1);
