/*global Vector2, Mover*/
function Pendulum(ox, oy, r, angle) {
    "use strict";
    this.r = r;
    this.angle = angle;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
    this.origin = new Vector2(ox, oy);
    this.location = new Vector2(0, 0);
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
    
    var gravity = 4;
    this.angularAcceleration = (-gravity * Math.sin(this.angle)) / this.r;
    this.angularVelocity += this.angularAcceleration;
    this.angle += this.angularVelocity;
    this.location.fromPolar(this.r, this.angle);
    this.location.addInPlace(this.origin);
    this.angularVelocity *= this.damping;
    mover.location = this.location;
};

Pendulum.prototype.display = function (ctx) {
    "use strict";
    ctx.save();
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.lineTo(this.location.x, this.location.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};