/*global Vector2, ColorMap, Color*/
//******************************************************************************
var SpkTriangle = function (scene, x, y, r, d) {
    "use strict";

    this.scene = scene;
    x = x || scene.x / 2;
    y = y || scene.y / 2;
    r = r || Math.min(this.size.x, this.size.y) / 2 * 0.8;
    d = d || 5;

    this.list = [];
    this.maxdepth = d;
    this.colormap = new ColorMap(Color.createBrightColor(), Color.createBrightColor(), 20);
    var center = new Vector2(x, y),
        p1 = Vector2.fromPolar(r, 2 * Math.PI / 3).addInPlace(center),
        p2 = Vector2.fromPolar(r, 4 * Math.PI / 3).addInPlace(center),
        p3 = Vector2.fromPolar(r, 0).addInPlace(center);

    this.generate(p1, p2, p3, 0);
};

SpkTriangle.prototype.generate = function (p1, p2, p3, d) {
    "use strict";
    var next = [], a, b, c;

    // add triplets
    next.push(p1);
    next.push(p2);
    next.push(p3);

    if (d < this.maxdepth) {
        d += 1;
        a = this.getMiddlePoint(p1, p2);
        b = this.getMiddlePoint(p1, p3);
        c = this.getMiddlePoint(p2, p3);
        this.generate(p1, a, b, d);
        this.generate(p2, a, c, d);
        this.generate(p3, b, c, d);
    } else {
        this.list.push(next);
    }
};

SpkTriangle.prototype.display = function (ctx) {
    "use strict";
    var i = 0;
    for(i = 0; i < this.list.length; i += 1) {
        ctx.beginPath();
        ctx.fillStyle = this.colormap.getByVal(i, this.list.length).ToHex();
        ctx.moveTo(this.list[i][0].x, this.list[i][0].y);
        ctx.lineTo(this.list[i][1].x, this.list[i][1].y);
        ctx.lineTo(this.list[i][2].x, this.list[i][2].y);
        ctx.fill();
        ctx.closePath();
    }
};

SpkTriangle.prototype.getMiddlePoint = function (p1, p2) {
    "use strict";
    var b = p2.sub(p1);
    b.divInPlace(2);
    b.addInPlace(p1);
    return b;
};