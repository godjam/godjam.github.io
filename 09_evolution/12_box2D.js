/*global Scene, CA*/
//*************************************************
let Box2dSimScene = function (options) {
  'use strict';
  Scene.call(this, options);
  this.intro("Genetic algorithm", "");

  this.sim = new Box2dSim(this);
  this.init();
};

Box2dSimScene.prototype = Object.create(Scene.prototype);
Box2dSimScene.prototype.constructor = Box2dSimScene;

Box2dSimScene.prototype.init = function () {
  'use strict';
  this.sim.init();
};

Box2dSimScene.prototype.loop = function (delta) {
  'use strict';
  this.ctx.clearRect(0, 0, this.size.x, this.size.y);
  this.sim.update(delta);
}