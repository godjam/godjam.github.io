/*global Array2D, Vehicle*/
let BinLatSpatialSubdiv = function (cols, rows, worldW, worldH) {
    "use strict";
    this.cols = cols;
    this.rows = rows;
    this.worldW = worldW;
    this.worldH = worldH;
    this.field = new Array2D(cols, rows);
    this.clear();
};

BinLatSpatialSubdiv.prototype.clear = function () {
    "use strict";
    let i = 0,
        j = 0,
        v = null;

    for (i = 0; i < this.cols; i += 1) {
        for (j = 0; j < this.rows; j += 1) {
            this.field.set(i, j, []);
        }
    }
};

BinLatSpatialSubdiv.prototype.add = function (vehicle) {
    "use strict";

    if (vehicle instanceof Vehicle === false) {
        throw "BinLatSpatialSubdiv.add : vehicle is not a Vehicle";
    }

    let resolutionX = this.worldW / this.cols,
        resolutionY = this.worldH / this.rows,
        i = ~~(vehicle.mover.location.x / resolutionX),
        j = ~~(vehicle.mover.location.y / resolutionY),
        array = this.field.get(i, j);
    array.push(vehicle);
    return array;
};

BinLatSpatialSubdiv.prototype.getNeighbors = function (vehicle) {
    "use strict";

    if (vehicle instanceof Vehicle === false) {
        throw "BinLatSpatialSubdiv.add : vehicle is not a Vehicle";
    }

    let resolutionX = this.worldW / this.cols,
        resolutionY = this.worldH / this.rows,
        i = ~~(vehicle.mover.location.x / resolutionX),
        j = ~~(vehicle.mover.location.y / resolutionY);

    return this.field.get(i, j);
};


BinLatSpatialSubdiv.prototype.display = function (ctx) {
    "use strict";

    let i = 0, j = 0, v = null, x = 0, y = 0,
        scaleX = this.worldW / this.cols,
        scaleY = this.worldH / this.rows;

    ctx.save();
    ctx.beginPath();

    for (i = 0; i < this.cols; i += 1) {
        x = i * scaleX;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.worldH);

    }
    for (j = 0; j < this.rows; j += 1) {
        y = j * scaleY;
        ctx.moveTo(0, y);
        ctx.lineTo(this.worldW, y);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
};
