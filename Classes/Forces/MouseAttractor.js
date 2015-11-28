/*global Vector2, Mover, Attractor, MouseEvtListener, HTMLCanvasElement */
function MouseAttractor(m, G, mouseListener, canvas, attractor) {
    "use strict";
    if (mouseListener !== null) {
        throw "MouseAttractor.ctor : mouseListener is not null";
    }
    
    if (canvas instanceof HTMLCanvasElement === false) {
        throw "MouseAttractor.ctor : canvas is not a HTMLCanvasElement";
    }
    
    
    this.mouse = new Vector2(canvas.width / 2, canvas.height / 2);
    
    if (attractor === undefined) {
        attractor = new Attractor(this.mouse.x, this.mouse.y, m, G);
    }
    this.attractor = attractor;
    
    // init listener
    mouseListener = new MouseEvtListener(canvas, this, this.update);
}

MouseAttractor.prototype.update = function (position) {
    "use strict";
    this.mouse = position;
};

MouseAttractor.prototype.applyOn = function (mover) {
    "use strict";
    this.attractor.location = this.mouse;
    this.attractor.applyOn(mover);
};


MouseAttractor.prototype.display = function (ctx) {
    "use strict";
    this.attractor.display(ctx);
};