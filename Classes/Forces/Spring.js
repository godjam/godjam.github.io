/*global Vector2, Mover*/
function Spring(ox, oy, restLength) {
    "use strict";
    this.anchor = new Vector2(ox, oy);
    this.location = new Vector2(0, 0);
    this.restLength = restLength;
}

Spring.prototype.applyOn = function (mover) {
    "use strict";
    if (mover instanceof Mover === false) {
        throw "Spring.connect : param is not a Mover";
    }
    
    this.location = mover.location;
    
    var k = 0.1,
        force = this.anchor.sub(this.location),
        currentLength = force.mag(),
        x = this.restLength - currentLength;
    force.normalizeInPlace();
    force.multInPlace(-k * x);
    mover.applyForce(force);
};

Spring.prototype.display = function (ctx) {
    "use strict";

    ctx.save();
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(this.anchor.x, this.anchor.y);
    ctx.lineTo(this.location.x, this.location.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};
