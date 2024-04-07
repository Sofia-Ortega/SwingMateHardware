const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

const UPPERARM_LENGTH = 50;
const LOWERARM_LENGTH = 50;

let shoulder, elbow, wrist;
let shoulderAngle = 45;
let elbowAngle = 45;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);
    angleMode(DEGREES);

    debugMode(100, 10, 0, 0, 0, 20, 0, -40, 0);
    
    shoulder = createVector(0, 0, 0);
    elbow = createVector(UPPERARM_LENGTH * cos(shoulderAngle), UPPERARM_LENGTH * sin(shoulderAngle), 0);
    wrist = createVector(elbow.x + LOWERARM_LENGTH * cos(shoulderAngle + elbowAngle), elbow.y + LOWERARM_LENGTH * sin(shoulderAngle + elbowAngle), LOWERARM_LENGTH);
}

function draw() {
    orbitControl();
    background(200);

    push();
    stroke(0);
    strokeWeight(5);
    line(shoulder.x, shoulder.y, shoulder.z, elbow.x, elbow.y, elbow.z);
    line(elbow.x, elbow.y, elbow.z, wrist.x, wrist.y, wrist.z);
    pop();

    stroke(255, 0, 150);
    strokeWeight(0.8);
}

// Elbow movement buttons
document.getElementById('elbowx').addEventListener('click', function() {
    elbow.x += 5; // Move the elbow in the positive x direction
});

document.getElementById('elbowy').addEventListener('click', function() {
    elbow.y += 5; // Move the elbow in the positive y direction
});

document.getElementById('elbowz').addEventListener('click', function() {
    elbow.z += 5; // Move the elbow in the positive z direction
});

document.getElementById('elbowxneg').addEventListener('click', function() {
    elbow.x -= 5; // Move the elbow in the negative x direction
});

document.getElementById('elbowyneg').addEventListener('click', function() {
    elbow.y -= 5; // Move the elbow in the negative y direction
});

document.getElementById('elbowzneg').addEventListener('click', function() {
    elbow.z -= 5; // Move the elbow in the negative z direction
});

// Wrist movement buttons
document.getElementById('wristx').addEventListener('click', function() {
    wrist.x += 5; // Move the wrist in the positive x direction
});

document.getElementById('wristy').addEventListener('click', function() {
    wrist.y += 5; // Move the wrist in the positive y direction
});

document.getElementById('wristz').addEventListener('click', function() {
    wrist.z += 5; // Move the wrist in the positive z direction
});

document.getElementById('wristxneg').addEventListener('click', function() {
    wrist.x -= 5; // Move the wrist in the negative x direction
});

document.getElementById('wristyneg').addEventListener('click', function() {
    wrist.y -= 5; // Move the wrist in the negative y direction
});

document.getElementById('wristzneg').addEventListener('click', function() {
    wrist.z -= 5; // Move the wrist in the negative z direction
});
