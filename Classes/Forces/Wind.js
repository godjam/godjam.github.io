/*global Vector2, Mover*/
function Wind(ax, ay, power) {
    "use strict";
    if (ax === undefined) {
        ax = Math.random() - 0.5;
    }
    if (ay === undefined) {
        ay = Math.random() - 0.5;
    }
    if (power === undefined) {
        power = Math.random() * 5;
    }
    this.force = new Vector2(ax, ay).normalizeInPlace();
    this.force.multInPlace(power);
}

/*
 * Diff between Wind and Gravity : 
 *    * Wind effect depends on the mass
 *    * Gravity doesn't depends on the mass
 */
Wind.prototype.applyOn = function (mover) {
    "use strict";
    if (mover instanceof Mover === false) {
        throw "Wind.applyOn : param is not a Mover";
    }
    mover.applyForce(this.force);
};