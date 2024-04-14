class Slider {
  constructor(maxVal) {
    this.maxVal = maxVal;
    this.sliderColor = "#C6C6C6"; // GREY
    this.rangeColor = "#25daa5"; // GREEN

    this.fromSlider = document.querySelector("#fromSlider");
    this.toSlider = document.querySelector("#toSlider");
    this.playSlider = document.querySelector("#playSlider");

    this.sliderContainer = document.querySelector("#slider_container");

    this.updateMax(maxVal);

    this.fillSlider();

    this.fromSlider.oninput = () => this.fromSliderControl();
    this.toSlider.oninput = () => this.toSliderControl();
    this.playSlider.oninput = () => this.playSliderControl();

    this.playSliderUpdateEvent = new Event("playSliderUpdate");

    this.unhide();
  }

  hide() {
    this.sliderContainer.style.display = "none";
  }

  unhide() {
    console.log("unhidding");
    console.log(this.sliderContainer);
    this.sliderContainer.style.display = "flex";
  }

  updateMax(max) {
    this.fromSlider.max = max;
    this.toSlider.max = max;
    this.playSlider.max = max;

    this.fromSlider.value = 0;
    this.toSlider.value = max;
    this.playSlider.value = 0;

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
    this.broadcastPlaySliderUpdate();
  }

  toSliderControl() {
    this.fillSlider();

    let fromVal = this.getFromValueInt();
    let toVal = this.getToValueInt();

    if (fromVal > toVal) {
      this.toSlider.value = fromVal;
    }

    this.playSlider.value = toSlider.value;
    this.broadcastPlaySliderUpdate();
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

    this.broadcastPlaySliderUpdate();
  }

  broadcastPlaySliderUpdate() {
    this.playSlider.dispatchEvent(this.playSliderUpdateEvent);
  }

  setPlaySlider(val) {
    this.playSlider.value = val;
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
