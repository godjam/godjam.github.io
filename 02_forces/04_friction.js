/*global Scene, Mover, Wind, Gravity, Friction, ActiveArea*/
//*************************************************
var FrictionForceScene = function () {
	"use strict";
    Scene.call(this);
    var i = 0,
        w = this.width,
        h = this.height;
    this.movers = [];
    this.wind = new Wind(0.01, 0);
    this.gravity = new Gravity(0, 0.1);
    this.globalFriction = new Friction(0.02);
    this.friction = new ActiveArea(w / 8, h / 2,
                                   w / 4, h / 2);
    this.friction.setEffect(new Friction(0.04));
    this.acceleration = new ActiveArea(w / 8 + w / 2, h / 2,
                                       w / 4, h / 2);
    this.acceleration.setEffect(new Friction(-0.08));
    
    for (i = 0; i < 100; i += 1) {
        this.movers[i] = new Mover(0, 0, w, h, 10);
        this.movers[i].initRandomly();
    }
};
FrictionForceScene.prototype = Object.create(Scene.prototype);
FrictionForceScene.prototype.constructor =  FrictionForceScene;
    
FrictionForceScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
    var i = 0;
    for (i = 0; i < this.movers.length; i += 1) {
        this.gravity.applyOn(this.movers[i]);
        this.wind.applyOn(this.movers[i]);
        this.globalFriction.applyOn(this.movers[i]);
        this.friction.applyOn(this.movers[i]);
        this.acceleration.applyOn(this.movers[i]);
        this.movers[i].update(true);
        this.movers[i].display(this.ctx);
    }
    this.friction.display(this.ctx);
    this.acceleration.display(this.ctx);

    Scene.prototype.loop.call(this);
};
