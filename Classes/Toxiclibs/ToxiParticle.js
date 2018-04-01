/*global toxi*/
let ToxiParticle = function (position, physics) {
    "use strict";
    if (position instanceof toxi.geom.Vec2D === false) {
        throw "ToxiParticle.constructor : position is not a Vec2D";
    }
    this.p = new toxi.physics2d.VerletParticle2D(position);
    physics.addParticle(this.p);
};

ToxiParticle.prototype.display = function (ctx) {
    "use strict";
    ctx.beginPath();
    ctx.fillRect(this.p.x - 2, this.p.y -2, 4, 4);
    ctx.closePath();
};
