/*global Vector2, Particle, Mover, Confetti, Scene*/
function Emitter(owner, count, scene) {
    "use strict";
    if (owner instanceof Mover === false) {
        throw "Emitter ctor : param 1 is not a Mover";
    }
    if (typeof count !== 'number') {
        throw "Emitter ctor : param 2 is not a scalar";
    }
    if (scene instanceof Scene === false) {
        throw "Emitter ctor : param 3 is not a Scene";
    }
    
    var i = 0;
    this.nextId = 0;
    this.owner = owner;
    this.scene = scene;
    this.particles = [];
    this.baseColor = owner.color.h;
    
    for (i; i < count; i += 1) {
        this.addParticle();
    }
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
};

Emitter.prototype.addParticle = function () {
    "use strict";
    var particle = new Particle(this.owner.location.copy(), this.nextId, this.baseColor, this.scene),
        rnd = Math.random();
    
    this.nextId += 1;
    this.particles.push(particle);
};


Emitter.prototype.apply = function (force) {
    "use strict";
    var i = this.particles.length - 1;
    for (i; i >= 0; i -= 1) {
        this.particles[i].apply(force);
    }
};