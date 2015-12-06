/*global console*/
var Tools = {};

Tools.normalRnd = function () {
    "use strict";
    return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
};

Tools.clamp = function (v, min, max) {
    "use strict";
    if (v > max) {v = max; }
    if (v < min) {v = min; }
    return v;
};

/*
 * http://robertpenner.com/easing/penner_chapter7_tweening.pdf
 * http://www.joshondesign.com/2013/03/01/improvedEasingEquations
 * 
 * t = time (the current time, should be <= to duration)
 * b = begin (start value)
 * c = change (end value - start value)
 * d = duration (the total time of the animation)
 * f = the function to use
 */
Tools.tween = function (t, b, c, d, f) {
    "use strict";
    t = t / d;
    // limit t
    if (t > 1) {t = 1; }
    if (t < 0) {t = 0; }
    if (f === undefined) { f = this.backOut; }
    t = f(t);
    return b + t * c;
};

Tools.linear = function (t) {
    "use strict";
    return t;
};

/*
 * half parabola
 * t should be normalized on [0, 1]
 */
Tools.quadIn = function (t) {
    "use strict";
    return t * t;
};

Tools.quadOut = function (t) {
    "use strict";
    return 1 - (1 - t) * (1 - t);
};

Tools.quadInOut = function (t) {
    "use strict";
    if (t < 0.5) {return this.quadIn(t * 2) / 2; }
    return 1 - this.quadIn((1 - t) * 2) / 2;
};

Tools.backOut = function (t) {
    "use strict";
    // https://docs.sencha.com/extjs/4.2.5/source/Easing.html
    t = t - 1;
    return t * t * ((1.70158 + 1) * t + 1.70158) + 1;
};

Tools.elasticEaseOut = function (t) {
    "use strict";
    var p = 0.3;
    return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
};

/* 
 * The motion object
 */
Tools.Motion = function (obj, property, begin, end, duration, func, isPingPong) {
    "use strict";
    this.obj = obj;
    this.property = property;
	this.begin = begin;
	this.t = 0;
	this.duration = duration;
	this.change = end - begin;
    this.func = func;
    this.isPingPong = isPingPong;
    this.isPlaying = true;
};

Tools.Motion.prototype.update = function (dt) {
    "use strict";
    if (this.isPlaying) {
        // pingpong mode
        if (this.t >= this.duration && this.isPingPong) {
            var total = this.begin + this.change;
            this.begin = total;
            this.change = -this.change;
            this.t = 0;
        }
        
        if (this.t < this.duration) {
            this.t += dt;
            this.obj[this.property] = Tools.tween(this.t, this.begin, this.change, this.duration, this.func);
            //console.log(this.obj[this.property].toFixed(0), "/", (this.begin + this.change), ": ", this.t.toFixed(0));
        }
    }
};

Tools.Motion.prototype.start = function () {
    "use strict";
	this.isPlaying = true;
};

Tools.Motion.prototype.stop = function () {
    "use strict";
	this.isPlaying = false;
};
