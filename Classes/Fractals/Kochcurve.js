/*global Vector2*/
var Kochline = function (start, end) {
    "use strict";
    
    if (start instanceof Vector2 === false ||
            end instanceof Vector2 === false) {
        throw "Kochline.constructor : start or end are not Vector2";
    }
    this.start = start.copy();
    this.end = end.copy();
};

Kochline.prototype.display = function (ctx) {
    "use strict";
    ctx.beginPath();
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
    var b = this.end.sub(this.start);
    b.divInPlace(3);
    b.addInPlace(this.start);
    return b;
};

Kochline.prototype.getKochC = function () {
    "use strict";
    var c = null,
        b = this.end.sub(this.start);
    b.divInPlace(3);
    
    c = b.copy();
    c.rotateInPlace(-Math.PI / 3, new Vector2(0, 0));
    c.addInPlace(b);
    c.addInPlace(this.start);
    
    return c;
};

Kochline.prototype.getKochD = function () {
    "use strict";
    var d = this.end.sub(this.start);
    d.multInPlace(2 / 3);
    d.addInPlace(this.start);
    return d;
};

Kochline.prototype.getKochE = function () {
    "use strict";
    return this.end;
};

//***************************************************
var Kochcurve = function (start, end) {
    "use strict";
    this.list = [];
    var i = 0;
    
    // add first line
    this.list.push(new Kochline(start, end));
    // generate 5 levels
    for (i = 0; i < 5; i += 1) {
        this.generate();
    }
};

Kochcurve.prototype.generate = function () {
    "use strict";
    var next = [];
    
    this.list.forEach(function (line) {
        var a = line.getKochA(),
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
    this.list.forEach(function (line) {
        line.display(ctx);
    });
};