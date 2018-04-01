/*global Vector2, Mover*/
function Friction(coeff) {
    "use strict";
    this.coeff = coeff;
}

Friction.prototype.applyOn = function (mover) {
    "use strict";
    if (mover instanceof Mover === false) {
        throw "Friction.applyOn : param is not a Mover";
    }

    let friction = mover.velocity.mult(-1);
    friction.normalizeInPlace();
    friction.multInPlace(this.coeff);
    mover.applyForce(friction);
};