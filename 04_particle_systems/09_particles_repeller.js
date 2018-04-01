/*global Scene, Emitter, Mover, Attractor, MouseAttractor, Gravity, Vector2*/
//*************************************************
let ParticlesRepellerScene = function (options) {
	"use strict";
    Scene.call(this, options);
    this.intro("Particles repeller", "The movers react to the attractor.<br>The movers repel particles.");

    this.emitter = new Emitter(this, new Vector2(this.size.x / 2, this.size.y / 2));
    this.emitter.setAngle(-Math.PI, Math.PI * 2);
    this.emitter.setParticlesSpeed(4);
    this.emitter.setParticlesLife(100, 0.01);

    this.attractor = new Attractor(0, 0, 30, 3);
    this.mouseAttractor = new MouseAttractor(this, this.attractor);

    this.mover0 = new Mover(this.size.x / 2, this.size.y / 2, this, 15);
    this.mover1 = new Mover(this.size.x / 2, this.size.y / 2, this, 20);

    this.repeller0 = new Attractor(0, 0, 30, -1);
    this.repeller1 = new Attractor(0, 0, 30, -1);

    this.repeller0.location = this.mover0.location;
    this.repeller1.location = this.mover1.location;
};
ParticlesRepellerScene.prototype = Object.create(Scene.prototype);
ParticlesRepellerScene.prototype.constructor =  ParticlesRepellerScene;


ParticlesRepellerScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    this.mouseAttractor.applyOn(this.mover0);
    this.mouseAttractor.applyOn(this.mover1);
    this.mover0.update();
    this.mover1.update();

    this.emitter.apply(this.repeller0);
    this.emitter.apply(this.repeller1);
    this.emitter.step(this.ctx);

    this.mover0.display(this.ctx);
	this.mover1.display(this.ctx);

    this.mouseAttractor.display(this.ctx);
	Scene.prototype.loop.call(this);
};