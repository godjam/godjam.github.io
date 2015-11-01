/*global Box2dEntity, Circle, Box, B2RevoluteJointDef*/
var Windmill = function (x, y, w, h, world) {
    "use strict";
    Box2dEntity.call(this, x, y, w, h, world);
    
    var base = new Circle(x, y, w, h, world, 10, true),
        wing = new Box(x, y, w, h, world, 20, 200, false);
    this.addEntity("base", base);
    this.addEntity("joint", wing);
    this.addMotorJoint(base.body, wing.body, world, -2, 6000);
};
Windmill.prototype = Object.create(Box2dEntity.prototype);
Windmill.prototype.constructor = Windmill;