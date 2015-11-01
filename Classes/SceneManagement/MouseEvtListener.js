/*global TouchEvent, Vector2*/
var MouseEvtListener = function (canvasLeft, canvasTop, callbackOwner, callback) {
    "use strict";
    this.mouseClick = false;
    this.position = new Vector2(canvasLeft, canvasTop);
    this.origin = new Vector2(canvasLeft, canvasTop);
    this.callbackOwner = callbackOwner;
    this.callback = null;
    
    if (callback !== undefined && callback instanceof Function) {
        this.callback = callback;
    }
    
    // attach event listener to the doc
    document.addEventListener("mousedown", this.mouseDown.bind(this));
    document.addEventListener("mouseup", this.mouseUp.bind(this));
    document.addEventListener("mousemove", this.move.bind(this));
    document.addEventListener("touchmove", this.move.bind(this));
};

MouseEvtListener.prototype.move = function (event) {
    "use strict";
    event.preventDefault();
    var x = null, y = null, bindedCall = null;
    
    if (event instanceof TouchEvent && event.touches.length > 0) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else if (this.mouseClick === true) {
        x = event.clientX;
        y = event.clientY;
    }

    if (x !== null && y !== null) {
        this.position.x = x - this.origin.x;
        this.position.y = y - this.origin.y + 16;
        
        if (this.callback !== null) {
            bindedCall = this.callback.bind(this.callbackOwner);
            bindedCall(this.position);
        }
    }
};

MouseEvtListener.prototype.getPosition = function () {
    "use strict";
    return this.position.copy();
};

MouseEvtListener.prototype.touchMove = function (event) {
    "use strict";
    event.preventDefault();
};
    
MouseEvtListener.prototype.mouseDown = function (event) {
    "use strict";
    event.preventDefault();
    this.mouseClick = true;
};

MouseEvtListener.prototype.mouseUp = function (event) {
    "use strict";
    event.preventDefault();
    this.mouseClick = false;
};