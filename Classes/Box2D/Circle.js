/*global Box2dEntity, B2BodyDef, B2FixtureDef, B2CircleShape, B2DynamicBody, B2StaticBody*/
var Circle = function (x, y, scene, world, scale, radius, bodyType) {
    "use strict";
    Box2dEntity.call(this, x, y, scene, world, scale);
    
    if (radius === undefined) {
        this.radius = Math.random() * 16 + 4;
    } else { this.radius = radius; }
    
    if (bodyType === undefined) {bodyType = B2DynamicBody; }
    
    this.body = this.addBody(x, y, world, bodyType, this);
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
