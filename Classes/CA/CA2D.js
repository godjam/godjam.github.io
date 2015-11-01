/*global Array2D, Cell, Vector2*/
var CA2D = function (arrayLength, worldW, worldH) {
    "use strict";
    this.arrayLength = arrayLength;
    this.worldW = worldW;
    this.worldH = worldH;
    this.grid = null;
    // this.width is a cell's width/height
    this.width = Math.min(worldW, worldH) / arrayLength;
    this.init();
};


CA2D.prototype.init = function () {
    "use strict";
    var i = 0, m = 0, x = 0, y = 0;
    this.grid = new Array2D(this.arrayLength, this.arrayLength);
    
    for (x = 0; x < this.arrayLength; x += 1) {
        for (y = 0; y < this.arrayLength; y += 1) {
            this.grid.add(x, y, new Cell(x, y, 1, 0));
        }
    }
    
    this.randomize();
    //m = Math.floor(this.arrayLength / 2);
    //this.addPattern("lighweight spaceship", m, m);
};


CA2D.prototype.randomize = function () {
    "use strict";
    var c = 0, cells = this.grid.getValues();
    for (c = 0; c < cells.length; c += 1) {
        //cells[c].state = 1;
        cells[c].state = Math.round(Math.random());
    }
};

CA2D.prototype.addPattern = function (name, x, y) {
    "use strict";
    var i = 0, j = 0, pw = 0, ph = 0, pattern = [[]];
    
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
                this.grid.add(x + j, y + i, new Cell(x + j, y + i, 1, pattern[j][i]));
            }
        }
    }
};

CA2D.prototype.update = function () {
    "use strict";
    var c = 0, k = 0, n = 0, v = 0, cells = null, cell = null, neightbor = null;
    
    cells = this.grid.getValues();
    for (c = 0; c < cells.length; c += 1) {
        n = 0;
        cell = cells[c];
        v = cell.state;

        neightbor = this.getNeighborCells(cell.pos, true);
        for (k = 0; k < neightbor.length; k += 1) {
            if (neightbor[k] !== undefined) {
                n += neightbor[k].state;
            }
        }
        cell.next = this.applyRule(v, n);
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


CA2D.prototype.addCell = function (position) {
    "use strict";
    var i = 0, tile = new Vector2(0, 0), cells = [];
    
    tile = this.toGrid(position);
    cells = this.getNeighborCells(tile, false);
    
    for (i = 0; i < cells.length; i += 1) {
        if (cells[i] !== undefined) {
            cells[i].state = 1;
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
    
    var i = 0, j = 0, cell = null, cells = [], x = 0, y = 0;
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

CA2D.prototype.toPix = function (grid) {
    "use strict";
    var pix = new Vector2(0, 0);
    pix.x = this.width * grid.y;
    pix.y = this.width * grid.x;
    return pix;
};

CA2D.prototype.toGrid = function (position) {
    "use strict";
    var grid = new Vector2(0, 0);
    grid.x = Math.round(position.y / this.width);
    grid.y = Math.round(position.x / this.width);
    return grid;
};

CA2D.prototype.display = function (ctx) {
    "use strict";
    var i = 0, cells = this.grid.getValues();
    for (i = 0; i < cells.length; i += 1) {
        this.displayCell(ctx, cells[i]);
    }
};

CA2D.prototype.displayCell = function (ctx, cell) {
    "use strict";
    
    if (cell instanceof Cell === false) {
        throw "CA2D.displayCell() : cell is not a Cell";
    }
        
    // alive : black
    var color = "#109040", position = this.toPix(cell.pos);
    
    // dead
    if (cell.previous === 0 && cell.state === 0) {
        return;
    // newborn : blue
    } else if (cell.previous === 0 && cell.state === 1) {
        color = "#60ff20";
    // dying : red
    } else if (cell.previous === 1 && cell.state === 0) {
        color = "#ffff00";
    }
    

    // Rect
    ctx.fillStyle = color;
    ctx.fillRect(position.x,
                 position.y,
                 this.width,
                 this.width);
};