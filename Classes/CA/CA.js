/*global console*/
var CA = function (width, worldW, worldH) {
    "use strict";
    
    if (typeof width !== 'number') {
        throw "CA.constructor: width is not a scalar";
    }
    
    this.width = width;
    this.worldW = worldW;
    this.worldH = worldH;
    this.cells = [];
    this.nextGen = [];
    this.oldGens = [];
    this.ruleset = [];
    this.life = 1000;
    this.rule = 30;
    
    this.regenerate();
};


CA.prototype.init = function () {
    "use strict";
    var i = 0, m = 0;
    this.cells = [];
    this.oldGens = [];
    
    for (i = 0; i < this.width; i += 1) {
        this.cells.push(Math.round(Math.random()));
    }
    
    // set the middle cell to 1
    //m = Math.floor(this.width / 2);
    //this.cells[m] = 1;
    
    this.oldGens.push(this.cells.slice());
};


CA.prototype.generate = function () {
    "use strict";
    var i = 0, a = 0, b = 0, c = 0, g = 0;
    
    for (g = 0; g < this.width; g += 1) {
        this.nextGen = this.cells.slice();
        for (i = 1; i < this.cells.length - 1; i += 1) {
            a = this.cells[i - 1];
            b = this.cells[i];
            c = this.cells[i + 1];
            this.nextGen[i] = parseInt(this.rules(a, b, c), 10);
        }
        this.cells = this.nextGen;
        this.oldGens.push(this.cells.slice());
    }
};

CA.prototype.regenerate = function () {
    "use strict";
    var i = 0, s = "", pad = "00000000", a = "", l = 0;
    s = this.rule.toString(2);
    a = pad.substring(0, pad.length - s.length) + s;
    l = a.length;

    
    for (i = 0; i < l; i += 1) {
        this.ruleset[i] = a.charAt(l - (i + 1));
        this.init();
        this.generate();
    }
    console.log(this.rule, this.ruleset);
};


CA.prototype.rules = function (a, b, c) {
    "use strict";
    if (typeof a !== 'number'
            || typeof b !== 'number'
            || typeof c !== 'number') {
        throw "CA.rules: a or b or c is not a scalar";
    }
    var s = (a).toString() + (b).toString() + (c).toString(),
        idx = parseInt(s, 2);
    return this.ruleset[idx];
};

CA.prototype.update = function (delta) {
    "use strict";
    if (typeof delta !== 'number') {
        throw "CA.update: delta is not a scalar";
    }
    
    this.life -= delta;
    
    if (this.life <= 0) {
        this.life = 1000;
        this.rule += 1;
        this.regenerate();
    }
};
 

CA.prototype.display = function (ctx) {
    "use strict";
    var i = 0, j = 0, size = this.worldW / this.width;
    ctx.save();
    for (i = 0; i < this.oldGens.length; i += 1) {
        for (j = 0; j < this.oldGens[i].length; j += 1) {
            if (this.oldGens[i][j] !== 0) {
                //ctx.fillRect(size * j, size * i, size, size);
                ctx.beginPath();
                ctx.arc(size * j, size * i, size / 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    ctx.restore();
};


