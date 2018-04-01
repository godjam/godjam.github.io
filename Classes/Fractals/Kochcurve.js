/*global Vector2*/
let Kochline = function (start, end) {
    "use strict";

    if (start instanceof Vector2 === false ||
            end instanceof Vector2 === false) {
        throw "Kochline.constructor : start or end are not Vector2";
    }
    this.start = start.copy();
    this.end = end.copy();
};

Kochline.prototype.display = function (ctx, color) {
    "use strict";
    ctx.beginPath();
    ctx.strokeStyle = color.rgba();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.closePath();
};

Kochline.prototype.getKochA = function () {
    "use strict";
    return this.start;
};

Kochline.prototype.getKochB = function () {
    "use strict";
    let b = this.end.sub(this.start);
    b.divInPlace(3);
    b.addInPlace(this.start);
    return b;
};

Kochline.prototype.getKochC = function () {
    "use strict";
    let c = null,
        b = this.end.sub(this.start);
    b.divInPlace(3);

    c = b.copy();
    c.rotateInPlace(-Math.PI / 3, new Vector2());
    c.addInPlace(b);
    c.addInPlace(this.start);

    return c;
};

Kochline.prototype.getKochD = function () {
    "use strict";
    let d = this.end.sub(this.start);
    d.multInPlace(2 / 3);
    d.addInPlace(this.start);
    return d;
};

Kochline.prototype.getKochE = function () {
    "use strict";
    return this.end;
};

//***************************************************
let Kochcurve = function (start, end, colormap) {
    "use strict";
    this.list = [];
    this.colormap = colormap;
    this.max = 0;
    this.min = 0;
    let i = 0;

    // add first line
    this.list.push(new Kochline(start, end));
    // generate 5 levels
    for (i = 0; i < 4; i += 1) {
        this.generate();
    }
};

Kochcurve.prototype.generate = function () {
    "use strict";
    let next = [];

    this.list.forEach(function (line) {
        let a = line.getKochA(),
            b = line.getKochB(),
            c = line.getKochC(),
            d = line.getKochD(),
            e = line.getKochE();
        next.push(new Kochline(a, b));
        next.push(new Kochline(b, c));
        next.push(new Kochline(c, d));
        next.push(new Kochline(d, e));
    });

    this.list = next;
};

Kochcurve.prototype.display = function (ctx) {
    "use strict";
    let i = 0, color = null;

    if (this.max < this.list.length) {
        this.max += 1;
    } else if (this.min < this.list.length) {
        this.min += 1;
    } else {
        this.max = this.min = 0;
    }

    for (i = this.min; i < this.max; i += 1) {
        color = this.colormap.getByVal(i, this.list.length);
        this.list[i].display(ctx, color);
    }
};