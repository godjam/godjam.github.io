/*global Vector2, Mover, Attractor, console*/
//*************************************************
var StrangeAttractor = function (width, heigth) {
    "use strict";
    var mass = 0.8 * Math.min(width, heigth) / 2,
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
    
    var force = this.location.sub(mover.location), // diff
        dist = force.mag(),
        strength = 0;
    force.normalizeInPlace();
    strength = dist - this.mass;
    force.multInPlace(strength);
    mover.applyForce(force);
};

StrangeAttractor.prototype.display = function (ctx) {
	"use strict";
    // hexagon
    var i = 0,
        numberOfSides = 7,
        size = 40,
        x = this.location.x,
        y = this.location.y;

    ctx.beginPath();
    ctx.moveTo(x +  size * Math.cos(0), y +  size *  Math.sin(0));

    for (i = 1; i <= numberOfSides; i += 1) {
        ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
};
