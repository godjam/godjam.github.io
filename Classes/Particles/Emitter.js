/*global Vector2, Particle, Mover, Confetti, Scene, console*/
function Emitter(owner, scene, maxcount, decrease, theta, variability, localPos) {
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
    if (localPos === undefined) {
        localPos = new Vector2(0, 0);
    }
    if (localPos instanceof Vector2 === false) {
        throw "Emitter ctor : param 7 is not a Vector2";
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
    // position /r to the owner 
    this.localPos = localPos;
    this.loc = this.owner.location.copy();
    this.updateLoc();
    
    this.isActive = true;
    this.addParticle();
}

Emitter.prototype.step = function (ctx) {
    "use strict";
    this.setTheta(-Math.PI / 2 - this.owner.angle);
    this.updateLoc();
    
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
    var particle = new Particle(this.loc, this.baseColor, this.scene, this.decrease, this.theta, this.variability);
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

Emitter.prototype.updateLoc = function () {
    "use strict";
    this.loc.x = this.localPos.x * this.owner.mass;
    this.loc.y = this.localPos.y * this.owner.mass;
    this.loc.rotateInPlace(this.owner.angle);
    this.loc.addInPlace(this.owner.location);
};