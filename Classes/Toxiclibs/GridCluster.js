/*global ToxiParticle, Vec2D, VerletSpring2D, Array2D*/
var GridCluster = function (width, height, physics) {
    "use strict";
    var i = 0,
        j = 0,
        particle = null,
        spring = null,
        simWidth = 16,
        simHeight = 9,
        len = (width / (simWidth - 1)),
        strength = 0.1,
        n1 = null,
        n2 = null,
        n3 = null,
        n4 = null;
    
    this.array2D = new Array2D(simWidth, simHeight);
    
    for (i = 0; i < simWidth; i += 1) {
        for (j = 0; j < simHeight; j += 1) {
            particle = new ToxiParticle(new Vec2D(i * len, j * len), physics);
            this.array2D.add(i, j, particle);
            
            if (i === 0 && j === 0) {
                particle.p.lock();
            } else if (i === simWidth - 1 && j === 0) {
                particle.p.lock();
            }
            
            n1 = this.array2D.get(i - 1, j);
            n3 = this.array2D.get(i, j - 1);
            
            if (n1 !== undefined) {
                spring = new VerletSpring2D(particle.p, n1.p, len, strength);
                physics.addSpring(spring);
            }
            if (n3 !== undefined) {
                spring = new VerletSpring2D(particle.p, n3.p, len, strength);
                physics.addSpring(spring);
            }
        }
    }
};

GridCluster.prototype.display = function (ctx) {
    "use strict";
    var i = 0, j = 0,
        k = null, n2 = null, n4 = null, n1 = null, n3 = null;
    for (i = 0; i < this.array2D.getWidth(); i += 1) {
        for (j = 0; j < this.array2D.getHeight(); j += 1) {
            k = this.array2D.get(i, j);
            n1 = this.array2D.get(i - 1, j);
            n2 = this.array2D.get(i + 1, j);
            n3 = this.array2D.get(i, j - 1);
            n4 = this.array2D.get(i, j + 1);
            
            if (k !== undefined) {
                //k.display(ctx);
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                if (n1 !== undefined) {
                    ctx.moveTo(n1.p.x, n1.p.y);
                    ctx.lineTo(k.p.x, k.p.y);
                }
                if (n3 !== undefined) {
                    ctx.moveTo(n3.p.x, n3.p.y);
                    ctx.lineTo(k.p.x, k.p.y);
                }
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
};
