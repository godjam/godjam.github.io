/*global Scene, Emitter, Mover, Attractor, MouseAttractor, Gravity, Vector2*/
//*************************************************
var ParticlesRepellerScene = function () {
	"use strict";
    Scene.call(this);
    this.mover = new Mover(this.width / 2, 20, this, 15);
    this.mover.angle = -Math.PI / 2;
    this.emitter = new Emitter(this);
    this.emitter.setOwner(this.mover, new Vector2(-1, 0));
    this.emitter.setAngle(-Math.PI, Math.PI);
    this.emitter.setParticlesSpeed(4);
    this.emitter.setParticlesLife(100, 0.01);
    this.gravity = new Gravity(0, 0.7);
    
    this.repeller = new Attractor(0, 0, 30, -4);
    this.mouseAttractor = new MouseAttractor(this, this.repeller);
};
ParticlesRepellerScene.prototype = Object.create(Scene.prototype);
ParticlesRepellerScene.prototype.constructor =  ParticlesRepellerScene;


ParticlesRepellerScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.mover.display(this.ctx);
    
    this.emitter.apply(this.repeller);
    this.emitter.apply(this.gravity);
    this.emitter.step(this.ctx);
    
    this.mouseAttractor.display(this.ctx);
	Scene.prototype.loop.call(this);
};