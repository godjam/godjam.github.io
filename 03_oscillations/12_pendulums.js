/*global Scene, MouseEvtListener, Pendulum, Mover, console*/
let OscillationScene = function (options) {
    "use strict";
    this.intro("Pendulum", "Simulates a pendulum attached to a pendulum.");

    Scene.call(this, options);
    let w = this.size.x,
        h = this.size.y,
        s = Math.max(w, h),
        r0 = Math.random() * s / 4 + s / 4,
        r1 = Math.random() * s / 8 + s / 4;
    this.pendulum0 = new Pendulum(w / 2, 0, r0, Math.PI / 2);
    this.pendulum1 = new Pendulum(w / 2, 0, r1, Math.PI / 2);
    this.mover0 = new Mover(0, 0, this, s / 20);
    this.mover1 = new Mover(0, 0, this, s / 25);
    this.addListener(new MouseEvtListener(this, (p) => this.attract(p)));
};
OscillationScene.prototype = Object.create(Scene.prototype);
OscillationScene.prototype.constructor = OscillationScene;

OscillationScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    this.pendulum0.applyOn(this.mover0);
    this.pendulum1.origin = this.pendulum0.location;
    this.pendulum1.applyOn(this.mover1);

    this.pendulum0.display(this.ctx);
    this.pendulum1.display(this.ctx);
    this.mover0.display(this.ctx);
    this.mover1.display(this.ctx);
    Scene.prototype.loop.call(this);
};

OscillationScene.prototype.attract = function (position) {
    "use strict";
    let d = this.pendulum0.origin.sub(position);
    this.pendulum0.angle = -d.heading() - (Math.PI / 2);
    this.pendulum0.angularVelocity = 0;

    this.pendulum1.angle = this.pendulum0.angle / 2;
    this.pendulum1.angularVelocity = 0;
};