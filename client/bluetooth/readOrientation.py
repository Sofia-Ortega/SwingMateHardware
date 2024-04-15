import asyncio
from bleak import BleakScanner, BleakClient
from time import sleep
import struct

CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8"
# CHIP_NAME = "UPPERARM_CHIP"
CHIP_NAME = "FOREARM_CHIP"

def parse_orientation_data(value):
    # Ensure the received value is not empty and has a length of 12 bytes (3 floats * 4 bytes each)
    if value and len(value) == 12:
        # Use struct.unpack to parse the bytes into floats
        x = struct.unpack('<f', value[0:4])[0]  # Assuming little-endian byte order
        y = struct.unpack('<f', value[4:8])[0]
        z = struct.unpack('<f', value[8:12])[0]
        return x, y, z
    else:
        print("Invalid data received:", value)
        return None


async def run():
    devices = await BleakScanner.discover()
    print("Found devices:")
    for d in devices:
      print("Found device:", d.name, "with address:", d.address)
      if d.name and CHIP_NAME in d.name:
        print("Found device:", d.name, "with address:", d.address)
        await connect_to_device(d.address)
        break

async def connect_to_device(address):
  print("about to connect")
  async with BleakClient(address) as client:
    print("Connected to device:", address)
    print("--------------------------");

    counter = 50

    print("data = [")

    # READS VALUE
    while counter >= 0:
      value = await client.read_gatt_char(CHARACTERISTIC_UUID)
      orientation_data = parse_orientation_data(value)
      if orientation_data:
        x, y, z = orientation_data
        print(f"[{x}, {y}, {z}],")

      sleep(0.1)

      counter -= 1
    
    print("]")

loop = asyncio.get_event_loop()
loop.run_until_complete(run())