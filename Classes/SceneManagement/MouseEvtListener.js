/*global Vector2, HTMLCanvasElement, TouchList*/
var MouseEvtListener = function (canvas, callbackOwner, callbackMove, callbackRelease) {
    "use strict";

    if (canvas instanceof HTMLCanvasElement === false) {
        throw "MouseEvtListener.ctor : canvas is not a HTMLCanvasElement";
    }

    this.mouseClick = false;
    this.position = new Vector2();
    this.pointers = [];
    this.changes = null;
    this.origin = new Vector2(canvas.clientLeft, canvas.clientTop);
    this.canvas = canvas;
    this.callbackOwner = callbackOwner;
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
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));

    this.canvas.addEventListener("touchstart", this.mouseDown.bind(this));
    this.canvas.addEventListener("touchend", this.mouseUp.bind(this));

    this.canvas.addEventListener("mousemove", this.move.bind(this));
    this.canvas.addEventListener("touchmove", this.move.bind(this));
};

MouseEvtListener.prototype.stop = function () {
    "use strict";
    this.canvas.removeEventListener("mousedown", this.mouseDown);
    this.canvas.removeEventListener("mouseup", this.mouseUp);
    this.canvas.removeEventListener("mousemove", this.move);

    this.canvas.removeEventListener("touchstart", this.mouseDown);
    this.canvas.removeEventListener("touchend", this.mouseUp);
    this.canvas.removeEventListener("touchmove", this.move);
};

MouseEvtListener.prototype.move = function (event) {
    "use strict";
    event.preventDefault();
    var i = 0, pointers = [];

    // pointer lists
    if (event.touches) {
        for (i = 0; i < event.touches.length; i += 1) {
            this.tmp.x = event.touches[i].clientX - this.origin.x;
            this.tmp.y = event.touches[i].clientY - this.origin.y;
            pointers.push(this.tmp);
        }
    }
    else if (this.mouseClick === true) {
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
    "use strict";
    if (this.mouseClick) {
        if (this.callbackMove !== null) {
            var bindedCall = this.callbackMove.bind(this.callbackOwner);
            bindedCall(this.position, this.pointers, this.changes);
        }
    }
};


MouseEvtListener.prototype.release = function () {
    "use strict";
    if (this.mouseClick === false && this.callbackRelease !== null) {
        var bindedCall = this.callbackRelease.bind(this.callbackOwner);
        bindedCall();
    }
};


MouseEvtListener.prototype.mouseDown = function (event) {
    "use strict";
    event.preventDefault();
    this.mouseClick = true;
    this.move(event);
};

MouseEvtListener.prototype.mouseUp = function (event) {
    "use strict";
    event.preventDefault();
    this.mouseClick = false;
    this.release(event);
};