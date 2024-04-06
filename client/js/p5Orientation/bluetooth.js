class BluetoothManager {
    constructor(characteristicUUID, serviceUUID, chipName) {
        this.characteristicUUID = characteristicUUID;
        this.serviceUUID = serviceUUID;
        this.chipName = chipName;

        console.log("constructed");
        console.log(this.chipName);
        console.log(this.serviceUUID);

        this.device = null;
        this.characteristic = null;
        this.connected = false;
    }

    async connectToDevice() {
        if (!this.device) {
            console.error("No device selected");
            return;
        }

        console.log("Connecting to device:", this.device.name);
        const server = await this.device.gatt.connect();
        const service = await server.getPrimaryService(this.serviceUUID);
        this.characteristic = await service.getCharacteristic(
            this.characteristicUUID
        );

        console.log("Connected to device:", this.device.name);
        this.connected = true;

        return this.characteristic;
    }

    async disconnect() {
        if (!this.device) {
            console.error("No device to disconnect from.");
            return;
        }

        if (!this.device.gatt) {
            console.error("Device is not connected.");
            return;
        }

        try {
            this.connected = false;
            console.log("Disconnecting from device:", this.device.name);
            await this.device.gatt.disconnect();
            console.log("Disconnected from device:", this.device.name);
        } catch (error) {
            console.error("Error while disconnecting:", error);
        }
    }

    async scanDevices() {
        console.log("Scanning...");
        try {
            console.log(this.chipName);
            console.log(this.serviceUUID);
            this.device = await navigator.bluetooth.requestDevice({
                filters: [{ name: this.chipName }],
                optionalServices: ["generic_access", this.serviceUUID],
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
}
