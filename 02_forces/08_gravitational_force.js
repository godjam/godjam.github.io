/*global Scene, Mover, MouseAttractor, Attractor*/
//*************************************************
let GravitationalAttractionScene = function (options) {
	"use strict";
    Scene.call(this, options);
    this.intro("Attraction", "Movers are attracted by the attractor. Plus, they attract each others.<br>Touch to move the attractor.");

    let i = 0,
        w = this.size.x,
        h = this.size.y,
        s = 0,
        attractor = new Attractor(0, 0, 20, 1);
    this.movers = [];
    this.gravity = new MouseAttractor(this, attractor);

    for (i = 0; i < 10; i += 1) {
        s = Math.random() * 10 + 10;
        this.movers[i] = new Mover(0, 0, this, s);
        this.movers[i].initRandomly();
    }
};
GravitationalAttractionScene.prototype = Object.create(Scene.prototype);
GravitationalAttractionScene.prototype.constructor = GravitationalAttractionScene;

GravitationalAttractionScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    let i = 0, j = 0;
    for (i = 0; i < this.movers.length; i += 1) {
        for (j = 0; j < this.movers.length; j += 1) {
            if (i !== j) {
                this.movers[i].attract(this.movers[j], 1);
            }
        }

        this.gravity.applyOn(this.movers[i]);
        this.movers[i].update(1);
        this.movers[i].display(this.ctx);
    }
    this.gravity.display(this.ctx);
    Scene.prototype.loop.call(this);
};
