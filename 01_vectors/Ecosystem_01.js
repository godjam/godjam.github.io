/*global Scene, Vector2, Mover, Gravity, MouseAttractor, RandomForce, Color, Attractor*/
/* 
 * project "artificial life"
 * 3 type of movers (force based) :
 * 1) gravity
 * 2) rnd acceleration
 * 3) "followers" (= follow mouse)
 */
//*************************************************
var EcosystemScene_01 = function () {
	"use strict";
    Scene.call(this);
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
        this.movers[i] = new Mover(0, 0, this.width, this.height, 30);
        this.movers[i].initRandomly();
    }
    
    // apply palette
    // gravity on 0, 1, 3
    this.movers[0].color = this.colors[0].mutate().ToHex();
    this.movers[1].color = this.colors[0].mutate().ToHex();
    this.movers[3].color = this.colors[0].mutate().ToHex();
    // follow on 1 et 2
    this.movers[1].color = this.colors[1].mutate().ToHex();
    this.movers[2].color = this.colors[1].mutate().ToHex();
    // nothing on 4
    this.movers[4].color = this.colors[2].mutate().ToHex();
    // random on 5
    this.movers[5].color = this.colors[3].mutate().ToHex();
};
EcosystemScene_01.prototype = Object.create(Scene.prototype);
EcosystemScene_01.prototype.constructor =  EcosystemScene_01;
    
EcosystemScene_01.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.width, this.height);

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
        this.movers[i].update(true);
        this.movers[i].display(this.ctx);
    }
    this.attractor.display(this.ctx);
	Scene.prototype.loop.call(this);
};
