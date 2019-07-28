function Neuron(scene, x, y, cooldown) {
  'use strict';
  this.id = ++Neuron.id;
  this.location = new Vector2(x, y);
  this.basesize = 16;
  this.size = this.basesize;
  this.connections = [];
  this.cooldown = cooldown || 0;
  this.sum = 0;
  this.firing = false;
}
Neuron.id = 0;


Neuron.prototype.addConnection = function (connection) {
  'use strict';
  if (connection instanceof Connection === false) {
    throw 'Neuron.addConnection : connection is not a Connection';
  }
  this.connections.push(connection);
}

Neuron.prototype.feedforward = function (input) {
  'use strict';
  if (typeof (input) !== 'number') {
    throw 'Neuron.feedforward : input is not a number';
  }
  this.sum += input;
  if (this.sum > 1.0) {
    this.initFire();
    this.updateFire(0);
  }
}

Neuron.prototype.initFire = function () {
  'use strict';
  this.firing = true;
  const start = this.basesize;
  const end = this.basesize * 1.5;
  if (this.motion == null)
    this.motion = new Tools.Motion(this, "size", start, end, this.cooldown, Tools.quadInOut);
}

Neuron.prototype.updateFire = function (delta) {
  'use strict';  
  if (this.firing && this.motion) {
    this.motion.update(delta / 1000);
    let progress = this.motion.getProgress();
    if (progress >= 1) {
      // fire connections
      for (let i = 0; i < this.connections.length; i++) {
        const c = this.connections[i];
        c.feedforward(this.sum);
      }
      this.sum = 0;
      this.firing = false;
      this.size = this.basesize;
      this.motion = null;
    }
  }
}

Neuron.prototype.display = function (ctx, delta) {
  'use strict';
  this.updateFire(delta);

  for (let i = 0; i < this.connections.length; ++i) {
    this.connections[i].display(ctx, delta);
  }

  ctx.beginPath();
  ctx.arc(this.location.x, this.location.y, this.size, 0, Math.PI * 2);
  // TODO colors
  let s = 1 - Math.min(this.sum, 1) / 2;
  ctx.fillStyle = Color.createHsl(0.4, 0.65, s, 0.9).rgba();
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}