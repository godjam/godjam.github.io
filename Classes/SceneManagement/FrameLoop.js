var FrameLoop = function () {
    "use strict";
    this.lastLoop = new Date();
    this.delta = 0;
};

FrameLoop.prototype.update = function () {
    "use strict";
    var thisLoop = new Date();

    this.delta = thisLoop - this.lastLoop;
    this.lastLoop = thisLoop;
    return this.delta;
};

FrameLoop.prototype.display = function (ctx) {
    "use strict";
    ctx.fillStyle = "#000";
    ctx.font = "16px verdana";
    ctx.fillText("delta: " + this.delta, 64, 32);
};
