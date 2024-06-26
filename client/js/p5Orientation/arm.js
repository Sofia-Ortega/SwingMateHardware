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

  resetMovingAverage() {
    this.foreValues = [];
    this.upperValues = [];
  }

  // coord: [x, y, z]
  isValidRotationCoord(coord) {
    // check if coord and not every coord is 0
    return coord && Array.isArray(coord) && coord.every((val) => val != 0);
  }

  // rotations: [x, y, z]
  updateForeRotation(rotations) {
    // validate data
    this.isValidRotationCoord(rotations);

    // moving average
    this.foreValues.push(rotations);
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

  // rotations: [x, y, z]
  updateUpperRotation(rotations) {
    // validate data
    this.isValidRotationCoord(rotations);

    // moving average
    this.upperValues.push(rotations);
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

  getRotationVector() {
    let myUpper = p5.Vector.sub(this.upperRotation, this.upperOffset);
    let myFore = p5.Vector.sub(this.foreRotation, this.foreOffset);

    return [
      [myUpper.x, myUpper.y, myUpper.z],
      [myFore.x, myFore.y, myFore.z],
    ];
  }

  draw(noOffset) {
    let myUpper, myFore;
    if (!noOffset) {
      myUpper = p5.Vector.sub(this.upperRotation, this.upperOffset);
      myFore = p5.Vector.sub(this.foreRotation, this.foreOffset);
    } else {
      myUpper = this.upperRotation;
      myFore = this.foreRotation;
    }

    push();
    rotateX(myUpper.y);
    rotateY(myUpper.x);
    rotateZ(myUpper.z);

    translate(0, (-1 * BOX_HEIGHT) / 2, 0);
    sphere(JOINT_RADIUS);
    translate(0, BOX_HEIGHT / 2, 0);

    box(BOX_WIDTH, BOX_HEIGHT, 30);

    translate(0, BOX_HEIGHT / 2, 0);
    sphere(JOINT_RADIUS);

    rotateX(myFore.y);
    rotateY(myFore.x);
    rotateZ(myFore.z);

    box(BOX_WIDTH, BOX_HEIGHT * 2, 30);

    translate(0, BOX_HEIGHT, 0);
    sphere(JOINT_RADIUS);

    pop();
  }
}
