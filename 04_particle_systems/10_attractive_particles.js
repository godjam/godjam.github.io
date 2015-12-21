/*global Scene, Mover, MouseAttractor, Attractor, Emitter*/
//*************************************************
var AttractiveParticlesScene = function () {
	"use strict";
    Scene.call(this);
    this.attractor = new Attractor(0, 0, 30, 3);
    this.gravity = new MouseAttractor(this, this.attractor);
    this.mover = new Mover(this.width / 2, this.height / 2, this, 15);
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
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.gravity.applyOn(this.mover);
    this.mover.update();
    this.mover.display(this.ctx);
    this.emitter.step(this.ctx);
    
    this.gravity.display(this.ctx);
    Scene.prototype.loop.call(this);
};
