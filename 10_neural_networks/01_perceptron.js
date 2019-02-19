let PerceptronScene = function (options) {
  'use strict';
  Scene.call(this, options);
  this.intro('Neural Networks - The Perceptron', '');
  this.targetSize = 10;
  this.targets = [];
  this.init();
};

PerceptronScene.prototype = Object.create(Scene.prototype);
PerceptronScene.prototype.constructor = PerceptronScene;

PerceptronScene.prototype.init = function () {
  'use strict';
  // vehicle
  const x = Tools.rnd(0, this.size.x);
  const y = Tools.rnd(0, this.size.y);
  this.ptron = new Vector2Ptron(this.targetSize);
  this.vehicle = new Vehicle(this, x, y, this.ptron);  
  
  // targets
  for (let i = 0; i < this.targetSize; i++) {
    const x = Tools.rnd(0, this.size.x);
    const y = Tools.rnd(0, this.size.y);

    this.targets.push(new Vector2(x, y));
  }

};

PerceptronScene.prototype.loop = function (delta) {
  'use strict';
  this.ctx.clearRect(0, 0, this.size.x, this.size.y);
  this.vehicle.steerTo(this.targets);
  this.vehicle.update(2);

  this.ctx.fillStyle = "#cccccc";
  for (let i = 0; i < this.targetSize; i++) {
    const t = this.targets[i];
    this.ctx.fillRect(t.x - 5, t.y - 5, 10, 10);
  }

  this.vehicle.display(this.ctx);

  //this.ptron.display(this.ctx);
}

/*
let PerceptronScene = function (options) {
  'use strict';
  Scene.call(this, options);
  this.intro('Neural Networks - The Perceptron', '');
  this.init();
};

PerceptronScene.prototype = Object.create(Scene.prototype);
PerceptronScene.prototype.constructor = PerceptronScene;


PerceptronScene.prototype.f = function (x) {
  'use strict';
  return x/4 + 50;
};

PerceptronScene.prototype.init = function () {
  'use strict';
  this.ptron = new Perceptron(3);
  this.trainingSize = 2000;
  this.training = [];
  this.count = 0;

  const halfW = this.size.x / 2;
  const halfH = this.size.y / 2;
  for (let i = 0; i < this.trainingSize; i++) {
    const x = Tools.rndf(-halfW, halfW);
    const y = Tools.rndf(-halfH, halfH);
    const target = y < this.f(x) ? -1 : 1;
    this.training.push(new Trainer(x, y, target));
  }

};

PerceptronScene.prototype.loop = function (delta) {
  'use strict';
  this.ctx.clearRect(0, 0, this.size.x, this.size.y);
  const halfW = this.size.x / 2;
  const halfH = this.size.y / 2;
  const t = this.training[this.count];
  this.ptron.train(t.inputs, t.target);

  this.count = (this.count + 1) % this.trainingSize;

  for (let i = 0; i < this.count; ++i) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 0.5;
    this.ctx.stokeStyle = '#000000';
    const t = this.training[i];
    const res = this.ptron.feedforward(t.inputs);
    this.ctx.arc(
      halfW + t.inputs[0],
      halfH + t.inputs[1],
      8, 0, 2 * Math.PI);
        
    if (res > 0) {
      this.ctx.strokeStyle = '#333333';
      this.ctx.stroke();

    } else {
      this.ctx.fillStyle = '#666666';
        this.ctx.fill();
    }

    this.ctx.closePath();
  }

  this.ptron.display(this.ctx);
}
*/