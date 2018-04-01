/*global Color, Vector2, Particle, Mover, Confetti, Scene, Tools, console*/
function Emitter(scene, position) {
    "use strict";
    if (scene instanceof Scene === false) {
        throw "Emitter ctor : param 1 is not a Scene";
    }
    if (position === undefined) {
        position = new Vector2(scene.size.x / 2, scene.size.y / 2);
    }
    if (position instanceof Vector2 === false) {
        throw "Emitter ctor : param 2 is not a Vector2";
    }
    let i = 0;
    this.owner = null;
    this.scene = scene;
    this.particles = [];
    this.baseColor = Color.createBrightColor().h;
    this.maxcount = 50;
    this.decrease = 0.02;
    this.speed = 1;
    this.theta = Math.random() * Math.PI * 2;
    this.letiability = Math.PI / 2;
    this.particleAngle = 0;
    // alternative particle
    this.alternativeCtor = null;
    this.alternativeProba = 0;
    // position to the owner
    this.localPos = new Vector2();
    this.loc = position;
    this.updateLoc();

    this.rate = 1;
    this.life = -1;
    this.isActive = true;
    this.isAlive = true;
    this.innerAttractiveForce = 0;
}

Emitter.prototype.setOwner = function (owner, localPos) {
    "use strict";
    if (owner instanceof Mover === false) {
        throw "Emitter setOwner : param 1 is not a Mover";
    }
    if (localPos === undefined) {
        localPos = new Vector2();
    }
    if (localPos instanceof Vector2 === false) {
        throw "Emitter setOwner : param 2 is not a Vector2";
    }
    this.owner = owner;
    this.localPos = localPos;
    this.baseColor = owner.color.h;
};

Emitter.prototype.setParticlesLife = function (maxcount, decrease) {
    "use strict";
    if (typeof maxcount !== 'number') {
        throw "Emitter setParticlesLife : param 1 is not a scalar";
    }
    if (typeof decrease !== 'number') {
        throw "Emitter setParticlesLife : param 2 is not a scalar";
    }
    this.maxcount = maxcount;
    this.decrease = decrease;
};

Emitter.prototype.setEmitterLife = function (rate, maxLife) {
    "use strict";
    if (typeof rate !== 'number') {
        throw "Emitter setEmitterLife : param 1 is not a scalar";
    }
    if (typeof maxLife !== 'number') {
        throw "Emitter setEmitterLife : param 2 is not a scalar";
    }
    this.rate = Math.max(1, Math.round(rate));
    this.life = Math.max(1, Math.round(maxLife));
};

Emitter.prototype.setParticlesSpeed = function (speed) {
    "use strict";
    if (typeof speed !== 'number') {
        throw "Emitter setParticlesSpeed : param 1 is not a scalar";
    }
    this.speed = speed;
};

Emitter.prototype.setParticlesTorque = function (particleAngle) {
    "use strict";
    if (typeof particleAngle !== 'number') {
        throw "Emitter setParticlesTorque : param 1 is not a scalar";
    }
    this.particleAngle = particleAngle;
};

Emitter.prototype.setAlternativeParticle = function (particleCtor, probability) {
    "use strict";
    if (typeof particleCtor !== 'function') {
        throw "Emitter setAlternativeParticle : param 1 is not a ctor";
    }
    if (typeof probability !== 'number') {
        throw "Emitter setAlternativeParticle : param 2 is not a scalar";
    }
    this.alternativeCtor = particleCtor;
    this.alternativeProba = Tools.clamp(probability, 0, 1);
};


Emitter.prototype.setAngle = function (theta, letiability) {
    "use strict";
    if (typeof theta !== 'number') {
        throw "Emitter setAngle : param 1 is not a scalar";
    }
    if (typeof letiability !== 'number') {
        throw "Emitter setAngle : param 2 is not a scalar";
    }
    this.theta = theta;
    this.letiability = letiability;
};

Emitter.prototype.setInnerAttractiveForce = function (innerAttractiveForce) {
    "use strict";
    if (typeof innerAttractiveForce !== 'number') {
        throw "Emitter setInnerAttractiveForce : param 1 is not a scalar";
    }
    this.innerAttractiveForce = innerAttractiveForce;
};

Emitter.prototype.step = function (ctx) {
    "use strict";
    this.updateLoc();
    let i = 0, j = 0;
    for (i = this.particles.length - 1; i >= 0; i -= 1) {
        // attract/repel particles each other
        if (this.innerAttractiveForce !== 0) {
            for (j = 0; j < this.particles.length; j += 1) {
                if (i !== j) {
                    this.particles[i].mover.attract(this.particles[j].mover, this.innerAttractiveForce);
                }
            }
        }

        this.particles[i].update();
        this.particles[i].display(ctx);
        if (this.particles[i].isDead()) {
            this.particles.splice(i, 1);
        }
    }

    // add particles according to the rate
    if (this.isActive) {
        for (i = 0; i < this.rate; i += 1) {
            this.addParticle();
        }
    }

    // system life
    if (this.life > 0) {
        this.life -= 1;
    }
    if (this.life === 0) {
        this.isActive = false;
    }
    if (this.life === 0 && this.particles.length === 0) {
        this.isAlive = false;
    }

};

Emitter.prototype.addParticle = function () {
    "use strict";
    let particle = null,
        r = Math.random();
    // create alternative particle
    if (r < this.alternativeProba && this.alternativeCtor) {
        particle = new this.alternativeCtor(this.loc, this.baseColor, this.scene, this.decrease, this.theta, this.letiability, this.speed);
    // create std particle
    } else {
        particle = new Particle(this.loc, this.baseColor, this.scene, this.decrease, this.theta, this.letiability, this.speed);
        if (this.particleAngle !== 0) {
            particle.applyTorque(this.particleAngle);
        }
    }
    this.particles.push(particle);

    if (this.particles.length > this.maxcount) {
        this.particles.shift();
    }
};

Emitter.prototype.apply = function (force) {
    "use strict";
    let i = this.particles.length - 1;
    for (i; i >= 0; i -= 1) {
        this.particles[i].apply(force);
    }
};

Emitter.prototype.setTheta = function (theta) {
    "use strict";
    this.theta = theta;
};

Emitter.prototype.setLocation = function (loc) {
    "use strict";
    this.loc = loc;
};

Emitter.prototype.setActive = function (isActive) {
    "use strict";
    this.isActive = isActive;
};

Emitter.prototype.updateLoc = function () {
    "use strict";
    if (this.owner) {
        this.setTheta(-Math.PI / 2 - this.owner.angle);
        this.loc.x = this.localPos.x * this.owner.mass;
        this.loc.y = this.localPos.y * this.owner.mass;
        this.loc.rotateInPlace(this.owner.angle);
        this.loc.addInPlace(this.owner.location);
    }
};