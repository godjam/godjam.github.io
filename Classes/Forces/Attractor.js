/*global Vector2, Mover*/
//*************************************************
/*
 * x, y : position of the attractor 
 * m : mass of the attractor 
 * G : gravity constant (3 is a good value. If negative, the attractor is now a Repeller 
 */
var Attractor = function (x, y, m, G) {
    "use strict";
    this.location = new Vector2(x, y);
    this.mass = m;
    this.G = G;
};

Attractor.prototype.display = function (ctx) {
	"use strict";
    ctx.beginPath();
    ctx.arc(this.location.x, this.location.y, this.mass * 2, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
};

Attractor.prototype.applyOn = function (mover) {
	"use strict";
    if (mover instanceof Mover === false) {
        throw "Attractor.attract : param is not a Mover";
    }
    
    var force = this.location.sub(mover.location), // diff
        dist = force.mag(),
        strength = 0;
    force.normalizeInPlace();
    if (dist < 5) { dist = 5; }
    if (dist > 25) { dist = 25; }
    strength = (this.G * this.mass * this.mass) / (dist * dist);
    force.multInPlace(strength);
    mover.applyForce(force);
};