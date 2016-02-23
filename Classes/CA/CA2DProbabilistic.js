/*global CA2D, Tools*/
var CA2DProbabilistic = function (columns, lines, scene) {
    "use strict";
    CA2D.call(this, columns, lines, scene);

    this.randomize();
};
CA2DProbabilistic.prototype = Object.create(CA2D.prototype);
CA2DProbabilistic.prototype.constructor = CA2DProbabilistic;

CA2DProbabilistic.prototype.applyRule = function (currentState, neighborhood) {
    "use strict";
    // underpopulation: 60% chances to die
    if ((currentState === 1) && (neighborhood < 2)) {
        return Tools.getRndValue(0.6, 0, 1);
    // overpopulation : 80% chances to die
    } else if ((currentState === 1) && (neighborhood >= 4)) {
        return Tools.getRndValue(0.8, 0, 1);

    // 80% to spawn
    } else if ((currentState === 0) && (neighborhood === 3)) {
        return Tools.getRndValue(0.7, 1, 0);
    // 99% to life
    } else {
        return Tools.getRndValue(0.99, currentState, 0);
    }
};