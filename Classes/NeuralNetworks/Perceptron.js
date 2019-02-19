let Perceptron = function (neuronsCount, learningRate) {
  'use strict';
  this.weights = [];
  this.learningRate = learningRate || 0.01;
  
  for (let i = 0; i < neuronsCount; ++i) {
    this.weights.push(Tools.rndf(-1, 1));
  }
}

Perceptron.prototype.feedforward = function (inputs) {
  'use strict';
  // TODO check lengths
  let sum = 0;
  for (let i = 0; i < this.weights.length; ++i) {
    sum += this.weights[i] * inputs[i];
  }
  
  return this.activate(sum);
}

Perceptron.prototype.activate = function (sum) {
  'use strict';
  return (sum > 0 ? 1 : 0);
}

Perceptron.prototype.train = function (inputs, target) {
  'use strict';
  const res = this.feedforward(inputs);
  const err = target - res;
  for (let i = 0; i < this.weights.length; ++i) {
    this.weights[i] += this.learningRate * err * inputs[i];
  }
}

Perceptron.prototype.display = function (ctx) {
  'use strict';
  // TODO colors
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
  const ctH  = uy * 2;
  
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
  
}