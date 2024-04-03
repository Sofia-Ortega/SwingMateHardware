const boxHeight = 150;
const boxWidth = 30;
const jointRadius = 30;

let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;

function setup() {
  createCanvas(710, 400, WEBGL);
  angleMode(DEGREES);
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

  rotateX(rotationX);
  rotateY(rotationY);
  rotateZ(rotationZ);

  // Draw the shoulder sphere
  translate(0, (-1 * boxHeight) / 2, 0);
  sphere(jointRadius);
  translate(0, boxHeight / 2, 0);

  // Draw the upper arm box
  box(boxWidth, boxHeight, 30);

  // Draw the elbow sphere
  translate(0, boxHeight / 2, 0);
  sphere(jointRadius);
}
