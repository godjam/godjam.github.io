/*global Vector2*/

var Oscillator = function (w, h) {
    "use strict";
    this.angle = 0;
    this.velocity = 0.2;
    this.amplitude = h / 4;
    this.count = 50;
    this.w = w;
    this.h = h;
    this.size = w / this.count;
    this.frameCount = 0;
    this.startAngle = 0;
};


Oscillator.prototype.update = function () {
    "use strict";
};

Oscillator.prototype.display = function (ctx) {
    "use strict";
    var ox = this.size / 2,
        oy = this.h / 2,
        i = 0,
        x = 0,
        y = 0;

    this.startAngle -= 0.02;
    this.angle = this.startAngle;
    
    for (i = 0; i < 50; i += 1) {
        x = i * this.size;
        y = noise.perlin2(this.angle, 0) * this.amplitude;
        this.frameCount += 1;

        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(ox + x, oy + y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        this.angle += this.velocity;
    }
};

