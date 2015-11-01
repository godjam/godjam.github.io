/*global CA2D, Vector2, Cell*/

// http://blog.ruslans.com/2011/02/hexagonal-grid-math.html

var CA2DHex = function (arrayLength, worldW, worldH) {
    "use strict";
    // heaxagon parameters
    this.width = Math.min(worldW, worldH) / arrayLength;
    this.r = this.width / 2;
    this.side = 3 / 2 * this.r;
    this.height = Math.sqrt(3) * this.r;
    
    this.directions = [
        new Vector2(1, -1), // "ne"
        new Vector2(1, 0),  // "e" 
        new Vector2(0, -1), // "n" 
        new Vector2(0, 1),  // "s"
        new Vector2(-1, 0), // "w"
        new Vector2(-1, 1)  // "sw"
    ];
    CA2D.call(this, arrayLength, worldW, worldH);
};
CA2DHex.prototype = Object.create(CA2D.prototype);
CA2DHex.prototype.constructor = CA2DHex;

CA2DHex.prototype.toPix = function (hex) {
    "use strict";
    var pix = new Vector2(0, 0);
    pix.y = hex.x % 2 === 0 ? (hex.y * this.height) : (hex.y * this.height) + (this.height / 2);
    pix.x = (hex.x * this.side);
    return pix;
};

CA2DHex.prototype.toGrid = function (position) {
    "use strict";
    
    var hex = new Vector2(0, 0);
    hex.x = (position.x) / this.side;
    hex.y = hex.x % 2 === 0
            ? (position.y) / this.height
            : ((position.y + (this.height * 0.5)) / this.height) - 1;
    
    hex.x = Math.round(hex.x);
    hex.y = Math.round(hex.y);
    return hex;
};

CA2DHex.prototype.getNeighborCells = function (p, isToric) {
    "use strict";
    if (p instanceof Vector2 === false) {
        throw "CA2D.getNeighborCells : p is not a Vector2";
    }
    // TODO isToric
    var i = 0, cell = null, cells = [];
    for (i = 0; i < this.directions.length; i += 1) {
        cell = this.grid.get(
            p.x + this.directions[i].x,
            p.y + this.directions[i].y,
            false
        );
        
        if (cell !== undefined) {
            cells.push(cell);
        }
    }
    return cells;
};

CA2DHex.prototype.getZ = function (x, y) {
    "use strict";
    return -(x + y);
};

CA2DHex.prototype.getDistance = function (x1, y1, x2, y2) {
    "use strict";
    var z1 = this.getZ(x1, y1),
        z2 = this.getZ(x2, y2),
        d = Math.abs(x1 - x2) +
            Math.abs(y1 - y2) +
            Math.abs(z1 - z2);
    return d;
};

CA2DHex.prototype.applyRule = function (currentState, neighborhood) {
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


CA2DHex.prototype.displayCell = function (ctx, cell) {
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
  
    // hexagon
    ctx.fillStyle = color;
    ctx.beginPath();
    
    ctx.moveTo(position.x + this.width - this.side, position.y);
    ctx.lineTo(position.x + this.side, position.y);
    ctx.lineTo(position.x + this.width, position.y + (this.height / 2));
    ctx.lineTo(position.x + this.side, position.y + this.height);
    ctx.lineTo(position.x + this.width - this.side, position.y + this.height);
    ctx.lineTo(position.x, position.y + (this.height / 2));
    
    ctx.closePath();
    ctx.fill();
    //ctx.stroke();
};
