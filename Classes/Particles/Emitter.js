/*global Vector2, Particle, Mover, Confetti, Scene*/
function Emitter(owner, scene, maxcount, decrease, theta, variability) {
    "use strict";
    if (owner instanceof Mover === false) {
        throw "Emitter ctor : param 1 is not a Mover";
    }
    if (scene instanceof Scene === false) {
        throw "Emitter ctor : param 2 is not a Scene";
    }
    if (typeof maxcount !== 'number') {
        throw "Emitter ctor : param 3 is not a scalar";
    }
    if (decrease === undefined) {
        decrease = 0.02;
    }
    if (typeof decrease !== 'number') {
        throw "Emitter ctor : param 4 is not a scalar";
    }
    if (theta === undefined) {
        theta = Math.random() * Math.PI * 2;
    }
    if (typeof theta !== 'number') {
        throw "Emitter ctor : param 5 is not a scalar";
    }
    if (variability === undefined) {
        variability = Math.PI / 2;
    }
    if (typeof variability !== 'number') {
        throw "Emitter ctor : param 6 is not a scalar";
    }
    
    var i = 0;
    this.owner = owner;
    this.scene = scene;
    this.particles = [];
    this.baseColor = owner.color.h;
    this.maxcount = maxcount;
    this.decrease = decrease;
    this.theta = theta;
    this.variability = variability;
    this.isActive = true;
    this.addParticle();
}

Emitter.prototype.step = function (ctx) {
    "use strict";
    var i = this.particles.length - 1;
    for (i; i >= 0; i -= 1) {
        this.particles[i].update();
        this.particles[i].display(ctx);
        if (this.particles[i].isDead()) {
            this.particles.splice(i, 1);
        }
    }
    
    if (this.isActive) {
        this.addParticle();
    }
};

Emitter.prototype.addParticle = function () {
    "use strict";
    var particle = new Particle(this.owner.location.copy(), this.baseColor, this.scene, this.decrease, this.theta, this.variability);
    this.particles.push(particle);
    
    if (this.particles.length > this.maxcount) {
        this.particles.shift();
    }
};


Emitter.prototype.apply = function (force) {
    "use strict";
    var i = this.particles.length - 1;
    for (i; i >= 0; i -= 1) {
        this.particles[i].apply(force);
    }
};

Emitter.prototype.setTheta = function (theta) {
    "use strict";
    this.theta = theta;
};

Emitter.prototype.setActive = function (isActive) {
    "use strict";
    this.isActive = isActive;
};