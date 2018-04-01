/*global Vector2, Mover, Attractor, Tools*/
//*************************************************
let StrangeAttractor = function (width, heigth) {
    "use strict";
    let mass = 0.8 * Math.min(width, heigth) / 2,
        x = width / 2,
        y = heigth / 2;
    Attractor.call(this, x, y, mass, 10);
};
StrangeAttractor.prototype = Object.create(Attractor.prototype);
StrangeAttractor.prototype.constructor =  StrangeAttractor;

StrangeAttractor.prototype.applyOn = function (mover) {
	"use strict";
    if (mover instanceof Mover === false) {
        throw "Attractor.attract : param is not a Mover";
    }

    let force = this.location.sub(mover.location), // diff
        dist = force.mag(),
        strength = 0;
    force.normalizeInPlace();
    strength = dist - this.mass;
    force.multInPlace(strength);
    mover.applyForce(force);
};

StrangeAttractor.prototype.display = function (ctx) {
	"use strict";
    let size = 40;
    // heptagon
    Tools.drawPoly(ctx, this.location.x, this.location.y, 7, size);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ffc400";
    ctx.stroke();
};
