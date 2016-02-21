/*global console, Array2D, ColorMap*/
var CA = function(columns, lines, scene) {
    "use strict";

    if (typeof columns !== 'number') {
        throw "CA.constructor: columns is not a scalar";
    }

    this.scene = scene;

    this.columns = ~~columns;
    this.lines = ~~lines;
    this.currentline = 0;
    this.colormap = ColorMap.create();

    this.gen = null;
    this.gencopy = null;
    this.ruleset = [];
    this.rule = 30;

    this.regenerate();
};


CA.prototype.init = function() {
    "use strict";
    var i = 0,
        m = 0;
    this.currentline = 0;
    this.colormap = ColorMap.create();

    this.gen = new Array2D(this.columns, this.lines);
    this.gencopy = null;

    for (i = 0; i < this.columns; i += 1) {
        this.gen.set(i, this.currentline, Math.round(Math.random()));
    }

    // set the middle cell to 1
    // m = Math.floor(this.columns / 2);
    // this.gen[m] = 1;

    this.gencopy = this.gen.copy();
};


CA.prototype.step = function() {
    "use strict";
    var i = 0,
        a = 0,
        b = 0,
        c = 0,
        g = this.currentline;
    this.currentline += 1;

    this.gen.set(0, this.currentline, this.gen.get(0, g));
    this.gen.set(this.columns - 1, this.currentline, this.gen.get(this.columns - 1, g));

    for (i = 1; i < this.columns - 1; i += 1) {
        a = this.gen.get(i - 1, g);
        b = this.gen.get(i, g);
        c = this.gen.get(i + 1, g);
        this.gen.set(i, this.currentline, parseInt(this.rules(a, b, c), 10));
    }

    this.gencopy = this.gen.copy();

    if (this.currentline > this.lines) {
        this.regenerate();
    }
};

CA.prototype.regenerate = function() {
    "use strict";
    var i = 0,
        s = "",
        pad = "00000000",
        a = "",
        l = 0;

    this.rule = ~~(Math.random() * 256);
    s = this.rule.toString(2);
    a = pad.substring(0, pad.length - s.length) + s;
    l = a.length;

    for (i = 0; i < l; i += 1) {
        this.ruleset[i] = a.charAt(l - (i + 1));
    }

    this.init();
};


CA.prototype.rules = function(a, b, c) {
    "use strict";
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
        throw "CA.rules: a or b or c is not a scalar";
    }
    var s = (a).toString() + (b).toString() + (c).toString(),
        idx = parseInt(s, 2);
    return this.ruleset[idx];
};

CA.prototype.display = function(ctx) {
    "use strict";
    var i = 0, j = 0, x = 0, y = 0,
        s = this.scene.size.x / this.columns,
        w = ~~(s / 2);

    for (j = 0; j < this.gencopy.getHeight(); j += 1) {
        ctx.fillStyle = this.colormap.getByVal(j, this.lines).ToHex();
        y = ~~(s * j + w);
        for (i = 0; i < this.gencopy.getWidth(); i += 1) {
            x = ~~(s * i + w);
            if (this.gencopy.get(i, j) !== 0) {
                ctx.fillRect(x, y, w, w);
            }
        }
    }
    ctx.fillStyle = "#000";
    ctx.font = "16px verdana";
    ctx.fillText("rule " + this.rule, 64, 32);
};
