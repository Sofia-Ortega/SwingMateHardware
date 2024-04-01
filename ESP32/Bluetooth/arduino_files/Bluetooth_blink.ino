#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <string>

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

int led = D10;

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"


bool deviceConnected = false;
BLECharacteristic *pCharacteristic;
BLEServer *pServer = NULL;

int counter = 0;



class MyServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
  }

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    counter = 1;
  }
};


class MyCallbacks: public BLECharacteristicCallbacks {
    
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string value = pCharacteristic->getValue();

      if (value.length() > 0) {
        if (value[0] == 0) {
          digitalWrite(led, LOW);
        } else {
          digitalWrite(led, HIGH);
        }
      }
    }
};

void setup() {
  pinMode(led, OUTPUT);


  Serial.begin(115200);

  // create BLE Device
  BLEDevice::init("MyESP32 :D");

  // Create BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // create BLUE Service
  pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE |
                                         BLECharacteristic::PROPERTY_NOTIFY
                                        );

                                    

  pCharacteristic->setCallbacks(new MyCallbacks());


  pService->start();

  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->start();
}

void loop() {
  // put your main code here, to run repeatedly:


  if(deviceConnected) {
    Serial.println("Device connected!");
    pCharacteristic->setValue(std::to_string(counter++));
    pCharacteristic->notify();
  } else {
    Serial.println("Looking for Device - advertizing");
    pServer->getAdvertising()->start();
  }


  delay(2000);
}