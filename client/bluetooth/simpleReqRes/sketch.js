// drawing arm
const BOX_HEIGHT = 150 / 2;
const BOX_WIDTH = 30 / 2;
const JOINT_RADIUS = 30 / 2;

const FRAME_RATE = 25;

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

let counter = 100;
let myData = [[-1]];

let totalData = [];

let angleChange = 0.5;

let myUpper;
let myFore;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);

  angleMode(DEGREES);
  frameRate(FRAME_RATE);

  myUpper = createVector(0, 0, 0);
  myFore = createVector(0, 0, 0);
  // debugMode(100, 10, 0, 0, 0, 20, 0, -40, 0);
}

function draw() {
  orbitControl();
  background(200);

  if (totalData.length > 0 && counter >= myData.length) {
    // check to make sure totalData is new

    if (myData[0][0] != totalData[0][0]) {
      counter = 0;
      myData = JSON.parse(JSON.stringify(totalData));
      console.log(totalData);

      totalData = [];
      console.log("data refreshed");
    }
  } else if (counter < myData.length) {
    console.log(myData);
    myFore.x = myData[counter][1];
    myFore.y = myData[counter][2];
    myFore.z = myData[counter][3];
    console.log(`[${myFore.x}, ${myFore.y}, ${myFore.z}]`);

    counter++;
  }

  push();
  normalMaterial();
  rotateX(myUpper.y);
  rotateY(myUpper.x);
  rotateZ(myUpper.z);

  translate(0, (-1 * BOX_HEIGHT) / 2, 0);
  sphere(JOINT_RADIUS);
  translate(0, BOX_HEIGHT / 2, 0);

  box(BOX_WIDTH, BOX_HEIGHT, BOX_WIDTH);

  translate(0, BOX_HEIGHT / 2, 0);
  sphere(JOINT_RADIUS);

  rotateX(myFore.y);
  rotateY(myFore.x);
  rotateZ(myFore.z);

  box(BOX_WIDTH, BOX_HEIGHT * 2, BOX_WIDTH);

  translate(0, BOX_HEIGHT, 0);
  sphere(JOINT_RADIUS);

  pop();
}
