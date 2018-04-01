/*global Mover, toxi*/
let Oscillator = function (scene, options) {
    "use strict";
    this.options = options;

    if (this.options === undefined) {
        this.options = {oscillatortype: 0};
    }

    this.angle = 0;
    this.velocity = 0.2;
    this.count = 50;
    this.scene = scene;
    this.size = this.scene.size.x / this.count;
    this.amplitude = this.scene.size.y / 4;
    this.startAngle = 0;
    this.movers = [];
    let i = 0;
    for (i = 0; i < this.count; i += 1) {
        this.movers[i] = new Mover((i + 1) * this.size, this.scene.size.y / 2, scene, this.size);
        this.movers[i].useAngularAcceleration = true;
    }
};

Oscillator.prototype.update = function () {
    "use strict";

    let i = 0;

    this.startAngle -= 0.02;
    this.angle = this.startAngle;

    for (i = 0; i < this.count; i += 1) {
        if (this.options.oscillatortype === 0) {
            this.updateWave(i);

        // 3.7 insect-like wave
        } else if (this.options.oscillatortype === 1) {
            this.updateInsectLike(i);

        // 3.8 angular acceleration wave
        } else if (this.options.oscillatortype === 2) {
            this.updateAngularAcceleration(i);

        // 3.9 : Perlin noise
        } else if (this.options.oscillatortype === 3) {
            this.updatePerlinNoise(i);

        // 3.10 : two waves
        } else if (this.options.oscillatortype === 4) {
            this.updateTwoWaves(i);

        // 3.11 : additive waves
        } else if (this.options.oscillatortype === 5) {
            this.updateAdditiveWaves(i);
        }

        this.movers[i].update();
        this.angle += this.velocity;
    }
};


Oscillator.prototype.display = function (ctx) {
    "use strict";
    let i = 0;
    for (i = 0; i < this.count; i += 1) {
        this.movers[i].display(ctx);
    }
};


Oscillator.prototype.resize = function () {
    "use strict";
    this.size = this.scene.size.x / this.count;
};

Oscillator.prototype.updateWave = function (i) {
    "use strict";
    let ox = this.size / 2,
        oy = this.scene.size.y / 2,
        x = i * this.size,
        y = Math.sin(this.angle) * this.amplitude;
    this.movers[i].location.x = ox + x;
    this.movers[i].location.y = oy + y;
};

Oscillator.prototype.updateInsectLike = function (i) {
    "use strict";
    let ox = this.size / 2,
        oy = this.scene.size.y / 2,
        x = i * this.size,
        y = Math.min(Math.sin(this.angle) * this.amplitude, 0);
        //y = -Math.abs(Math.sin(this.angle) * this.amplitude);
    this.movers[i].location.x = ox + x;
    this.movers[i].location.y = oy + y;

};

Oscillator.prototype.updateAngularAcceleration = function (i) {
    "use strict";

    let ox = this.size / 2,
        oy = this.scene.size.y / 2,
        x = i * this.size,
        y = Math.sin(this.angle) * this.amplitude;

    this.movers[i].angle = Math.cos(this.angle);
    this.movers[i].location.x = ox + x;
    this.movers[i].location.y = oy + y;
};

Oscillator.prototype.updatePerlinNoise = function (i) {
    "use strict";
    let ox = this.size / 2,
        oy = this.scene.size.y / 2,
        x = i * this.size,
        y = toxi.math.noise.simplexNoise.noise(this.scene.size.y / 2, this.angle / 2) * this.amplitude;
    this.movers[i].location.x = ox + x;
    this.movers[i].location.y = oy + y;
};

Oscillator.prototype.updateTwoWaves = function (i) {
    "use strict";
    let ox = this.size / 2,
        oy = this.scene.size.y / 2,
        x = i * this.size,
        y = toxi.math.noise.simplexNoise.noise(this.scene.size.x / 2, this.angle / 2) * this.amplitude,
        s = Math.pow(Math.cos(this.angle), 5) * this.size;
    this.movers[i].location.x = ox + x;
    this.movers[i].location.y = oy + y;
    this.movers[i].mass = s;
};

Oscillator.prototype.updateAdditiveWaves = function (i) {
    "use strict";
    let ox = this.size / 2,
        oy = this.scene.size.y / 2,
        x = i * this.size,
        y = toxi.math.noise.simplexNoise.noise(this.angle / 2, this.scene.size.y / 2),
        s = Math.pow(Math.cos(this.angle), 3);
    this.movers[i].angle = Math.sin(this.angle);
    this.movers[i].location.x = ox + x;
    this.movers[i].location.y = oy + (y * s * this.amplitude * 2);
    this.movers[i].mass = s * this.size * 2;
};