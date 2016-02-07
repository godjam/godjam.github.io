/*global Scene, Mover, MouseAttractor, StrangeAttractor*/
//*************************************************
var CustomAttractionScene = function () {
	"use strict";
    Scene.call(this);
    this.intro("Custom Attraction", "Far movers are attracted by the attractor. Close movers are repel.");
    
    var i = 0,
        s = 0,
        attractor = new StrangeAttractor(this.size.x, this.size.y);
    this.movers = [];
    this.mouseAttractor = new MouseAttractor(this, attractor);
    
    for (i = 0; i < 30; i += 1) {
        s = Math.random() * 20 + 10;
        this.movers[i] = new Mover(0, 0, this, s);
        this.movers[i].initRandomly();
    }
};
CustomAttractionScene.prototype = Object.create(Scene.prototype);
CustomAttractionScene.prototype.constructor = CustomAttractionScene;
    
CustomAttractionScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    var i = 0, j = 0;
    for (i = 0; i < this.movers.length; i += 1) {
        
        for (j = 0; j < this.movers.length; j += 1) {
            if (i !== j) {
                this.movers[i].attract(this.movers[j], -1);
            }
        }
        
        this.mouseAttractor.applyOn(this.movers[i]);
        this.movers[i].update(true);
        this.movers[i].displayAsCircle(this.ctx);
    }
    this.mouseAttractor.display(this.ctx);
    Scene.prototype.loop.call(this);
};
