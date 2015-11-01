/*global Box2dEntity, Circle, Box, B2RevoluteJointDef*/
var Car = function (x, y, w, h, world) {
    "use strict";
    Box2dEntity.call(this, x, y, w, h, world);
    var carW = 110,
        carH = 60,
        wheelR = 15,
        motorSpeed = -100,
        maxMotorTorque = 6000,
        
        chassis = new Box(x, y, w, h, world, carW, carH, false),
        wheel1 = new Circle(x - carW / 2 + 2, y + carH / 2, w, h, world, wheelR, false),
        wheel2 = new Circle(x + carW / 2 - 2, y + carH / 2, w, h, world, wheelR, false);
    
    this.addEntity("chassis", chassis);
    this.addEntity("wheel1", wheel1);
    this.addEntity("wheel2", wheel2);
    this.addMotorJoint(chassis.body, wheel1.body, world, motorSpeed, maxMotorTorque);
    this.addMotorJoint(chassis.body, wheel2.body, world, motorSpeed, maxMotorTorque);
};
Car.prototype = Object.create(Box2dEntity.prototype);
Car.prototype.constructor = Car;