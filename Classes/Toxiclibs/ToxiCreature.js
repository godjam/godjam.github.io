/*global toxi, ToxiParticle, Vec2D, VerletSpring2D*/
var ToxiCreature = function (position, physics) {
    "use strict";
    
    if (position instanceof toxi.geom.Vec2D === false) {
        throw "Cluster.constructor : position is not a Vec2D";
    }
    
    var i = 0,
        j = 0,
        particle = null,
        spring = null,
        count = 5,
        radius = 50,
        strength = 0.005,
        center = null,
        angle = 0;
    
    // paticles of the border
    this.particles = [];

    // center particle
    center = new ToxiParticle(Vec2D.randomVector(), physics);
    
    for (i = 0; i < count; i += 1) {
        
        angle += i * Math.PI * 2 / count;
        
        center.x += position.x;
        center.y += position.y;
        particle = new ToxiParticle(center, physics);
        this.particles.push(particle);
    }
    
    for (i = 0; i <= count - 1; i += 1) {
        for (j = i + 1; j < count; j += 1) {
            spring = new VerletSpring2D(
                this.particles[i].p,
                this.particles[j].p,
                diameter,
                strength
            );
            physics.addSpring(spring);
        }
    }
};

ToxiCreature.prototype.display = function (ctx) {
    "use strict";
    var i = 0,
        j = 0,
        l = this.particles.length;
 
    ctx.beginPath();
    for (i = 0; i < l; i += 1) {
        j = i + 1;
        if (j === l) { j = 0; }
        ctx.moveTo(this.particles[i].p.x, this.particles[i].p.y);
        ctx.lineTo(this.particles[j].p.x, this.particles[j].p.y);
    }
    ctx.stroke();
    ctx.closePath();
};
