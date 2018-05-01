/*global Vector2, HTMLCanvasElement, TouchList*/
let MouseEvtListener = function (scene, callbackMove, callbackRelease) {
    'use strict';

    if (canvas instanceof HTMLCanvasElement === false) {
        throw 'MouseEvtListener.ctor : canvas is not a HTMLCanvasElement';
    }

    this.scene = scene;
    this.mouseClick = false;
    this.position = new Vector2();
    this.pointers = [];
    this.changes = null;
    this.canvas = this.scene.canvas;
    this.origin = new Vector2(this.canvas.clientLeft, this.canvas.clientTop);
    this.callbackMove = null;
    this.callbackRelease = null;
    this.tmp = new Vector2();

    if (callbackMove !== undefined && callbackMove instanceof Function) {
        this.callbackMove = callbackMove;
    }

    if (callbackRelease !== undefined && callbackRelease instanceof Function) {
        this.callbackRelease = callbackRelease;
    }

    // attach event listener to the doc (with capturing)
    if (this.scene.listenToEvents) {
        this.canvas.addEventListener('mousedown', (e) => this.mouseDown(e), false);
        this.canvas.addEventListener('mouseup', (e) => this.mouseUp(e), false);

        this.canvas.addEventListener('touchstart', (e) => this.mouseDown(e), false);
        this.canvas.addEventListener('touchend', (e) => this.mouseUp(e), false);

        this.canvas.addEventListener('mousemove', (e) => this.move(e), false);
        this.canvas.addEventListener('touchmove', (e) => this.move(e), false);
    }
};

MouseEvtListener.prototype.stop = function () {
    'use strict';
    this.canvas.removeEventListener('mousedown', this.mouseDown);
    this.canvas.removeEventListener('mouseup', this.mouseUp);
    this.canvas.removeEventListener('mousemove', this.move);

    this.canvas.removeEventListener('touchstart', this.mouseDown);
    this.canvas.removeEventListener('touchend', this.mouseUp);
    this.canvas.removeEventListener('touchmove', this.move);
};

MouseEvtListener.prototype.move = function (event) {
    'use strict';
    event.preventDefault();
    let i = 0,
        pointers = [];

    // pointer lists
    if (event.touches) {
        for (i = 0; i < event.touches.length; i += 1) {
            this.tmp.x = event.touches[i].clientX - this.origin.x;
            this.tmp.y = event.touches[i].clientY - this.origin.y;
            pointers.push(this.tmp);
        }
    } else if (this.mouseClick === true) {
        this.tmp.x = event.clientX - this.origin.x;
        this.tmp.y = event.clientY - this.origin.y;
        pointers.push(this.tmp);
    }

    if (pointers[0] !== undefined) {
        this.position.x = pointers[0].x;
        this.position.y = pointers[0].y - 16;
    }

    this.pointers = pointers;
    this.changes = event.changedTouches;
    this.update();
};

MouseEvtListener.prototype.update = function () {
    'use strict';
    if (this.mouseClick) {
        if (this.callbackMove) {
            this.callbackMove(this.position, this.pointers, this.changes);
        }
    }
};


MouseEvtListener.prototype.release = function () {
    'use strict';
    if (this.mouseClick === false && this.callbackRelease) {
        this.callbackRelease();
    }
};


MouseEvtListener.prototype.mouseDown = function (event) {
    'use strict';
    event.preventDefault();
    this.mouseClick = true;
    this.move(event);
};

MouseEvtListener.prototype.mouseUp = function (event) {
    'use strict';
    event.preventDefault();
    this.mouseClick = false;
    this.release(event);
};