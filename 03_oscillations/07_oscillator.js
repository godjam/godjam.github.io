/*global Scene, Oscillator, Pendulum, Mover, Spring, Gravity, Friction*/
var OscillatorScene = function (options) {
    "use strict";
    Scene.call(this);
    this.oscillator = new Oscillator(this, options);
};
OscillatorScene.prototype = Object.create(Scene.prototype);
OscillatorScene.prototype.constructor = OscillatorScene;

OscillatorScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.oscillator.update();
    this.oscillator.display(this.ctx);
    Scene.prototype.loop.call(this);
};
