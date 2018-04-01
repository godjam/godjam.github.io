/*global Vector2, Mover, Color*/
function Spring(ox, oy, restLength) {
    "use strict";
    this.anchor = new Vector2(ox, oy);
    this.location = new Vector2();
    this.restLength = restLength;
    this.length = 0;
}

Spring.prototype.applyOn = function (mover) {
    "use strict";
    if (mover instanceof Mover === false) {
        throw "Spring.applyOn : param is not a Mover";
    }

    this.location = mover.location;

    let k = 0.1,
        force = this.location.sub(this.anchor),
        currentLength = force.mag();

    this.length = currentLength - this.restLength;

    force.normalizeInPlace();
    force.multInPlace(-k * this.length);

    mover.applyForce(force);
};

Spring.prototype.constrainLength = function (mover, minLength, maxLength) {
    "use strict";
    if (mover instanceof Mover === false) {
        throw "Spring.constrainLength : param is not a Mover";
    }
    //Vector pointing from Bob to Anchor
    let dir = mover.location.sub(this.anchor),
        d = dir.mag();

    // Is it too short?
    if (d < minLength) {
        dir.normalizeInPlace();
        dir.multInPlace(minLength);
        // Keep location within constraint.
        mover.location = this.anchor.add(dir);
        mover.velocity.multInPlace(0);

    // Is it too long?
    } else if (d > maxLength) {
        dir.normalizeInPlace();
        dir.multInPlace(maxLength);
        // Keep location within constraint.
        mover.location = this.anchor.add(dir);
        mover.velocity.multInPlace(0);
    }

    this.location = mover.location;
};

Spring.prototype.display = function (ctx) {
    "use strict";
    // color = 0.5
    let h = (this.length / this.restLength) / 2 + 0.5,
        c = Color.createHsl(h, 1, 0.8);

    ctx.beginPath();
    ctx.moveTo(this.anchor.x, this.anchor.y);
    ctx.lineTo(this.location.x, this.location.y);
    ctx.strokeStyle = c.rgba();
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();
};
