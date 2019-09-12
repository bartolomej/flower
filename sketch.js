const width = () => window.innerWidth;
const height = () => window.innerHeight - 5;
const convertFraction = fraction => {
  function gcd(a, b) {
    if (b < 0.0000001) return a;
    return gcd(b, Math.floor(a % b));
  }
  let len = fraction.toString().length - 2;
  let denominator = Math.pow(10, len);
  let numerator = fraction * denominator;
  let divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;

  return `${Math.floor(numerator)} / ${Math.floor(denominator)}`;
};
const resetSimulation = () => {
  spots = 500;
  spotDiff = 2;
  angleDiff = 0;
  angleStep = 0.0001;
  fractionDiff = 1/2;
  fractionStep = 0.0001;
};

window.onload = function() {
  resetSimulation();
};

document.addEventListener('keyup', e => {
  if (e.code === 'ArrowUp') {
    if (angleStep < 1) angleStep *= 2;
    if (fractionStep < 1) fractionStep *= 2;
  }
  if (e.code === 'ArrowDown') {
    angleStep /= 2;
    fractionStep /= 2;
  }
  if (e.code === 'ArrowRight') {
    mode = 'angle';
    resetSimulation();
  }
  if (e.code === 'ArrowLeft') {
    mode = 'fraction';
    resetSimulation();
  }
});

let spots;
let spotDiff;
let angleDiff;
let angleStep;
let fractionDiff;
let fractionStep;
let mode = 'fraction'; // modes: angle / fraction

const simulation = s => {
  let canvas;

  s.setup = () => {
    canvas = s.createCanvas(width(), height());
    canvas.parent('simulationCanvas');
  };

  s.draw = () => {
    s.background(255);

    s.noStroke();
    s.textSize(15);
    s.fill('rgb(0,0,0)');
    if (mode === 'angle') {
      s.text(`ANGLE STEP: ${Math.round(angleDiff * 1000) / 1000} = ${convertFraction(angleStep)}`, 10, 20);
    }
    if (mode === 'fraction') {
      s.text(`FRACTION STEP: ${Math.round(fractionDiff * 1000) / 1000} = ${convertFraction(fractionDiff)}`, 10, 20);
    }
    s.translate(width() / 2, height() / 2);

    for (let i = 0; i < spots; i++) {
      let Px;
      let Py;
      if (mode === 'angle') {
        Px = (i * spotDiff) * Math.cos(i * angleDiff);
        Py = (i * spotDiff) * Math.sin(i * angleDiff);
      }
      if (mode === 'fraction') {
        Px = (i * spotDiff) * Math.cos(i * 2 * Math.PI * fractionDiff);
        Py = (i * spotDiff) * Math.sin(i * 2 * Math.PI * fractionDiff);
      }
      let spotColor = tinycolor("#fc0303").spin(i).toRgbString();
      s.fill(spotColor);
      s.stroke(spotColor);
      s.ellipse(Px, Py, 20, 20);
    }

    angleDiff += angleStep;
    fractionDiff += fractionStep;
  };

  s.windowResized = () => {
    s.resizeCanvas(width(), height());
  };

};

const simulationP5 = new p5(simulation);