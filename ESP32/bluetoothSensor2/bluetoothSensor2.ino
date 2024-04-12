#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <string>

using std::string;

const string DEVICE_NAME = "UPPERARM_CHIP"; // UPPERARM 
//const string DEVICE_NAME = "FOREARM_CHIP"; // FOREARM 

const string SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const string CHARACTERISTIC_UUID =  "beb5483e-36e1-4688-b7f5-ea07361b26a8";


Adafruit_BNO055 bno = Adafruit_BNO055(55);
BLECharacteristic *pCharacteristic;
BLEServer *pServer = NULL;
bool deviceConnected = false;

class MyServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
    Serial.println("Connected!");
  }

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    pServer->getAdvertising()->start();
    Serial.println("Advertizing");

  }
};

void setup() {
  // initialization
  Serial.begin(115200);
  BLEDevice::init(DEVICE_NAME);
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // creating service and characteristics
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
                                     CHARACTERISTIC_UUID,
                                     BLECharacteristic::PROPERTY_READ |
                                     BLECharacteristic::PROPERTY_NOTIFY
                                    );

  // starting
  pService->start();

  pServer->getAdvertising()->start();



  delay(1000);


  if(!bno.begin())
  {
    Serial.println("Ooops, no BNO055 detected ... Check your wiring or I2C ADDR!");
    while(1);
  }
}

void loop() {
  sensors_event_t event; 
  bno.getEvent(&event);
  if(deviceConnected) {

    float x, y, z;
    x = event.orientation.x;
    y = event.orientation.y;
    z = event.orientation.z;


    // moving average


    float orientation[3] = { x, y, z};
    
    pCharacteristic->setValue((uint8_t*)orientation, sizeof(orientation));
  } 

  // delay(100); // Add delay if needed to control the data rate
}
