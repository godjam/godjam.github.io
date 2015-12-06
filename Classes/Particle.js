/*global Vector2, Mover*/
function Particle(location, id, scene) {
    "use strict";
    if (location instanceof Vector2 === false) {
        throw "Particle ctor : param is not a Vector2";
    }
    this.mover = new Mover(location.x, location.y, scene, 0.1);
    this.mover.velocity.x = Math.random()  * 2 - 1;
    this.mover.velocity.y = Math.random()  * 2 - 2;
    this.lifespan = 255;
    this.id = id;
    this.flavor = null;
}

Particle.prototype.update = function () {
    "use strict";
    this.mover.update(false);
    this.lifespan -= 2;
};

Particle.prototype.display = function (ctx) {
	"use strict";
    // special flavor
    if (this.flavor !== null) {
        this.flavor.display(this, ctx);
    // standard flavor
    } else {
        var c = 256 - this.lifespan;
        ctx.fillStyle = 'rgb(' + c + ', ' + c + ', ' + c + ')';
        ctx.beginPath();
        ctx.arc(this.mover.location.x,
                this.mover.location.y,
                8,
                0,
                Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
};

Particle.prototype.isDead = function () {
    "use strict";
    if (this.lifespan < 0) {return true; }
    return false;
};

Particle.prototype.setFlavor = function (flavor) {
    "use strict";
    this.flavor = flavor;
};