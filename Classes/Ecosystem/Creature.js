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
    var i = 0, r = 0;
    for (i = 0; i < creatures.length; i += 1) {
        // avoid other creature
        if (creatures[i] instanceof Creature) {
            creatures[i].attract(this, -1);
        }
        
        // highly avoid predator
        if (creatures[i] instanceof Predator) {
            creatures[i].attract(this, -3);
        }
        
        // catch food
        if (creatures[i] instanceof Food) {
            creatures[i].attract(this, 1);
            
            r = Math.max(2, creatures[i].mass);
            if (this.location.sub(creatures[i].location).mag() < r) {
                creatures[i].hit();
                if (this.mass < 30) {this.mass += 2; }
            }
        }
    }
    // metabolism
    this.mass *= 0.9998;
    Mover.prototype.update.call(this, true);
};

Creature.prototype.hit = function () {
    "use strict";
    this.mass -= 5;
    if (this.mass <= 0) {
        this.alive = false;
    }
};