/*global Mover, Color, Predator, Food*/
var Creature = function (worldW, worldH) {
    "use strict";
    Mover.call(this, 0, 0, worldW, worldH, 20);
    this.initRandomly();
    this.color = Color.createNormalDistribColor(0.7).ToHex();
    this.alive = true;
};
Creature.prototype = Object.create(Mover.prototype);
Creature.prototype.constructor = Creature;

Creature.prototype.update = function (creatures) {
    "use strict";
    var i = 0;
    for (i = 0; i < creatures.length; i += 1) {
        if (creatures[i] instanceof Predator) {
            creatures[i].attract(this, -3);
        }
        
        if (creatures[i] instanceof Food) {
            creatures[i].attract(this, 1);
            
            if (this.location.sub(creatures[i].location).mag() < 4) {
                creatures[i].hit();
                this.mass += 2;
            }
        }
    }
    Mover.prototype.update.call(this, true);
};

Creature.prototype.hit = function () {
    "use strict";
    this.mass -= 2;
    if (this.mass <= 0) {
        this.alive = false;
    }
};