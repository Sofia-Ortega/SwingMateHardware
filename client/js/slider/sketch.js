function setup() {
  createCanvas(400, 400);
  background(200);

  rect(30, 20, 55, 55);

  const btn = createButton("Print min, max");

  const fromSlider = select("#fromSlider");
  const playSlider = select("#playSlider");
  const toSlider = select("#toSlider");

  btn.mousePressed(() => {
    console.log(
      `Sliders: [${fromSlider.value()}, ${playSlider.value()}, ${toSlider.value()}] `
    );
  });
}

function draw() {}
