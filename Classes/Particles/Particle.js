/*global Vector2, Mover, Color*/
function Particle(location, id, baseColor, scene) {
    "use strict";
    if (location instanceof Vector2 === false) {
        throw "Particle ctor : param is not a Vector2";
    }
    this.mover = new Mover(location.x, location.y, scene, 10);
    this.mover.velocity.x = Math.random() * 2 - 1;
    this.mover.velocity.y = Math.random() * 2 - 2;
    this.mover.color = Color.createNormalDistribColor(baseColor);
    this.lifespan = 1;
    this.id = id;
}

Particle.prototype.update = function () {
    "use strict";
    this.lifespan -= 0.015;
    var l = 1 - (this.lifespan / 3);
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

