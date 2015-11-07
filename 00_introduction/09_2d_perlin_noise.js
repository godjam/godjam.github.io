/*global Scene, toxi, Color */
var PerlinNoiseScene = function () {
    "use strict";
    Scene.call(this);
    this.t = 0;
    this.color = Color.createLightColor();
    this.perlin = toxi.math.noise.simplexNoise;
    this.image = this.ctx.getImageData(0, 0, this.width, this.height);
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
    
    for (i = 0; i < this.width; i += 1) {
        for (j = 0; j < this.height; j += 1) {
            x = (i / this.width);
            y = (j / this.height);
            n = this.perlin.noise(x, y, this.t) - 0.5;
            c = this.color.copy().modify(n, 0, 0);
            index = Math.round(i + j * this.width) * 4;
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