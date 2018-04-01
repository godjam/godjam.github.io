/*global Scene, Mover, Gravity, MouseAttractor, RandomForce, Color, Attractor*/
/*
 * project "artificial life"
 * 3 type of movers (force based) :
 * 1) gravity
 * 2) rnd acceleration
 * 3) "followers" (= follow mouse)
 */
//*************************************************
var EcosystemScene_01 = function (options) {
	"use strict";
    Scene.call(this, options);
    this.intro("The Ecosystem Project 01", "Here are 4 groups of movers with distinct behaviors.");
    var i = 0,
        attractor = new Attractor(0, 0, 30, 3);

    this.movers = [];
    this.gravity = new Gravity(0, 0.2);
    this.rndFly = new RandomForce(true);
    this.attractor = new MouseAttractor(this, attractor);
    
    this.colors = [];

    // init palette
    for (i = 0; i < 4; i += 1) {
        this.colors.push(Color.createBrightColor());
    }

    for (i = 0; i < 6; i += 1) {
        this.movers[i] = new Mover(0, 0, this, 30);
        this.movers[i].initRandomly();
    }

    // apply palette
    // gravity on 0, 1, 3
    this.movers[0].color = this.colors[0].mutate();
    this.movers[1].color = this.colors[0].mutate();
    this.movers[3].color = this.colors[0].mutate();
    // follow on 1 et 2
    this.movers[1].color = this.colors[1].mutate();
    this.movers[2].color = this.colors[1].mutate();
    // nothing on 4
    this.movers[4].color = this.colors[2].mutate();
    // random on 5
    this.movers[5].color = this.colors[3].mutate();
};
EcosystemScene_01.prototype = Object.create(Scene.prototype);
EcosystemScene_01.prototype.constructor =  EcosystemScene_01;

EcosystemScene_01.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    // gravity on 0, 1, 3
    this.gravity.applyOn(this.movers[0]);
    this.gravity.applyOn(this.movers[1]);
    this.gravity.applyOn(this.movers[3]);
    // follow on 1 et 2
    // 1 has follow and gravity
    this.attractor.applyOn(this.movers[1]);
    this.attractor.applyOn(this.movers[2]);
    // nothing on 4
    // random on 5
    this.rndFly.applyOn(this.movers[5]);

    for (i = 0; i < this.movers.length; i += 1) {
        this.movers[i].update(1);
        this.movers[i].display(this.ctx);
    }
    this.attractor.display(this.ctx);
	Scene.prototype.loop.call(this);
};
