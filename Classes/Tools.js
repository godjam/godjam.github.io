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
