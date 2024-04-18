/*
  Based on Neil Kolban example for IDF: https://github.com/nkolban/esp32-snippets/blob/master/cpp_utils/tests/BLE%20Tests/SampleNotify.cpp
  Ported to Arduino ESP32 by Evandro Copercini
  updated by chegewara and MoThunderz
*/
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// ble 
BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic = NULL;
BLEDescriptor *pDescr;
BLE2902 *pBLE2902;

// imu Sensor
Adafruit_BNO055 bno = Adafruit_BNO055(55);

// global variables
bool deviceConnected = false;
bool oldDeviceConnected = false;

const int PACKET_SIZE = 20;
const int COORD_SIZE = 4;
const int DELAY_TIME = (1.0 / PACKET_SIZE) * 500; // offset of 500ms

unsigned long START_TIME = millis();

# define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
# define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      START_TIME = millis();
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};

void setup() {
  Serial.begin(115200);

  // Create the BLE Device
  BLEDevice::init("ESP32");

  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_NOTIFY | 
                      BLECharacteristic::PROPERTY_READ
                    );                   

  // Create a BLE Descriptor
  
  pDescr = new BLEDescriptor((uint16_t)0x2901);
  pDescr->setValue("A very interesting variable");
  pCharacteristic->addDescriptor(pDescr);
  
  pBLE2902 = new BLE2902();
  pBLE2902->setNotifications(true);
  pCharacteristic->addDescriptor(pBLE2902);

  // Start the service
  pService->start();

  // Start advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(false);
  pAdvertising->setMinPreferred(0x0);  // set value to 0x00 to not advertise this parameter
  BLEDevice::startAdvertising();
  Serial.println("Waiting a client connection to notify...");


  if(!bno.begin()) {
    Serial.println("no BNO055 detected... check wiring or I2C ADDR");
  }

  Serial.println("DELAY:");
  Serial.println(DELAY_TIME);

}

void loop() {

  // notify changed value
  if (deviceConnected) {




    float packet[PACKET_SIZE][COORD_SIZE];

    
    for(int i = 0; i < PACKET_SIZE; i++) {
      sensors_event_t event;
      bno.getEvent(&event);

      unsigned long currentTime = millis() - START_TIME;

      packet[i][0] = (float)(currentTime);
      packet[i][1] = event.orientation.x;
      packet[i][2] = event.orientation.y;
      packet[i][3] = event.orientation.z;

      delay(DELAY_TIME); 
       
    }

    pCharacteristic->setValue((uint8_t*)packet, sizeof(packet));
    pCharacteristic->notify();
  }
  // disconnecting
  if (!deviceConnected && oldDeviceConnected) {
    delay(500); // give the bluetooth stack the chance to get things ready
    pServer->startAdvertising(); // restart advertising
    Serial.println("start advertising");
    oldDeviceConnected = deviceConnected;
  }
  // connecting
  if (deviceConnected && !oldDeviceConnected) {
    // do stuff here on connecting
    oldDeviceConnected = deviceConnected;
  }
}