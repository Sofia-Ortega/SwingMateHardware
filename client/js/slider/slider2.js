class Slider {
  constructor(fromSliderIdName, toSliderIdName, playSliderIdName) {
    this.fromSlider = document.querySelector(fromSliderIdName);
    this.toSlider = document.querySelector(toSliderIdName);
    this.playSlider = document.querySelector(playSliderIdName);

    this.fromSlider.oninput = () => this.fromSliderControl();
    this.toSlider.oninput = () => this.toSliderControl();
    this.playSlider.oninput = () => this.playSliderControl();

    this.sliderColor = "#C6C6C6"; // GREY
    this.rangeColor = "#25daa5"; // GREEN

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
    this.toSlider.style.background = `linear-gradient(
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
  }

  toSliderControl() {
    this.fillSlider();

    let fromVal = this.getFromValueInt();
    let toVal = this.getToValueInt();

    if (fromVal > toVal) {
      this.toSlider.value = fromVal;
    }

    //this.toSlider.style.zIndex = 0;
  }

  playSliderControl() {
    let fromVal = this.getFromValueInt();
    let toVal = this.getToValueInt();
    let playVal = this.getPlayValueInt();

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

let slider = new Slider("#fromSlider", "#toSlider", "#playSlider");
