/*global Scene, Gravity, Food, Creature, Predator*/
//*************************************************
var EcosystemScene_02 = function () {
	"use strict";
    Scene.call(this);
    var i = 0;
    this.movers = [];
    
    for (i = 0; i < 15; i += 1) {
        this.movers.push(new Food(this.width, this.height));
    }
    
    for (i = 0; i < 3; i += 1) {
        this.movers.push(new Creature(this.width, this.height));
    }
    
    this.movers.push(new Predator(this.width, this.height));
};
EcosystemScene_02.prototype = Object.create(Scene.prototype);
EcosystemScene_02.prototype.constructor =  EcosystemScene_02;
    
EcosystemScene_02.prototype.loop = function () {
    "use strict";
    var i = 0;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (i = 0; i < this.movers.length; i += 1) {
        this.movers[i].update(this.movers);
        this.movers[i].display(this.ctx);
    }
    
    for (i = this.movers.length - 1; i >= 0; i -= 1) {
        if (this.movers[i].alive === false) {
            this.movers.splice(i, 1);
        }
    }
	Scene.prototype.loop.call(this);
};
