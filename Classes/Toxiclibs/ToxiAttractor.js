/*global toxi*/
var ToxiAttractor = function (size, position, physics) {
    "use strict";
    if (position instanceof toxi.geom.Vec2D === false) {
        throw "ToxiParticle.constructor : position is not a Vec2D";
    }
    var s = Math.max(size.x, size.y);
    this.r = s / 4;
    this.p = new toxi.physics2d.VerletParticle2D(position);
    this.p.lock();
    physics.addParticle(this.p);
    
    physics.addBehavior(new toxi.physics2d.behaviors.AttractionBehavior(this.p, this.r, -1));
    physics.addBehavior(new toxi.physics2d.behaviors.AttractionBehavior(this.p, s, 0.5));
};

ToxiAttractor.prototype.display = function (ctx) {
    "use strict";
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.arc(this.p.x, this.p.y, this.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
};
