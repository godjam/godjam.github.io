/*global Color, Vector2, Particle, Mover, Confetti, Scene, console*/
function Emitter(scene, position) {
    "use strict";
    if (scene instanceof Scene === false) {
        throw "Emitter ctor : param 1 is not a Scene";
    }
    if (position === undefined) {
        position = new Vector2(scene.width / 2, scene.height / 2);
    }
    if (position instanceof Vector2 === false) {
        throw "Emitter ctor : param 2 is not a Vector2";
    }
    var i = 0;
    this.owner = null;
    this.scene = scene;
    this.particles = [];
    this.baseColor = Color.createBrightColor().h;
    this.maxcount = 50;
    this.decrease = 0.02;
    this.speed = 1;
    this.theta = Math.random() * Math.PI * 2;
    this.variability = Math.PI / 2;
    // position to the owner
    this.localPos = new Vector2(0, 0);
    this.loc = position;
    this.updateLoc();
    
    this.rate = 1;
    this.life = -1;
    this.isActive = true;
    this.isAlive = true;
}

Emitter.prototype.setOwner = function (owner, localPos) {
    "use strict";
    if (owner instanceof Mover === false) {
        throw "Emitter setOwner : param 1 is not a Mover";
    }
    if (localPos === undefined) {
        localPos = new Vector2(0, 0);
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


Emitter.prototype.setEmitterLife = function (rate, maxLife, speed) {
    "use strict";
    if (typeof rate !== 'number') {
        throw "Emitter setEmmitterLife : param 1 is not a scalar";
    }
    if (typeof maxLife !== 'number') {
        throw "Emitter setEmmitterLife : param 2 is not a scalar";
    }
    if (typeof speed !== 'number') {
        throw "Emitter setEmmitterLife : param 2 is not a scalar";
    }
    this.rate = Math.max(1, Math.round(rate));
    this.life = maxLife;
    this.speed = speed;
};


Emitter.prototype.setAngle = function (theta, variability) {
    "use strict";
    if (typeof theta !== 'number') {
        throw "Emitter setAngle : param 1 is not a scalar";
    }
    if (typeof variability !== 'number') {
        throw "Emitter setAngle : param 2 is not a scalar";
    }
    this.theta = theta;
    this.variability = variability;
};


Emitter.prototype.step = function (ctx) {
    "use strict";
    this.updateLoc();
    
    var i = this.particles.length - 1;
    for (i; i >= 0; i -= 1) {
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
    var particle = new Particle(this.loc, this.baseColor, this.scene, this.decrease, this.theta, this.variability, this.speed);
    this.particles.push(particle);
    
    //console.log(this.particles.length);
    
    
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