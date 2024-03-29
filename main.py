
import asyncio
from bleak import BleakClient

# UUIDs for the service and characteristic
SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8"

async def run():
    async with BleakClient("EC:DA:3B:BE:7E:12") as client:
        # Connect to the BLE device
        print("about to connect")
        await client.connect()

        print("connected!")

        # Read the value of the characteristic
        value = await client.read_gatt_char(CHARACTERISTIC_UUID)
        print("Initial value:", value.decode())

        # Write a new value to the characteristic
        new_value = b"Hello from PC"
        await client.write_gatt_char(CHARACTERISTIC_UUID, new_value, response=True)
        print("Wrote:", new_value.decode())

        # Read the updated value of the characteristic
        updated_value = await client.read_gatt_char(CHARACTERISTIC_UUID)
        print("Updated value:", updated_value.decode())

# Run the asyncio event loop
print("The beginning")
loop = asyncio.get_event_loop()
print("The other")
loop.run_until_complete(run())
