/*global CA2D, Vector2, Cell*/

// http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
// http://www.redblobgames.com/grids/hexagons/ (nice!)
var CA2DHex = function (columns, lines, scene) {
    "use strict";
    this.directions = [
        new Vector2(1, 1), // "se"
        new Vector2(1, 0),  // "ne"
        new Vector2(0, -1), // "n"
        new Vector2(0, 1),  // "s"
        new Vector2(-1, 0), // "nw"
        new Vector2(-1, 1)  // "sw"
    ];

    CA2D.call(this, columns, lines, scene);

};

CA2DHex.prototype.firstAdd = function () {
    "use strict";
    this.randomize();
};

CA2DHex.prototype = Object.create(CA2D.prototype);
CA2DHex.prototype.constructor = CA2DHex;

CA2DHex.prototype.toPix = function (hex, cellsize) {
    "use strict";
    var pix = new Vector2();
    pix.y = hex.x % 2 === 0 ? (hex.y * cellsize.y) : (hex.y * cellsize.y) + (cellsize.y / 2);
    pix.x = (hex.x * this.cellside);
    return pix;
};

CA2DHex.prototype.toGrid = function (position) {
    "use strict";

    var hex = new Vector2();
    hex.x = (position.x) / this.cellside;
    hex.y = hex.x % 2 === 0
            ? (position.y) / this.cellsize.y
            : ((position.y + (this.cellsize.y * 0.5)) / this.cellsize.y) - 1;

    hex.x = Math.round(hex.x);
    hex.y = Math.round(hex.y);
    return hex;
};

CA2DHex.prototype.getNeighborCells = function (p) {
    "use strict";
    if (p instanceof Vector2 === false) {
        throw "CA2D.getNeighborCells : p is not a Vector2";
    }

    var i = 0, cell = null, cells = [], x = 0, y = 0;
    for (i = 0; i < this.directions.length; i += 1) {
        // x calc
        x = p.x + this.directions[i].x;
        if (x < 0) x = this.columns - 1;
        if (x >= this.columns) x = 0;

        // y calc
        y = (x % 2 === 1 && p.x % 2 === 0)
            ? p.y + this.directions[i].y - 1
            : p.y + this.directions[i].y;
        if (y < 0) y = this.lines - 1;
        if (y >= this.lines) y = 0;

        cell = this.grid.get(x, y);

        if (cell !== undefined) {
            cells.push(cell);
        }
    }
    return cells;
};


CA2DHex.prototype.applyRule = function (currentState, neighborhood) {
    "use strict";
    // underpopulation
    if ((currentState === 1) && (neighborhood < 2)) {
        return 0;
    // overpopulation
    } else if ((currentState === 1) && (neighborhood > 4)) {
        return 0;
    // spawn
    } else if ((currentState === 0) && (neighborhood === 4)) {
        return 1;
    } else {
        return currentState;
    }
};


CA2DHex.prototype.display = function (ctx) {
    "use strict";
    var i = 0;
    // heaxagon parameters (TODO : only on resize)
    this.cellsize.x = (this.scene.size.x / this.columns) * 4 / 3;
    this.cellradius = this.cellsize.x / 2;
    this.cellside = (3 / 2 * this.cellradius);
    this.cellsize.y = (Math.sqrt(3) * this.cellradius);
    // draw parameter
    this.celldraw.x = ~~(this.cellsize.x * 2 / 3);
    this.celldraw.y = ~~(this.cellsize.y * 2 / 3);
    this.cellsidedraw = ~~(this.cellside * 2 / 3);

    for (i = 0; i < this.grid.array.length; i += 1) {
        this.displayCell(ctx, this.grid.array[i]);
    }
};



CA2DHex.prototype.displayCell = function (ctx, cell) {
    "use strict";

    if (cell instanceof Cell === false) {
        throw "CA2D.displayCell() : cell is not a Cell";
    }

    // alive
    var color = this.colormap.get(0),
        position = this.toPix(cell.pos, this.cellsize);

    // dead
    if (cell.previous === 0 && cell.state === 0) {
        return;
    // newborn
    } else if (cell.previous === 0 && cell.state === 1) {
        color = this.colormap.get(1);
    // dying
    } else if (cell.previous === 1 && cell.state === 0) {
        color = this.colormap.get(2);
    }

    // hexagon
    ctx.fillStyle = color.rgba();
    ctx.beginPath();
    ctx.moveTo(position.x + this.celldraw.x - this.cellsidedraw, position.y);
    ctx.lineTo(position.x + this.cellsidedraw, position.y);
    ctx.lineTo(position.x + this.celldraw.x, position.y + (this.celldraw.y / 2));
    ctx.lineTo(position.x + this.cellsidedraw, position.y + this.celldraw.y);
    ctx.lineTo(position.x + this.celldraw.x - this.cellsidedraw, position.y + this.celldraw.y);
    ctx.lineTo(position.x, position.y + (this.celldraw.y / 2));
    ctx.closePath();
    ctx.fill();
};
