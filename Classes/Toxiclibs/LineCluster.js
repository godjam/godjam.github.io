/*global Particle, Vec2D, VerletSpring2D*/
var LineCluster = function (width, height, physics) {
    "use strict";
    var i = 0,
        particle = null,
        spring = null,
        count = 20,
        len = (width / count),
        strength = 0.1;
    
    this.particles = [];
    
    for (i = 0; i <= count; i += 1) {
        particle = new Particle(new Vec2D(i * len, 10), physics);
        this.particles.push(particle);
        if (i === 0 || i === 20) {
            particle.p.lock();
        }
        
        if (i > 0) {
            spring = new VerletSpring2D(
                this.particles[i].p,
                this.particles[i - 1].p,
                len,
                strength
            );
            physics.addSpring(spring);
        }
    }
    this.particles[0].p.lock();
};

LineCluster.prototype.display = function (ctx) {
    "use strict";
    var i = 0;
    for (i = 0; i < this.particles.length; i += 1) {
        this.particles[i].display(ctx);
    }
};
