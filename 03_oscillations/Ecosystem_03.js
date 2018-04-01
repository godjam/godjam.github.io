/*global Scene, Mover, Oscillation, MouseAttractor, Attractor */
//*************************************************
let EcosystemScene_03 = function (options) {
	"use strict";
    Scene.call(this, options);
    this.intro("The Ecosystem Project 03", "Creatures seek the attractor using oscillations.");

    let i = 0,
        r = 0,
        c = Math.round(this.size.x / 10),
        baseMass = 10,
        attractor = new Attractor(0, 0, baseMass * 3, 5);

    this.movers = [];
    this.oscillations = [];
    this.attractor = new MouseAttractor(this, attractor);

    for (i = 0; i < c; i += 1) {
        this.movers[i] = new Mover(0, 0, this, baseMass * 2);
        this.movers[i].initRandomly();
        r = Math.random() * 5;
        this.oscillations[i] = new Oscillation(baseMass * r, Math.PI / 8);
    }
};
EcosystemScene_03.prototype = Object.create(Scene.prototype);
EcosystemScene_03.prototype.constructor =  EcosystemScene_03;

EcosystemScene_03.prototype.loop = function () {
    "use strict";
    let i = 0;
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    for (i = 0; i < this.movers.length; i += 1) {
        this.oscillations[i].applyOn(this.movers[i]);
        this.attractor.applyOn(this.movers[i]);

        this.movers[i].update(1);
        this.movers[i].display(this.ctx);
    }
    this.attractor.display(this.ctx);
	Scene.prototype.loop.call(this);
};
