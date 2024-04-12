class Slider {
  constructor(maxVal) {
    this.maxVal = maxVal;
    this.sliderColor = "#C6C6C6"; // GREY
    this.rangeColor = "#25daa5"; // GREEN

    this.createSliders();
    // this.createButtons();
    this.fillSlider();

    this.fromSlider.oninput = () => this.fromSliderControl();
    this.toSlider.oninput = () => this.toSliderControl();
    this.playSlider.oninput = () => this.playSliderControl();
  }

  createSliders() {
    const slidersContainer = document.querySelector(".sliders_control");

    this.fromSlider = document.createElement("input");
    this.fromSlider.id = "fromSlider";
    this.fromSlider.type = "range";
    this.fromSlider.value = Math.floor(this.maxVal * 0.1); // Default value
    this.fromSlider.min = 0;
    this.fromSlider.max = this.maxVal;
    slidersContainer.appendChild(this.fromSlider);

    this.toSlider = document.createElement("input");
    this.toSlider.id = "toSlider";
    this.toSlider.type = "range";
    this.toSlider.value = Math.floor(this.maxVal * 0.9); // Default value
    this.toSlider.min = 0;
    this.toSlider.max = this.maxVal;
    slidersContainer.appendChild(this.toSlider);

    this.playSlider = document.createElement("input");
    this.playSlider.id = "playSlider";
    this.playSlider.type = "range";
    this.playSlider.value = Math.floor(this.maxVal * 0.5); // Default value
    this.playSlider.min = 0;
    this.playSlider.max = this.maxVal;
    slidersContainer.appendChild(this.playSlider);
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
