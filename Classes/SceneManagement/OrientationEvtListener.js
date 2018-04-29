/*global HTMLCanvasElement, Scene*/
// Adapted from http://www.html5rocks.com/en/tutorials/device/orientation/
let OrientationEvtListener = function(scene, callback) {
    'use strict';

    this.scene = scene;
    this.canvas = this.scene.canvas;

    if (this.canvas instanceof HTMLCanvasElement === false) {
        throw 'OrientationEvtListener.ctor : canvas is not a HTMLCanvasElement';
    }

    if (!window.DeviceOrientationEvent) {
        console.log('DeviceOrientation is not supported');
    }

    this.callback = null;
    this.callbackRelease = null;

    if (callback !== undefined && callback instanceof Function) {
        this.callback = callback;
    }

    // attach event listener to the doc (with capturing)
    if(this.scene.listenToEvents)
        window.addEventListener('deviceorientation', (e) => this.move(e));
};

OrientationEvtListener.prototype.stop = function() {
    'use strict';
    window.removeEventListener('deviceorientation', (e) => this.move(e));
};

OrientationEvtListener.prototype.move = function(event) {
    'use strict';
    // A voir
    event.preventDefault();
    let dir = event.alpha, // compass direction (in deg)
        tiltFB = event.beta, // front-back (in deg)
        tiltLR = event.gamma; // left-right (in deg)

    if (dir && tiltFB && tiltLR) {
        this.callback(dir, tiltFB, tiltLR);
    }
};

OrientationEvtListener.prototype.update = function() {
    'use strict';
};
