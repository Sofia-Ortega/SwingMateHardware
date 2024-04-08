class Arm {
  constructor() {
    this.upperRotation = createVector(0, 0, 0); // p5.Vector for upper arm rotations
    this.foreRotation = createVector(0, 0, 0); // p5.Vector for forearm rotations

    this.upperOffset = createVector(0, 0, 0);
    this.foreOffset = createVector(0, 0, 0);

    this.windowSize = 5;
    this.foreValues = [];
    this.upperValues = [];
  }

  updateUpperRotation(rotations) {
    this.upperRotation.set(rotations[0], rotations[1], rotations[2]);
  }

  updateForeRotation(rotations) {
    this.foreValues.push(rotations); // Array of 3 length Array
    if (this.foreValues.length > this.windowSize) {
      this.foreValues.shift();
    }

    let avg = createVector(0, 0, 0);
    for (let value of this.foreValues) {
      avg.add(value);
    }

    avg.div(this.foreValues.length);
    this.foreRotation.set(avg);
  }

  updateUpperRotation(rotations) {
    this.upperValues.push(rotations); // Array of 3 length Array
    if (this.upperValues.length > this.windowSize) {
      this.upperValues.shift();
    }

    let avg = createVector(0, 0, 0);
    for (let value of this.upperValues) {
      avg.add(value);
    }

    avg.div(this.upperValues.length);
    this.upperRotation.set(avg);
  }

  zeroUpper() {
    this.upperOffset.set(this.upperRotation);
  }

  zeroFore() {
    this.foreOffset.set(this.foreRotation);
  }

  draw() {
    let myUpper = p5.Vector.sub(this.upperRotation, this.upperOffset);
    let myFore = p5.Vector.sub(this.foreRotation, this.foreOffset);

    push();
    rotateX(myUpper.y);
    rotateY(myUpper.x);
    rotateZ(myUpper.z);

    translate(0, (-1 * boxHeight) / 2, 0);
    sphere(jointRadius);
    translate(0, boxHeight / 2, 0);

    box(boxWidth, boxHeight, 30);

    translate(0, boxHeight / 2, 0);
    sphere(jointRadius);

    rotateX(myFore.y);
    rotateY(myFore.x);
    rotateZ(myFore.z);

    box(boxWidth, boxHeight * 2, 30);

    translate(0, boxHeight, 0);
    sphere(jointRadius);

    pop();
  }
}
