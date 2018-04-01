//*************************************************
function Vector2(x, y) {
	"use strict";
	x = x || 0;
	y = y || 0;

    if (typeof x !== 'number') {
        throw "Vector2.constructor : x is not a scalar";
    }

    if (typeof y !== 'number') {
        throw "Vector2.constructor : y is not a scalar";
    }
    this.x = x;
	this.y = y;
	//console.log("Vector2 creation");
    return this;
}

Vector2.create2D = function () {
	"use strict";
    let x = Math.random() * 2 - 1,
        y = Math.random() * 2 - 1,
        v = new Vector2(x, y);
    return v.normalizeInPlace();
};

Vector2.prototype.copy = function () {
	"use strict";
    return new Vector2(
        this.x,
        this.y
    );
};

Vector2.prototype.copyFrom = function (orig) {
	"use strict";
    this.x = orig.x;
    this.y = orig.y;
};

Vector2.prototype.set = function (x, y) {
	"use strict";
    this.x = x;
    this.y = y;
};

Vector2.prototype.add = function (vector) {
	"use strict";
    if (vector instanceof Vector2 === false) {
        throw "Vector2.add : param is not a Vector2";
    }
    return new Vector2(
        this.x + vector.x,
        this.y + vector.y
    );
};

Vector2.prototype.addInPlace = function (vector) {
	"use strict";
    if (vector instanceof Vector2 === false) {
        throw "Vector2.add : param is not a Vector2";
    }
    this.x += vector.x;
    this.y += vector.y;
    return this;
};

Vector2.prototype.sub = function (vector) {
	"use strict";
    if (vector instanceof Vector2 === false) {
        throw "Vector2.sub : param is not a Vector2";
    }
    return new Vector2(
        this.x - vector.x,
        this.y - vector.y
    );
};

Vector2.prototype.subInPlace = function (vector) {
	"use strict";
    if (vector instanceof Vector2 === false) {
        throw "Vector2.sub : param is not a Vector2";
    }
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
};

Vector2.prototype.mult = function (scalar) {
	"use strict";
    if (typeof scalar !== 'number') {
        throw "Vector2.mult : param is not a scalar";
    }
    return new Vector2(
        this.x * scalar,
        this.y * scalar
    );
};

Vector2.prototype.multInPlace = function (scalar) {
	"use strict";
    if (typeof scalar !== 'number') {
        throw "Vector2.mult : param is not a scalar";
    }
    this.x *= scalar;
    this.y *= scalar;
    return this;
};

Vector2.prototype.div = function (scalar) {
	"use strict";
    if (typeof scalar !== 'number') {
        throw "Vector2.div : param is not a scalar";
    }
    return new Vector2(
        this.x / scalar,
        this.y / scalar
    );
};

Vector2.prototype.divInPlace = function (scalar) {
	"use strict";
    if (typeof scalar !== 'number') {
        throw "Vector2.div : param is not a scalar";
    }
    this.x /= scalar;
    this.y /= scalar;
    return this;
};

Vector2.prototype.mag = function () {
	"use strict";
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2.prototype.setMag = function (m) {
	"use strict";
	this.normalizeInPlace();
	this.multInPlace(m);
    return this;
};

Vector2.prototype.magSq = function () {
	"use strict";
    return this.x * this.x + this.y * this.y;
};

Vector2.distance = function (v1, v2) {
	"use strict";
    if (v1 instanceof Vector2 === false || v2 instanceof Vector2 === false) {
        throw "Vector2.dist : v1 or v2 is not a Vector2";
    }
    let sub = v2.sub(v1);
    return Math.sqrt(sub.x * sub.x + sub.y * sub.y);
};

Vector2.distanceSq = function (v1, v2) {
	"use strict";
    if (v1 instanceof Vector2 === false || v2 instanceof Vector2 === false) {
        throw "Vector2.dist : v1 or v2 is not a Vector2";
    }
    let sub = v2.sub(v1);
    return sub.x * sub.x + sub.y * sub.y;
};

Vector2.prototype.normalize = function () {
	"use strict";
    let l = this.mag();
    if (l !== 0) {
        return new Vector2(this.x / l, this.y / l);
    } else {
        return new Vector2();
    }
};

Vector2.prototype.normalizeInPlace = function () {
	"use strict";
    let l = this.mag();
    if (l !== 0) {
        this.divInPlace(l);
        return this;
    } else {
        return new Vector2();
    }
};

Vector2.prototype.limit = function (max) {
	"use strict";
    if (typeof max !== 'number') {
        throw "Vector2.limit : param is not a scalar";
    }
    if (this.mag() > max) {
        this.normalizeInPlace();
        this.multInPlace(max);
    }
    return this;
};

Vector2.prototype.constrainLength = function (min, max) {
	"use strict";
    if (typeof min !== 'number') {
        throw "Vector2.constrainLength : param 1 is not a scalar";
    }
    if (typeof max !== 'number') {
        throw "Vector2.constrainLength : param 2 is not a scalar";
    }
    let d = this.mag();
    if (d < min) {
        this.normalizeInPlace();
        this.multInPlace(min);
    }
    if (d > max) {
        this.normalizeInPlace();
        this.multInPlace(max);
    }
    return this;
};

Vector2.toRadian = function (deg) {
	"use strict";
    if (typeof deg !== 'number') {
        throw "Vector2.toRadian : param is not a scalar";
    }
    return deg / 180 * Math.PI;
};

Vector2.toDegree = function (rad) {
	"use strict";
    if (typeof rad !== 'number') {
        throw "Vector2.toDegree : param is not a scalar";
    }
    return rad * 180 / Math.PI;
};

Vector2.prototype.rotateInPlace = function (radian, center) {
	"use strict";
    if (typeof radian !== 'number') {
        throw "Vector2.rotate : param 1 is not a scalar";
    }

    if (center === undefined) {
        center = new Vector2();
    }
    if (center instanceof Vector2 === false) {
        throw "Vector2.rotate : param 2 is not a Vector2";
    }
    let copy = this.rotate(radian, center);
    this.x = copy.x;
    this.y = copy.y;
    return this;
};

Vector2.prototype.rotate = function (radian, center) {
	"use strict";
    if (typeof radian !== 'number') {
        throw "Vector2.rotate : param 1 is not a scalar";
    }
    if (center === undefined) {
        center = new Vector2();
    }
    if (center instanceof Vector2 === false) {
        throw "Vector2.rotate : param 2 is not a Vector2";
    }
    let copy = this.sub(center),
        cs = Math.cos(radian),
        sn = Math.sin(radian),
        px = copy.x * cs - copy.y * sn,
        py = copy.x * sn + copy.y * cs;
    copy.x = px + center.x;
    copy.y = py + center.y;
    return copy;
};

Vector2.prototype.rotateInPlace90 = function (dir) {
	"use strict";
	let x = this.x;
    if (dir > 0) {
        this.x = -this.y;
        this.y = x;
    } else {
        this.x = this.y;
        this.y = -x;
    }
    return this;
};

Vector2.prototype.heading = function () {
    "use strict";
    return Math.atan2(this.y, this.x);
};

Vector2.fromPolar = function (r, theta) {
    "use strict";
    let v = new Vector2();
    v.fromPolar(r, theta);
    return v;
};

Vector2.prototype.fromPolar = function (r, theta) {
    "use strict";
    if (typeof r !== 'number') {
        throw "Vector2.fromPolar : param 1 is not a scalar";
    }
    if (typeof theta !== 'number') {
        throw "Vector2.fromPolar : param 2 is not a scalar";
    }

    this.x = r * Math.sin(theta);
    this.y = r * Math.cos(theta);
    return this;
};

Vector2.prototype.dot = function (v) {
    "use strict";
    if (v instanceof Vector2 === false) {
        throw "Vector2.dot : v is not a Vector2";
    }

    return (this.x * v.x + this.y * v.y);
};

Vector2.getAngleBetween = function (v1, v2) {
    "use strict";
    if (v1 instanceof Vector2 === false) {
        throw "Vector2.dot : v1 is not a Vector2";
    }
    if (v2 instanceof Vector2 === false) {
        throw "Vector2.dot : v2 is not a Vector2";
    }
    let dot = v1.dot(v2);
    return Math.acos(dot / (v1.mag() * v2.mag()));
};

Vector2.getScalarProjection = function (v1, v2) {
    "use strict";
    if (v1 instanceof Vector2 === false) {
        throw "Vector2.getScalarProjection : v1 is not a Vector2";
    }
    if (v2 instanceof Vector2 === false) {
        throw "Vector2.getScalarProjection : v2 is not a Vector2";
    }
    let projection = null;
    // b is now a vector of length 1
    v2.normalizeInPlace();
    // b has now a length of the projection point
    projection = v2.mult(v1.dot(v2));
    return projection;
};