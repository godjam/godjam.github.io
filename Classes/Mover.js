/*global Vector2, Liquid, Attractor*/
//*************************************************
function Mover(worldW, worldH, x, y, m) {
    "use strict";
    this.location = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
    this.mass = m;
    this.worldW = worldW;
    this.worldH = worldH;
    
    this.p1 = new Vector2(-1, -1);
    this.p2 = new Vector2(-1, 1);
    this.p3 = new Vector2(1, 1);
    this.p4 = new Vector2(1, -1);

    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
}

Mover.prototype.initRandomly = function () {
    "use strict";
    this.location = new Vector2(
        Math.random() * this.worldW,
        Math.random() * this.worldH
    );
    this.velocity = new Vector2(
        Math.random() * 6 - 3,
        Math.random() * 6 - 3
    );
    this.mass = Math.random() * this.mass;
};

Mover.prototype.update = function (collideWithBorders) {
    "use strict";
    this.velocity.addInPlace(this.acceleration);
    this.velocity.limit(10);
    this.location.addInPlace(this.velocity);

    //this.angularAcceleration = this.acceleration.x / 100;
    //this.angularVelocity += this.angularAcceleration;
    //this.angle += this.angularVelocity;
    this.angle = Math.atan2(this.velocity.y, this.velocity.x);
        
    this.acceleration.multInPlace(0); // reset accel (force are applied)
    if (collideWithBorders === true) { this.checkEdge(); }
};

Mover.prototype.display = function (ctx) {
	"use strict";
    /*
    ctx.fillRect(this.location.x - this.mass / 2, this.location.y - this.mass / 2, this.mass, this.mass);
    */
    var o = new Vector2(0, 0),
        scale = this.mass / 2,
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
    
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(l1.x, l1.y);
    ctx.lineTo(l2.x, l2.y);
    ctx.lineTo(l3.x, l3.y);
    ctx.lineTo(l4.x, l4.y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    /*
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.scale(this.mass, this.mass);
    ctx.rotate(this.angle);
    ctx.fillRect(-1, -1, 2, 2);
    ctx.restore();
    */
};

Mover.prototype.checkEdge = function () {
	"use strict";
    if (this.location.x + this.mass / 2 > this.worldW) {
        this.velocity.x *= -1;
        this.location.x = this.worldW - this.mass / 2;
    }
    if (this.location.x - this.mass / 2 < 0) {
        this.velocity.x *= -1;
        this.location.x = this.mass / 2;
    }
    if (this.location.y + this.mass / 2 > this.worldH) {
        this.velocity.y *= -1;
        this.location.y = this.worldH - this.mass / 2;
    }
    if (this.location.y - this.mass / 2 < 0) {
        this.velocity.y *= -1;
        this.location.y = this.mass / 2;
    }
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
    var appliedForce = force.div(this.mass);
    this.acceleration.addInPlace(appliedForce);
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
Mover.prototype.attract = function (mover) {
	"use strict";
    if (mover instanceof Mover === false) {
        throw "Mover.attract : param is not another Mover";
    }
    
    var force = this.location.sub(mover.location), // diff
        dist = force.mag(),
        strength = 0,
        G = 3;
    force.normalizeInPlace();
    if (dist < 5) { dist = 5; }
    if (dist > 10) { dist = 10; }
    strength = (G * this.mass * this.mass) / (dist * dist);
    //strength = (dist * dist) / (G * this.mass * this.mass);
    force.multInPlace(-strength);
    mover.applyForce(force);
};