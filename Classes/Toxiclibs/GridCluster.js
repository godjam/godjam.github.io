/*global ToxiParticle, Vec2D, VerletSpring2D, Array2D, Color, ColorMap*/
var GridCluster = function (size, physics) {
    "use strict";
    var i = 0,
        j = 0,
        particle = null,
        spring = null,
        simWidth = 12,
        len = (size.x / (simWidth - 1)),
        simHeight = Math.round(size.y / len / 2),
        strength = 0.1,
        n1 = null,
        n3 = null;

    this.colormap = ColorMap.create(10);
    this.array2D = new Array2D(simWidth, simHeight);

    for (i = 0; i < simWidth; i += 1) {
        for (j = 0; j < simHeight; j += 1) {
            particle = new ToxiParticle(new Vec2D(i * len, j * len), physics);
            this.array2D.set(i, j, particle);

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
    var i = 0, j = 0, k = null,
        n1 = null, n2 = null, n3 = null, n4 = null;

    for (i = 0; i < this.array2D.getWidth() - 1; i += 1) {
        for (j = 0; j < this.array2D.getHeight() - 1; j += 1) {
            n1 = this.array2D.get(i, j);
            n2 = this.array2D.get(i + 1, j);
            n3 = this.array2D.get(i + 1, j + 1);
            n4 = this.array2D.get(i, j + 1);

            ctx.fillStyle = this.colormap.getByVal(i, this.array2D.getWidth()).rgba();
            ctx.beginPath();
            ctx.moveTo(n1.p.x, n1.p.y);
            ctx.lineTo(n2.p.x, n2.p.y);
            ctx.lineTo(n3.p.x, n3.p.y);
            ctx.lineTo(n4.p.x, n4.p.y);
            ctx.closePath();
            ctx.fill();
        }
    }
};
