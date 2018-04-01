/*global Vector2, Mover*/
function Pendulum(ox, oy, r, angle) {
    "use strict";
    this.r = r;
    this.angle = angle;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
    this.origin = new Vector2(ox, oy);
    this.location = new Vector2();
    this.damping = 0.995;
}

/*
 * Do not apply force => apply directly the position
 */
Pendulum.prototype.applyOn = function (mover) {
    "use strict";
    if (mover instanceof Mover === false) {
        throw "Spring.connect : param is not a Mover";
    }

    let gravity = 4;
    this.angularAcceleration = (-gravity * Math.sin(this.angle)) / this.r;
    this.angularVelocity += this.angularAcceleration;
    this.angle += this.angularVelocity;
    this.location = Vector2.fromPolar(this.r, this.angle);
    this.location.addInPlace(this.origin);
    this.angularVelocity *= this.damping;
    mover.location = this.location;
    mover.angle = -this.angle;
};

Pendulum.prototype.display = function (ctx) {
    "use strict";
    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.lineTo(this.location.x, this.location.y);
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();
};