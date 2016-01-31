/*global ToxiEntity, Vec2D, ToxiAttractor*/
var ToxiSystem = function (size, physics) {
    "use strict";
    var i = 0,
        particle = null,
        count = 200;
    
    this.particles = [];
    
    for (i = 0; i <= count; i += 1) {
        particle = new ToxiEntity(new Vec2D(Math.random() * size.x, Math.random() * size.y), physics);
        this.particles.push(particle);
    }
    this.particles.push(new ToxiAttractor(size, new Vec2D(size.x / 2, size.y / 2), physics));
};

ToxiSystem.prototype.display = function (ctx) {
    "use strict";
    var i = 0;
    for (i = 0; i < this.particles.length; i += 1) {
        this.particles[i].display(ctx);
    }
};
