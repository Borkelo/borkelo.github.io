var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var slider = document.getElementById('mySlider');


const tileArray = [];
const columns = canvas.width / 10;
const rows = canvas.height / 10;

const colors = [
    "#4A90E2", // Soft blue
    "#50E3C2", // Teal green
    "#B8E986", // Light green
    "#7ED321", // Lime green
    "#D0021B", // Deep red
    "#F5A623", // Soft orange
    "#BD10E0", // Soft purple
    "#9013FE", // Deep purple
    "#F8E71C", // Soft yellow
    "#FF6F61", // Coral pink
    "#417505", // Dark olive
];

const liveTileColor = colors[Math.floor(Math.random()*colors.length)];
var nextColorIndex = 1;
const colorTransitionTime = 5000; // 5 seconds
const colorIntervalTime = 50; 

var tiles = [];
var aliveTiles = [];
var changedTiles = [];

console.log(canvas.width);
console.log(canvas.height);

class Tile {
    constructor(x, y, isAlive) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
        this.neighbors = [];
        this.isChecked = false;
    }
}

function setup() {
    for (let i = 0; i < columns; i++) {
        tileArray[i] = [];
        for (let j = 0; j < rows; j++) {
            tileArray[i][j] = new Tile(i, j, Math.random() < 0.20);
            tiles.push(tileArray[i][j]);
            if (tileArray[i][j].isAlive) {
                drawPixel(i, j, liveTileColor);
                aliveTiles.push(tileArray[i][j]);
            }
        }
    }

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (i - 1 >= 0) {
                tileArray[i][j].neighbors.push(tileArray[i - 1][j]);

                if (j - 1 >= 0) {
                    tileArray[i][j].neighbors.push(tileArray[i - 1][j - 1]);
                }

                if (j + 1 < rows) {
                    tileArray[i][j].neighbors.push(tileArray[i - 1][j + 1]);
                }

            }
            if (i + 1 < columns) {
                tileArray[i][j].neighbors.push(tileArray[i + 1][j]);

                if (j - 1 >= 0) {
                    tileArray[i][j].neighbors.push(tileArray[i + 1][j - 1]);
                }

                if (j + 1 < rows) {
                    tileArray[i][j].neighbors.push(tileArray[i + 1][j + 1]);
                }

            }
            if (j + 1 < rows) {
                tileArray[i][j].neighbors.push(tileArray[i][j + 1]);
            }
            if (j - 1 >= 0) {
                tileArray[i][j].neighbors.push(tileArray[i][j - 1]);
            }

        }


    }
}

function gameLoop() {
    for (const tile of aliveTiles) {
        checkTile(tile);
    }

    for (const tile of changedTiles) {
        if (!tile.isAlive) {
            aliveTiles.push(tile);
            tile.isAlive = true;
            drawPixel(tile.x, tile.y, liveTileColor);
        } else {
            aliveTiles.splice(aliveTiles.indexOf(tile), 1);
            tile.isAlive = false;
            drawPixel(tile.x, tile.y, '#0d0d0d');

        }
    }
    for (const tile of tiles) {
        tile.isChecked = false;
        if(tile.isAlive)
            drawPixel(tile.x, tile.y, liveTileColor);
    }

    changedTiles = [];
}

function checkTile(tile) {
    var neighborCount = 0;

    for (const neighbor of tile.neighbors) {
        if (neighbor.isAlive) {
            neighborCount++;
        } else if (!neighbor.isChecked && tile.isAlive) {
            neighbor.isChecked = true;
            checkTile(neighbor);
        }
    }

    if (tile.isAlive) {
        if (neighborCount < 2) {
            changedTiles.push(tile);
        } else if (neighborCount > 3) {
            changedTiles.push(tile);
        }
    } else {
        if (neighborCount == 3) {
            changedTiles.push(tile);
        }
    }
}

function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * 10, y * 10, 10, 10);
}

setup();
var interval = setInterval(gameLoop, parseInt(slider.max) - slider.value);

slider.addEventListener('input', function() {
    clearInterval(interval);
    interval = setInterval(gameLoop, parseInt(slider.max) - slider.value)
});
