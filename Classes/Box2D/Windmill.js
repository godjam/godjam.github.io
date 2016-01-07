/*global Box2dEntity, Circle, Box, B2StaticBody, B2DynamicBody*/
var Windmill = function (x, y, scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, x, y, scene, world, scale);
    
    var base = new Circle(x, y, scene, world, scale, 10, B2StaticBody),
        wing = new Box(x, y, scene, world, scale, 20, 200, B2DynamicBody);
    this.addEntity("base", base);
    this.addEntity("wing", wing);
    this.addMotorJoint(base.body, wing.body, world, -2, 6000);
};
Windmill.prototype = Object.create(Box2dEntity.prototype);
Windmill.prototype.constructor = Windmill;