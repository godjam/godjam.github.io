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
        count = 6,
        radius = 50,
        strength = 0.5,
        center = null,
        point = new Vec2D(0, 0),
        angle = 0;
    
    // paticles of the border
    this.particles = [];
    // center particle
    this.center = new ToxiParticle(position, physics);
    
    // create all around particles
    for (i = 0; i < count; i += 1) {
        angle = i * Math.PI * 2 / count;
        point.x = position.x + Math.cos(angle) * radius;
        point.y = position.y + Math.sin(angle) * radius;
        // create particle
        particle = new ToxiParticle(point, physics);
        // add particle to particles list
        this.particles.push(particle);
        // add spring betwwen center and particle
        spring = new VerletSpring2D(this.center.p, particle.p, radius, strength);
        physics.addSpring(spring);
        // add spring betwwen particle and previous particle
        if (i > 0) {
            spring = new VerletSpring2D(particle.p, this.particles[i-1].p, radius, strength);
            physics.addSpring(spring);
        }
        // add last spring betwwen particle 0 and particle
        if (i === count) {
            spring = new VerletSpring2D(this.particles[0].p, particle.p, radius, strength);
            physics.addSpring(spring);
        }
    }
};

ToxiCreature.prototype.display = function (ctx) {
    "use strict";
    var i = 0,
        j = 0,
        l = this.particles.length;
 
    
    // center point
    if (l > 0) {
        ctx.fillRect(this.center.p.x - 2, this.center.p.y - 2, 4, 4);
    }
    
    // draw inner lines
    ctx.beginPath();
    for (i = 0; i < l; i += 1) {
        ctx.moveTo(this.center.p.x, this.center.p.y);
        ctx.lineTo(this.particles[i].p.x, this.particles[i].p.y);
    }
    ctx.closePath();
    ctx.lineWidth = 0.5;
    ctx.stroke();
    
    // draw outer lines
    ctx.beginPath();
    for (i = 0; i < l; i += 1) {
        ctx.lineTo(this.particles[i].p.x, this.particles[i].p.y);
    }
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.stroke();
    
};
