let DEBUG_MODE = false;

let lastUpdate = 0;

let record = false;
let replay = false;
let recordedData = [];

let recordCounter = NUM_FRAMES_RECORD;
let replayCounter = 0;

let upperarmBluetoothManager;
let forearmBluetoothManager;
let myArm;
let myDom;

function startRecord() {
  recordCounter = NUM_FRAMES_RECORD;
  recordedData = [];
  record = true;
}

function startReplay() {
  if (record) record = false;
  myArm.resetMovingAverage();
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

  myDom = new Dom(upperarmBluetoothManager, forearmBluetoothManager, myArm);
  myDom.setDebugMode(DEBUG_MODE);

  myDom.getRecordBtn().mousePressed(startRecord);
  myDom.getReplayBtn().mousePressed(startReplay);

  if (DEBUG_MODE) {
    recordedData = dummyData;
  }
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
  } else if (!DEBUG_MODE) {
    // -------------- LIVE FEED ----------------------
    const now = millis();
    const deltaTime = now - lastUpdate;

    // reading sensors
    if (
      (upperarmBluetoothManager.connected ||
        forearmBluetoothManager.connected) &&
      deltaTime >= UPDATE_INTERVAL
    ) {
      lastUpdate = now;

      if (upperarmBluetoothManager.connected) {
        const coordUpper = await upperarmBluetoothManager.getCoord();
        myArm.updateUpperRotation(coordUpper);
      }

      if (forearmBluetoothManager.connected) {
        const coordFore = await forearmBluetoothManager.getCoord();
        myArm.updateForeRotation(coordFore);
      }
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
  myArm.draw(replay);

  // recording data
  if (record) {
    // -------------- RECORD ----------------------
    recordedData.push(myArm.getRotationVector());
    recordCounter--;

    if (recordCounter <= 0) {
      record = false;
    }
  }
}
