/*global toxi, ToxiParticle, Vec2D, VerletSpring2D*/
let Cluster = function (position, physics) {
    "use strict";
    
    if (position instanceof toxi.geom.Vec2D === false) {
        throw "Cluster.constructor : position is not a Vec2D";
    }
    
    let i = 0,
        j = 0,
        particle = null,
        spring = null,
        count = 12,
        diameter = 130,
        strength = 0.01,
        center = null;
    
    this.particles = [];
    
    for (i = 0; i <= count; i += 1) {
        center = Vec2D.randomVector();
        center.x += position.x;
        center.y += position.y;
        particle = new ToxiParticle(center, physics);
        this.particles.push(particle);
    }
    
    for (i = 0; i <= count - 1; i += 1) {
        for (j = i + 1; j <= count; j += 1) {
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

Cluster.prototype.display = function (ctx) {
    "use strict";
    let i = 0,
        j = 0,
        l = this.particles.length;
    
    for (i = 0; i < this.particles.length; i += 1) {
        this.particles[i].display(ctx);
    }
    
    ctx.beginPath();
    ctx.lineWidth = 0.3;
    for (i = 0; i < l - 1; i += 1) {
        for (j = i; j < l; j += 1) {
            ctx.moveTo(this.particles[i].p.x, this.particles[i].p.y);
            ctx.lineTo(this.particles[j].p.x, this.particles[j].p.y);

        }
    }
    ctx.stroke();
    ctx.closePath();
};
