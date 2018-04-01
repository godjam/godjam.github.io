/*global Array2D, toxi, Vector2, Tools*/
let Flowfield = function (cols, rows, scene) {
    "use strict";
    this.cols = cols;
    this.rows = rows;
    this.scene = scene;
    this.z = 0;
    this.field = new Array2D(cols, rows);
    this.init();
    this.tmp = new Vector2();
};


Flowfield.prototype.init = function () {
    "use strict";
    let i = 0,
        j = 0,
        v = null;

    for (i = 0; i < this.cols; i += 1) {
        for (j = 0; j < this.rows; j += 1) {
            v = new Vector2(1, 0);
            this.field.set(i, j, v);
        }
    }
};

Flowfield.prototype.updatePerlin = function () {
    "use strict";
    let a = 0,
        i = 0,
        j = 0,
        v = null;

    this.z += 0.01;
    for (i = 0; i < this.cols; i += 1) {
        for (j = 0; j < this.rows; j += 1) {
            a = toxi.math.noise.simplexNoise.noise(i / this.cols + this.z,
                              j / this.rows,
                              this.z) + 1;
            a *= Math.PI * 2;
            this.tmp.fromPolar(1, a);
            this.tmp.normalizeInPlace();
            v = this.field.get(i, j);
            v.copyFrom(this.tmp);
        }
    }
};

Flowfield.prototype.get = function (xPix, yPix) {
    "use strict";
    let scaleX = this.scene.size.x / this.cols,
        scaleY = this.scene.size.y / this.rows,
        i = Tools.clamp(~~(xPix / scaleX), 0, this.cols - 1),
        j = Tools.clamp(~~(yPix / scaleY), 0, this.rows - 1);

    return this.field.get(i, j);
};

Flowfield.prototype.display = function (ctx) {
    "use strict";

    //ctx.fillStyle = "#eef";
    ctx.strokeStyle = "#def";
    let i = 0, j = 0, v = null, x = 0, y = 0,
        scaleX = this.scene.size.x / this.cols,
        scaleY = this.scene.size.y / this.rows;


    for (i = 0; i < this.cols; i += 1) {
        for (j = 0; j < this.rows; j += 1) {
            // get right field coords
            v = this.field.get(i, j);
            x = (i + 1 / 2) * scaleX;
            y = (j + 1 / 2) * scaleY;
            ctx.beginPath();
            ctx.moveTo(x, y);
            //ctx.fillRect(x - 1, y - 1, 3, 3);
            ctx.lineTo(x + (v.x * scaleX / 2), y + (v.y * scaleY / 2));
            ctx.stroke();
            ctx.closePath();
        }
    }
};
