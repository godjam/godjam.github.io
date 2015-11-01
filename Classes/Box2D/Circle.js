/*global Box2dEntity, B2BodyDef, B2FixtureDef, B2CircleShape, B2DynamicBody, B2StaticBody*/
var Circle = function (x, y, w, h, world, radius, isStatic) {
    "use strict";
    Box2dEntity.call(this, x, y, w, h, world);
    
    if (radius === undefined) {
        this.radius = Math.random() * 16 + 4;
    } else { this.radius = radius; }
    
    this.body = this.addBody(x, y, world, isStatic, this);
    var shape = this.createCircleShape(this.radius);
    this.addFixture(shape, this.body);
};
Circle.prototype = Object.create(Box2dEntity.prototype);
Circle.prototype.constructor = Circle;


Circle.prototype.display = function (ctx) {
    "use strict";
    var center = this.body.GetWorldCenter(),
        angle = this.body.GetAngle();
    this.drawCircle(ctx, center, angle, this.radius);
    Box2dEntity.prototype.display.call(this, ctx);
};
