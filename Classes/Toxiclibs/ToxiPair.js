/*global toxi, Vec2D, ToxiParticle, VerletSpring2D*/
var ToxiPair = function (position, physics) {
    "use strict";
    if (position instanceof toxi.geom.Vec2D === false) {
        throw "ToxiPair.constructor : position is not a Vec2D";
    }
    var len = 80,
        strength = 0.1,
        spring = null;
    
    this.p1 = new ToxiParticle(new Vec2D(position.x, position.y - 50));
    this.p2 = new ToxiParticle(new Vec2D(position.x, position.y + 50));
    spring = new VerletSpring2D(this.p1.p, this.p2.p, len, strength);
    physics.addSpring(spring);
};


ToxiPair.prototype.display = function (ctx) {
    "use strict";
    this.p1.display(ctx);
    this.p2.display(ctx);
};
