/*global CA2D, Vector2*/
let Cell = function (x, y, w, state) {
    "use strict";
    this.pos = new Vector2(x, y);
    this.w = w;
    this.state = state;
    this.previous = 0;
    this.next = 0;
};

Cell.prototype.update = function () {
    "use strict";
    this.previous = this.state;
    this.state = this.next;
};

