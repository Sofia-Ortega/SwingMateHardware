let bx;
let by;
let boxSize = 75;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;

const NUM_OF_FRAMES_TO_RECORD = 200;
let recordData = []; // [ [x, y], ...]
let record = false;
let recordFrameCounter = NUM_OF_FRAMES_TO_RECORD;

function setup() {
  createCanvas(400, 400);
  bx = width / 2.0;
  by = height / 2.0;
  rectMode(RADIUS);
  strokeWeight(2);

  rect(30, 20, 55, 55);

  const fromSlider = select("#fromSlider");
  const playSlider = select("#playSlider");
  const toSlider = select("#toSlider");

  const btn = createButton("Print min, max");
  btn.mousePressed(() => {
    console.log(
      `Sliders: [${fromSlider.value()}, ${playSlider.value()}, ${toSlider.value()}] `
    );
  });

  const recordBtn = select("#recordBtn");
  recordBtn.mousePressed(() => {
    recordData = [];
    if (record) return;

    recordFrameCounter = NUM_OF_FRAMES_TO_RECORD;
    record = true;
  });
}

function draw() {
  if (record) {
    background("#4287f5");
    recordData.push([bx, by]);
    recordFrameCounter--;

    if (recordFrameCounter <= 0) {
      record = false;
      console.log(recordData);
    }
  } else {
    background(237, 34, 93);
  }

  // Test if the cursor is over the box
  if (
    mouseX > bx - boxSize &&
    mouseX < bx + boxSize &&
    mouseY > by - boxSize &&
    mouseY < by + boxSize
  ) {
    overBox = true;
    if (!locked) {
      stroke(255);
      fill(244, 122, 158);
    }
  } else {
    stroke(156, 39, 176);
    fill(244, 122, 158);
    overBox = false;
  }

  // Draw the box
  rect(bx, by, boxSize, boxSize);
}

function mousePressed() {
  if (overBox) {
    locked = true;
    fill(255, 255, 255);
  } else {
    locked = false;
  }
  xOffset = mouseX - bx;
  yOffset = mouseY - by;
}

function mouseDragged() {
  if (locked) {
    bx = mouseX - xOffset;
    by = mouseY - yOffset;
  }
}

function mouseReleased() {
  locked = false;
}
