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

    // apply Gaussian filter
    let gaussianFiltered = this.applyGaussianFilter(rotations);

    // apply median filter
    this.foreValues.push(gaussianFiltered);
    if (this.foreValues.length > this.windowSize) {
      this.foreValues.shift();
    }

    let sortedValues = this.foreValues.slice().sort((a, b) => a[0] - b[0]);
    let medianIndex = Math.floor(sortedValues.length / 2);
    let medianX = sortedValues[medianIndex][0];
    let medianY = sortedValues[medianIndex][1];
    let medianZ = sortedValues[medianIndex][2];

    this.foreRotation.set(medianX, medianY, medianZ);
  }

  // rotations: [x, y, z]
  updateUpperRotation(rotations) {
    // validate data
    this.isValidRotationCoord(rotations);

    // apply Gaussian filter
    let gaussianFiltered = this.applyGaussianFilter(rotations);

    // apply median filter
    this.upperValues.push(gaussianFiltered);
    if (this.upperValues.length > this.windowSize) {
      this.upperValues.shift();
    }

    let sortedValues = this.upperValues.slice().sort((a, b) => a[0] - b[0]);
    let medianIndex = Math.floor(sortedValues.length / 2);
    let medianX = sortedValues[medianIndex][0];
    let medianY = sortedValues[medianIndex][1];
    let medianZ = sortedValues[medianIndex][2];

    this.upperRotation.set(medianX, medianY, medianZ);
  }

  applyGaussianFilter(rotations) {
    // rotations is an array [x, y, z]

    // Define the standard deviation for the Gaussian filter
    const sigma = 1.0;

    // Calculate the weights for the Gaussian filter
    const weights = [];
    const radius = 3; // Define the radius of the filter window
    const sigmaSquared = sigma * sigma;
    let totalWeight = 0;

    for (let i = -radius; i <= radius; i++) {
      for (let j = -radius; j <= radius; j++) {
        for (let k = -radius; k <= radius; k++) {
          const weight = Math.exp(
            -(i * i + j * j + k * k) / (2 * sigmaSquared)
          );
          weights.push(weight);
          totalWeight += weight;
        }
      }
    }

    // Normalize the weights
    for (let i = 0; i < weights.length; i++) {
      weights[i] /= totalWeight;
    }

    // Apply the Gaussian filter to each dimension separately
    const filteredRotations = [0, 0, 0];
    for (let dim = 0; dim < 3; dim++) {
      let filteredValue = 0;
      let index = 0;

      for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
          for (let k = -radius; k <= radius; k++) {
            const weight = weights[index];
            const value = rotations[dim] + i + j + k; // Adjusted for simplicity
            filteredValue += weight * value;
            index++;
          }
        }
      }

      filteredRotations[dim] = filteredValue;
    }

    return filteredRotations;
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
