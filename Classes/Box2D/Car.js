/*global Box2dEntity, Circle, Box, console*/
var Car = function (x, y, scene, world, scale) {
    "use strict";
    Box2dEntity.call(this, x, y, scene, world, scale);
    this.motorSpeed = 15;
    this.motorTorque = 600;
    this.t = 0;
    
    var carW = 50,
        carH = 25,
        wheelR = 16,
        chassis = new Box(x, y, scene, world, scale, carW, carH),
        wheel1 = new Circle(x - carW / 2 + 2, y + carH / 2, scene, world, scale, wheelR),
        wheel2 = new Circle(x + carW / 2 - 2, y + carH / 2, scene, world, scale, wheelR);
    
    this.addEntity("chassis", chassis);
    this.addEntity("wheel1", wheel1);
    this.addEntity("wheel2", wheel2);
    this.joint0 = this.addMotorJoint(chassis.body, wheel1.body, world, this.motorSpeed, this.motorTorque);
    this.joint1 = this.addMotorJoint(chassis.body, wheel2.body, world, this.motorSpeed, this.motorTorque);
};
Car.prototype = Object.create(Box2dEntity.prototype);
Car.prototype.constructor = Car;

Car.prototype.update = function () {
    "use strict";
    this.motorSpeed *= 1.001;
    this.motorTorque *= 1.005;
    
    console.log(this.motorSpeed);
    
    this.joint0.SetMotorSpeed(this.motorSpeed);
    this.joint0.SetMaxMotorTorque(this.motorTorque);
    
    Box2dEntity.prototype.update.call(this);
};