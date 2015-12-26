/*global Box2dEntity, Circle, Box, console*/
var Car = function (x, y, scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, x, y, scene, world, scale);
    var carW = 50,
        carH = 25,
        wheelR = 16,
        motorSpeed = -15,
        maxMotorTorque = 6000,
        chassis = new Box(x, y, scene, world, scale, carW, carH),
        wheel1 = new Circle(x - carW / 2 + 2, y + carH / 2, scene, world, scale, wheelR, false),
        wheel2 = new Circle(x + carW / 2 - 2, y + carH / 2, scene, world, scale, wheelR, false);
    
    this.addEntity("chassis", chassis);
    this.addEntity("wheel1", wheel1);
    this.addEntity("wheel2", wheel2);
    this.addMotorJoint(chassis.body, wheel1.body, world, motorSpeed, maxMotorTorque);
    this.addMotorJoint(chassis.body, wheel2.body, world, motorSpeed, maxMotorTorque);
};
Car.prototype = Object.create(Box2dEntity.prototype);
Car.prototype.constructor = Car;
