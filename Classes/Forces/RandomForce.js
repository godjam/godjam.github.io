/*global Vector2, Mover, noise*/
function RandomForce(usePerlin) {
    "use strict";
    this.usePerlin = usePerlin;
    this.t = 0;
    //this.min = 100;
    //this.max = 0;
}

RandomForce.prototype.applyOn = function (mover) {
    "use strict";
    if (mover instanceof Mover === false) {
        throw "RandomForce.applyOn : param is not a Mover";
    }
    
    var force = new Vector2(0, 0);
    this.t += 1;
    if (this.t > 180) {this.t = 0; }
    
    if (this.usePerlin) {
        force = new Vector2(
            (noise.perlin2(this.t / 180, 0) + 1 / 4),
            (noise.perlin2(1 - this.t / 180, 0) + 1 / 4)
        );
    } else {
        force = new Vector2(
            Math.random() - 0.5,
            Math.random() - 0.5
        );
    }
    
    //if (force.x < this.min) {this.min = force.x; }
    //if (force.x > this.max) {this.max = force.x; }
    //console.log(this.min + " " + this.max);
    //console.log(force.y);
    mover.applyUniformForce(force);
};