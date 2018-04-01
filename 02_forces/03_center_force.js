/*global Scene, Mover, HyperAttractor*/
var CenterForceScene = function (options) {
	"use strict";
	this.intro("Center Force", "Attracts everything to the center.");
	
    Scene.call(this, options);
    this.attractor = new HyperAttractor(this.size.x, this.size.y);
    this.movers = [];
    
    var i = 0;
    for (i = 0; i < 50; i += 1) {
        this.movers[i] = new Mover(0, 0, this, 16);
        this.movers[i].initRandomly();
    }
};
CenterForceScene.prototype = Object.create(Scene.prototype);
CenterForceScene.prototype.constructor =  CenterForceScene;
    
CenterForceScene.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    
    for (i = 0; i < this.movers.length; i += 1) {
        this.attractor.applyOn(this.movers[i]);
        this.movers[i].update(false);
        this.movers[i].display(this.ctx);
    }
	Scene.prototype.loop.call(this);
};
