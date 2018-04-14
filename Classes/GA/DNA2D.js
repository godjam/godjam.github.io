function DNA2D(size, options) {
    'use strict';
    options = options || {};
    this.maxForce = options.maxForce || 0.5;
    this.dist = 1000;
    DNA.call(this, size);
}
DNA2D.prototype = Object.create(DNA.prototype);
DNA2D.prototype.constructor = DNA2D;

DNA2D.prototype.init = function () {
    'use strict';
    this.location = 0;
    this.velocity = 0;
    this.alive = true;
    this.timeToTarget = 500;
    DNA.prototype.init.call(this);
}

DNA2D.prototype.createGene = function () {
    'use strict';
    let v = Vector2.create2D();
    v.multInPlace(Math.random() * this.maxForce);
    return v;
}

DNA2D.prototype.updateScore = function (rocket, target, time) {
    'use strict';
    this.location = rocket.mover.location;
    this.velocity = rocket.mover.velocity;
    this.alive = rocket.alive;
    let dist = Vector2.distance(this.location, target);

    if(dist < this.dist)
        this.dist = dist;

    if(this.dist <= 20 && time < this.timeToTarget)
        this.timeToTarget = time;
}

DNA2D.prototype.computeFitness = function (target) {
    'use strict';
    let wd = 0.4;
    let wt = 0.6;
    let d = this.dist * wd;
    let t = this.timeToTarget * wt;
    let id = Math.min(wd, 1 / d);
    let it = Math.min(wt, 1 / t);
    let s = Math.pow(id + it, 2);

    if (!this.alive)
        s = s * 0.1;

    this.fitness = s;    
}


DNA.prototype.displayStats = function () {
    return `best [dist: ${this.dist.toFixed()}, time: ${this.timeToTarget}]`;    
    /*
    let wd = 0.4;
    let wt = 0.6;
    let d = this.dist * wd;
    let t = this.timeToTarget * wt;
    let id = Math.min(wd, 1 / d);
    let it = Math.min(wt, 1 / t);
    let s = Math.pow(id + it, 2);
    let f = 3;
    return `d ${d.toFixed()}|t ${t.toFixed()}|id ${id.toFixed(f)}|it ${it.toFixed(f)}|s ${s.toFixed(f)}`;
    */
}
