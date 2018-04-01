/*global Scene, Mover, MouseAttractor, Attractor, Emitter*/
//*************************************************
var AttractiveParticlesScene = function (options) {
	"use strict";
    Scene.call(this, options);
    this.intro("Attractive particles", "The movers react to the attractor.<br>The particles attract each other.");

    this.attractor = new Attractor(0, 0, 30, 3);
    this.gravity = new MouseAttractor(this, this.attractor);
    this.mover = new Mover(this.size.x / 2, this.size.y / 2, this, 30);
    this.mover.initRandomly();
    this.emitter = new Emitter(this);
    this.emitter.setOwner(this.mover);
    this.emitter.setInnerAttractiveForce(0.3);
    this.emitter.setParticlesSpeed(20);
    this.emitter.setAngle(0, Math.PI * 2);
};
AttractiveParticlesScene.prototype = Object.create(Scene.prototype);
AttractiveParticlesScene.prototype.constructor = AttractiveParticlesScene;

AttractiveParticlesScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    this.gravity.applyOn(this.mover);
    this.mover.update();
    this.mover.display(this.ctx);
    this.emitter.step(this.ctx);

    this.gravity.display(this.ctx);
    Scene.prototype.loop.call(this);
};
