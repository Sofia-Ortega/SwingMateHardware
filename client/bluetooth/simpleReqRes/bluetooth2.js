const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

let characteristic;

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
};

function onCharactieristicValueChanged(event) {
  let value = event.target.value;

  const coord = [
    value.getFloat32(0, true),
    value.getFloat32(4, true),
    value.getFloat32(8, true),
  ];

  console.log(coord);
}
