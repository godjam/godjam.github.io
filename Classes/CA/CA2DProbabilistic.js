/*global CA2D, Vector2, Cell*/
var CA2DProbabilistic = function (arrayLength, worldW, worldH) {
    "use strict";
    CA2D.call(this, arrayLength, worldW, worldH);
};
CA2DProbabilistic.prototype = Object.create(CA2D.prototype);
CA2DProbabilistic.prototype.constructor = CA2DProbabilistic;

CA2DProbabilistic.prototype.applyRule = function (currentState, neighborhood) {
    "use strict";
    // underpopulation: 60% chances to die
    if ((currentState === 1) && (neighborhood < 2)) {
        return this.getRandomValue(0.6, 0, 1);
    // overpopulation : 80% chances to die
    } else if ((currentState === 1) && (neighborhood >= 4)) {
        return this.getRandomValue(0.8, 0, 1);
    
    // 80% to spawn
    } else if ((currentState === 0) && (neighborhood === 3)) {
        return this.getRandomValue(0.7, 1, 0);
    // 99% to life
    } else {
        return this.getRandomValue(0.99, currentState, 0);
    }
};

CA2DProbabilistic.prototype.getRandomValue = function (threshold, value0, value1) {
    "use strict";
    if (Math.random() <= threshold) {
        return value0;
    } else {
        return value1;
    }
};