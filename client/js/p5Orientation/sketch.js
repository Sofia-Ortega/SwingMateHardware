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

let upperarmBluetoothManager;
let forearmBluetoothManager;
let myArm;

function setup() {
  upperarmBluetoothManager = new BluetoothManager(UPPERARM_CHIP_NAME);
  forearmBluetoothManager = new BluetoothManager(FOREARM_CHIP_NAME);

  myArm = new Arm();
  createCanvas(710, 600, WEBGL);
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

  const zeroUpper = createButton("zero Upper");
  zeroUpper.mousePressed(() => {
    myArm.zeroUpper();
  });

  const connectForearmBtn = createButton("connect Forearm");
  connectForearmBtn.mousePressed(() => {
    forearmBluetoothManager.scanDevices();
  });

  const disconnectForearmBtn = createButton("disconnect Forearm");
  disconnectForearmBtn.mousePressed(() => {
    forearmBluetoothManager.disconnect();
  });

  const zeroFore = createButton("zero Fore");
  zeroFore.mousePressed(() => {
    myArm.zeroFore();
  });
}

async function draw() {
  const now = millis();
  const deltaTime = now - lastUpdate;

  if (upperarmBluetoothManager.connected && deltaTime >= updateInterval) {
    lastUpdate = now;
    const coordUpper = await upperarmBluetoothManager.getCoord();
    const coordFore = await forearmBluetoothManager.getCoord();

    myArm.updateUpperRotation(coordUpper);
    myArm.updateForeRotation(coordFore);
  }

  background(250);
  normalMaterial();
  myArm.draw();
}
