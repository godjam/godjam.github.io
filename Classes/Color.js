/*jslint bitwise: true */
/*global Tools*/
var Color = function (r, g, b, a) {
    "use strict";
    if (r === undefined) {r = 1; }
    if (g === undefined) {g = 1; }
    if (b === undefined) {b = 1; }
    if (a === undefined) {a = 0.5; }


    this.r = r;
    this.g = g;
    this.b = b;
    this.h = 0;
    this.s = 0;
    this.l = 0;
    this.a = a;
    // update hsl values
    this.rgbToHsl();
};

Color.createHsl = function (h, s, l, a) {
    "use strict";
    var c = new Color();
    c.hslToRgb(h, s, l);
    c.a = a || c.a;
    return c;
};


Color.createSoftColor = function (a) {
    "use strict";
    return Color.createHsl(Math.random(), 0.5, 0.9, a);
};

Color.createLightColor = function (a) {
    "use strict";
    return Color.createHsl(Math.random(),
                           0.2 * Math.random() + 0.8,
                           0.8,
                           a);
};

Color.createBrightColor = function (a) {
    "use strict";
    return Color.createHsl(Math.random(), 1, 0.65, a);
};

Color.createStrongColor = function (a) {
    "use strict";
    return Color.createHsl(Math.random(), 1, 0.3, a);
};


Color.createDarkColor = function (a) {
    "use strict";
    return Color.createHsl(Math.random(), 1, 0.1, a);
};


Color.createNormalDistribColor = function (baseHue) {
    "use strict";
    // by default yelloish-green base color
    if (baseHue === undefined) {
        baseHue = 0.25;
    }

    // normalRnd * sd + mean
    var rnd = Tools.normalRnd() * 0.25 + baseHue;
    return Color.createHsl(rnd, 1, 0.65);
};

Color.prototype.copy = function () {
    "use strict";
    var c = new Color(this.r, this.g, this.b, this.a);
    return c;
};

Color.prototype.rgba = function () {
    "use strict";
    var s = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    return s;
};


Color.prototype.toHex = function () {
    "use strict";
    return "#" + (this.ToInt()).toString(16).slice(1);
};


Color.prototype.ToInt = function () {
    "use strict";
    var c = (1 << 24) + (this.r << 16) + (this.g << 8) + this.b;
    return c;
};

Color.prototype.fromHex = function (hex) {
    "use strict";
    var i = parseInt(hex, 16);
    this.r = (i >> 16) & 255;
    this.g = (i >> 8) & 255;
    this.b = i & 255;
    return this;
};

Color.prototype.lighten = function (l) {
    "use strict";
    if (l === undefined) { l = 0.05; }
    return this.modify(l / 2, 0, l);
};

Color.prototype.darken = function (l) {
    "use strict";
    if (l === undefined) { l = 0.05; }
    return this.modify(-l / 2, 0, -l);
};

Color.prototype.mutate = function () {
    "use strict";
    var h = 0.02 * Math.random() - 0.01,
        l = 0.002 * Math.random() - 0.001;
    return this.modify(h, 0, l);
};

Color.prototype.desaturate = function () {
    "use strict";
    return this.modify(0, -0.1, 0.05);
};

Color.prototype.saturate = function () {
    "use strict";
    return this.modify(0, 0.1, -0.05);
};

Color.prototype.redify = function (h) {
    "use strict";
    if (h === undefined) { h = 0.05; }
    return this.modify(-h, 0, 0);
};

Color.prototype.bluify = function (h) {
    "use strict";
    if (h === undefined) { h = 0.05; }
    return this.modify(h, 0, 0);
};

Color.prototype.modify = function (h, s, l) {
    "use strict";
    var c = this.copy();
    c.hslToRgb(c.h + h, c.s + s, c.l + l);
    return c;
};


/**
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 *
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue (can be undefined)
 * @param   Number  s       The saturation (can be undefined)
 * @param   Number  l       The lightness (can be undefined)
 * updates hsl and rgb of the color
 * if hsl parameters are undefined, only updates rgb according to current color hsl
 */
Color.prototype.hslToRgb = function (h, s, l) {
    "use strict";
    var q = 0, p = 0;

    // copy + clamp h, s, l
    if (h !== undefined) {this.h = Tools.clamp(h, 0, 1); }
    if (s !== undefined) {this.s = Tools.clamp(s, 0, 1); }
    if (l !== undefined) {this.l = Tools.clamp(l, 0, 1); }

    if (this.s === 0) {
        this.r = this.g = this.b = Math.round(this.l * 255); // achromatic
    } else {
        q = this.l < 0.5 ? this.l * (1 + this.s) : this.l + this.s - this.l * this.s;
        p = 2 * this.l - q;
        this.r = Math.round(this.hue2rgb(p, q, this.h + 1 / 3) * 255);
        this.g = Math.round(this.hue2rgb(p, q, this.h) * 255);
        this.b = Math.round(this.hue2rgb(p, q, this.h - 1 / 3) * 255);
    }
};

Color.prototype.hue2rgb = function (p, q, t) {
    "use strict";
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
};

/**
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 *
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
Color.prototype.rgbToHsl = function () {
    "use strict";
    var r = this.r / 255,
        g = this.g / 255,
        b = this.b / 255,
        max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        d;

    this.l = (max + min) / 2;

    if (max === min) {
        this.h = this.s = 0; // achromatic
    } else {
        d = max - min;
        this.s = this.l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            this.h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            this.h = (b - r) / d + 2;
            break;
        case b:
            this.h = (r - g) / d + 4;
            break;
        }
        this.h /= 6;
    }
};


var ColorMap = function(start, stop, steps) {
    "use strict";
    // TODO checks

    var i = 0, t = null,
        delta = new Color;

    this.steps = steps;
    this.map = [];

    // delta
    delta.r = (stop.r - start.r) / steps;
    delta.g = (stop.g - start.g) / steps;
    delta.b = (stop.b - start.b) / steps;
    delta.a = (stop.a - start.a) / steps;
    // update hsl values
    delta.rgbToHsl();

    for (i = 0; i < steps; i += 1) {
        t = start.copy();
        t.r = ~~(t.r + delta.r * i);
        t.g = ~~(t.g + delta.g * i);
        t.b = ~~(t.b + delta.b * i);
        t.a = t.a + delta.a * i;
        t.rgbToHsl();
        this.map[i] = t;
    }
};

ColorMap.create = function(n) {
    "use strict";
    n = n || 50;
    var c1 = Color.createLightColor(),
        c2 = Color.createBrightColor();
    return new ColorMap(c1, c2, n);
};



ColorMap.prototype.get = function (index) {
    "use strict";
    index = Tools.clamp(index, 0, this.steps-1);
    return this.map[index];
};

ColorMap.prototype.getByVal = function (value, max, min) {
    "use strict";
    max = max || this.steps;
    min = min || 0;
    value = Math.round((value / (max - min) + min) * (this.steps - 1));
    return this.map[value];
};