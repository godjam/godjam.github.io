/*global Scene, Oscillator, Pendulum, Mover, Spring, Gravity, Friction*/
var OscillationScene = function () {
    "use strict";
    Scene.call(this);
    var w = this.width,
        h = this.height;
    //this.oscillator = new Oscillator(w, h);
        //pendulum0 = new Pendulum(width / 2, 0, width / 4, Math.PI / 2),
        //pendulum1 = new Pendulum(width / 2, 0, width / 5, Math.PI / 2),
    this.gravity = new Gravity(0, 0.4);
    this.spring0 = new Spring(w / 2, 0, h / 4);
    this.friction = new Friction(0.2);
    this.mover0 = new Mover(w / 2, h, this, 20);
        //mover1 = new Mover(width, height, , 30);
    //ctx.globalAlpha = 0.2;
};
OscillationScene.prototype = Object.create(Scene.prototype);
OscillationScene.prototype.constructor = OscillationScene;

OscillationScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
    //oscillator.update();
    //oscillator.display(ctx);
    //pendulum0.constains(mover0);
    //pendulum1.origin = pendulum0.location;
    //pendulum1.constains(mover1);
    //pendulum0.display(ctx);
    //pendulum1.display(ctx);

    this.spring0.applyOn(this.mover0);
    this.gravity.applyOn(this.mover0);
    this.friction.applyOn(this.mover0);
    this.mover0.update(this.ctx, false);
    this.spring0.display(this.ctx);
    this.mover0.display(this.ctx);
    //mover1.display(ctx);
    Scene.prototype.loop.call(this);
};