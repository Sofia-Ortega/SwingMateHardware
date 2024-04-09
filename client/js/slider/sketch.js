function setup() {
  createCanvas(400, 400);
  background(200);

  rect(30, 20, 55, 55);

  const btn = createButton("Print min, max");
  const from = select("#fromInput");
  const to = select("#toInput");

  btn.mousePressed(() => {
    console.log("Why hello there");
    console.log(from.value());
    console.log(to.value());
  });
}

function draw() {}
