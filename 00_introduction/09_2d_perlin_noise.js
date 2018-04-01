/*global Scene, toxi, Color */
var PerlinNoiseScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Perlin Noise", "2D plot of Perlin noise. Evolve with time.");

    this.t = 0;
    this.color = Color.createLightColor();
    this.perlin = toxi.math.noise.simplexNoise;
    this.image = this.ctx.getImageData(0, 0, this.size.x, this.size.y);
    this.data = this.image.data;
};
PerlinNoiseScene.prototype = Object.create(Scene.prototype);
PerlinNoiseScene.prototype.constructor = PerlinNoiseScene;


PerlinNoiseScene.prototype.loop = function () {
    "use strict";
    var x = 0,
        y = 0,
        n = 0,
        c = 0,
        i = 0,
        j = 0,
        index = 0;

    for (i = 0; i < this.size.x; i += 1) {
        for (j = 0; j < this.size.y; j += 1) {
            x = (i / this.size.x);
            y = (j / this.size.y);
            n = this.perlin.noise(x, y, this.t) - 0.5;
            c = this.color.copy().modify(n, 0, 0);
            index = Math.round(i + j * this.size.x) * 4;
            this.data[index] = c.r;
            this.data[index + 1] = c.g;
            this.data[index + 2] = c.b;
            this.data[index + 3] = 255;
        }
    }
    this.ctx.putImageData(this.image, 0, 0);
    this.t += this.frameloop.delta;

    Scene.prototype.loop.call(this);
};