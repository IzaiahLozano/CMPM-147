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

const oceanColors = [
  [0, 51, 102],   // Dark blue
  [0, 102, 204],  // Deep blue
  [51, 153, 255], // Blue
  [102, 178, 255],// Light blue
  //[153, 204, 255],// Pale blue
  [204, 229, 255],// Very pale blue
];

let worldSeed;
let clicks = {};
let timeElapsed = 0;
const waveFrequency = 0.05; // Adjust this to change wave frequency
const waveMagnitude = 5;    // Adjust this to change wave magnitude




function p3_preload() {}

function p3_setup() {}

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

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  
}

function p3_drawBefore() {}


function interpolateColors(color1, color2, factor) {
  let result = [];
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(color1[i] + (color2[i] - color1[i]) * factor);
  }
  return result;
}

function p3_drawTile(i, j) {
  noStroke();

  let hashValue = XXH.h32("tile:" + [i, j], worldSeed);
  let oceanIndex1 = Math.floor(map(hashValue, 0, Math.pow(2, 32), 0, oceanColors.length));
  let oceanIndex2 = (oceanIndex1 + 1) % oceanColors.length;
  let blendFactor = sin(timeElapsed / 10) / 2 + 0.5; // Smooth transition over time
  let blendedColor = interpolateColors(oceanColors[oceanIndex1], oceanColors[oceanIndex2], blendFactor);
  fill(blendedColor[0], blendedColor[1], blendedColor[2]);

  push();

  let offsetY = sin(timeElapsed + i * waveFrequency) * waveMagnitude; // Add wave effect
  translate(0, offsetY);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill(0, 0, 0, 32);
    arc(0, -5, 45, 25, 0, PI);
    translate(-5, -10);
    fill(205, 133, 63);
    arc(0, 0, 45, 25, 0, PI);
    rect(0, -10, 5, 15)
    fill('black')
    triangle(0, -8, 0, -20, 20, -12.5);
    fill('white')
    ellipse(5, -14, 7, 4);
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

function p3_drawAfter() {
  timeElapsed += 0.1; // Increment time for animation
}