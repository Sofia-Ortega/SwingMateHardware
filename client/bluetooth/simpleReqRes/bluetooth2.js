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

  // start notifications
  const notificationCharacteristic = await characteristic.startNotifications();
  notificationCharacteristic.addEventListener(
    "characteristicvaluechanged",
    onCharactieristicValueChanged
  );

  console.log("Setup complete!");
};

function onCharactieristicValueChanged(event) {
  const COORD_LENGTH = 16; //  4 floats stored per coord * 4 bytes

  let dataView = event.target.value;
  let numOfCoords = dataView.byteLength / COORD_LENGTH;

  totalData = [];
  for (let i = 0; i < numOfCoords; i++) {
    let offset = i * 16;

    let timeStamp = dataView.getFloat32(offset + 0, true);
    let x = dataView.getFloat32(offset + 4, true);
    let y = dataView.getFloat32(offset + 8, true);
    let z = dataView.getFloat32(offset + 12, true);

    //receivedData.push([timeStamp, x, y, z]);
    totalData.push([timeStamp, x, y, z]);
  }
}
