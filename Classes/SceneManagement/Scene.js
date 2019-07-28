/*global FrameLoop, Vector2*/
let Scene = function (options) {
    'use strict';
    // console.log('scene ctor');

    // 2D context
    this.canvasManager = options.canvasManager;
    this.canvas = this.canvasManager.canvas;
    this.ctx = this.canvasManager.ctx;
    this.listenToEvents = this.canvasManager.listenToEvents;

    // frames
    this.frameloop = new FrameLoop(this, this.canvasManager.nextInterval, this.canvasManager.fps);
    this.requestId = null;
    this.lastTime = 0;

    // listeners
    this.eventListeners = [];
    this.timeoutList = [];

    // resize
    if (this.listenToEvents)
        addEventListener('resize', this.resize.bind(this));

    // setup canvas size 
    this.resize();

    // setup world size
    this.world = {
        minX: 0, 
        minY: 0, 
        maxX: this.size.x, 
        maxY: this.size.y};

    // camera target
    this.target = new Vector2(this.size.x / 2, this.size.y / 2);
};

Scene.prototype.addListener = function (listener) {
    this.eventListeners.push(listener)
}

Scene.prototype.update = function (time) {
    'use strict';
    let delta = time - this.lastTime;
    this.lastTime = time;
    
    if (this.canvasManager.isVisible) {
        if (this.frameloop.shouldNextFrame()) {
            this.loop(delta, this.ctx);
            this.updateListeners(delta);
        }
    }

    if (this.ctx)
        this.frameloop.display(this.ctx);
    this.requestId = window.requestAnimationFrame(this.update.bind(this));
};

Scene.prototype.updateListeners = function () {
    'use strict';
    let i = 0;

    for (i = 0; i < this.eventListeners.length; i += 1) {
        if (this.listenToEvents != false && this.eventListeners[i].update) {
            this.eventListeners[i].update();
        }
        if (this.eventListeners[i].display) {
            this.eventListeners[i].display(this.ctx);
        }
    }
}

Scene.prototype.start = function () {
    'use strict';
    // console.log('scene start');
    window.requestAnimationFrame((t) => this.update(t));
}

Scene.prototype.loop = function (delta, ctx) {
    'use strict';
    ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//clear the viewport AFTER the matrix is reset

    //Clamp the camera position to the world bounds while centering the camera around the player                                             
    var camX = Tools.clamp(-this.target.x + this.canvas.width / 2, this.world.minX, this.world.maxX - this.canvas.width);
    var camY = Tools.clamp(-this.target.y + this.canvas.height / 2, this.world.minY, this.world.maxY - this.canvas.height);

    ctx.translate(camX, camY); 
};

Scene.prototype.stop = function () {
    'use strict';
    // console.log('scene stop');
    let i = 0;

    if (this.requestId) {
        window.cancelAnimationFrame(this.requestId);
        this.requestId = null;
    }

    if (this.resize) {
        window.removeEventListener('resize', this.resize);
    }

    for (i = 0; i < this.eventListeners.length; i += 1) {
        if (this.eventListeners[i]) {
            this.eventListeners[i].stop();
            this.eventListeners[i] = null;
        }
    }

    for (i = 0; i < this.timeoutList.length; i += 1) {
        if (this.timeoutList[i]) {
            window.clearTimeout(this.timeoutList[i]);
            this.timeoutList[i] = null;
        }
    }
    this.canvas = null;
    this.ctx = null;
    // !! ne jamais faire this.canvasManager.stop() ici !
};

Scene.prototype.resize = function () {
    'use strict';
    window.scrollTo(0, 0);
    this.size = this.canvasManager.resize();
}

Scene.prototype.vibrate = function (t) {
    'use strict';
    if (this.listenToEvents && 'vibrate' in navigator) {
        navigator.vibrate(t);
    }
};

Scene.prototype.intro = function (title, desc) {
    'use strict';
    // from https://css-tricks.com/restart-css-animation/
    if (this.listenToEvents) {
        let intro = document.getElementById('intro'),
            clone = null,
            text = '';
        if (intro) {
            if (title) {
                text = '<h3>' + title + '</h3>';
            }
            if (desc) {
                text += '<br>' + desc;
            }
            intro.innerHTML = text;
            clone = intro.cloneNode(true);
            intro.parentNode.replaceChild(clone, intro);
        }
    }
};

/**
 * Adapted from https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout
 */
Scene.prototype.addUpdateCallback = function (callback, timeout) {
    'use strict';
    if (callback instanceof Function) {
        this.timeoutList.push(window.setInterval(callback, timeout));
    }
};