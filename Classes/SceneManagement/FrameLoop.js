let FrameLoop = function (scene, nextInterval, fps) {
    'use strict';
    this.scene = scene;
    this.lastLoop = new Date();
    this.delta = 0;
    this.nextInterval = nextInterval || 0;
    this.fps = fps || 60;
    this.show = false;

    if (this.scene.listenToEvents)
        document.addEventListener('keydown', (e) => this.handleKeys(e), false);
};

FrameLoop.prototype.handleKeys = function (event) {
    if (event.key == 'x') {
        this.show = !this.show;
        event.preventDefault();
    }
}

FrameLoop.prototype.update = function () {
    'use strict';
    let thisLoop = new Date();

    this.delta = (thisLoop - this.lastLoop) / 1000;
    this.lastLoop = thisLoop;
    return this.delta; // in sec
};

FrameLoop.prototype.shouldNextFrame = function () {
    this.update();
    this.nextInterval -= this.delta;
    if (this.nextInterval < 0.0) {
        this.nextInterval = 1.0 / this.fps;
        return true;
    }

    return false;
}

FrameLoop.prototype.display = function (ctx) {
    'use strict';
    if (this.show) {
        ctx.fillStyle = '#000';
        ctx.font = '16px verdana';
        ctx.fillText('delta: ' + this.delta, 64, 32);
    }
};