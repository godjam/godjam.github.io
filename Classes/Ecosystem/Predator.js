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
    var i = 0;
    for (i = 0; i < creatures.length; i += 1) {
        if (creatures[i] instanceof Creature) {
            creatures[i].attract(this, 2);
            
            if (this.location.sub(creatures[i].location).mag() < 2) {
                creatures[i].hit();
                this.mass += 2;
            }
        }
    }
    Mover.prototype.update.call(this, true);
};

Predator.prototype.hit = function () {
    "use strict";
    this.mass -= 2;
    if (this.mass <= 0) {
        this.alive = false;
    }
};