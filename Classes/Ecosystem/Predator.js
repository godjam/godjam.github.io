/*global Mover, Color, Creature*/
var Predator = function (worldW, worldH) {
    "use strict";
    Mover.call(this, 0, 0, worldW, worldH, 20);
    this.initRandomly();
    this.color = Color.createNormalDistribColor(0.1).ToHex();
    this.alive = true;
};
Predator.prototype = Object.create(Mover.prototype);
Predator.prototype.constructor = Predator;

Predator.prototype.update = function (creatures) {
    "use strict";
    var i = 0, r = 0;
    for (i = 0; i < creatures.length; i += 1) {
        if (creatures[i] instanceof Creature) {
            creatures[i].attract(this, 2);
            
            r = Math.max(2, creatures[i].mass);
            if (this.location.sub(creatures[i].location).mag() < r) {
                creatures[i].hit();
                if (this.mass < 30) {this.mass += 2; }
            }
        }
    }
    // metabolism
    this.mass *= 0.9992;
    Mover.prototype.update.call(this, false);
};

Predator.prototype.hit = function () {
    "use strict";
    this.mass -= 5;
    if (this.mass <= 0) {
        this.alive = false;
    }
};