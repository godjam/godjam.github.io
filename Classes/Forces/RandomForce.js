/*global Vector2, Mover, toxi*/
function RandomForce(usePerlin) {
    "use strict";
    this.usePerlin = usePerlin;
    this.t = 0;
    this.perlin = toxi.math.noise.simplexNoise;
}

RandomForce.prototype.applyOn = function (mover) {
    "use strict";
    if (mover instanceof Mover === false) {
        throw "RandomForce.applyOn : param is not a Mover";
    }

    let force = new Vector2();
    this.t += 1;
    if (this.t > 300) {this.t = 0; }

    if (this.usePerlin) {
        force = this.generatePerlinRnd(mover);
    } else {
        force = this.generateSimpleRnd();
    }

    force.limit(1);
    mover.applyUniformForce(force);
};

RandomForce.prototype.generateSimpleRnd = function () {
    "use strict";
    return new Vector2(
        Math.random() - 0.5,
        Math.random() - 0.5
    );
};

RandomForce.prototype.generatePerlinRnd = function (mover) {
    "use strict";
    let x = (mover.location.x - mover.worldW / 2) / mover.worldW,
        y = (mover.location.y - mover.worldH / 2) / mover.worldH,
        n = this.perlin.noise(x, y, this.t) - 0.5;
    return new Vector2(
        Math.cos(n * Math.PI) * 0.5,
        Math.sin(n * Math.PI) * 0.5
    );
};