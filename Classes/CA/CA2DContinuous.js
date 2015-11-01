/*global CA2D, Vector2, Cell*/
var CA2DContinuous = function (arrayLength, worldW, worldH) {
    "use strict";
    CA2D.call(this, arrayLength, worldW, worldH);
};
CA2DContinuous.prototype = Object.create(CA2D.prototype);
CA2DContinuous.prototype.constructor = CA2DContinuous;

CA2DContinuous.prototype.applyRule = function (currentState, neighborhood) {
    "use strict";
    // underpopulation
    if ((currentState > 0) && (neighborhood < 2)) {
        return Math.min(0, currentState * 0.9);
    // overpopulation : 80% chances to die
    } else if ((currentState > 0) && (neighborhood >= 4)) {
        return Math.min(0, currentState * 0.9);
    // 80% to spawn
    } else if ((currentState === 0) && (neighborhood === 3)) {
        return 1;
    // 99% to life
    } else {
        return Math.min(1, currentState * 1.2);
    }
};

CA2DContinuous.prototype.displayCell = function (ctx, cell) {
    "use strict";
    
    if (cell instanceof Cell === false) {
        throw "CA2D.displayCell() : cell is not a Cell";
    }
        
    var r = 128, g = 0, b = 0, position = this.toPix(cell.pos);
    g = b = cell.state * 255;
    
    // dead
    if (cell.previous === 0 && cell.state === 0) {
        return;
    // newborn : blue
    } else if (cell.previous === 0 && cell.state === 1) {
        r = 255;
    // dying : red
    } else if (cell.previous === 1 && cell.state === 0) {
        r = 25;
    }
    
    // Rect
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillRect(position.x,
                 position.y,
                 this.width,
                 this.width);
};