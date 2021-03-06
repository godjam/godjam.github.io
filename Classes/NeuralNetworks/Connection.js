let Connection = function (scene, from, to, weight, cooldown) {
  'use strict';
  if (from instanceof Neuron === false) {
    throw 'Connection.ctor : *from* is not a Neuron';
  }
  if (to instanceof Neuron === false) {
    throw 'Connection.ctor : *to* is not a Neuron';
  }
  this.a = from;
  this.b = to;
  this.weight = weight;
  this.cooldown = cooldown || 0.001;
  this.firing = false;
  this.output = 0;
}

Connection.prototype.feedforward = function (value) {
  'use strict';
  if (typeof (value) !== 'number') {
    throw 'Connection.feedforward : input value is not a number';
  }

  this.firing = true;
  this.output = value * this.weight;
  this.sender = this.a.location.copy();
  const b_loc = this.b.location.copy();
  if (this.motionX == null || this.motionY == null) {
    this.motionX = new Tools.Motion(this.sender, 'x', this.sender.x, b_loc.x, this.cooldown, Tools.quadInOut);
    this.motionY = new Tools.Motion(this.sender, 'y', this.sender.y, b_loc.y, this.cooldown, Tools.quadInOut);
  }
}

Connection.prototype.display = function (ctx, delta) {
  'use strict';
  if (this.firing && this.motionX && this.motionY) {
    this.motionX.update(delta / 1000);
    this.motionY.update(delta / 1000);
    let progress = this.motionX.getProgress();

    if (progress >= 1) {
      this.b.feedforward(this.output);
      this.firing = false;
      this.motionX = null;
      this.motionY = null;
    }
  }

  ctx.beginPath();
  ctx.moveTo(this.a.location.x, this.a.location.y);
  ctx.lineTo(this.b.location.x, this.b.location.y);
  // TODO colors
  ctx.lineWidth = this.weight * 4;
  ctx.stroke();
  ctx.closePath();

  if (this.sender) {
    ctx.beginPath();
    ctx.arc(this.sender.x, this.sender.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#88aaff';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}