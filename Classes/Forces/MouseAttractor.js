/*global Vector2, Mover, Attractor*/
function MouseAttractor(m, G, canvasLeft, canvasTop) {
    "use strict";
    this.mouse = new Vector2(0, 0);
    this.attractor = new Attractor(this.mouse.x,
                                   this.mouse.y,
                                   m,
                                   G);
    this.canvasLeft = canvasLeft;
    this.canvasTop = canvasTop;
    
    // attach event listener to the doc
    document.addEventListener("mousemove", this.update.bind(this));
}

MouseAttractor.prototype.update = function (event) {
    "use strict";
    this.mouse.x = event.clientX - this.canvasLeft;
    this.mouse.y = event.clientY - this.canvasTop;
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