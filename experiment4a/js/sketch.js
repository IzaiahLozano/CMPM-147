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

let pinkShades = [
  [255, 192, 203], // Light Pink
  [255, 182, 193], // Light Pink
  [255, 105, 180], // Hot Pink
  [255, 20, 147],  // Deep Pink
  [248,200, 220] // Pastel Pink
];

let pinkcottoncandy = [
  [255, 192, 203], // Light Pink
  [255, 182, 193], // Light Pink
  [255, 20, 147],  // Deep Pink
  [248,200, 220] // Pastel Pink
]

let bluecottoncandy = [
  [204,238,255], // Light Pink
  [216,242,255], // Light Pink
  [227,247,255],  // Deep Pink
  [237,250,255] // Pastel Pink
]


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

let leafColorCounter = 0;
const leafColorChangeRate = 10;

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  
}

function p3_drawBefore() {}


function p3_drawTile(i, j) {
  noStroke();
  
  let hashValue = XXH.h32("tile:" + [i, j], worldSeed);
  let pinkIndex = Math.floor(map(hashValue, 0, Math.pow(2, 32), 0, pinkShades.length));
  let pinkColor = pinkShades[pinkIndex];
  fill(pinkColor[0], pinkColor[1], pinkColor[2]);

  
  /* this code below will give a randomized floor, we can make a dance floor out of this*/
  // if (XXH.h32("tile:" + [i, j], worldSeed) % 2 == 0) {
  //   fill(random(pinkShades));
  // } else {
  //   fill(255, 200);
  // }

  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill('white');
    rect(-5, -20, 10, 20);
    
    if (random() < 0.5) {
      fill(random(pinkcottoncandy));
    } else {
      fill(random(bluecottoncandy));
    }
    

    
    ellipse(0, -30, 30, 30);
    //translate(0, -10);
    ellipse(-10, -25, 20, 20);
    ellipse(10, -25, 20, 20);
    
    ellipse(0, -30, 30, 30);
    //translate(0, -10);
    ellipse(-10, -25, 20, 20);
    ellipse(10, -25, 20, 20);
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
