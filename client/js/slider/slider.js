class Slider {
  constructor(
    fromSliderIdName,
    toSliderIdName,
    playSliderIdName,
    playBtnIdName,
    maxVal
  ) {
    this.fromSlider = document.querySelector(fromSliderIdName);
    this.toSlider = document.querySelector(toSliderIdName);
    this.playSlider = document.querySelector(playSliderIdName);
    this.playBtn = document.querySelector(playBtnIdName);

    this.updateMax(maxVal);

    this.fromSlider.oninput = () => this.fromSliderControl();
    this.toSlider.oninput = () => this.toSliderControl();
    this.playSlider.oninput = () => this.playSliderControl();

    // todo:
    // on play btn
    //  - have animatino replay based on index
    //  - playSlider value should update on each index
    //      - bool updatePlaySlider(int newVal) // returns true if successful, false if not
    // - convert to stop button

    // make crop btn
    // on crop btn
    // Array getBorders() // returns [int from, int to]
    // stored array.splice(to, from)

    // make overlay of arm

    // filter incoming data better (gaussian filter?)

    this.sliderColor = "#C6C6C6"; // GREY
    this.rangeColor = "#25daa5"; // GREEN

    this.fillSlider();
  }

  updateMax(max) {
    this.fromSlider.max = max;
    this.toSlider.max = max;
    this.playSlider.max = max;

    this.fillSlider();
  }

  fillSlider() {
    const rangeDistance = this.toSlider.max - this.toSlider.min; // how big the slider is
    const fromPosition = this.fromSlider.value - this.toSlider.min;
    const toPosition = this.toSlider.value - this.toSlider.min;

    // percentages
    const startRangeColor = (fromPosition / rangeDistance) * 100;
    const endRangeColor = (toPosition / rangeDistance) * 100; // - circleActivePercentage

    // color the slider on top
    this.playSlider.style.background = `linear-gradient(
            to right,
            ${this.sliderColor} 0%,
            ${this.sliderColor} ${startRangeColor}%,
            ${this.rangeColor} ${startRangeColor}%,
            ${this.rangeColor} ${endRangeColor}%,
            ${this.sliderColor} ${endRangeColor}%,
            ${this.sliderColor} 100% 
        )`;
  }

  fromSliderControl() {
    this.fillSlider();

    let fromVal = this.getFromValueInt();
    let toVal = this.getToValueInt();

    if (fromVal > toVal) {
      this.fromSlider.value = toVal;
    }
    this.playSlider.value = fromSlider.value;
  }

  toSliderControl() {
    this.fillSlider();

    let fromVal = this.getFromValueInt();
    let toVal = this.getToValueInt();

    if (fromVal > toVal) {
      this.toSlider.value = fromVal;
    }

    this.playSlider.value = toSlider.value;
  }

  playSliderControl() {
    let fromVal = this.getFromValueInt();
    let playVal = this.getPlayValueInt();
    let toVal = this.getToValueInt();

    if (playVal < fromVal) {
      this.playSlider.value = fromVal;
    } else if (playVal > toVal) {
      this.playSlider.value = toVal;
    }
  }

  getFromValueInt() {
    return parseInt(this.fromSlider.value, 10);
  }

  getToValueInt() {
    return parseInt(this.toSlider.value, 10);
  }

  getPlayValueInt() {
    return parseInt(this.playSlider.value, 10);
  }
}

let slider = new Slider(
  "#fromSlider",
  "#toSlider",
  "#playSlider",
  "#playBtn",
  56
);

let cutBtn = document.querySelector("#cutBtn");
cutBtn.onclick = () => {
  slider.updateMax(32);
};
