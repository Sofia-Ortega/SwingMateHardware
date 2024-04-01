#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
#include <utility/imumaths.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <string>

Adafruit_BNO055 bno = Adafruit_BNO055(55);
BLECharacteristic *pCharacteristic;
BLEServer *pServer = NULL;
bool deviceConnected = false;

class MyServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
  }

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
  }
};

void setup() {
  Serial.begin(115200);
  BLEDevice::init("OrientationSensorBLE");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
  pCharacteristic = pService->createCharacteristic(
                                     "beb5483e-36e1-4688-b7f5-ea07361b26a8",
                                     BLECharacteristic::PROPERTY_READ |
                                     BLECharacteristic::PROPERTY_NOTIFY
                                    );
  pService->start();
  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->start();
  if(!bno.begin())
  {
    Serial.println("Ooops, no BNO055 detected ... Check your wiring or I2C ADDR!");
    while(1);
  }
  delay(1000);
  bno.setExtCrystalUse(true);
}

void loop() {
  sensors_event_t event; 
  bno.getEvent(&event);
  if(deviceConnected) {

    float x, y, z;
    x = event.orientation.x;
    y = event.orientation.y;
    z = event.orientation.z;

    /* Display the floating point data */
    Serial.print("X: ");
    Serial.print(x, 4);
    Serial.print("\tY: ");
    Serial.print(y, 4);
    Serial.print("\tZ: ");
    Serial.print(z, 4);
    Serial.println("");


    float orientation[3] = {x, y, z};
    
    pCharacteristic->setValue((uint8_t*)orientation, sizeof(orientation));
  } else {
    pServer->getAdvertising()->start();
  }

  delay(100); // Add delay if needed to control the data rate
}
