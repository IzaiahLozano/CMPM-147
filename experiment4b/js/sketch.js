"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/


let danceFloorColors = [
  [0, 0, 255],    // Blue
  [0, 128, 255],  // Light Blue
  //[30, 144, 255], // Dodger Blue
  //[0, 191, 255],  // Deep Sky Blue
  [135, 206, 250], 
  //[0, 128, 0],    // Green
  [0, 255, 0],    // Lime
  [50, 205, 50],  // Lime Green
  //[60, 179, 113], // Medium Sea Green
  //[34, 139, 34]   // Forest Green
  [255, 20, 147],  // Deep Pink
  [255, 105, 180], // Hot Pink
  //[219, 112, 147], // Pale Violet Red
  //[218, 112, 214], // Orchid
  [238, 130, 238],  // Violet
  //[128, 0, 128],   // Purple
  [138, 43, 226],  // Blue Violet
  //[147, 112, 219], // Medium Purple
  [148, 0, 211],   // Dark Violet
  //[153, 50, 204]   // Dark Orchid
  // Add more colors as needed
  [255, 0, 0],     // Red
  //[220, 20, 60],   // Crimson
  //[178, 34, 34],   // Firebrick
  //[205, 92, 92],   // Indian Red
  [255, 69, 0]     // Orange Red
];

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  let hashValue = XXH.h32("tile:" + [i, j], worldSeed);
  let land = hashValue % 2 == 0; 

  if (land) {
    clicks[key] = 1 + (clicks[key] | 0);
  }
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();
  
  /* this code below will give a randomized floor, we can make a dance floor out of this*/
  if (XXH.h32("tile:" + [i, j], worldSeed) % 2 == 0) {
    fill(random(danceFloorColors));
    if (random() < 0.2) {
      fill(0);
    }
  } else {
    fill(0); // Set fill to black
    
  }
  
  
  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let red = [255, 0, 0];           
  let skinTone = [244, 194, 144];  
  let brown = [101, 67,33];           
  let gold = [255, 215, 0];        
  let blue = [0, 0, 255];          
 
  
  
  let rectWidth = 5;
  let rectHeights = [3, 2.5, 2.5, 1, 2.5, 1, 4, 1.5]; // Heights of each rectangle
  let offsetY = 0; // Offset for positioning each rectangle vertically

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    translate(0, -10);
    let colors = [red, skinTone, brown, skinTone, red, gold, blue, brown]; 
    for (let i = 0; i < rectHeights.length; i++) {
      fill(colors[i]);
      rect(0, offsetY, rectWidth, rectHeights[i]);

      // Increment offsetY for the next rectangle
      offsetY += rectHeights[i];
    }
  
  
}
  
  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
