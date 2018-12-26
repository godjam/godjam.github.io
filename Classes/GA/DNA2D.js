function DNA2D(dnaSize, options) {
    'use strict';
    DNA.call(this, dnaSize, options);
}
DNA2D.prototype = Object.create(DNA.prototype);
DNA2D.prototype.constructor = DNA2D;

DNA2D.prototype.copy = function () {
    let copy = new DNA2D(this.dnaSize, this.options);
    copy.genes = this.genes;
    return copy;
}

DNA2D.prototype.resetScore = function () {
    this.maxForce = this.options.maxForce;
    this.dist = this.options.baseDist;
    this.distThreshold = this.options.distThreshold;
    this.baseTimeToTarget = this.options.baseTimeToTarget;
    this.impactVelocity = 0;
    this.velocity = 0;
    this.alive = true;
    this.timeToTarget = this.baseTimeToTarget;
    this.location = 0;

    DNA.prototype.resetScore.call(this);
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

    if(this.dist <= this.distThreshold && time < this.timeToTarget) {
        this.dist = 1;
        this.timeToTarget = time;
        this.impactVelocity = this.velocity;
    }
}

DNA2D.prototype.computeFitness = function (target) {
    'use strict';
    let wd = 0.33;
    let wt = 0.33;
    let wv = 0.33;
    
    let d = this.dist * wd;
    let t = this.timeToTarget * wt;
    let v = this.impactVelocity * wv;

    let id = Math.min(wd, 1 / d);
    let it = Math.min(wt, 1 / t);
    let iv = Math.min(wv, 1 / v);

    let s = (id * id) + (it * it) + (iv * iv);

    if (!this.alive || this.impactVelocity > 1)
        s = s * 0.1;

    if (this.timeToTarget >= this.baseTimeToTarget)
        s = s * 0.5;

    if(s > 1)
        console.log(`>1! : id: ${this.id} dist: ${this.dist.toFixed()} (score: ${d}) ttt: ${this.timeToTarget} (score: ${t})`);

    this.fitness = s;
    this.bestFitness = this.fitness;
}

DNA2D.prototype.displayStats = function () {
    return `best [${this.bestFitness.toFixed(4)} dist: ${this.dist.toFixed()}, time: ${this.timeToTarget}]`;    
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