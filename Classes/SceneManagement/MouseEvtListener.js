/*global TouchEvent, Vector2, HTMLCanvasElement*/
var MouseEvtListener = function (canvas, callbackOwner, callbackMove, callbackRelease) {
    "use strict";
    
    if (canvas instanceof HTMLCanvasElement === false) {
        throw "MouseEvtListener.ctor : canvas is not a HTMLCanvasElement";
    }
    
    this.mouseClick = false;
    this.position = new Vector2(canvas.clientLeft, canvas.clientTop);
    this.origin = new Vector2(canvas.clientLeft, canvas.clientTop);
    this.canvas = canvas;
    this.callbackOwner = callbackOwner;
    this.callbackMove = null;
    this.callbackRelease = null;
    
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
    this.canvas.removeEventListener("touchmove", this.move);
};

MouseEvtListener.prototype.move = function (event) {
    "use strict";
    event.preventDefault();
    var x = null, y = null, bindedCall = null;
    
    if (event.touches !== undefined && event.touches.length > 0) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else if (this.mouseClick === true) {
        x = event.clientX;
        y = event.clientY;
    }

    if (x !== null && y !== null) {
        this.position.x = x - this.origin.x;
        this.position.y = y - this.origin.y - 16;
        
        if (this.mouseClick && this.position.x !== null && this.position.y !== null) {
            if (this.callbackMove !== null) {
                bindedCall = this.callbackMove.bind(this.callbackOwner);
                bindedCall(this.position.copy());
            }
        }
    }
};

MouseEvtListener.prototype.release = function () {
    "use strict";
    if (this.mouseClick === false && this.callbackRelease !== null) {
        var bindedCall = this.callbackRelease.bind(this.callbackOwner);
        bindedCall(this.position.copy());
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