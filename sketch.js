document.addEventListener('keyup', e => {
  if (e.code === 'ArrowUp') {
    if (angleStep < 1) angleStep *= 2;
  }
  if (e.code === 'ArrowDown') {
    angleStep /= 2;
  }
});

const width = () => window.innerWidth;
const height = () => window.innerHeight - 5;

let spots = 500;
let spotDiff = 2;
let angleDiff = 0;
let angleStep = 0.0001;

const simulation = s => {
  let canvas;

  s.setup = () => {
    canvas = s.createCanvas(width(), height());
    canvas.parent('simulationCanvas');
  };

  s.draw = () => {
    s.background(255);

    s.noStroke();
    s.textSize(20);
    s.fill('rgb(0,0,0)');
    s.text(Math.round(angleDiff * 10000) / 10000, 10, 20);
    s.translate(width() / 2, height() / 2);

    for (let i = 0; i < spots; i++) {
      let spotColor = tinycolor("#fc0303").spin(i).toRgbString();
      let Px = (i * spotDiff) * Math.cos(i * angleDiff);
      let Py = (i * spotDiff) * Math.sin(i * angleDiff);
      s.fill(spotColor);
      s.stroke(spotColor);
      s.ellipse(Px, Py, 20, 20);
    }

    angleDiff += angleStep;
  };

  s.windowResized = () => {
    s.resizeCanvas(width(), height());
  };

};

const simulationP5 = new p5(simulation);