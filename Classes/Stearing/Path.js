/*global Vector2, toxi, Tools*/

var Path = function (count, scene) {
    "use strict";

    if (count < 2 || count === undefined) { count = 2; }
    if (count > 10) { count = 10; }

    this.z = 0;
    this.points = [];
    this.radius = 20;
    this.scene = scene;
    this.p = new Vector2(0, 0);
    this.v = new Vector2(0, 0);

    var i = 0, theta = 0,
        center = new Vector2(this.scene.size.x / 2, this.scene.size.y / 2),
        r = Math.min(this.scene.size.x, this.scene.size.y) / 2 - 20;

    if (count <= 3) {
        theta = Math.PI * 2 / count;
    } else {
        theta = Math.PI * 2 / (count - 1);
    }

    for (i = 0; i < count; i += 1) {
        var v = Vector2.fromPolar(r, i * theta);
        v.addInPlace(center);
        this.points.push(v);
    }
};

Path.prototype.updatePerlin = function () {
    "use strict";
    var a = 0,
        i = 0;

    this.z += 0.01;
    for (i = 0; i < this.points.length - 1; i += 1) {
        this.p = this.points[i];
        a = toxi.math.noise.simplexNoise.noise(this.p.x / this.scene.size.x,
                                                this.p.y / this.scene.size.y,
                                                this.z) + 1;
        a *= Math.PI * 2;
        this.v.fromPolar(1, a);
        this.v.normalizeInPlace();
        this.p.addInPlace(this.v);
        this.p.x = Tools.clamp(this.p.x, 0, this.scene.size.x);
        this.p.y = Tools.clamp(this.p.y, 0, this.scene.size.y);
    }
    this.points[i] = this.points[0];
};

Path.prototype.display = function (ctx) {
    "use strict";
    var i = 0;
    for (i = 0; i < this.points.length - 1; i += 1) {
        ctx.beginPath();
        ctx.lineWidth = 2 * this.radius;
        ctx.strokeStyle = "#def";
        ctx.lineCap = "round";
        ctx.moveTo(this.points[i].x, this.points[i].y);
        ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
        ctx.stroke();
        ctx.closePath();

        /*
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#333";
        ctx.moveTo(this.points[i].x, this.points[i].y);
        ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
        ctx.stroke();
        ctx.closePath();
        */
    };
};