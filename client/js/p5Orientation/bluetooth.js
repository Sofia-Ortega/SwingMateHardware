const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHIP_NAME = "OrientationSensorBLE";
let connected = false;

let characteristic = null;
let device = null;

async function connectToDevice() {
  if (device == null) {
    console.error("No device selected");
    return;
  }

  console.log("Connecting to device:", device.name);
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(SERVICE_UUID);

  characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

  console.log("Connected to device:", device.name);
  connected = true;

  return characteristic;
}

async function disconnect() {
  if (!device) {
    console.error("No device to disconnect from.");
    return;
  }

  try {
    console.log("Disconnecting from device:", device.name);
    await device.gatt.disconnect();
    console.log("Disconnected from device:", device.name);
    connected = false;
  } catch (error) {
    console.error("Error while disconnecting:", error);
  }
}

async function scanDevices() {
  console.log("Scanning...");
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ name: CHIP_NAME }],
      optionalServices: ["generic_access", SERVICE_UUID],
    });

    console.log("Found device:", device.name);

    await connectToDevice();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getCoord() {
  if (!connected) {
    return [0, 0, 0];
  }
  const readValue = () => {
    return new Promise((resolve, reject) => {
      characteristic.readValue().then(resolve).catch(reject);
    });
  };

  // print out value from characteristic here
  try {
    const val = await readValue();
    console.log("Received value:", val);

    let coord = [
      val.getFloat32(0, true),
      val.getFloat32(4, true),
      val.getFloat32(8, true),
    ];

    return coord;
  } catch (error) {
    console.error("Error while reading value:", error);
  }
}
