const BOX_HEIGHT = 150;
const BOX_WIDTH = 30;
const BOX_DEPTH = 30;
const JOINT_RADIUS = 30;

let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;

function setup() {
  createCanvas(700, 700, WEBGL);
  angleMode(DEGREES);
  debugMode();
}

function draw() {
  background(250);
  normalMaterial();

  // Apply rotations based on keyboard input
  if (keyIsDown(88)) {
    // 'x' key: Rotate forward on the X-axis
    rotationX += 1;
  } else if (keyIsDown(83)) {
    // 's' key: Rotate backward on the X-axis
    rotationX -= 1;
  }
  if (keyIsDown(67)) {
    // 'c' key: Rotate forward on the Y-axis
    rotationY += 1;
  } else if (keyIsDown(68)) {
    //  'd' key: Rotate backward on the Y-axis
    rotationY -= 1;
  }
  if (keyIsDown(90)) {
    // 'z' key: Rotate backward on the Z-axis
    rotationZ += 1;
  } else if (keyIsDown(65)) {
    // 'a' key: Rotate forward on the Z-axis
    rotationZ -= 1;
  }

  push();
  rotateZ(rotationZ);
  rotateX(rotationX);
  rotateY(rotationY);

  // Draw the shoulder sphere
  sphere(JOINT_RADIUS);
  translate(0, BOX_HEIGHT / 2, 0);

  // Draw the upper arm box
  box(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH);

  // Draw the elbow sphere
  translate(0, BOX_HEIGHT / 2, 0);
  sphere(JOINT_RADIUS);

  //translate(0, BOX_HEIGHT / 2, 0);

  rotateZ(frameCount);
  rotateX(frameCount);
  rotateY(frameCount);

  box(BOX_WIDTH, BOX_HEIGHT * 2, BOX_DEPTH);
  translate(0, BOX_HEIGHT, 0);
  sphere(JOINT_RADIUS, 32, 32);

  pop();
}
