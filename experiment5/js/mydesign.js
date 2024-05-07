/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
  return [
    {
      name: "Stand Up for your Rights", 
      assetUrl: "https://cdn.glitch.global/c411dba3-fc2e-4f97-b3d4-24262a68504f/400509.jpg?v=1715104897229",
      credit: "https://tinyurl.com/3s4nhfe8"
    },
    {
      name: "Protests", 
      assetUrl: "https://cdn.glitch.global/c411dba3-fc2e-4f97-b3d4-24262a68504f/dsc06977-e1591148733628.webp?v=1715104169632",
      credit: "https://tinyurl.com/4eut5rjr"
    },
    {
      name: "Detained Protestors", 
      assetUrl: "https://cdn.glitch.global/c411dba3-fc2e-4f97-b3d4-24262a68504f/5eb9557d-efb3-4dbb-a542-931007873dbc-MarshallCountyProtest_02.webp?v=1715104398429",
      
    },
    {
      name: "Who's Next", 
      assetUrl: "https://cdn.glitch.global/c411dba3-fc2e-4f97-b3d4-24262a68504f/398274.jpg?v=1715104538678",
      credit: "https://tinyurl.com/25xefenk"
    },
    
  ];
}

function initDesign(inspiration) {
  let canvasContainer = $('.image-container'); // Select the container using jQuery
  let canvasWidth = canvasContainer.width(); // Get the width of the container
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
  resizeCanvas(inspiration.image.width / 2, inspiration.image.height / 2);
  $(".caption").text(inspiration.credit); // Set the caption text

  // add the original image to #original
  const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
  $('#original').empty();
  $('#original').append(imgHTML);
  let design = {
    bg: 128,
    fg: []
  }
  
  for(let i = 0; i < 1000; i++) {
    design.fg.push({
      x: random(width),
      y: random(height),
      diameter: random(5, 20), 
      fill: random(255)
    })
  }
  return design;
}

function renderDesign(design, inspiration) {
  background(design.bg);
  noStroke();
  for (let circle of design.fg) {
    fill(circle.fill, 128);
    ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
  }
}

function mutateDesign(design, inspiration, rate) {
  design.bg = constrain(randomGaussian(design.bg, (rate * (255 - 0)) / 10), 0, 255);
  
  for (let circle of design.fg) {
    circle.fill = constrain(randomGaussian(circle.fill, (rate * (255 - 0)) / 10), 0, 255);
    circle.x = constrain(randomGaussian(circle.x, (rate * (width - 0)) / 20), 0, width);
    circle.y = constrain(randomGaussian(circle.y, (rate * (height - 0)) / 20), 0, height);
    circle.diameter = constrain(randomGaussian(circle.diameter, (rate * (width/2 - 0)) / 20), 0, width/2);
  }
}
