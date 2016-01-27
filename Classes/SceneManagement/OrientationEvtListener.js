/*global HTMLCanvasElement, Scene*/
// Adapted from http://www.html5rocks.com/en/tutorials/device/orientation/
var OrientationEvtListener = function(canvas, callbackOwner, callback) {
    "use strict";

    if (canvas instanceof HTMLCanvasElement === false) {
        throw "OrientationEvtListener.ctor : canvas is not a HTMLCanvasElement";
    }

    if (!window.DeviceOrientationEvent) {
        console.log("DeviceOrientation is not supported");
    }

    this.canvas = canvas;
    this.callbackOwner = callbackOwner;
    this.callback = null;
    this.callbackRelease = null;

    if (callback !== undefined && callback instanceof Function) {
        this.callback = callback;
    }

    // attach event listener to the doc (with capturing)
    window.addEventListener("deviceorientation", this.move.bind(this));
};

OrientationEvtListener.prototype.stop = function() {
    "use strict";
    window.removeEventListener("deviceorientation", this.move);
};

OrientationEvtListener.prototype.move = function(event) {
    "use strict";
    // A voir
    event.preventDefault();
    var bindedCall = null,
        dir = event.alpha, // compass direction (in deg)
        tiltFB = event.beta, // front-back (in deg)
        tiltLR = event.gamma; // left-right (in deg)

    if (dir && tiltFB && tiltLR) {
        bindedCall = this.callback.bind(this.callbackOwner);
        bindedCall(dir, tiltFB, tiltLR);
    }
};

OrientationEvtListener.prototype.update = function() {
    "use strict";
};
