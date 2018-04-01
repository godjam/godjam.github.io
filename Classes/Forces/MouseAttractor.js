/*global Vector2, Scene, MouseEvtListener, HTMLCanvasElement */
function MouseAttractor(scene, attractor) {
    "use strict";
    
    if (scene instanceof Scene === false) {
        throw "MouseAttractor.ctor : scene is not a Scene";
    }

    if (scene.canvas instanceof HTMLCanvasElement === false) {
        throw "MouseAttractor.ctor : canvas is not a HTMLCanvasElement";
    }
    
    if (attractor === undefined) {
        throw "MouseAttractor.ctor : attractor is not defined";
    }
    
    this.attractor = attractor;
    this.attractor.location = new Vector2(scene.canvas.width / 2,
                                    scene.canvas.height / 2);
    
    // init listener
    let listener = new MouseEvtListener(scene.canvas, this, this.update);
    scene.addListener(listener);
}

MouseAttractor.prototype.update = function (position) {
    "use strict";
    this.attractor.location = position;
};

MouseAttractor.prototype.applyOn = function (mover) {
    "use strict";
    this.attractor.applyOn(mover);
};


MouseAttractor.prototype.display = function (ctx) {
    "use strict";
    this.attractor.display(ctx);
};