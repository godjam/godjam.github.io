/*global Mover, Color, Vector2*/
var Food = function (worldW, worldH) {
    "use strict";
    Mover.call(this, 0, 0, worldW, worldH, 10);
    this.initRandomly();
    this.velocity = new Vector2(0, 0);
    this.color = Color.createNormalDistribColor().ToHex();
    this.alive = true;
};
Food.prototype = Object.create(Mover.prototype);
Food.prototype.constructor = Food;

Food.prototype.update = function (creatures) {
    "use strict";
    Mover.prototype.update.call(this, true);
    // metabolism
    this.mass *= 1.001;
    // death
    if (this.mass > 30) { this.alive = false; }
};

Food.prototype.hit = function () {
    "use strict";
    this.mass -= 5;
    if (this.mass <= 0) {
        this.alive = false;
    }
};