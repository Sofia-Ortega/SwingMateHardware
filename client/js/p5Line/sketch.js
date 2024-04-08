const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;

const LENGTH = 50;

let shoulder, elbow, wrist;
let upperarmAngle = 0;
let forearmAngle = 0;

let angleChange = 0.5;

let displayUpper;
let displayFore;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);

  angleMode(DEGREES);

  debugMode(100, 10, 0, 0, 0, 20, 0, -40, 0);

  shoulder = createVector(0, 0, 0);
  elbow = createVector(LENGTH, 0, 0);
  wrist = createVector(0, LENGTH, 0);

  // upper arm
  let upperarmAnglePlusBtn = createButton("Upper +");
  let upperarmAngleMinusBtn = createButton("Upper -");
  upperarmAnglePlusBtn.mousePressed(() => {
    upperarmAngle += angleChange;
    displayUpper.html(`Upperarm: ${upperarmAngle}`);
  });
  upperarmAngleMinusBtn.mousePressed(() => {
    upperarmAngle -= angleChange;
    displayUpper.html(`Upperarm: ${upperarmAngle}`);
  });

  let forearmAnglePlusBtn = createButton("Fore +");
  let forearmAngleMinusBtn = createButton("Fore -");
  forearmAnglePlusBtn.position(130, 410);
  forearmAngleMinusBtn.position(200, 410);
  forearmAnglePlusBtn.mousePressed(() => {
    forearmAngle += angleChange;
    displayFore.html(`Forearm: ${forearmAngle}`);
  });
  forearmAngleMinusBtn.mousePressed(() => {
    forearmAngle -= angleChange;
    displayFore.html(`Forearm: ${forearmAngle}`);
  });

  displayUpper = createP(`Upperarm: ${upperarmAngle}`);
  displayFore = createP(`Forearm: ${forearmAngle}`);

  describe("A black line connecting two spheres. The scene spins slowly.");
}

function draw() {
  orbitControl();
  background(200);

  // Draw a line.
  push();
  stroke(0, 0, 0);
  strokeWeight(5);

  line(shoulder.x, shoulder.y, shoulder.z, elbow.x, elbow.y, elbow.z);
  line(elbow.x, elbow.y, elbow.z, wrist.x, wrist.y, wrist.z);

  pop();

  stroke(255, 0, 150);
  strokeWeight(0.8);
}
