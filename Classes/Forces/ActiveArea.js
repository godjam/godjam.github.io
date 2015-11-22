/*globals Mover, Color*/
//*************************************************
function ActiveArea(x, y, w, h) {
    "use strict";
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.effect = null;
    this.color = Color.createLightColor().ToHex();
}

ActiveArea.prototype.display = function (ctx) {
	"use strict";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w, this.y);
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
};


ActiveArea.prototype.applyOn = function (mover) {
	"use strict";
    if (this.effect === null) {
        return;
    }
    
    if (mover instanceof Mover === false) {
        throw "ActiveArea.applyOn : param is not a Mover";
    }
    
    
    if (mover.location.x > this.x &&
            mover.location.x < this.x + this.w &&
            mover.location.y > this.y &&
            mover.location.y < this.y + this.h) {
        this.effect.applyOn(mover);
        return true;
    }
    return false;
};

ActiveArea.prototype.setEffect = function (effect) {
	"use strict";
    if (typeof effect.applyOn !== "function") {
        throw "ActiveArea.setEffect : effect.applyOn is not a function";
    }
    
    this.effect = effect;
};

