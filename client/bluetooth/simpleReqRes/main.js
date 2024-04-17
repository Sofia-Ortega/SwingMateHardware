let bm = new BluetoothManager("FOREARM_CHIP");
let arr = [];

let connectBtn = document.querySelector("#connectBtn");
connectBtn.onclick = () => {
  bm.scanDevices();
};

let startNotifs = document.querySelector("#startNotifs");
startNotifs.onclick = () => {
  bm.startNotificationsBM();
};

let readVal = document.querySelector("#readVal");
readVal.onclick = async () => {
  let val = await bm.readValue();
  console.log("readVal(): ", val);
};

/*
let getCoordBtn = document.querySelector("#getCoordBtn");
getCoordBtn.onclick = async () => {
  arr = [];
  for (let i = 0; i < 100; i++) {
    let coord = await bm.getCoord();
    arr.push(coord);
  }
  console.log(arr);
};
*/

let average = 0;
let timeThisPoint = 0;
let numPoints = 0;
let totalTime = 0;

let getCoordBtn = document.querySelector("#getCoordBtn");
getCoordBtn.onclick = () => {
  bm.getCounter();
};

/*
getCoordBtn.onclick = async () => {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    let start = performance.now();
    let coord = await bm.getCoord();
    let end = performance.now();

    let timeThisPoint = end - start;
    totalTime += timeThisPoint;
    numPoints++;

    average = totalTime / numPoints;
    arr.push(coord);
  }

  console.log(`Average time: ${average.toFixed(2)} ms`);
  console.log("All coordinates fetched:", arr);
};
*/
