/*global Scene, Kochcurve, Vector2, ColorMap, Color*/
//*************************************************
let RecursiveCircleScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Recursive Circles");
    let center = new Vector2(this.size.x / 2, this.size.y / 2),
        r = Math.min(this.size.x, this.size.y) / 2 - 20,
        p1 = Vector2.fromPolar(r, 2 * Math.PI / 3).addInPlace(center),
        p2 = Vector2.fromPolar(r, 4 * Math.PI / 3).addInPlace(center),
        p3 = Vector2.fromPolar(r, 0).addInPlace(center),
        c1 = Color.createLightColor(0.3),
        c2 = Color.createBrightColor();
    this.theta = Math.PI * 8 / 3;
    this.maxdepth = 5;//~~(Math.log(this.size.x));
    this.colormap = ColorMap.create(this.maxdepth);

};
RecursiveCircleScene.prototype = Object.create(Scene.prototype);
RecursiveCircleScene.prototype.constructor = RecursiveCircleScene;

RecursiveCircleScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    let s = 0.5 + Math.sin(this.theta) * 0.3;
    this.theta += this.frameloop.delta / 2;
    if(this.theta > Math.PI * 2) {this.theta -= Math.PI * 2; }

    this.ctx.save();
    this.ctx.translate(this.size.x / 2, this.size.y / 2);
    this.ctx.scale(s, s);
    this.ctx.rotate(this.theta);
    this.drawCircle(this.ctx, 0, 0, this.size.x, 0);
    this.ctx.restore();

    Scene.prototype.loop.call(this);
};

RecursiveCircleScene.prototype.drawCircle = function (ctx, x, y, radius, d) {
    "use strict";
    //console.log(d);
    ctx.beginPath();
    ctx.fillStyle = this.colormap.getByVal(d, this.maxdepth).rgba();
    x = ~~x;
    y = ~~y;
    radius = ~~ radius;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    d += 1;

    if (radius > 5 && d < this.maxdepth) {
        radius *= 0.25;
        this.drawCircle(ctx, x + radius, y, radius, d);
        this.drawCircle(ctx, x - radius, y, radius, d);
        this.drawCircle(ctx, x, y + radius, radius, d);
        this.drawCircle(ctx, x, y - radius, radius, d);
    }
};

RecursiveCircleScene.prototype.cantor = function (ctx, x, y, len) {
    "use strict";
    let height = 40;
    ctx.beginPath();
    ctx.fillRect(x, y, len, height);
    //ctx.stroke();
    ctx.closePath();

    if (len > 1) {
        y += height * 2;
        len /= 5;
        this.cantor(ctx, x, y, len);
        this.cantor(ctx, x + 2 * len, y, len);
        this.cantor(ctx, x + 4 * len, y, len);
    }
};