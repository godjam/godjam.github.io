/*global Vector2, Mover*/
function Gravity(ax, ay) {
    "use strict";
    this.force = new Vector2(ax, ay);
}

/*
 * Diff between Wind and Gravity : 
 *    * Wind effect depends on the mass
 *    * Gravity doesn't depends on the mass
 */
Gravity.prototype.applyOn = function (mover) {
    "use strict";
    if (mover instanceof Mover === false) {
        throw "Attractor.attract : param is not a Mover";
    }
    mover.applyUniformForce(this.force);
};