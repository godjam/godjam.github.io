/*global Mover, Vector2, Flowfield, Path, Color*/
var Vehicle = function (scene, x, y) {
    "use strict";
    this.mover = new Mover(x, y, scene, 1);
    this.r = 10;
    this.maxForce = 0.1;
    this.maxSpeed = 4;
    this.fillStyle = Color.createBrightColor().ToHex();
    this.desired = null;
    this.viewRadius = scene.size.w / 10;
    this.avoidanceRadius = scene.size.w / 40;
};

Vehicle.prototype.applyForce = function (force, weight) {
    "use strict";
    if (force) {
        if(weight) { force.multInPlace(weight); }
        this.mover.applyForce(force);
    }
};

Vehicle.prototype.update = function () {
    "use strict";
    this.mover.update(true);
};

Vehicle.prototype.setDesiredTarget = function (desired, radius) {
    "use strict";
    if (desired instanceof Vector2 === false) {
        throw "Vehicle.setDesiredTarget : desired is not a Vector2";
    }
    
    if (radius === undefined) {
        radius = 0;
    }
    
    this.desired = desired.copy();
    
    var steer = null, desiredMag = 0, speed = this.maxSpeed;
    desiredMag = desired.mag();
    desired.normalizeInPlace();
    
    if (desiredMag < radius) {
        speed = desiredMag / radius * this.maxSpeed;
    }
    
    desired.multInPlace(speed);
    
    steer = desired.sub(this.mover.velocity);
    steer.limit(this.maxForce);
    return steer;
    // this.mover.applyForce(steer);
};

Vehicle.prototype.seek = function (target) {
    "use strict";
    if (target instanceof Vector2 === false) {
        throw "Vehicle.seek : target is not a Vector2";
    }
    var desired = target.sub(this.mover.location);
    return this.setDesiredTarget(desired, this.viewRadius);
};

Vehicle.prototype.flee = function (target) {
    "use strict";
    if (target instanceof Vector2 === false) {
        throw "Vehicle.flee : target is not a Vector2";
    }
    var desired = this.mover.location.sub(target);
    return this.setDesiredTarget(desired, this.viewRadius);
};

Vehicle.prototype.pursuit = function (target, targetSpeed) {
    "use strict";
    if (target instanceof Vector2 === false) {
        throw "Vehicle.pursuit : target is not a Vector2";
    }
    if (targetSpeed instanceof Vector2 === false) {
        throw "Vehicle.pursuit : targetSpeed is not a Vector2";
    }
    var t = target.add(targetSpeed.mult(this.r));
    //console.log(t.x + " " + t.y + " - " + target.x + " " + target.y);
    return this.seek(t);
};

Vehicle.prototype.wandering = function () {
    "use strict";
    var desired = null, steps = 30, radius = 30, p = null;
    // desired location (position relative) is actual position + 10 times the velocity
    desired = this.mover.velocity.normalize().mult(steps);
    // select a random point on the circle of center on "desired" location with a radius of 20 
    p = Vector2.fromPolar(radius, Math.random() * Math.PI * 2);
    desired.addInPlace(p);
    // go to the desired point
    return this.setDesiredTarget(desired, this.viewRadius);
};

Vehicle.prototype.flowFieldFollowing = function (flowfield) {
    "use strict";
    if (flowfield instanceof Flowfield === false) {
        throw "Vehicle.flowFieldFollowing : flowField is not a FlowField";
    }
    // get right field coords
    var desired = flowfield.get(this.mover.location.x, this.mover.location.y);
    // go to the desired point
    return this.setDesiredTarget(desired);
};

Vehicle.prototype.pathFollowing = function (path) {
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
        predictLoc = null,
        minDistance = 10000,
        predict = this.mover.velocity.copy();
    
    if (predict.mag() === 0) { predict = Vector2.create2D(); }
    
    // look at 25 pix ahead
    predict.normalizeInPlace();
    predict.multInPlace(25);
    predictLoc = this.mover.location.add(predict);
    
    
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
        target.addInPlace(predict);
        return this.seek(target);
    }
};

Vehicle.prototype.getNormalPoint = function (p, a, b) {
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

Vehicle.prototype.separate = function (vehicles) {
    "use strict";
    var i = 0, d = 0, count = 0,
        thisLoc = this.mover.location,
        otherLoc = null, diff = null,
        sum = new Vector2(0, 0),
        desiredseparation = this.avoidanceRadius;
    
    for (i = 0; i < vehicles.length; i += 1) {
        if (vehicles[i] !== this) {
            otherLoc = vehicles[i].mover.location;
            diff = thisLoc.sub(otherLoc);
            d = diff.magSq();
            if (d > 0 && d < (desiredseparation * desiredseparation)) {
                diff.normalizeInPlace();
                diff.divInPlace(d);
                sum.addInPlace(diff);
                count += 1;
            }
        }
    }
        
    if (count > 0) {
        sum.divInPlace(count);
        sum.normalizeInPlace();
        return this.setDesiredTarget(sum);
    }
};

Vehicle.prototype.align = function (vehicles) {
    "use strict";
    var i = 0, d = 0, count = 0,
        thisLoc = this.mover.location,
        otherVel = null,
        otherLoc = null,
        sum = new Vector2(0, 0),
        maxRange = this.viewRadius;
    
    for (i = 0; i < vehicles.length; i += 1) {
        if (vehicles[i] !== this) {
            otherVel = vehicles[i].mover.velocity;
            otherLoc = vehicles[i].mover.location;
            d = Vector2.distanceSq(thisLoc, otherLoc);

            if (d > 0 && d < (maxRange * maxRange)) {
                sum.addInPlace(otherVel);
                count += 1;
            }
        }

        if (count > 0) {
            sum.divInPlace(count);
            sum.normalizeInPlace();
            return this.setDesiredTarget(sum);
        }
    }
};

Vehicle.prototype.cohesion = function (vehicles) {
    "use strict";
    var i = 0, d = 0, count = 0,
        thisLoc = this.mover.location,
        otherLoc = null, diff = null,
        sum = new Vector2(0, 0),
        cohesionRadius = this.viewRadius;
    
    for (i = 0; i < vehicles.length; i += 1) {
        if (vehicles[i] !== this) {
            otherLoc = vehicles[i].mover.location;
            diff = thisLoc.sub(otherLoc);
            if (d > 0 && d < cohesionRadius) {
                sum.addInPlace(diff);
                count += 1;
            }
        }
    }
        
    if (count > 0) {
        sum.divInPlace(count);
        return this.seek(sum);
    }
};

Vehicle.prototype.display = function (ctx) {
    "use strict";
    var theta = this.mover.velocity.heading() + Math.PI / 2; // normal
    ctx.save();
    ctx.translate(this.mover.location.x, this.mover.location.y);
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.fillStyle = this.fillStyle;

    /*
    ctx.lineWidth = 0.5;
    ctx.arc(0, 0, this.viewRadius, 0, pi2);
    ctx.arc(0, 0, this.avoidanceRadius, 0, pi2);
    ctx.stroke();
    ctx.closePath();
    */
    
    ctx.beginPath();
    ctx.lineTo(0, -this.r);
    ctx.lineTo(-this.r, this.r);
    ctx.lineTo(this.r, this.r);
    ctx.fill();
    ctx.closePath();

    // desired loc
    if (this.desired !== null) {
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#ddd";
        ctx.lineTo(this.mover.location.x + this.desired.x, this.mover.location.y + this.desired.y);
        ctx.stroke();
        ctx.closePath();
    }
    
    ctx.restore();
};
