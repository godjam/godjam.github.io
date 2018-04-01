/*global toxi, Color*/
let ToxiEntity = function (position, physics) {
    "use strict";
    if (position instanceof toxi.geom.Vec2D === false) {
        throw "ToxiParticle.constructor : position is not a Vec2D";
    }

    this.r = 6;
    this.color = Color.createLightColor();
    this.p = new toxi.physics2d.VerletParticle2D(position);
    physics.addParticle(this.p);

    physics.addBehavior(new toxi.physics2d.behaviors.AttractionBehavior(this.p, this.r * 2, -2));
};

ToxiEntity.prototype.display = function (ctx) {
    "use strict";
    ctx.fillStyle = this.color.rgba();
    ctx.beginPath();
    ctx.arc(this.p.x, this.p.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
};
