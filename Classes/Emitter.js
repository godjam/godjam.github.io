/*global Vector2, Particle, Mover, Confetti*/
function Emitter(owner, count) {
    "use strict";
    if (owner instanceof Mover === false) {
        throw "Emitter ctor : param 1 is not a Mover";
    }
    if (typeof count !== 'number') {
        throw "Emitter ctor : param 2 is not a scalar";
    }
    var i = 0;
    this.nextId = 0;
    this.owner = owner;
    this.particles = [];
    
    for (i; i < count; i += 1) {
        this.addParticle();
    }
}

Emitter.prototype.step = function (ctx) {
    "use strict";
    var i = this.particles.length - 1;
    for (i; i > 0; i -= 1) {
        this.particles[i].update();
        this.particles[i].display(ctx);
        if (this.particles[i].isDead()) {
            this.particles.splice(i, 1);
        }
    }
};

Emitter.prototype.addParticle = function () {
    "use strict";
    var particle = new Particle(this.owner.location.copy(), this.nextId),
        rnd = Math.random();
    
    if (rnd > 0.5) { particle.setFlavor(new Confetti()); }

    this.nextId += 1;
    this.particles.push(particle);
};


Emitter.prototype.apply = function (force) {
    "use strict";
    var i = this.particles.length - 1;
    for (i; i > 0; i -= 1) {
        force.applyOn(this.particles[i].mover);
    }
};