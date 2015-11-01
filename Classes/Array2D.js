//*************************************************
var Array2D = function (width, heigth) {
    "use strict";
    
    if (typeof width !== "number" || typeof heigth !== "number") {
        throw "Array2D.ctor : width or heigth is not a number";
    }
    
    this.width = width;
    this.heigth = heigth;
    this.array = []; // array of values
};

Array2D.prototype.clone = function () {
    "use strict";
    var i = 0, j = 0,
        t = new Array2D(this.width, this.heigth);
    t.array = this.array.slice();
    return t;
};

Array2D.prototype.getValues = function () {
    "use strict";
    var i = 0, values = [], value = null;
    for (i = 0; i < this.array.length; i += 1) {
        value = this.array[i];
        if (value !== undefined) {
            values.push(value);
        }
    }
    return values;
};



Array2D.prototype.getKey = function (x, y) {
    "use strict";
    
    if (typeof x !== "number" || typeof y !== "number") {
        throw "Array2D.getKey : x or y is not a number";
    }
    
    return (x * this.heigth + y);
};

Array2D.prototype.add = function (x, y, entity) {
    "use strict";
    
    if (typeof x !== "number" || typeof y !== "number") {
        throw "Array2D.add : x or y is not a number";
    }

    var key = this.getKey(x, y);
    this.array[key] = entity;
};

Array2D.prototype.get = function (x, y, isToric) {
    "use strict";
    
    if (typeof x !== "number" || typeof y !== "number") {
        throw "Array2D.get : x or y is not a number";
    }
    
    if (isToric ===  true) {
        if (x < 0) {
            x += this.width;
        }
        if (y < 0) {
            y += this.heigth;
        }
        if (x >= this.width) {
            x = x % this.width;
        }
        if (y >= this.heigth) {
            y = y % this.heigth;
        }
    }
    
    if (x < 0 || x > this.width || y < 0 || y > this.width) {
        return undefined;
    }
    
    var key = this.getKey(x, y);
    return this.array[key];
};

Array2D.prototype.getWidth = function () {
    "use strict";
    return this.width;
};

Array2D.prototype.getHeight = function () {
    "use strict";
    return this.heigth;
};