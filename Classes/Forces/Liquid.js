/*globals Vector2, Mover*/
//*************************************************
function Liquid(x, y, w, h, c) {
    "use strict";
    this.x = x;
    this.y = y;
    this.c = c;
    this.w = w;
    this.h = h;
}

Liquid.prototype.display = function (ctx) {
	"use strict";
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w, this.y);
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.restore();
};


Liquid.prototype.applyOn = function (mover) {
	"use strict";
    if (mover instanceof Mover === false) {
        throw "Liquid.tryApplyOn : param is not a Mover";
    }
    if (mover.location.x > this.x &&
            mover.location.x < this.x + this.w &&
            mover.location.y > this.y &&
            mover.location.y < this.y + this.h) {
        this.executeOn(mover);
        return true;
    }
    return false;
};

Liquid.prototype.executeOn = function (mover) {
	"use strict";
    if (mover instanceof Mover === false) {
        throw "Liquid.act : param is not a Mover";
    }
    
    var speed = mover.velocity.mag(),
        dragMag = this.c * speed * speed,
        drag = mover.velocity.mult(-1);
    drag.normalizeInPlace();
    drag.multInPlace(dragMag);
    mover.applyForce(drag);
    mover.applyForce(new Vector2(0, -1));
};

