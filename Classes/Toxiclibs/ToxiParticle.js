/*global Vec2D, toxi*/
var ToxiParticle = function (position, physics) {
    "use strict";
    if (position instanceof toxi.geom.Vec2D === false) {
        throw "Particle.constructor : position is not a Vec2D";
    }
    this.p = new toxi.physics2d.VerletParticle2D(position);
    physics.addParticle(this.p);
};

ToxiParticle.prototype.display = function (ctx) {
    "use strict";
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.p.x, this.p.y, 16, 0, Math.PI * 2);
    ctx.stroke();
    //ctx.fillRect(this.p.x - 8, this.p.y - 8, 16, 16);
    ctx.closePath();
    ctx.restore();
};
