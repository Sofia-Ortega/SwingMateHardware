const READ_FROM_FILE = false;
const TEST_NOTIFY = false;
const TEST_READ = true;

let connected = false;

// drawing arm
const BOX_HEIGHT = 150 / 2;
const BOX_WIDTH = 30 / 2;
const JOINT_RADIUS = 30 / 2;

const FRAME_RATE = 25;

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

let myIndex = 0;

let difference = [];
let totalData = [];

let angleChange = 0.5;

let myUpper;
let myFore;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);

  angleMode(DEGREES);
  //frameRate(20);

  myUpper = createVector(0, 0, 0);
  myFore = createVector(0, 0, 0);
}

async function draw() {
  orbitControl();
  background(200);

  if (TEST_NOTIFY) {
    if (myIndex < totalData.length) {
      // console.log("Difference:", totalData.length - myIndex);
      difference.push(totalData.length - myIndex);
      myFore.x = totalData[myIndex][1];
      myFore.y = totalData[myIndex][2];
      myFore.z = totalData[myIndex][3];

      myIndex++;
    } else {
      console.log("too fast!");
    }

    if (difference.length == 500) {
      console.log("difference:");
      console.log(difference);
      difference.push(1);
    }
  }

  if (TEST_READ) {
    if (connected) readValue();
  }

  if (READ_FROM_FILE) {
    if (myIndex < data.length) {
      myFore.x = data[myIndex][1];
      myFore.y = data[myIndex][2];
      myFore.z = data[myIndex][3];

      myIndex++;
    }
  }

  push();
  normalMaterial();
  rotateZ(myUpper.z);
  rotateX(myUpper.y);
  rotateY(myUpper.x);

  translate(0, (-1 * BOX_HEIGHT) / 2, 0);
  sphere(JOINT_RADIUS);
  translate(0, BOX_HEIGHT / 2, 0);

  box(BOX_WIDTH, BOX_HEIGHT, BOX_WIDTH);

  translate(0, BOX_HEIGHT / 2, 0);
  sphere(JOINT_RADIUS);

  rotateZ(myFore.z);
  rotateX(myFore.y);
  rotateY(myFore.x);

  box(BOX_WIDTH, BOX_HEIGHT * 2, BOX_WIDTH);

  translate(0, BOX_HEIGHT, 0);
  sphere(JOINT_RADIUS);

  pop();
}
