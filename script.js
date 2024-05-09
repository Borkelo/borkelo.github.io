var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

console.log(canvas.width);

drawPixel(0,0);
drawPixel(0,1);

function drawPixel(x, y)
{
  ctx.fillStyle = 'black';
  ctx.fillRect(x*10, y*10, 10, 10);
}




