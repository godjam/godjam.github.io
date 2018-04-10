function DNA2D(size, maxForce) {
    'use strict';
    this.maxForce = maxForce || 0.5;
    DNA.call(this, size);
}
DNA2D.prototype = Object.create(DNA.prototype);
DNA2D.prototype.constructor = DNA2D;

DNA2D.prototype.init = function () {
    'use strict';
    this.location = 0;
    this.velocity = 0;
    DNA.prototype.init.call(this);
}

DNA2D.prototype.createGene = function () {
    'use strict';
    let v = Vector2.create2D();
    v.multInPlace(Math.random() * this.maxForce);
    return v;
}

DNA2D.prototype.updateScore = function (location, velocity) {
    'use strict';
    this.location = location;
    this.velocity = velocity; 
}

DNA2D.prototype.computeFitness = function (target) {
    'use strict';
    let d = 1 / Vector2.distance(this.location, target);
    d = d * d;

    //let v = 1 / (1 + this.velocity.mag());
    //v = v * v;

    this.fitness = d;
}