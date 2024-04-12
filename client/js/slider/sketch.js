// todo:
// on play btn
//  - have animatino replay based on index
//  - playSlider value should update on each index
//      - bool updatePlaySlider(int newVal) // returns true if successful, false if not
// - convert to stop button

// make crop btn
// on crop btn
// Array getBorders() // returns [int from, int to]
// stored array.splice(to, from)

// make overlay of arm

// filter incoming data better (gaussian filter?)

this.sliderColor = "#C6C6C6"; // GREY
this.rangeColor = "#25daa5"; // GREEN

let bx;
let by;
let boxSize = 75;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;

const NUM_OF_FRAMES_TO_RECORD = 100;
let recordData = []; // [ [x, y], ...]
let record = false;
let recordFrameCounter = NUM_OF_FRAMES_TO_RECORD;

let slider;

let play = false;
let playIndex = 0;

let recordBtn;
let playBtn;

function onFinishRecording() {
  record = false;
  console.log(recordData);
  slider = new Slider(NUM_OF_FRAMES_TO_RECORD);
  recordBtn.html("Rerecord");
}

function setup() {
  createCanvas(400, 400);
  bx = width / 2.0;
  by = height / 2.0;
  rectMode(RADIUS);
  strokeWeight(2);

  rect(30, 20, 55, 55);

  const btn = createButton("Print min, max");
  btn.mousePressed(() => {
    const fromSlider = select("#fromSlider");
    const playSlider = select("#playSlider");
    const toSlider = select("#toSlider");
    console.log(
      `Sliders: [${fromSlider.value()}, ${playSlider.value()}, ${toSlider.value()}] `
    );
  });

  recordBtn = select("#recordBtn");
  recordBtn.mousePressed(() => {
    if (record) return;
    recordData = [];

    recordFrameCounter = NUM_OF_FRAMES_TO_RECORD;
    record = true;
  });

  playBtn = select("#playBtn");
  playBtn.mousePressed(() => {
    if (!play) {
      if (
        playIndex >= slider.getToValueInt() ||
        playIndex < slider.getFromValueInt()
      ) {
        playIndex = slider.getFromValueInt();
      }
      playBtn.html("Stop");
      play = true;
    } else {
      play = false;
      playBtn.html("Play");
    }
  });
}

function draw() {
  if (record) {
    background("#4287f5");
    recordData.push([bx, by]);
    recordFrameCounter--;

    if (recordFrameCounter <= 0) {
      onFinishRecording();
    }
  } else if (play) {
    background("#6e288a");
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

  if (play) {
    [bx, by] = recordData[playIndex++];
    console.log(playIndex - 1, bx, by);
    slider.setPlaySlider(playIndex);

    if (playIndex >= slider.getToValueInt()) {
      play = false;
      playBtn.html("Play");
    }
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
