/*global Mover, Vector2, Flowfield, Path, Color*/
var Vehicle = function(scene, x, y) {
    "use strict";
    this.r = Math.max(scene.size.x / 100, 5);
    this.mover = new Mover(x, y, scene, 1);
    this.mover.velocity = Vector2.create2D();
    this.agressivity = Math.random() * 0.9 + 0.1;
    this.maxForce = this.agressivity / 10;
    this.maxSpeed = this.agressivity * 2 + 2;
    this.viewAngle = Math.PI / 2;
    this.viewRadius = 100 + this.agressivity * 30;
    this.avoidanceRadius = 30 + this.agressivity * 10;
    this.color = Color.createHsl(this.agressivity, 1, 0.65);
    this.fillStyle = this.color.rgba();

    this.listInRange = [];
    this.listInFov = [];
    this.desired = new Vector2();
    this.steer = new Vector2();
    this.predict = new Vector2();
    this.tmp = new Vector2();
    this.tmpA = new Vector2();
    this.tmpB = new Vector2();
};

Vehicle.prototype.applyForce = function(force, weight) {
    "use strict";
    if (force) {
        if (weight) {
            force.multInPlace(weight);
        }
        this.mover.applyForce(force);
    }
};

Vehicle.prototype.update = function() {
    "use strict";
    this.mover.update(2);
};

Vehicle.prototype.setDesiredTarget = function(radius) {
    "use strict";
    if (radius === undefined) {
        radius = 0;
    }

    var desiredMag = this.desired.magSq(),
        speed = this.maxSpeed;
    this.desired.normalizeInPlace();

    if (desiredMag < radius * radius) {
        speed = desiredMag / radius * this.maxSpeed;
    }

    this.desired.multInPlace(speed);

    this.steer.x = this.desired.x - this.mover.velocity.x;
    this.steer.y = this.desired.y - this.mover.velocity.y;
    this.steer.limit(this.maxForce);
    return this.steer;
    // need to manually call this.mover.applyForce(this.steer);

};

Vehicle.prototype.applyDesiredTarget = function(radius, weight) {
    "use strict";
    var steer = this.setDesiredTarget(radius);
    if (steer) {
        if (weight && weight !== 1) {
            steer.multInPlace(weight);
        }
        this.mover.applyForce(steer);
    }
};

Vehicle.prototype.seek = function(target, weight) {
    "use strict";
    if (target instanceof Vector2 === false) {
        throw "Vehicle.seek : target is not a Vector2";
    }
    this.desired.x = target.x - this.mover.location.x;
    this.desired.y = target.y - this.mover.location.y;
    return this.applyDesiredTarget(0, weight);
};

Vehicle.prototype.flee = function(target, weight) {
    "use strict";
    if (target instanceof Vector2 === false) {
        throw "Vehicle.flee : target is not a Vector2";
    }
    this.desired.x = this.mover.location.x - target.x;
    this.desired.y = this.mover.location.y - target.y;
    this.applyDesiredTarget(this.viewRadius, weight);
};

Vehicle.prototype.pursuit = function(target, targetSpeed, weight) {
    "use strict";
    if (target instanceof Vector2 === false) {
        throw "Vehicle.pursuit : target is not a Vector2";
    }
    if (targetSpeed instanceof Vector2 === false) {
        throw "Vehicle.pursuit : targetSpeed is not a Vector2";
    }
    this.tmp.x = target.x + targetSpeed.x * 10;
    this.tmp.y = target.y + targetSpeed.y * 10;
    this.seek(this.tmp, weight);
};

Vehicle.prototype.wandering = function(weight) {
    "use strict";
    var steps = 5,
        radius = 30;
    // desired location (position relative) is actual position + 10 times the velocity
    this.desired.x = this.mover.velocity.x;
    this.desired.y = this.mover.velocity.y;
    this.desired.setMag(steps);
    // select a random point on the circle of center on "desired" location with a radius of 20
    this.tmp.fromPolar(radius, Math.random() * Math.PI * 2);
    this.desired.addInPlace(this.tmp);
    // go to the desired point
    this.applyDesiredTarget(this.viewRadius, weight);
};

Vehicle.prototype.avoidWalls = function(weight) {
    "use strict";
    var threshold = this.viewRadius,
        f = this.maxSpeed * 10,
        d = threshold;

    this.desired.x = this.mover.velocity.x;
    this.desired.y = this.mover.velocity.y;

    if (this.mover.location.x < threshold) {
        d = threshold - this.mover.location.x;
        this.desired.x = f * d;
    }
    else if (this.mover.location.x > this.mover.scene.size.x - threshold) {
        d = this.mover.scene.size.x - this.mover.location.x;
        this.desired.x = -f * d;
    }
    if (this.mover.location.y < threshold) {
        d = threshold - this.mover.location.y;
        this.desired.y = f * d;
    }
    else if (this.mover.location.y > this.mover.scene.size.y - threshold) {
        d = this.mover.scene.size.y - this.mover.location.y;
        this.desired.y = -f * d;
    }
    // go to the desired point
    return this.applyDesiredTarget(0, weight);
};

Vehicle.prototype.goCenter = function(weight) {
    "use strict";
    var size = this.mover.scene.size;
    this.desired.x = size.x / 2 - this.mover.location.x;
    this.desired.y = size.y / 2 - this.mover.location.y;
    return this.applyDesiredTarget(0, weight)
};

Vehicle.prototype.flowFieldFollowing = function(flowfield, weight) {
    "use strict";
    if (flowfield instanceof Flowfield === false) {
        throw "Vehicle.flowFieldFollowing : flowField is not a FlowField";
    }
    // get right field coords
    var t = flowfield.get(this.mover.location.x, this.mover.location.y);
    if (t) {
       this.desired.x = t.x;
       this.desired.y = t.y;
    }
    // go
    return this.applyDesiredTarget(0, weight);
};

Vehicle.prototype.pathFollowing = function(path, weight) {
    "use strict";
    if (path instanceof Path === false) {
        throw "Vehicle.pathFollowing : path is not a Path";
    }

    // predict position
    var i = 0, rx = 0, ry = 0,
        a = null, b = null,
        target = null,
        normalPoint = null,
        distance = 0,
        predictLoc = new Vector2(),
        minDistance = 10000;

    this.predict.x = this.mover.velocity.x;
    this.predict.y = this.mover.velocity.y;

    if (this.predict.mag() === 0) { this.predict = Vector2.create2D(); }

    // look at 25 pix ahead
    this.predict.setMag(this.agressivity * 25);
    predictLoc.x = this.mover.location.x + this.predict.x;
    predictLoc.y = this.mover.location.y + this.predict.y;

    this.normals = [];
    for (i = 0; i < path.points.length - 1; i += 1) {
        a = path.points[i].copy();
        b = path.points[i + 1].copy();
        // get the projection on the path
        normalPoint = this.getNormalPoint(predictLoc, a, b);

        rx = (normalPoint.x - a.x) / (b.x - a.x);
        ry = (normalPoint.y - a.y) / (b.y - a.y);

        if (rx > 1 || ry > 1) {
            normalPoint = b;
        } else if (rx < 0 || ry < 0) {
            normalPoint = a;
        }

        distance = Vector2.distance(predictLoc, normalPoint);
        if (distance < minDistance) {
            minDistance = distance;
            target = normalPoint;
        }
    }

    if (target !== null && minDistance > path.radius) {
        target.addInPlace(this.predict);
        return this.seek(target, weight);
    }
};

Vehicle.prototype.getNormalPoint = function(p, a, b) {
    "use strict";
    if (p instanceof Vector2 === false) {
        throw "Vehicle.getNormalPoint : p is not a Vector2";
    }
    if (a instanceof Vector2 === false) {
        throw "Vehicle.getNormalPoint : a is not a Vector2";
    }
    if (b instanceof Vector2 === false) {
        throw "Vehicle.getNormalPoint : b is not a Vector2";
    }
    var ap = p.sub(a),
        ab = b.sub(a),
        normalPoint = a.add(Vector2.getScalarProjection(ap, ab));
    return normalPoint;
};

Vehicle.prototype.separate = function(vehicles, weight) {
    "use strict";
    var i = 0,
        c = 0,
        loc = this.mover.location;

    this.desired.set(0, 0);
    for (i = 0; i < vehicles.length; i += 1) {
        this.tmp.x = loc.x - vehicles[i].mover.location.x;
        this.tmp.y = loc.y - vehicles[i].mover.location.y;
        if (this.tmp.magSq() < this.avoidanceRadius * this.avoidanceRadius) {
            this.tmp.normalizeInPlace();
            this.desired.x += this.tmp.x;
            this.desired.y += this.tmp.y;
            c += 1;
        }
    }

    if (c > 0) {
        this.desired.divInPlace(c);
        this.desired.setMag(this.maxSpeed);
        this.applyDesiredTarget(0, weight);
    }
};

Vehicle.prototype.align = function(vehicles, weight) {
    "use strict";
    var i = 0,
        c = 0;

    this.desired.set(0, 0);
    for (i = 0; i < vehicles.length; i += 1) {
        this.desired.addInPlace(vehicles[i].mover.velocity); // average velocity
        c += 1;
    }

    if (c > 0) {
        this.desired.divInPlace(c);
        this.applyDesiredTarget(0, weight);
    }
};

Vehicle.prototype.cohesion = function(vehicles, weight) {
    "use strict";
    var i = 0,
        c = 0;

    this.tmp.set(0, 0);
    for (i = 0; i < vehicles.length; i += 1) {
        this.tmp.addInPlace(vehicles[i].mover.location); // average location
        c += 1;
    }

    if (c > 0) {
        this.tmp.divInPlace(c);
        this.seek(this.tmp, weight);
    }
};

Vehicle.prototype.view = function(vehicles, weight) {
    "use strict";
    var i = 0,
        a = 0,
        max = Number.MAX_VALUE,
        l = max,
        lMin = max;

    for (i = 0; i < vehicles.length; i += 1) {
        this.tmp.x = this.mover.location.x - vehicles[i].mover.location.x;
        this.tmp.y = this.mover.location.y - vehicles[i].mover.location.y;
        l = this.tmp.magSq();
        if (l < lMin) {
            lMin = l;
            this.desired = this.tmp; // smallest dist
        }
    }

    if (lMin < max) {
        a = this.desired.heading();
        // map on [-PI, PI]
        if (a > Math.PI) { a -= Math.PI * 2; }

        if (a < 0) {
            this.desired.rotateInPlace90(-1);
        } else {
            this.desired.rotateInPlace90(1);
        }

        this.desired.setMag(this.maxSpeed);
        this.applyDesiredTarget(0, weight);
    }
};


Vehicle.prototype.getVehiclesInRange = function(vehicles, range) {
    "use strict";
    var i = 0;

    this.listInRange = [];
    for (i = 0; i < vehicles.length; i += 1) {
        if (vehicles[i] !== this) {
            this.tmp.x = vehicles[i].mover.location.x;
            this.tmp.y = vehicles[i].mover.location.y;
            if (Math.abs(this.mover.location.x - this.tmp.x) < range &&
                Math.abs(this.mover.location.y - this.tmp.y) < range) {
                if ((this.mover.location.x - this.tmp.x) * (this.mover.location.x - this.tmp.x)
                    + (this.mover.location.y - this.tmp.y) * (this.mover.location.y - this.tmp.y)
                    < range * range) {
                    this.listInRange.push(vehicles[i]);
                }
            }
        }
    }
    return this.listInRange;
};

Vehicle.prototype.getVehiclesInFOV = function(vehicles, range, ctx) {
    "use strict";
    var i = 0,
        loc = this.mover.location,
        heading = this.mover.velocity.heading(),
        a = 0, aMin = 0, aMax = 0;

    this.listInFov = [];
    for (i = 0; i < vehicles.length; i += 1) {
        if (vehicles[i] !== this) {
            this.tmp.x = vehicles[i].mover.location.x;
            this.tmp.y = vehicles[i].mover.location.y;
            if (Math.abs(loc.x - this.tmp.x) < range && Math.abs(loc.y - this.tmp.y) < range) {
                this.tmp.x = loc.x - this.tmp.x;
                this.tmp.y = loc.y - this.tmp.y;
                if (this.tmp.magSq() < range * range) {
                    a = Math.PI + this.tmp.heading();
                    aMin = a - (heading - this.viewAngle / 2);
                    aMax = a - (heading + this.viewAngle / 2);
                    if (aMin >= Math.PI) { aMin -= Math.PI * 2; } // map on [-PI, PI]
                    if (aMax >= Math.PI) { aMax -= Math.PI * 2; } // map on [-PI, PI]
                    if (aMin > 0 && aMax < 0) {
                        // in view
                        this.listInFov.push(vehicles[i]);
                    }
                }
            }
        }
    }
    return this.listInFov;
};

Vehicle.prototype.display = function(ctx) {
    "use strict";

    ctx.lineWidth = 1;
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.fillStyle;

    var theta = this.mover.velocity.heading() + Math.PI / 2;
    ctx.save();
    ctx.translate(this.mover.location.x, this.mover.location.y);
    ctx.rotate(theta);
    /*
    ctx.beginPath();
    ctx.arc(0, 0, this.viewRadius, -this.viewAngle / 2 - Math.PI / 2, this.viewAngle / 2 - Math.PI / 2);
    ctx.stroke();
    ctx.closePath();
    //*/

    ctx.beginPath();
    ctx.lineTo(0, -this.r);
    ctx.lineTo(-this.r, this.r);
    ctx.lineTo(this.r, this.r);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    // desired speed
    /*
    if (this.desired !== null) {
        ctx.beginPath();
        ctx.moveTo(this.mover.location.x, this.mover.location.y);
        //ctx.lineTo(this.mover.location.x + this.mover.velocity.x * 10, this.mover.location.y + this.mover.velocity.y * 10);
        ctx.lineTo(this.mover.location.x + this.desired.x * 10, this.mover.location.y + this.desired.y);
        ctx.stroke();
        ctx.closePath();
    }
    //*/

};


Vehicle.prototype.displayAsNetwork = function(ctx) {
    "use strict";
    var i = 0,
        list = this.listInFov;
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = this.fillStyle;

    for(i = 0; i < list.length; i += 1) {
        if (Math.abs(this.mover.location.x - list[i].mover.location.x) > this.viewRadius) {
            continue;
        }
        if (Math.abs(this.mover.location.y - list[i].mover.location.y) > this.viewRadius) {
            continue;
        }

        if (i > 10) { break; }
        ctx.beginPath();
        ctx.moveTo(this.mover.location.x, this.mover.location.y);
        ctx.lineTo(list[i].mover.location.x, list[i].mover.location.y);
        ctx.stroke();
        ctx.closePath();
    }
};
