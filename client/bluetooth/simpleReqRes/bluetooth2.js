const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

let characteristic;
let totalData = [];
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

  // start notifications
  const notificationCharacteristic = await characteristic.startNotifications();
  startTime = performance.now();
  notificationCharacteristic.addEventListener(
    "characteristicvaluechanged",
    onCharactieristicValueChanged
  );
};

function onCharactieristicValueChanged(event) {
  const COORD_LENGTH = 16; //  4 floats stored per coord * 4 bytes

  let dataView = event.target.value;
  let numOfCoords = dataView.byteLength / COORD_LENGTH;

  let receivedData = [];

  for (let i = 0; i < numOfCoords; i++) {
    let offset = i * 16;

    let timeStamp = dataView.getFloat32(offset + 0, true);
    let x = dataView.getFloat32(offset + 4, true);
    let y = dataView.getFloat32(offset + 8, true);
    let z = dataView.getFloat32(offset + 12, true);

    //receivedData.push([timeStamp, x, y, z]);
    totalData.push([timeStamp, x, y, z]);
  }

  console.log(
    "Difference:",
    totalData[totalData.length - 1][0] - totalData[0][0]
  );

  let totalTime = performance.now() - startTime;
  let averageTime = totalTime / 100;

  console.table(totalData);
  totalData = [];

  console.log("Total Time:", totalTime);
  console.log("Average Time:", averageTime);

  startTime = performance.now();
  // console.table(receivedData);
}
