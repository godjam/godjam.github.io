/*global Vector2, Mover*/
// 822 412 4855
function Oscillation(amplitude, angularVelocity) {
    "use strict";
    this.location = new Vector2(0, 0);
    this.force = new Vector2(0, 0);
    this.amplitude = amplitude;
    this.angle = 0;
    this.angularVelocity = angularVelocity;
}

Oscillation.prototype.applyOn = function (mover) {
    "use strict";
    if (mover instanceof Mover === false) {
        throw "Oscillation.applyOn : param is not a Mover";
    }
    
    this.angle += this.angularVelocity;
    this.location = mover.location.copy();
    this.force = mover.velocity.normalize();
    this.force.rotateInPlace(Math.PI / 2, new Vector2(0, 0));
    this.force.multInPlace(this.amplitude * Math.sin(this.angle));
    mover.applyForce(this.force);
};

Oscillation.prototype.display = function (ctx) {
    "use strict";

    ctx.save();
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(this.location.x, this.location.y);
    ctx.lineTo(this.location.x + this.force.x,
               this.location.y + this.force.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};
