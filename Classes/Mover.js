/*global Vector2, Scene, Color, Tools*/
//*************************************************
function Mover(x, y, scene, m) {
    "use strict";

    if (scene instanceof Scene === false) {
        throw "Mover.constructor: scene is not a Scene";
    }

    if (m === undefined) {
        m = 10;
    }

    this.location = new Vector2(x, y);
    this.velocity = new Vector2();
    this.acceleration = new Vector2();
    this.mass = m;
    this.scene = scene;
    this.maxVelocity = 10;

    this.p1 = new Vector2(-1, -1);
    this.p2 = new Vector2(-1, 1);
    this.p3 = new Vector2(1, 1);
    this.p4 = new Vector2(1, -1);

    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
    this.useAngularAcceleration = false;
    this.color = Color.createBrightColor();

    this.appliedForce = new Vector2();
}

Mover.prototype.initRandomly = function () {
    "use strict";
    this.location = new Vector2(
        Math.random() * this.scene.size.x,
        Math.random() * this.scene.size.y
    );
    this.velocity = new Vector2(
        Math.random() * 6 - 3,
        Math.random() * 6 - 3
    );
    this.mass = this.mass / 2 + Math.random() * this.mass / 2;
};

Mover.prototype.setMaxVelocity = function (maxVelocity) {
    "use strict";
    this.maxVelocity = maxVelocity;
}

Mover.prototype.update = function (collideType) {
    "use strict";
    this.velocity.addInPlace(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.addInPlace(this.velocity);

    // if the angularAcceleration is in use
    if (this.useAngularAcceleration === true) {
        this.angularVelocity += this.angularAcceleration;
        this.angle += this.angularVelocity;
    } else {
        // default : set angle according to the velocity
        this.angle = Math.atan2(this.velocity.y, this.velocity.x);
    }

    this.acceleration.multInPlace(0); // reset accel (force are applied)
    this.angularAcceleration = 0;
    if (collideType === 1) { this.bouncyEdge(); }
    else if (collideType === 2) { this.warpEdge(); }
};

Mover.prototype.displayAsCircle = function (ctx) {
    "use strict";
    ctx.beginPath();
    ctx.arc(this.location.x, this.location.y, this.mass, 0, Math.PI * 2);
    ctx.fillStyle = this.color.rgba();
    ctx.fill();
    ctx.closePath();
};

Mover.prototype.displayAsSmoke = function (ctx) {
    "use strict";
    // (x0, y0, r0, x1, y1, r1);
    // x0: The x axis of the coordinate of the start circle.
    // y0: The y axis of the coordinate of the start circle.
    // r0: The radius of the start circle.
    // x1: The x axis of the nate of the end circle.
    // y1: The y axis of the coordinate of the end circle.
    // r1: The radius of the end circle.
    let x = this.location.x,
        y = this.location.y,
        m = this.mass * 3,
        c = this.color,
        grd = ctx.createRadialGradient(x, y, 0, x, y, m);
    // Add colors
    grd.addColorStop(0.000, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ', 1.0)');
    grd.addColorStop(1.000, 'rgba(255, 255, 255, 0.000)');
    ctx.fillStyle = grd;
    ctx.fillRect(x - m, y - m, m * 2, m * 2);
};

Mover.prototype.displayAsPoly = function (ctx, p) {
    "use strict";
    p = p || 3;

    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.rotate(this.angle);
    Tools.drawPoly(ctx, 0, 0, p, this.mass);
    ctx.fillStyle = this.color.rgba();
    ctx.fill();
    ctx.restore();
};

Mover.prototype.display = function (ctx) {
	"use strict";
	this.location.x = ~~ this.location.x;
	this.location.y = ~~ this.location.y;

    let o = new Vector2(),
        scale = this.mass,
        l1 = this.p1.rotate(this.angle, o),
        l2 = this.p2.rotate(this.angle, o),
        l3 = this.p3.rotate(this.angle, o),
        l4 = this.p4.rotate(this.angle, o);
    l1.multInPlace(scale);
    l2.multInPlace(scale);
    l3.multInPlace(scale);
    l4.multInPlace(scale);

    l1.addInPlace(this.location);
    l2.addInPlace(this.location);
    l3.addInPlace(this.location);
    l4.addInPlace(this.location);

    ctx.fillStyle = this.color.rgba();
    ctx.beginPath();
    ctx.moveTo(l1.x, l1.y);
    ctx.lineTo(l2.x, l2.y);
    ctx.lineTo(l3.x, l3.y);
    ctx.lineTo(l4.x, l4.y);
    ctx.closePath();
    ctx.fill();
};

Mover.prototype.bouncyEdge = function () {
	"use strict";
    if (this.location.x + this.mass / 2 > this.scene.size.x) {
        this.velocity.x *= -1;
        this.location.x = this.scene.size.x - this.mass / 2;
    }
    if (this.location.x - this.mass / 2 < 0) {
        this.velocity.x *= -1;
        this.location.x = this.mass / 2;
    }
    if (this.location.y + this.mass / 2 > this.scene.size.y) {
        this.velocity.y *= -1;
        this.location.y = this.scene.size.y - this.mass / 2;
    }
    if (this.location.y - this.mass / 2 < 0) {
        this.velocity.y *= -1;
        this.location.y = this.mass / 2;
    }
};

Mover.prototype.warpEdge = function () {
	"use strict";
    if (this.location.x - 10 > this.scene.size.x) {
        this.location.x = this.mass / 2;
    }
    if (this.location.x + 10 < 0) {
        this.location.x = this.scene.size.x - this.mass / 2;
    }
    if (this.location.y - 10 > this.scene.size.y) {
        this.location.y = this.mass / 2;
    }
    if (this.location.y + 10 < 0) {
        this.location.y = this.scene.size.y - this.mass / 2;
    }
};

/*
 * ApplyRotation
 */
Mover.prototype.applyTorque = function (angularAcceleration) {
	"use strict";
    if (typeof angularAcceleration !== 'number') {
        throw "Vector2.applyTorque : param 1 is not a scalar";
    }
    this.useAngularAcceleration = true;
    let appliedForce = angularAcceleration / this.mass;
    this.angularAcceleration += appliedForce;
};


/*
 * Newton second law
 * Apply a force dependant from mass
 * Two object with different mass will undergo the same force differently
 * ie : two objects with different mass will undergo the wind differently
 */
Mover.prototype.applyForce = function (force) {
	"use strict";
    if (force instanceof Vector2 === false) {
        throw "Mover.applyForce : param is not a Vector2";
    }
    this.appliedForce.x = force.x / this.mass;
    this.appliedForce.y = force.y / this.mass;

    this.acceleration.addInPlace(this.appliedForce);
};

/*
 * Newton second law
 * Apply a force independant from mass
 * Two object with different mass will undergo the same force the same way
 * ie : two objects with different mass will undergo the gravity the same way
 */
Mover.prototype.applyUniformForce = function (force) {
	"use strict";
    if (force instanceof Vector2 === false) {
        throw "Mover.applyForce : param is not a Vector2";
    }
    this.acceleration.addInPlace(force);
};

/*
 *  Attract another Mover
 */
Mover.prototype.attract = function (mover, G) {
	"use strict";
    if (mover instanceof Mover === false) {
        throw "Mover.attract : param is not another Mover";
    }

    if (G === undefined) {
        G = 1;
    }

    let force = this.location.sub(mover.location), // diff
        dist = force.mag(),
        strength = 0;

    force.normalizeInPlace();
    if (dist < 5) { dist = 5; }
    if (dist > 10) { dist = 10; }
    strength = (G * dist * dist) / (this.mass * this.mass);
    force.multInPlace(strength);
    mover.applyForce(force);
};