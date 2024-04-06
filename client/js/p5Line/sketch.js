const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;

const UPPERARM_LENGTH = 50;

let shoulder, elbow, wrist;
let upperarm_angle = 0;
let shoulderAngle = 45;
let elbowAngle = 45;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);

    camera(0, 0, 50 * sqrt(3), 0, 0, 0, 0, 1, 0);
    perspective(PI / 3, 1, 5 * sqrt(3), 500 * sqrt(3));
    angleMode(DEGREES);

    debugMode(100, 10, 0, 0, 0, 20, 0, -40, 0);

    shoulder = createVector(0, 0, 0);
    elbow = createVector(UPPERARM_LENGTH, 0, 0);
    wrist = createVector(0, UPPERARM_LENGTH, 0);

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
