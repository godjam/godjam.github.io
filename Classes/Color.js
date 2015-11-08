/*global Tools*/
var Color = function (r, g, b) {
    "use strict";
    this.r = r;
    this.g = g;
    this.b = b;
};

Color.create = function () {
    "use strict";
    var c = new Color(Math.round(Math.random() * 255),
                       Math.round(Math.random() * 255),
                       Math.round(Math.random() * 255));
    return c;
};

Color.createLightColor = function () {
    "use strict";
    var c = new Color(0, 0, 0),
        h = Math.random(),
        s = 0.2 * Math.random() + 0.8,
        l = 0.8;
    
    c.hslToRgb(h, s, l);
    return c;
};

Color.createBrightColor = function () {
    "use strict";
    var c = new Color(0, 0, 0),
        h = Math.random();
    
    c.hslToRgb(h, 1, 0.65);
    return c;
};

Color.createNormalDistribColor = function (baseHue) {
    "use strict";
    // by default yelloish-green base color
    if (baseHue === undefined) {
        baseHue = 0.25;
    }
    
    var c = new Color(0, 0, 0),
        // normalRnd * sd + mean
        rnd = Tools.normalRnd() * 0.25 + baseHue;
    c.hslToRgb(rnd, 1, 0.65);
    return c;
};

Color.prototype.copy = function () {
    "use strict";
    var c = new Color(this.r, this.g, this.b);
    return c;
};

Color.prototype.ToHex = function () {
    "use strict";
    return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
};

Color.prototype.To0xHex = function () {
    "use strict";
    return "0x" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
};


Color.prototype.fromHex = function (hex) {
    "use strict";
    var i = parseInt(hex, 16);
    this.r = (i >> 16) & 255;
    this.g = (i >> 8) & 255;
    this.b = i & 255;
    return this;
};

Color.prototype.lighten = function () {
    "use strict";
    var l = 0.05;
    return this.modify(l / 2, 0, l);
};

Color.prototype.darken = function () {
    "use strict";
    var l = 0.05;
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

Color.prototype.redify = function () {
    "use strict";
    return this.modify(-0.05, 0, 0);
};

Color.prototype.bluify = function () {
    "use strict";
    return this.modify(0.05, 0, 0);
};

Color.prototype.modify = function (h, s, l) {
    "use strict";
    var hsl = this.rgbToHsl();
    hsl[0] += h;
    hsl[1] += s;
    hsl[2] += l;
    this.hslToRgb(hsl[0], hsl[1], hsl[2]);
    return this;
};


/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
Color.prototype.hslToRgb = function (h, s, l) {
    "use strict";
    var q = 0, p = 0;

    h = Tools.clamp(h, 0, 1);
    s = Tools.clamp(s, 0, 1);
    l = Tools.clamp(l, 0, 1);
    
    if (s === 0) {
        this.r = this.g = this.b = Math.round(l * 255); // achromatic
    } else {
        q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        p = 2 * l - q;
        this.r = Math.round(this.hue2rgb(p, q, h + 1 / 3) * 255);
        this.g = Math.round(this.hue2rgb(p, q, h) * 255);
        this.b = Math.round(this.hue2rgb(p, q, h - 1 / 3) * 255);
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
        d,
        h,
        s,
        l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }

    return [h, s, l];
};
