/*global FrameLoop, THREE, Vector2*/
let MainCanvas2D = function (canvasID, sceneKey, options) {
    'use strict';
    // init
    CanvasManager.call(this, canvasID, sceneKey, options);

    // canvas size
    this.resize();

    // 2D context
    this.ctx = this.canvas.getContext('2d');

    // isDark
    this.canvas.style.background = '#fff';
    if (this.canvas && options.isDark) {
        this.canvas.style.background = '#222';
    }
};
MainCanvas2D.prototype = Object.create(CanvasManager.prototype);
MainCanvas2D.prototype.constructor = MainCanvas2D;


MainCanvas2D.prototype.stop = function () {
    'use strict';
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    CanvasManager.prototype.stopScene.call(this);
}

MainCanvas2D.prototype.resize = function () {
    'use strict';
    this.size = this.getViewportSize();
   
    // force canvas size
    if (this.canvas !== null) {
        this.canvas.width = this.size.x;
        this.canvas.height = this.size.y;
    }

    return this.size;
};