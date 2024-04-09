const boxHeight = 150;
const boxWidth = 30;
const jointRadius = 30;

let lastUpdate = 0;
const updateInterval = 100; // milliseconds

let record = false;
let replay = false;
let recordedData = [];

const NUM_FRAMES_RECORD = 50;
let recordCounter = NUM_FRAMES_RECORD;
let replayCounter = 0;

let upperarmBluetoothManager;
let forearmBluetoothManager;
let myArm;

function startRecord() {
  recordCounter = NUM_FRAMES_RECORD;
  recordedData = [];
  record = true;
}

function startReplay() {
  if (record) record = false;
  replayCounter = 0;
  replay = true;
}

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

  const recordBtn = createButton("record");
  const replayBtn = createButton("replay");

  recordBtn.mousePressed(startRecord);
  replayBtn.mousePressed(startReplay);
}

async function draw() {
  if (replay) {
    // -------------- REPLAY -------------------------
    if (replayCounter >= recordedData.length) {
      replay = false;
      return;
    }

    let upperCoord = recordedData[replayCounter][0];
    let foreCoord = recordedData[replayCounter][1];

    myArm.updateUpperRotation(upperCoord);
    myArm.updateForeRotation(foreCoord);

    console.log(upperCoord);
    console.log(foreCoord);

    replayCounter++;
  } else {
    // -------------- LIVE FEED ----------------------
    const now = millis();
    const deltaTime = now - lastUpdate;

    if (upperarmBluetoothManager.connected && deltaTime >= updateInterval) {
      lastUpdate = now;
      const coordUpper = await upperarmBluetoothManager.getCoord();
      const coordFore = await forearmBluetoothManager.getCoord();

      myArm.updateUpperRotation(coordUpper);
      myArm.updateForeRotation(coordFore);
    }
  }

  // background(250);
  if (record && replay) {
    background("#54040b"); // maroon
  } else if (record) {
    background("#f2a5a5"); // redish
  } else if (replay) {
    background("#c8a5f2"); // lilac
  } else {
    background(250); // white
  }

  normalMaterial();
  myArm.draw();

  // recording data
  if (record) {
    // -------------- RECORD ----------------------
    recordedData.push(myArm.getRotationVector());
    recordCounter--;

    if (recordCounter <= 0) {
      record = false;

      console.log(recordedData);
      for (let data in recordedData) {
        console.log(data);
      }
    }
  }
}
