/*global Scene, Emitter, Vector2, Attractor, MouseAttractor, Smoke*/
//*************************************************
var BlendParticlesScene = function () {
	"use strict";
    Scene.call(this);
    this.setDarkScene();
    this.intro("Blend particles", "The particles react to the attractor.<br>This scene use additive blending.");

    this.emitter0 = new Emitter(this);
    this.emitter0.setAngle(0, Math.PI * 2);
    this.emitter0.setParticlesSpeed(4);
    this.emitter0.setAlternativeParticle(Smoke, 1);
    this.emitter0.setParticlesLife(50, 0);


    this.emitter1 = new Emitter(this, new Vector2(this.size.x / 2, this.size.y / 4));
    this.emitter1.setAngle(0, Math.PI * 2);
    this.emitter1.setParticlesSpeed(4);
    this.emitter1.setAlternativeParticle(Smoke, 1);
    this.emitter1.setParticlesLife(50, 0);

    this.attractor = new Attractor(0, 0, 30, 4);
    this.mouseAttractor = new MouseAttractor(this, this.attractor);
};
BlendParticlesScene.prototype = Object.create(Scene.prototype);
BlendParticlesScene.prototype.constructor =  BlendParticlesScene;


BlendParticlesScene.prototype.resize = function () {
    "use strict";
    Scene.prototype.resize.call(this);
    this.ctx.globalCompositeOperation = "lighter";
    if (this.emitter0 && this.emitter1) {
        this.emitter0.loc = new Vector2(this.size.x / 2, this.size.y / 2);
        this.emitter1.loc = new Vector2(this.size.x / 2, this.size.y / 4);
    }
};

BlendParticlesScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.emitter0.apply(this.attractor);
    this.emitter0.step(this.ctx);

    this.emitter1.apply(this.attractor);
    this.emitter1.step(this.ctx);

    this.mouseAttractor.display(this.ctx);
	Scene.prototype.loop.call(this);
};