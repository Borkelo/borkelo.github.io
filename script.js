var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

console.log(canvas.width);

var x = 50;
var y = 50;
var pixelWidth = 1;
var pixelHeight = 1;
ctx.fillStyle = 'black';
ctx.fillRect(x, y, pixelWidth, pixelHeight);
