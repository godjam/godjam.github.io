/*global Scene, Mover, HyperAttractor*/
var CenterForceScene = function () {
	"use strict";
    Scene.call(this);
    this.attractor = new HyperAttractor(this.width, this.height);
    this.movers = [];
    
    var i = 0;
    for (i = 0; i < 50; i += 1) {
        this.movers[i] = new Mover(0, 0, this.width, this.height, 16);
        this.movers[i].initRandomly();
    }
};
CenterForceScene.prototype = Object.create(Scene.prototype);
CenterForceScene.prototype.constructor =  CenterForceScene;
    
CenterForceScene.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    for (i = 0; i < this.movers.length; i += 1) {
        this.attractor.applyOn(this.movers[i]);
        this.movers[i].update(false);
        this.movers[i].display(this.ctx);
    }
    this.attractor.display(this.ctx);
	Scene.prototype.loop.call(this);
};
