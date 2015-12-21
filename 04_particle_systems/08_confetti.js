/*global Scene, Emitter, Mover, MouseAttractor, Gravity, Attractor*/
//*************************************************
var ConfettiScene = function () {
	"use strict";
    Scene.call(this);
    this.mover = new Mover(this.width / 2, this.height / 2, this, 20);
    this.emitter = new Emitter(this);
    this.emitter.setOwner(this.mover);
    this.emitter.setConfettiProbability(0.5);
    this.emitter.setParticlesLife(200, 0.004);
    this.emitter.setParticlesSpeed(20);
    
    this.attractor = new Attractor(0, 0, 30, 2);
    this.mouseAttractor = new MouseAttractor(this, this.attractor);
};
ConfettiScene.prototype = Object.create(Scene.prototype);
ConfettiScene.prototype.constructor = ConfettiScene;
    
ConfettiScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.mouseAttractor.applyOn(this.mover);

    this.mover.update();
    this.mover.display(this.ctx);
    
    this.emitter.apply(this.attractor);
    this.emitter.step(this.ctx);
    this.mouseAttractor.display(this.ctx);
    
	Scene.prototype.loop.call(this);
};