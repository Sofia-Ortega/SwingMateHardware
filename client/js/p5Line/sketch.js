const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;

const UPPERARM_LENGTH = 50;

let v1, v2;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);

  v1 = createVector(0, 0, 0);
  v2 = createVector(UPPERARM_LENGTH, 0, 0);

  describe("A black line connecting two spheres. The scene spins slowly.");
}

function draw() {
  // orbitControl();
  background(200);

  // Draw a line.
  line(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
}
