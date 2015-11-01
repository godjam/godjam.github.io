var Tools = {};

Tools.clamp = function (v, min, max) {
    "use strict";
    if (v > max) {v = max; }
    if (v < min) {v = min; }
    return v;
};
