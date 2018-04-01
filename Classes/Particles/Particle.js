/*global Vector2, Mover, Color, Scene*/
function Particle(location, baseColor, scene, decrease, theta, variability, speed) {
    "use strict";
    if (location instanceof Vector2 === false) {
        throw "Particle ctor : param is not a Vector2";
    }
    if (typeof baseColor !== 'number') {
        throw "Particle ctor : param 2 is not a scalar";
    }
    if (scene instanceof Scene === false) {
        throw "Particle ctor : param 3 is not a Scene";
    }
    if (typeof decrease !== 'number') {
        throw "Particle ctor : param 4 is not a scalar";
    }
    if (typeof theta !== 'number') {
        throw "Particle ctor : param 5 is not a scalar";
    }
    if (typeof variability !== 'number') {
        throw "Particle ctor : param 6 is not a scalar";
    }
    if (typeof speed !== 'number') {
        throw "Particle ctor : param 7 is not a scalar";
    }
    
    this.mover = new Mover(location.x, location.y, scene, 10);
    this.mover.color = Color.createNormalDistribColor(baseColor);
    this.lifespan = 1;
    this.decrease = decrease;
    
    this.mover.velocity = Vector2.fromPolar(speed, theta);
    if (variability !== 0) {
        variability = Math.random() * variability - variability / 2;
        this.mover.velocity.rotateInPlace(variability);
    }
}

Particle.prototype.update = function () {
    "use strict";
    this.lifespan -= this.decrease;
    let l = 1 - (this.lifespan / 3);
    this.mover.update(false);
    this.mover.color.hslToRgb(this.mover.color.h, this.mover.color.s, l);
};

Particle.prototype.display = function (ctx) {
	"use strict";
    this.mover.displayAsPoly(ctx, 3);
};

Particle.prototype.isDead = function () {
    "use strict";
    if (this.lifespan < 0) {return true; }
    return false;
};

Particle.prototype.apply = function (force) {
    "use strict";
    if (force.applyOn === undefined) {
        throw "Particle.applyOn: force doesn't have 'applyOn' property";
    }
    force.applyOn(this.mover);
};

Particle.prototype.applyTorque = function (angle) {
    "use strict";
    this.mover.applyTorque(angle);
};
