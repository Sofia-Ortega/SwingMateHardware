const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

let characteristic;
let startTime;

let connectBtn = document.querySelector("#connectBtn");
connectBtn.onclick = async () => {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ name: "ESP32" }],
    optionalServices: [SERVICE_UUID],
  });

  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(SERVICE_UUID);
  characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

  if (TEST_NOTIFY) {
    await startNotifications();
  }

  connected = true;
  console.log("Setup complete!");
};

let startNotifs = document.querySelector("#startNotifs");
let stopNotifs = document.querySelector("#stopNotifs");

startNotifs.onclick = () => startNotifications();
stopNotifs.onclick = () => stopNotifications();

async function startNotifications() {
  const notificationCharacteristic = await characteristic.startNotifications();
  notificationCharacteristic.addEventListener(
    "characteristicvaluechanged",
    onCharactieristicValueChanged
  );

  startNotifs.disabled = true;
  stopNotifs.disabled = false;

  myIndex = 0;
  totalData = [];

  console.log("start notifications");
}

async function stopNotifications() {
  await characteristic.stopNotifications();
  characteristic.removeEventListener(
    "characteristicvaluechanged",
    onCharactieristicValueChanged
  );

  startNotifs.disabled = false;
  stopNotifs.disabled = true;

  console.log("stopped notifications");
}
function onCharactieristicValueChanged(event) {
  const COORD_LENGTH = 16; //  4 floats stored per coord * 4 bytes

  let dataView = event.target.value;
  console.log(dataView);

  let numOfCoords = dataView.byteLength / COORD_LENGTH;

  for (let i = 0; i < numOfCoords; i++) {
    let offset = i * 16;

    let timeStamp = dataView.getFloat32(offset + 0, true);
    let x = dataView.getFloat32(offset + 4, true);
    let y = dataView.getFloat32(offset + 8, true);
    let z = dataView.getFloat32(offset + 12, true);

    //receivedData.push([timeStamp, x, y, z]);
    totalData.push([timeStamp, x, y, z]);
  }

  if (totalData.length % 100 == 0) {
    console.log("Progress:", totalData.length);
  }

  if (totalData.length >= 500) {
    console.log("total:");
    console.log(totalData);
    stopNotifications();
    /*
      myIndex = 0;
      totalData = [];
      console.log("resetting");
      */
  }
}

let locked = false;

async function readValue() {
  if (!locked) {
    locked = true;
    let dataView = await characteristic.readValue();
    locked = false;

    let x = dataView.getFloat32(0, true);
    let y = dataView.getFloat32(4, true);
    let z = dataView.getFloat32(8, true);

    if (totalData.length >= 500) {
      console.log(totalData);
      totalData = [];
    } else {
      totalData.push([-1, x, y, z]);
    }

    if (totalData.length % 100 == 0) {
      console.log("Progress:", totalData.length);
    }

    myFore.x = x;
    myFore.y = y;
    myFore.z = z;
  }
}
