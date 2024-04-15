const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

class BluetoothManager {
  constructor(chipName) {
    this.chipName = chipName;

    this.device = null;
    this.characteristic = null;
    this.connected = false;
  }

  async connectToDevice() {
    if (!this.device) {
      console.error("No device selected");
      return false;
    }

    console.log("Connecting to device:", this.device.name);
    const server = await this.device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    this.characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

    console.log("Connected to device:", this.device.name);
    this.connected = true;

    return true;
  }

  async disconnect() {
    if (!this.device) {
      console.error("No device to disconnect from.");
      return false;
    }

    if (!this.device.gatt) {
      console.error("Device is not connected.");
      return false;
    }

    try {
      this.connected = false;
      console.log("Disconnecting from device:", this.device.name);
      await this.device.gatt.disconnect();
      console.log("Disconnected from device:", this.device.name);
      return true;
    } catch (error) {
      console.error("Error while disconnecting:", error);
    }

    return false;
  }

  async scanDevices() {
    console.log("Scanning...");
    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ name: this.chipName }],
        optionalServices: ["generic_access", SERVICE_UUID],
      });

      console.log("Found device:", this.device.name);

      await this.connectToDevice();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getCoord() {
    if (!this.connected) {
      return [0, 0, 0];
    }

    const readValue = () => {
      return new Promise((resolve, reject) => {
        this.characteristic.readValue().then(resolve).catch(reject);
      });
    };

    try {
      const val = await readValue();

      const coord = [
        val.getFloat32(0, true),
        val.getFloat32(4, true),
        val.getFloat32(8, true),
      ];

      return coord;
    } catch (error) {
      console.error("Error while reading value:", error);
    }
  }

  isConnected() {
    return this.connected;
  }

  test() {
    console.log("Pring pring");
  }
}
