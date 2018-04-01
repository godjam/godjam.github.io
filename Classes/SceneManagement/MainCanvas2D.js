/*global FrameLoop, THREE, Vector2*/
let MainCanvas2D = function (isDark) {
    'use strict';
    let container = document.getElementById('main-container');
    this.canvas = document.createElement('canvas');
    this.isVisible = true;
    container.appendChild(this.canvas);

    // canvas size
    this.resize();

    // 2D context
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    // isDark
    if (this.ctx && isDark) {
        this.ctx.canvas.style.background = '#222';
    }
};

MainCanvas2D.prototype.stop = function () {
    'use strict';
    // clear canvas context
    this.canvas.remove();
};

MainCanvas2D.prototype.resize = function () {
    'use strict';
    this.size = new Vector2(window.innerWidth, window.innerHeight);
   
    // 2D canvas scene
    if (this.canvas !== null) {
        this.canvas.width = this.size.x;
        this.canvas.height = this.size.y;
    }

    return this.size;
};

MainCanvas2D.prototype.ctx = function () {
    'use strict';
    return thix.ctx;
}