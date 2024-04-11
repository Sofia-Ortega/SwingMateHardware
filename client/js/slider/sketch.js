function setup() {
  createCanvas(400, 400);
  background(200);

  rect(30, 20, 55, 55);

  const btn = createButton("Print min, max");
  const from = select("#fromInput");
  const to = select("#toInput");

  const fromSlider = select("#fromSlider");
  const playSlider = select("#playSlider");
  btn.mousePressed(() => {
    console.log("Why hello there");
    console.log("From:", from.value());
    console.log("To:", to.value());
    console.log("FromSlider:", fromSlider.value());
    console.log("Now Slider", playSlider.value());
  });
}

function draw() {}
