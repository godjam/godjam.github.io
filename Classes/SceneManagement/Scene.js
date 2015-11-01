/*global Context, FrameLoop*/
var Scene = function () {
    "use strict";
    var context = new Context();
    this.ctx = context.ctx;
    this.width = context.width;
    this.height = context.height;
    this.clientLeft = this.ctx.canvas.clientLeft;
    this.clientTop = this.ctx.canvas.clientTop;
    this.frameloop = new FrameLoop();
    this.requestId = null;
};

Scene.prototype.start = function () {"use strict"; };

Scene.prototype.loop = function () {
    "use strict";
    this.frameloop.update();
    this.requestId = window.requestAnimationFrame(this.loop.bind(this));
};

Scene.prototype.stop = function () {
    "use strict";
    if (this.requestId !== null) {
        window.cancelAnimationFrame(this.requestId);
        this.requestId = null;
    }
};