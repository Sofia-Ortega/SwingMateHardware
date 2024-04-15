import asyncio
from bleak import BleakScanner, BleakClient
from time import sleep

CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8"
CHIP_NAME = "MyESP32 :D"
CHIP_NAME = "OrientationSensorBLE"


async def run():
    devices = await BleakScanner.discover()
    print("Found devices:")
    for d in devices:
      print("Found device:", d.name, "with address:", d.address)
      if d.name and CHIP_NAME in d.name:
        print("Found device:", d.name, "with address:", d.address)
        await connect_to_device(d.address)

async def connect_to_device(address):

  async with BleakClient(address) as client:
    print("Connected to device:", address)

      # WRITE VALUE
    '''
    value_to_write = "howdy"
    value_to_write_bytes = bytearray(value_to_write.encode('utf-8'))
    await client.write_gatt_char(CHARACTERISTIC_UUID, value_to_write_bytes)
    '''
    # READS VALUE
    while True:
      value = await client.read_gatt_char(CHARACTERISTIC_UUID)

      s = value.decode('ascii')
      print("string:", s)
      sleep(0.1)

loop = asyncio.get_event_loop()
loop.run_until_complete(run())