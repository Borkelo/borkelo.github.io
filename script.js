var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


drawPixel(0,0);
drawPixel(1,1);

const my2DArray = [];
const columns = canvas.width;
const rows = canvas.height;

console.log(canvas.height);
console.log(canvas.height);

for (let i = 0; i < rows; i++) {
  my2DArray[i] = [];
  for (let j = 0; j < columns; j++) {
    my2DArray[i][j] = j;
  }
}



function setup()
{

}

function gameLoop()
{

}

function drawPixel(x, y)
{
  ctx.fillStyle = 'black';
  ctx.fillRect(x*10, y*10, 10, 10);
}

class Tile
{
  constructor(x, y, isAlive)
  {
    this.x = x;
    this.y = y;
    this.isAlive = isAlive;
  }
}


