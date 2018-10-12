/*global Scene, CA*/
//*************************************************
let TestScene = function (options) {
  'use strict';
  Scene.call(this, options);
  this.intro("Genetic algorithm", "");

  this.sim = new Box2dSim(this);
  this.init();

};
TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;

TestScene.prototype.init = function () {
  'use strict';
  this.sim.init();
};

TestScene.prototype.loop = function (delta) {
  'use strict';
  this.ctx.clearRect(0, 0, this.size.x, this.size.y);
  this.sim.update(delta);
}