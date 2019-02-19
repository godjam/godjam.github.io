let NetworkvizScene = function (options) {
  'use strict';
  Scene.call(this, options);
  this.intro('Neural Networks - Network visualization', '');
  this.init();
  this.count = 0;
};

NetworkvizScene.prototype = Object.create(Scene.prototype);
NetworkvizScene.prototype.constructor = NetworkvizScene;

NetworkvizScene.prototype.init = function () {
  'use strict';
  let s = this.size;
  this.network = new Network(this, s.x / 2, s.y / 2, [1, 2, 2, 3]);
};

NetworkvizScene.prototype.loop = function (delta) {
  'use strict';
  this.count += delta / 1000;
  if (this.count > 0.1) {
    this.network.feedforward(Math.random());
    this.count = 0;
  }

  this.ctx.clearRect(0, 0, this.size.x, this.size.y);
  this.network.display(this.ctx, delta);
}