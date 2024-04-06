const boxHeight = 150;
const boxWidth = 30;
const jointRadius = 30;

let lastUpdate = 0;
const updateInterval = 100; // milliseconds

let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;

let rotationX2 = 0;
let rotationY2 = 0;
let rotationZ2 = 0;

const upperarmBluetoothManager = new BluetoothManager(UPPERARM_CHIP_NAME);
const forearmBluetoothManager = new BluetoothManager(FOREARM_CHIP_NAME);

function setup() {
    createCanvas(710, 400, WEBGL);
    angleMode(DEGREES);

    frameRate(10);

    const connectUpperarmBtn = createButton("connect upperarm");
    connectUpperarmBtn.mousePressed(() => {
        upperarmBluetoothManager.scanDevices();
    });

    const disconnectUpperarmBtn = createButton("disconnect upperarm");
    disconnectUpperarmBtn.mousePressed(() => {
        upperarmBluetoothManager.disconnect();
    });

    const connectForearmBtn = createButton("connect Forearm");
    connectForearmBtn.mousePressed(() => {
        forearmBluetoothManager.scanDevices();
    });

    const disconnectForearmBtn = createButton("disconnect Forearm");
    disconnectForearmBtn.mousePressed(() => {
        forearmBluetoothManager.disconnect();
    });
}

async function draw() {
    const now = millis();
    const deltaTime = now - lastUpdate;

    // Check if the specified interval has elapsed
    if (upperarmBluetoothManager.connected && deltaTime >= updateInterval) {
        lastUpdate = now;

        // Update rotation angles here

        coord = await upperarmBluetoothManager.getCoord();

        console.log(coord);

        if (coord && coord[0] != 0 && coord[1] != 0 && coord[2] != 0) {
            rotationX = coord[0];
            rotationY = coord[1];
            rotationZ = coord[2];
        }
    }

    // Check if the specified interval has elapsed
    if (forearmBluetoothManager.connected && deltaTime >= updateInterval) {
        lastUpdate = now;

        // Update rotation angles here

        coord = await forearmBluetoothManager.getCoord();

        console.log(coord);

        if (coord && coord[0] != 0 && coord[1] != 0 && coord[2] != 0) {
            rotationX2 = coord[0];
            rotationY2 = coord[1];
            rotationZ2 = coord[2];
        }
    }

    background(250);
    normalMaterial();

    push();
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

    pop();

    push();
    rotateX(rotationX2);
    rotateY(rotationY2);
    rotateZ(rotationZ2);

    box(boxWidth, boxHeight, 30);
    pop();
}
