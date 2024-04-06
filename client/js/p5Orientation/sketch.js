const boxHeight = 150;
const boxWidth = 30;
const jointRadius = 30;

let lastUpdate = 0;
const updateInterval = 100; // milliseconds

let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;

const bluetoothManager = new BluetoothManager(
    CHARACTERISTIC_UUID,
    SERVICE_UUID,
    CHIP_NAME
);

function setup() {
    createCanvas(710, 400, WEBGL);
    angleMode(DEGREES);

    frameRate(10);

    const connectBtn = createButton("connect");
    connectBtn.mousePressed(() => {
        bluetoothManager.scanDevices();
    });

    const disconnectBtn = createButton("disconnect");
    disconnectBtn.mousePressed(() => {
        bluetoothManager.disconnect();
    });
}

async function draw() {
    const now = millis();
    const deltaTime = now - lastUpdate;

    // Check if the specified interval has elapsed
    if (bluetoothManager.connected && deltaTime >= updateInterval) {
        lastUpdate = now;

        // Update rotation angles here

        coord = await bluetoothManager.getCoord();

        console.log(coord);

        if (coord && coord[0] != 0 && coord[1] != 0 && coord[2] != 0) {
            rotationX = coord[0];
            rotationY = coord[1];
            rotationZ = coord[2];
        }
    }

    background(250);
    normalMaterial();

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
