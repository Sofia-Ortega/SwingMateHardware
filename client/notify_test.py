import asyncio
from bleak import BleakScanner, BleakClient

CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8"

async def run():
    devices = await BleakScanner.discover()
    for d in devices:
        if d.name and "MyESP32" in d.name:
            print("Found device:", d.name, "with address:", d.address)
            await connect_to_device(d.address)

async def connect_to_device(address):
    async with BleakClient(address) as client:
        print("Connected to device:", address)

        # Subscribe to notifications for the characteristic
        await client.start_notify(CHARACTERISTIC_UUID, notification_handler)

        # Keep the connection open for notifications
        while True:
            await asyncio.sleep(1)

async def notification_handler(sender, data):
    # Handle notifications received from the characteristic
    # print("Notification received from characteristic:", data)
    print("notified!")
    '''
    value = await client.read_gatt_char(CHARACTERISTIC_UUID)
    print("Value read from characteristic:", value)

    s = value.decode('ascii')
    print("string:", s)
    '''

loop = asyncio.get_event_loop()
loop.run_until_complete(run())
