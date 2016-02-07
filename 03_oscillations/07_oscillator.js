/*global Scene, Oscillator*/
var OscillatorScene = function(options) {
    "use strict";
    Scene.call(this);
    if (options.oscillatortype === 1) {
        this.intro("Wave: Insect-Like");
    }
    // 3.8 angular acceleration wave
    else if (options.oscillatortype === 2) {
        this.intro("Wave: Angular Acceleration");
    }
    // 3.9 : Perlin noise
    else if (options.oscillatortype === 3) {
        this.intro("Wave: Perlin");
    }
    // 3.10 : two waves
    else if (options.oscillatortype === 4) {
        this.intro("Waves");
    }
    // 3.11 : additive waves
    else if (options.oscillatortype === 5) {
        this.intro("Additive Waves");
    }
    this.oscillator = new Oscillator(this, options);
};
OscillatorScene.prototype = Object.create(Scene.prototype);
OscillatorScene.prototype.constructor = OscillatorScene;

OscillatorScene.prototype.loop = function() {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.oscillator.update();
    this.oscillator.display(this.ctx);
    Scene.prototype.loop.call(this);
};


OscillatorScene.prototype.resize = function() {
    "use strict";
    Scene.prototype.resize.call(this);
    if(this.oscillator) {
        this.oscillator.resize();
    }
};
