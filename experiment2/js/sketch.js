/* exported setup, draw */
let seed = 0;
let canvasContainer; // Declare canvasContainer globally

function resizeScreen() {
  let centerHorz = canvasContainer.width() / 20; // Adjusted for drawing logic
  let centerVert = canvasContainer.height() / 20; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  redraw(); // Redraw everything based on new size
}

// listener for reimagine button
$("#reimagine").click(function() {
  seed++;
});

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(400, 200, WEBGL);
  canvas.parent("canvas-container");

  $(window).resize(function() {
    resizeScreen();
  });

  resizeScreen();
}

function draw() {
  randomSeed(seed);
  background(100);
  noStroke();
  
  // fill('blue');
  // rect(-200, 0, width, -height / 2);

  // fill('green');
  // rect(-200, 0, width, height / 2);
  // circle(-10,-100,10);
  
  
  let ground = color('#747e35');
  let sky = color('#373d3c');

  // Create intermediate colors.
  let start = lerpColor(ground, sky, 0.20);
  let finish = lerpColor(ground, sky, 0.70);

  // Draw the left rectangle.
  noStroke();
  fill(ground);
  rect(-width, 200, width * 2, 100);

  // Draw the left-center rectangle.
  fill(start);
  rect(-width, 130, width * 2, 70);

  // Draw the right-center rectangle.
  fill(finish);
  rect(-width, 60, width * 2, 70);

  // Draw the right rectangle.
  fill(sky);
  rect(-width, 0, width * 2, 60);

  // triangle(100,20,40,50,47,78)
  // let riverEnd = height * 0.1;
  
  // sky and ground break
  
  let from = color('#59d6ea');
  let to = color('#0e2457');

  // Create intermediate colors.
  let interA = lerpColor(from, to, 0.20);
  let interB = lerpColor(from, to, 0.70);

  // Draw the left rectangle.
  noStroke();
  fill(from);
  rect(-width, -70, width*2, 70);

  // Draw the left-center rectangle.
  fill(interA);
  rect(-width, -135, width*2, 65);

  // Draw the right-center rectangle.
  fill(interB);
  rect(-width, -215, width*2, 80);

  // Draw the right rectangle.
  fill(to);
  rect(-width, -300, width*2,90);

  // triangle(100,20,40,50,47,78)
  // let riverEnd = height * 0.1;
  
  let riverWidth = width * 0.3 + sin(frameCount * 0.05) * 10;
  fill(100, 150, 255); // River color
  beginShape();
  vertex(-15, 0); // Top-left vertex
  vertex(10, 0); // Top-right vertex
  vertex(10 + riverWidth / 2, height); // Bottom-right vertex
  vertex(10 - riverWidth / 2, height); // Bottom-left vertex
  endShape(CLOSE);
  

  
  const shroom_heads = 10*random();
  
  let c1 = color('#2f248a'); // Yellow
  let c2 = color('#9f2f62');
  // Draw random half spheres
  for (let i = 0; i < shroom_heads; i++) {
    strokeWeight(.2);
    stroke('black')
    let leftX = random(-width/2, -50); // Random x position within the left half of the canvas
    let posY = random(-5/ 2, 100 / 2); // Random y position within the canvas height
    let posZ = random(-100, 100); // Random z position within a range
    
    push(); // Save the current transformation matrix 
    translate(leftX, posY, posZ); // Translate to the random position
    rotateY(millis() / 1000); // Rotate the half sphere
    let puffiness = random(10, 13)
    let radius = random(20, 50); // Random radius
    let detailX = int(random(15, 24)); // Random detail along x-axis
    let detailY = int(random(20, 24)); // Random detail along y-axis
    //rotateX(5)
    //fill('#061e59')
    
    let inter = map(posY, -5 / 2, 100 / 2, 0, 1); // Map posY to a gradient range
    let gradientColor = lerpColor(c1, c2, inter); // Interpolate between c1 and c2 based on inter
    fill(gradientColor);
    
    
    ellipsoid(radius/1.5, puffiness, radius/1.5 , detailX, detailY); // Draw a half sphere
    
    
    translate(0, posY, 0)
    fill(255); // White - STEMS!!
    cylinder(-5, -30, 10, 24, 24);
    
    pop(); // Restore the previous transformation matrix
    //fill('#061e59');
  }
  
  
  const shroom_heads2 = 10 * random();
  
  let c3 = color('#2f248a'); // Yellow
  let c4 = color('#9f2f62');
  // Draw random half spheres
  for (let i = 0; i < shroom_heads2; i++) {
    strokeWeight(0.2);
    stroke('black');
    let rightX = random(width / 2, 50); // Random x position within the right half of the canvas
    let posY = random(5 / 2, 100 / 2); // Random y position within the canvas height
    let posZ = random(-100, 100); // Random z position within a range

    push(); // Save the current transformation matrix 
    translate(rightX, posY, posZ); // Translate to the random position
    rotateY(millis() / 1000); // Rotate the half sphere
    let puffiness = random(10, 13);
    let radius = random(20, 50); // Random radius
    let detailX = int(random(15, 24)); // Random detail along x-axis
    let detailY = int(random(20, 24)); // Random detail along y-axis

    // Apply gradient fill color
    let inter = map(posY, 5 / 2, 100 / 2, 0, 1); // Map posY to a gradient range
    let gradientColor = lerpColor(c3, c4, inter); // Interpolate between c3 and c4 based on inter
    fill(gradientColor);

    // Draw the ellipsoid
    ellipsoid(radius / 1.5, puffiness, radius / 1.5, detailX, detailY);

    // Draw the vertical rectangle (mushroom stem)
    noStroke();
    fill(255); // White color
    translate(0, 50, 0); // Adjust translation for cylinder
    cylinder(10, 100); // Draw cylinder (stem)

    pop(); // Restore the previous transformation matrix
  }
  
  let stars = [];
  
  for (let i = 0; i < 200; i++) {
    let star = {
      x: random(-width, width),
      y: random(-height, height / 4),
      diameter: random(1, 3),
      alpha: random(100, 255), 
      deltaAlpha: random(-1,1) // Random rate of change of transparency
    };
    stars.push(star);
  }
  
  for (let star of stars) {
    fill(255, star.alpha); 
    noStroke();
    ellipse(star.x, star.y, star.diameter, star.diameter);
    
    star.alpha += star.deltaAlpha;
    star.alpha = constrain(star.alpha, 100, 255); 
    
    if (random() > .99) { 
      star.deltaAlpha = random(-1, 1);
    }
  }
  
 
 
  
  
}