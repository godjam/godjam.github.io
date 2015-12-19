/*global Scene, Emitter, Mover, MouseEvtListener, Gravity, Vector2*/
//*************************************************
var ParticlesScene = function () {
	"use strict";
    Scene.call(this);
    this.mover = new Mover(this.width / 2, 15, this, 15);
    this.mover.angle = -Math.PI / 2;
    this.emitter = new Emitter(this);
    this.emitter.setOwner(this.mover, new Vector2(-1, 0));
    this.emitter.setAngle(-Math.PI, Math.PI);
    this.emitter.setParticlesSpeed(4);
    this.gravity = new Gravity(0, 0.2);
    this.mouseListener = new MouseEvtListener(this.canvas, this, this.attract);
};
ParticlesScene.prototype = Object.create(Scene.prototype);
ParticlesScene.prototype.constructor =  ParticlesScene;


ParticlesScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.mover.display(this.ctx);
    this.emitter.apply(this.gravity);
    this.emitter.step(this.ctx);
	Scene.prototype.loop.call(this);
};


ParticlesScene.prototype.attract = function (position) {
    "use strict";
    this.mover.location = position;
};