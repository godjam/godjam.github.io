//*************************************************
let EcosystemScene_09 = function (options) {
  'use strict';
  Scene.call(this, options);
  this.intro("GA - Ecosystem", "Touch to add food");

  this.sim = new BloopSim(this);
  this.init();
};

EcosystemScene_09.prototype = Object.create(Scene.prototype);
EcosystemScene_09.prototype.constructor = EcosystemScene_09;

EcosystemScene_09.prototype.init = function () {
  'use strict';
  this.sim.init();
};

EcosystemScene_09.prototype.loop = function (delta) {
  'use strict';
  this.ctx.clearRect(0, 0, this.size.x, this.size.y);
  this.sim.update(delta);
}