/*global FrameLoop, THREE, Vector2*/
let MiniCanvas2D = function (canvasID, sceneKey, options) {
    'use strict';
    // init
    CanvasManager.call(this, canvasID, sceneKey, options);
    this.listenToevents = false;

    // size
    this.size = this.size = this.getCanvasSize();
    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y;

    // 2D context
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    // isDark
    if (this.canvas && options.isDark) {
        this.canvas.style.background = '#222';
    }
};

MiniCanvas2D.prototype = Object.create(CanvasManager.prototype);
MiniCanvas2D.prototype.constructor = MiniCanvas2D;