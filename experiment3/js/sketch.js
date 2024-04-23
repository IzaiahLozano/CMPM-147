



var s = function( sketch ) {
  
  
  let seed = 0;
  let tilesetImage;
  let currentGrid = [];
  let numRows, numCols;



  //function preload() {
    
  sketch.preload = function() {
    tilesetImage = sketch.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
    );
  }

  function reseed() {
    seed = (seed | 0) + 1109;
    sketch.randomSeed(seed);
    sketch.noiseSeed(seed);
    sketch.select("#seedReport").html("seed " + seed);
    regenerateGrid();
  }

  function regenerateGrid() {
    sketch.select("#asciiBox").value(gridToString(generateGridOvr(numCols, numRows)));
    reparseGrid();
  }

  function reparseGrid() {
    currentGrid = stringToGrid(sketch.select("#asciiBox").value());
  }

  function gridToString(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }

  function stringToGrid(str) {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  }

  //function setup() {
    
  sketch.setup = function() { 
    numCols = sketch.select("#asciiBox").attribute("rows") | 0;
    numRows = sketch.select("#asciiBox").attribute("cols") | 0;

    sketch.createCanvas(16 * numCols, 16 * numRows).parent("#canvasContainer");
    sketch.select("#defaultCanvas0").elt.getContext("2d").imageSmoothingEnabled = false;

    sketch.select("#reseedButton").mousePressed(reseed);
    sketch.select("#asciiBox").input(reparseGrid);

    reseed();
  };


  //function draw() {
  sketch.draw = function() {
    sketch.randomSeed(seed);
    drawGridOvr(currentGrid);
  };

  //function placeTile(i, j, ti, tj) {
  sketch.placeTile = function(i,j,ti,tj) {
    sketch.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }


};

var myp5_1 = new p5(s, 'p5sketch');

var s2 = function( sketch ) {


  let seed = 0;
  let tilesetImage;
  let currentGrid = [];
  let numRows, numCols;



  //function preload() {
    
  sketch.preload = function() {
    tilesetImage = sketch.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
    );
  }

  function reseed() {
    seed = (seed | 0) + 1109;
    sketch.randomSeed(seed);
    sketch.noiseSeed(seed);
    sketch.select("#seedReport2").html("seed " + seed);
    regenerateGrid();
  }

  function regenerateGrid() {
    sketch.select("#asciiBox2").value(gridToString(generateGridDun(numCols, numRows)));
    reparseGrid();
  }

  function reparseGrid() {
    currentGrid = stringToGrid(sketch.select("#asciiBox2").value());
  }

  function gridToString(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }

  function stringToGrid(str) {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  }

  //function setup() {
    
  sketch.setup = function() { 
    numCols = sketch.select("#asciiBox2").attribute("rows") | 0;
    numRows = sketch.select("#asciiBox2").attribute("cols") | 0;


    // sketch.createCanvas(16 * numCols, 16 * numRows).parent("#canvasContainer2");
    // sketch.elt.getContext("2d").imageSmoothingEnabled = false;


    sketch.createCanvas(16 * numCols, 16 * numRows).parent("#canvasContainer2");
    sketch.select("#defaultCanvas0").elt.getContext("2d").imageSmoothingEnabled = false;

    sketch.select("#reseedButton2").mousePressed(reseed);
    sketch.select("#asciiBox2").input(reparseGrid);

    reseed();
  };


  //function draw() {
  sketch.draw = function() {
    sketch.randomSeed(seed);
    drawGridDun(currentGrid);
  };

  //function placeTile(i, j, ti, tj) {
  sketch.placeTile2 = function(i,j,ti,tj) {
    sketch.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }


};

var myp5_2 = new p5(s2, 'p5sketch');




/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGridOvr(numCols, numRows) {
  let grid = [];

  
  const seaCode = "_";
  const landCode = "*";

  // Generate the grid
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      let noiseValue = myp5_1.noise(i / 10, j / 10);
      if (noiseValue > 0.5) {
        row.push(seaCode); 
      } else {
        row.push(landCode);
      }
    }
    grid.push(row);
  }

  return grid;
}

  
  
class DuneWorm {
  constructor(x, y, speed, size) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
  }

  // Update the position of the raindrop
  update() {
    this.y += this.speed;
    if (this.y > myp5_1.height) {
      this.y = 0; // Reset raindrop position if it goes below the canvas
    }
  }


  draw() {
    myp5_1.fill('#b5651d'); // White color for raindrops
    myp5_1.ellipse(this.x, this.y, this.size); // Draw raindrop as an ellipse
  }
}

// Array to store raindrops
let worms = [];

// Function to generate raindrops
function generateRain() {
  // Create a new raindrop at a random x position at the top of the canvas
  let x = myp5_1.random(myp5_1.width);
  let y = 0; // Start raindrop from the top
  let speed = myp5_1.random(1, 5); // Random speed
  let size = myp5_1.random(2, 5); // Random size
  let timothy = new DuneWorm(x, y, speed, size);
  worms.push(timothy); // Add raindrop to the array
}

function drawGridOvr(grid) {
  myp5_1.background('#964B00');
  

  
  generateRain();
  
  for (let i = worms.length - 1; i >= 0; i--) {
    let timothy = worms[i];
    timothy.update();
    timothy.draw();
  }
  
  //const rectBoarder = [4, 5, 6, 9,11];
  //const rectBoarderin = [0, 2, 3, 5];
  const fillOut = [0, 1, 2, 3];
  const fillIn = [3, 4];
  const okayX = [18,20];
  const okayY = [0,1,2,6,7,8,3,4,5,9,10,11];
  
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (gridCheck(grid, i, j, "*")) {
        drawContextOvr(grid, i, j, "*", (myp5_1.floor(myp5_1.random(0))), (myp5_1.floor(myp5_1.random(okayY))));
      } else if (gridCheck(grid, i, j, "_")) {
        myp5_1.placeTile(i, j, (myp5_1.floor(myp5_1.random(okayX))), (myp5_1.floor(myp5_1.random(okayX))));
      } else if (gridCheck(grid, i, j, "$")) {
        myp5_1.placeTile(i, j, (myp5_1.floor(myp5_1.random(fillOut))), (myp5_1.floor(myp5_1.random(fillIn))));
      }
    }
  }
}

function gridCheck(grid, i, j, target) {
  // Check if the location (i, j) is inside the grid
  if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
    // Check if grid[i][j] is equal to the target
    return grid[i][j] === target;
  } else {
    return false; // Location is out of bounds
  }
}

function gridCode(grid, i, j, target) {
  // Initialize bits for north, south, east, west
  let northBit = gridCheck(grid, i - 1, j, target) ? 1 : 0;
  let southBit = gridCheck(grid, i + 1, j, target) ? 1 : 0;
  let eastBit = gridCheck(grid, i, j + 1, target) ? 1 : 0;
  let westBit = gridCheck(grid, i, j - 1, target) ? 1 : 0;
  
  let code = (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
  
  return code;
}


function drawContextOvr(grid, i, j, target, ti, tj) {
  const code = gridCode(grid, i, j, target);

  const [tiOffset, tjOffset] = lookup[code];
  
  myp5_1.placeTile(i, j, ti + tiOffset, tj + tjOffset);
}



const lookup = [
  
  [0,0],
  [0,1],
  [0,6],
  [1,0],
  [1,1],
  [1,6],
  [2,0],
  [2,1],
  [2,1],
  [3,0],
  [3,1],
  [3,6],
  [14,0],
  [15,0],
  [16,0],
  [17,0],
  [18,0],
  [19,0],
  [15,1],
  [16,1],
  [17,1],
  [18,1],
  [19,1],
  [15,2],
  [16,2],
  [17,2],
  [18,2],
  [19,2],
];

// Dungeon code below:

/* exported generateGrid, drawGrid */
/* global placeTile */


function generateGridDun(numCols, numRows) {
  let grid = [];
  const numRectangles = 5; // Number of rectangles for the cave system

  // Generate grid cells
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_"); // Initialize all cells to be outside of rectangles
    }
    grid.push(row);
  }

  // Generate multiple rectangles
  for (let k = 0; k < numRectangles; k++) {
    // Randomize rectangle properties
    const rectWidth = myp5_2.floor(myp5_2.random() * 10) + 5; // width of the rectangle (random value between 5 and 14)
    const rectHeight = myp5_2.floor(myp5_2.random() * 10) + 5; // height of the rectangle (random value between 5 and 14)
    const rectStartX = myp5_2.floor(myp5_2.random() * (numCols - rectWidth)); // Starting X position of the rectangle
    const rectStartY = myp5_2.floor(myp5_2.random() * (numRows - rectHeight)); // Starting Y position of the rectangle


    for (let i = rectStartY; i < rectStartY + rectHeight; i++) {
      for (let j = rectStartX; j < rectStartX + rectWidth; j++) {
        if (
          j === rectStartX || j === rectStartX + rectWidth - 1 || i === rectStartY || i === rectStartY + rectHeight - 1
        ) {
          grid[i][j] = "*"; 
        } else {
          if (myp5_2.random() < 0.02) {
            grid[i][j] = "@"; 
          } else {
            grid[i][j] = "$"; 
          }
        }
      }
    }
  }

  return grid;
}

function drawGridDun(grid) {
  myp5_2.background(110);

  const treasureX = [0, 1, 2, 3, 4, 5];
  const treasureY = [28, 29, 30];
  const fillDunOut = [0, 1, 2, 3];
  const fillDunIn = [9, 10, 15, 16, 23];
  //const treasureChance = [28, 29, 30];
  const okayDunX = [11, 12, 13, 14, 21, 22, 23,  24];
  const okayDunY = [21, 22, 23, 24];
  const caveB = [21, 22, 23, 24, 25]
  const caveI = [9,10,11,12,15,16,17]
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (gridCheck(grid, i, j, "*")) {
        myp5_2.placeTile2( i, j, (myp5_2.floor(myp5_2.random(caveB))), (myp5_2.floor(myp5_2.random(caveI))));
      } else if (gridCheck(grid, i, j, "_")) {
        myp5_2.placeTile2(i, j, (myp5_2.floor(myp5_2.random(okayDunX))), (myp5_2.floor(myp5_2.random(okayDunY))));
      } else if (gridCheck(grid, i, j, "$")) {
        myp5_2.placeTile2(i, j, (myp5_2.floor(myp5_2.random(fillDunOut))), (myp5_2.floor(myp5_2.random(fillDunIn))));
      } else if (gridCheck(grid, i, j, "@")) {
        myp5_2.placeTile2(i, j, (myp5_2.floor(myp5_2.random(treasureX))), (myp5_2.floor(myp5_2.random(treasureY))));
      }
    }
  }
}

function drawContextDun(grid, i, j, target, ti, tj) {
  const code = gridCode(grid, i, j, target);

  const [tiOffset, tjOffset] = lookup2[code];
  
  myp5_2.placeTile2(i, j, ti + tiOffset, tj + tjOffset);
}

const lookup2 = [
  
  [0,15],
  [0,16],
  [0,9],
  [0,10],
  [1,15],
  [1,16],
  [1,9],
  [1,10],
  [2,15],
  [2,16],
  [2,9],
  [2,10],
  [3,15],
  [3,16],
  [3,9],
  [3,10],
  [15,25],
  [15,26],
  [15,27],
  [16,25],
  [16,26],
  [16,27],
  [25,25],
  [25,26],
  [25,27],
  [26,25],
  [26,26],
  [26,27],
  [27,25],
  [27,26],
];