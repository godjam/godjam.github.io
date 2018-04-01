/*global Scene, Mover, Gravity, Liquid, ActiveArea*/
//*************************************************
let DragForceScene = function (options) {
	"use strict";
    Scene.call(this, options);
    this.intro("Drag force", "Apply drag force on each block.");

    let i = 0,
        w = this.size.x,
        h = this.size.y,
        m = Math.max(10, w / 50),
        x = 0,
        y = 0,
        s = 0;
    this.movers = [];
    this.gravity = new Gravity(0, 0.1);
    this.liquid = new ActiveArea(0, h / 2, w, h / 2);
    this.liquid.setEffect(new Liquid(0.8));

    for (i = 0; i < 4; i += 1) {
        x = w / 8 +  i * w / 4;
        y = Math.random() * m + m * 0.8 * (i + 1);
        s = y / 2; 
        this.movers[i] = new Mover(x, y, this, s);
    }
};
DragForceScene.prototype = Object.create(Scene.prototype);
DragForceScene.prototype.constructor =  DragForceScene;

DragForceScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    let i = 0;
    for (i = 0; i < this.movers.length; i += 1) {
        this.liquid.applyOn(this.movers[i]);
        this.gravity.applyOn(this.movers[i]);

        this.movers[i].update(1);
        this.movers[i].display(this.ctx);
    }
    this.liquid.display(this.ctx);

    Scene.prototype.loop.call(this);
};
