# TESTING ARM

## Goal

- Given `upperarm_angle` and `forearm_angle` see an accurate 3d representation on the screen
- 2 sensors will be on the arm. One on the upperarm and another on the forearm. Using this information we need to reconstruct a digital 3d representation of it

## Running

- (Optional) Download **Live Server** Extension (provides hot reload every time you save)
- Go to the folder you want to run and click on `index.html`
- Hit **Go Live** at the bottom of your vscode screen
- Voila!!

## Code

There are 2 techniques I was looking into:

1. Using vectors and lines and calculating manually where each point should be (`p5Line/`)
2. Using the 3D geometries primitives (`p5Test/`)

### p5Line/

- Calculate points of where shoulder, elbow, and wrist should go
- I believe this is easier to do
- Might want to look into [P5.Vector](https://p5js.org/reference/#/p5.Vector). But it might be easier to calculate manually instead of relying on it since its not that good with 3D objs
- Current Problem: The freaking math TT-TT

### p5Test/

- Translating and Rotating based on p5.js 3d model library
- Current Problem: Can only rotate based on center of 3d Box. Can't change center of origin to edge.

### p5Orientation/

There is a mismatch of x, y, and z found in `arm.js`. This is on purpose.

```js
rotateX(sensor.y);
rotateY(sensor.x);
rotateZ(sensor.z);
```
