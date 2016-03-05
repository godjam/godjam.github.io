/*global CA2D, Cell, ColorMap, Color, Tools*/
var CA2DContinuous = function (columns, lines, scene) {
    "use strict";
    CA2D.call(this, columns, lines, scene);
    /*
    this.colormap = new ColorMap(new Color(40, 255, 255, 0.7),
                                new Color(255, 0, 40, 0.7), 10);*/
    this.colormap = new ColorMap(Color.createBrightColor(0.7),
                            Color.createBrightColor(0.7), 10);
};
CA2DContinuous.prototype = Object.create(CA2D.prototype);
CA2DContinuous.prototype.constructor = CA2DContinuous;

CA2D.prototype.firstAdd = function () {
    "use strict";
    this.randomize();
    //this.uniformize(1);
    //this.addDot(10, 5);
}

CA2DContinuous.prototype.applyRule = function (currentState, neighborhood, neighbors) {
    "use strict";
    // underpopulation
    if (currentState > 0 && neighbors < 2) {
        currentState = currentState * 0.9 - 0.01 * neighborhood;
    }
    // overpopulation : decrease value
    if (currentState > 0 && neighbors > 3) {
        currentState = currentState * 0.9 - 0.01 * neighborhood;
    }
    // spawn
    if (currentState === 0 && neighbors === 3) {
        currentState = neighborhood + 0.1;
    }
    //*/
    // life decrease
    currentState = currentState * 0.997 + 0.002 * neighborhood;
    currentState = Tools.clamp(currentState, 0, 1);
    // insta-death
    if (currentState < 0.005) { currentState = 0;}

    return currentState;
};

CA2DContinuous.prototype.displayCell = function (ctx, cell) {
    "use strict";

    if (cell instanceof Cell === false) {
        throw "CA2D.displayCell() : cell is not a Cell";
    }

    var color = null,
        position = this.toPix(cell.pos, this.cellsize);

    // dead
    if (cell.previous === 0 && cell.state === 0) { return; }

    // alive
    color = this.colormap.getByVal(cell.state, 1);
    if (color === null) { return; }

    ctx.fillStyle = color.rgba();
    ctx.fillRect(position.x + this.celldraw.x,
                 position.y + this.celldraw.y,
                 this.celldraw.x,
                 this.celldraw.y);

    /*
    ctx.fillStyle = "#000";
    ctx.font = "10px Georgia";
    ctx.fillText(cell.state.toFixed(1), position.x + this.celldraw.x, position.y + this.celldraw.y);
    //*/
};