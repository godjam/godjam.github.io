/*global Scene, Emitter, Mover, MouseAttractor, Gravity, Attractor*/
//*************************************************
var ParticlesAttractorScene = function () {
	"use strict";
    Scene.call(this);
    this.mover0 = new Mover(this.size.x / 2, this.size.y / 2, this, 15);
    this.emitter0 = new Emitter(this);
    this.emitter0.setOwner(this.mover0);
    
    this.mover1 = new Mover(this.size.x / 2, this.size.y / 2, this, 20);
    this.emitter1 = new Emitter(this);
    this.emitter1.setOwner(this.mover1);
    
    this.attractor = new Attractor(0, 0, 30, 3);
    this.mouseAttractor = new MouseAttractor(this, this.attractor);
    this.gravity = new Gravity(0, 0.02);
};
ParticlesAttractorScene.prototype = Object.create(Scene.prototype);
ParticlesAttractorScene.prototype.constructor =  ParticlesAttractorScene;
    
ParticlesAttractorScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    
    this.mouseAttractor.applyOn(this.mover0);
    this.mouseAttractor.applyOn(this.mover1);

    this.mover0.update();
    this.mover0.display(this.ctx);
    this.mover1.update();
    this.mover1.display(this.ctx);
    
    this.emitter0.apply(this.gravity);
    this.emitter0.step(this.ctx);
    this.emitter1.apply(this.gravity);
    this.emitter1.step(this.ctx);
    
    this.mouseAttractor.display(this.ctx);
    
	Scene.prototype.loop.call(this);
};