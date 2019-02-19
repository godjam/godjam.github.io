let Vector2Ptron = function (neuronsCount, learningRate) {
  'use strict';
  Perceptron.call(this, neuronsCount, learningRate);
}
Vector2Ptron.prototype = Object.create(Perceptron.prototype);
Vector2Ptron.prototype.constructor = Vector2Ptron;

Vector2Ptron.prototype.feedforward = function (forces) {
  'use strict';
  let sum = new Vector2();
  for (let i = 0; i < this.weights.length; ++i) {
    sum.addInPlace(forces[i].mult(this.weights[i]));
  }
  return sum;
}

Vector2Ptron.prototype.train = function (forces, error) {
  'use strict';
  // update weights with error mult with force in x and y  
  for (let i = 0; i < this.weights.length; ++i) {
    this.weights[i] += this.learningRate * error.x * forces[i].x;
    this.weights[i] += this.learningRate * error.y * forces[i].y;
  }
}
/*
// TODO !
Vector2Ptron.prototype.display = function (ctx) {
  'use strict';
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  // unit x/y
  const ux = ~~(w / 10);
  const uy = ~~(h / 10);
  // unit size
  const us = Math.min(ux, uy);
  const uw = us * 0.8;
  // origin x/y
  const ox = ux;
  const oy = h - 3 * uy;
  // container w/h
  const ctW = ux * 8;
  const ctH = uy * 2;

  ctx.lineWidth = 0.5;
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#666666";

  ctx.rect(ox, oy, ctW, ctH);
  ctx.fill();
  ctx.stroke();

  let max = 0;
  for (let i = 0; i < this.weights.length; ++i) {
    let w = this.weights[i];
    max > Math.abs(w) ? '' : max = w;
  }

  let coef = uw / 2;
  for (let i = 0; i < this.weights.length; ++i) {
    const w = this.weights[i];
    ctx.beginPath();
    ctx.moveTo(ox, oy + us * i);
    ctx.lineTo(ox + 3 * ux, oy + uy);
    ctx.lineWidth = w / max * coef + coef;
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "#333333";
    ctx.fillText(w.toFixed(2), ox + us, oy + us * i);
  }

  ctx.fillStyle = "#333333";
  ctx.arc(ox + 3 * ux, oy + uy, us, 0, 2 * Math.PI);
  ctx.fill();

}*/