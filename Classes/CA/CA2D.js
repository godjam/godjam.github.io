/*global Array2D, Cell, Vector2, ColorMap, Color*/
let CA2D = function (columns, lines, scene) {
    "use strict";
    this.columns = columns;
    this.lines = lines;
    this.scene = scene;
    this.grid = null;
    this.cellsize = new Vector2();
    this.celldraw = new Vector2();
    this.colormap = new ColorMap(Color.createBrightColor(0.7),
                                Color.createBrightColor(0.7), 3);
    this.init();

    this.firstAdd();
};


CA2D.prototype.init = function () {
    "use strict";
    let x = 0, y = 0;
    this.grid = new Array2D(this.columns, this.lines);

    for (x = 0; x < this.columns; x += 1) {
        for (y = 0; y < this.lines; y += 1) {
            this.grid.set(x, y, new Cell(x, y, 1, 0));
        }
    }
};


CA2D.prototype.firstAdd = function () {
    "use strict";
     let i = 0, j = 0;
    i = Math.floor(this.columns / 2);
    j = Math.floor(this.lines / 2);
    this.addPattern("lighweight spaceship", i, j);
}

CA2D.prototype.randomize = function () {
    "use strict";
    let c = 0, cells = this.grid.getValues();
    for (c = 0; c < cells.length; c += 1) {
        cells[c].state = Math.round(Math.random());
    }
};

CA2D.prototype.uniformize = function (value) {
    "use strict";
    let c = 0, cells = this.grid.getValues();
    for (c = 0; c < cells.length; c += 1) {
        //cells[c].state = value;
        cells[c].state = (c / cells.length);
    }
};

CA2D.prototype.addDot = function (x, y) {
    "use strict";
    let c = 0, cells = this.getNeighborCells(new Vector2(x, y), false);
    for (c = 0; c < cells.length; c += 1) {
        cells[c].state = 1;
    }
};

CA2D.prototype.addPattern = function (name, x, y) {
    "use strict";
    let i = 0, j = 0, pw = 0, ph = 0, pattern = [[]];

    if (name === "block") {
        pattern = [[1, 1],
                   [1, 1]];

    } else if (name === "beehive") {
        pattern = [[0, 1, 1, 0],
                   [1, 0, 0, 1],
                   [0, 1, 1, 0]];

    } else if (name === "loaf") {
        pattern = [[0, 1, 1, 0],
                   [1, 0, 0, 1],
                   [0, 1, 0, 1],
                   [0, 0, 1, 0]];

    } else if (name === "boat") {
        pattern = [[1, 1, 0],
                   [1, 0, 1],
                   [0, 1, 0]];

    } else if (name === "blinker") {
        pattern = [[1],
                   [1],
                   [1]];

    } else if (name === "toad") {
        pattern = [[0, 1, 1, 1],
                   [1, 1, 1, 0]];

    } else if (name === "beacon") {
        pattern = [[1, 1, 0, 0],
                   [1, 0, 0, 0],
                   [0, 0, 0, 1],
                   [0, 0, 1, 1]];

    } else if (name === "glider") {
        pattern = [[0, 0, 1],
                   [1, 0, 1],
                   [0, 1, 1]];

    } else if (name === "lighweight spaceship") {
        pattern = [[1, 0, 0, 1, 0],
                   [0, 0, 0, 0, 1],
                   [1, 0, 0, 0, 1],
                   [0, 1, 1, 1, 1]];
    }


    if (pattern.length > 0) {
        ph = pattern.length;
        pw = pattern[0].length;
        x -= Math.round(pw / 2);
        y -= Math.round(ph / 2);

        for (i = 0; i < pw; i += 1) {
            for (j = 0; j < ph; j += 1) {
                this.grid.set(x + i, y + j, new Cell(x + i, y + j, 1, pattern[j][i]));
            }
        }
    }
};

CA2D.prototype.update = function () {
    "use strict";
    let c = 0, k = 0, neighborhood = 0, neighbors = 0,
    v = 0, cells = null, cell = null, neightbor = null;

    cells = this.grid.getValues();
    for (c = 0; c < cells.length; c += 1) {
        neighborhood = 0;
        cell = cells[c];
        v = cell.state;
        neighbors = 0;

        neightbor = this.getNeighborCells(cell.pos, true);
        for (k = 0; k < neightbor.length; k += 1) {
            if (neightbor[k] !== undefined && neightbor[k].state !== 0) {
                neighborhood += neightbor[k].state;
                neighbors += 1;
            }
        }
        cell.next = this.applyRule(v, neighborhood, neighbors);
    }

    for (c = 0; c < cells.length; c += 1) {
        cell = cells[c];
        cell.update();
    }
};

CA2D.prototype.applyRule = function (currentState, neighborhood) {
    "use strict";
    // underpopulation
    if ((currentState === 1) && (neighborhood < 2)) {
        return 0;
    // overpopulation
    } else if ((currentState === 1) && (neighborhood > 3)) {
        return 0;
    // spawn
    } else if ((currentState === 0) && (neighborhood === 3)) {
        return 1;
    } else {
        return currentState;
    }
};


CA2D.prototype.addCells = function (position, pointers) {
    "use strict";
    let i = 0, c = 0, tile = new Vector2(),
        cells = [];

    for (i = 0; i < pointers.length; i += 1) {
        tile = this.toGrid(pointers[i], this.cellsize);

        cells = this.getNeighborCells(tile, true);
        cells.push(this.grid.get(tile.x, tile.y, false));

        // change neighbor values
        for (c = 0; c < cells.length; c += 1) {
            if(cells[c] !== undefined) {cells[c].state = 1;}
        }
    }
};


CA2D.prototype.getNeighborCells = function (p, isToric) {
    "use strict";
    if (p instanceof Vector2 === false) {
        throw "CA2D.getNeighborCells : p is not a Vector2";
    }

    if (typeof isToric !== "boolean") {
        throw "CA2D.getNeighborCells : isToric is not a boolean";
    }

    let i = 0, j = 0, cell = null, cells = [], x = 0, y = 0;
    for (i = -1; i <= 1; i += 1) {
        for (j = -1; j <= 1; j += 1) {
            if (i !== 0 || j !== 0) {

                x = p.x + i;
                y = p.y + j;

                cell = this.grid.get(x, y, isToric);
                if (cell !== undefined) {
                    cells.push(cell);
                }
            }
        }
    }
    return cells;
};

CA2D.prototype.toPix = function (tile, cellsize) {
    "use strict";
    let pix = new Vector2();
    pix.x = cellsize.x * tile.x;
    pix.y = cellsize.y * tile.y;
    return pix;
};

CA2D.prototype.toGrid = function (position, cellsize) {
    "use strict";
    let grid = new Vector2();
    grid.x = Math.round(position.x / cellsize.x) - 1;
    grid.y = Math.round(position.y / cellsize.y) - 1;
    return grid;
};

CA2D.prototype.display = function (ctx) {
    "use strict";
    let i = 0;
    // this.width is a cell's width/height
    this.cellsize.x = ~~(this.scene.size.x / this.columns);
    this.cellsize.y = ~~(this.scene.size.y / this.lines);
    this.celldraw.x = ~~(this.cellsize.x / 2);
    this.celldraw.y = ~~(this.cellsize.y / 2);

    for (i = 0; i < this.grid.array.length; i += 1) {
        this.displayCell(ctx, this.grid.array[i], this.cellsize);
    }
};

CA2D.prototype.displayCell = function (ctx, cell, cellsize) {
    "use strict";

    if (cell instanceof Cell === false) {
        throw "CA2D.displayCell() : cell is not a Cell";
    }

    // alive
    let color = this.colormap.get(0),
        position = this.toPix(cell.pos, cellsize);

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


    // Rect
    ctx.fillStyle = color.rgba();
    ctx.fillRect(position.x + this.celldraw.x,
                 position.y + this.celldraw.y,
                 this.celldraw.x,
                 this.celldraw.y);
};