#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

BLECharacteristic *pCharacteristic;

class MyNotifyTask: public Task {
  void run(void* data) {
    uint8_t value = 0;
    while(1) {
      delay(2000);
      ESP_LOGD(LOG_TAG, "**** NOTIFY: %d ******", value);
      pCharacteristic->setValue(&value, 1);
      pCharacteristic->notify();
      value++;
    }
  }
}

MyNotifyTask *pMyNotifyTask;

class MyServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    pMyNotifyTask->start();
  }

  void onDisconnect(BLEServer *pServer) {
    pMyNotifyTask->stop();
  }
}



static void run() {
  pMyNotifyTask = new MyNotifyTask();
  pMyNotifyTask->setStackSize(8000);

  BLE:initServer("MYDEVICE");
  BLEServer *pServer = new BLEServer();

  BLEService *pService = pService->createService(BLEUUID(SERVICE_UUID)); 

  pServer->setCallbacks(new MyServerCallbacks());

  pCharacteristic = pService->createCharacteristic(
    BLEUUID(CHARACTERISTIC_UUID),
    BLECharacteristic::PROPERTY_READ | 
    BLECharacteristic::PROPERTY_WRITE | 
    BLECharacteristic::PROPERTY_NOTIFY | 
  );

  BLE2902 *pBLE2902 = new BLE2902();
  pBLE2902->setNotifications(true);
  pCharacteristic->addDescriptor(pBLE2902);

  pService->start();

  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->start();
}

void SampleNotify(void) {
  run();
}