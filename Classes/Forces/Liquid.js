/*globals Vector2, Mover*/
//*************************************************
let Liquid  = function (c) {
    "use strict";
    this.c = c;
};

Liquid.prototype.applyOn = function (mover) {
	"use strict";
    if (mover instanceof Mover === false) {
        throw "Liquid.applyOn : param is not a Mover";
    }
    
    let speed = mover.velocity.mag(),
        dragMag = this.c * speed * speed,
        drag = mover.velocity.mult(-1);
    drag.normalizeInPlace();
    drag.multInPlace(dragMag);
    mover.applyForce(drag);
};
