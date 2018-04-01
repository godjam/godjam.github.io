let FrameLoop = function (nextInterval, fps) {
    "use strict";
    this.lastLoop = new Date();
    this.delta = 0;
    this.nextInterval = nextInterval || 0;
    this.fps = fps || 60;
};

FrameLoop.prototype.update = function () {
    "use strict";
    let thisLoop = new Date();

    this.delta = (thisLoop - this.lastLoop) / 1000;
    this.lastLoop = thisLoop;
    return this.delta; // in sec
};

FrameLoop.prototype.shouldNextFrame = function () {
    this.update();
    this.nextInterval -= this.delta;
    if(this.nextInterval < 0.0) {
        this.nextInterval = 1.0 / this.fps;
        return true;
    }
    
    return false;
}

FrameLoop.prototype.display = function (ctx) {
    "use strict";
    ctx.fillStyle = "#000";
    ctx.font = "16px verdana";
    ctx.fillText("delta: " + this.delta, 64, 32);
};
