/*global Vector2, Mover, Attractor, console*/
//*************************************************
var HyperAttractor = function (width, heigth) {
    "use strict";
    var mass = Math.min(width, heigth),
        x = width / 2,
        y = heigth / 2;
    Attractor.call(this, x, y, mass, 10);
};
HyperAttractor.prototype = Object.create(Attractor.prototype);
HyperAttractor.prototype.constructor =  HyperAttractor;

HyperAttractor.prototype.applyOn = function (mover) {
	"use strict";
    if (mover instanceof Mover === false) {
        throw "Attractor.attract : param is not a Mover";
    }
    
    var force = this.location.sub(mover.location), // diff
        dist = force.mag(),
        strength = 0;
    force.normalizeInPlace();
    //strength = (this.G * this.mass * this.mass) / (dist * dist);
    //strength = (dist * dist) / (this.G * this.mass * this.mass);
    //strength = 2 * (dist / this.mass);
    strength = (dist * dist) / (this.G * this.mass);
    force.multInPlace(strength);
    mover.applyForce(force);
};