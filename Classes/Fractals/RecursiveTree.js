/*global Vector2, ColorMap, toxi*/
var RecursiveTree = function (scene, x, y, l, d) {
    "use strict";

    this.scene = scene;
    this.x = x || scene.size.x / 2;
    this.y = y || scene.size.y / 2;
    this.maxdepth = d || 7;
    this.l = l || scene.size.y / 2;

    this.theta = Math.PI / 6;
    this.delta = 0;
    this.decay = 0.8;
    this.colormap = ColorMap.create(d);
    this.perlin = toxi.math.noise.simplexNoise;

    this.currentdepth = 1;
    this.step = 0;

    this.branches = [];
    var p0 = new Vector2();
    p0.x = ~~ this.x;
    p0.y = ~~ this.y;

    this.branches.push({d: 0, p: p0, a: 0, l: this.l, id: 0, parent: null});
    this.generate(p0, this.l, 0, 0, 0);
};

RecursiveTree.prototype.generate = function(p0, l, a, d, parent) {
    "use strict";
    if (d >= this.maxdepth || d < 0) { return;}

    var p = Vector2.fromPolar(l, a).addInPlace(p0),
        id = this.branches.length;
    p.x = ~~p.x;
    p.y = ~~p.y;
    d += 1;
    this.branches.push({d: d, p: p, a: a, l: l, id: id, parent: parent});
    this.generate(p, l * this.decay, a + this.theta, d, id);
    this.generate(p, l * this.decay, a - this.theta, d, id);
};

RecursiveTree.prototype.update = function(t) {
    "use strict";
    var i = 0, p1 = null, p2 = null, d = 0, l = 0, a = 0, v = 0, m = 0;

    this.delta += t;
    //this.delta = this.delta % (Math.PI * 2);

    for (i = 0; i < this.branches.length; i += 1) {
        d = this.branches[i].d;             // deepness
        l = this.branches[i].l;             // length
        a = this.branches[i].a;             // angle
        parent = this.branches[i].parent;   // parent id
        p2 = this.branches[i].p;            // current node
        if (parent === null) { continue; }
        p1 = this.branches[parent].p;       // parent node

        // transformation
        m = this.perlin.noise(this.delta, i / this.branches.length) * Math.PI;
        v = Math.cos(m) / 100 * d;
        //v = (Math.cos(this.delta + i / this.branches.length)) / 24 * (d - 1);
        p2.fromPolar(l, a + v).addInPlace(p1);
        this.branches[i].p.x = p2.x;
        this.branches[i].p.y = p2.y;
    }

    if (this.currentdepth <= this.maxdepth) {
        this.step += t;
        if (this.step > 1) {
            if (this.currentdepth < this.maxdepth) {this.step = 0;}
            this.currentdepth += 1;
        }
    }
};


RecursiveTree.prototype.display = function (ctx) {
    "use strict";

    var i = 0, parent = 0, p1 = null, p2 = null, d = 0, color = null, s = 1;
    for (i = 0; i < this.branches.length; i += 1) {
        d = this.branches[i].d;             // deepness
        parent = this.branches[i].parent;   // parent id
        p2 = this.branches[i].p;            // current node
        if (parent === null) { continue; }
        p1 = this.branches[parent].p;       // parent node
        color = this.colormap.get(this.maxdepth - d - 1).rgba();

        if (d > this.currentdepth) { continue; }

        s = 1;
        if(d === this.currentdepth) {
            p2.subInPlace(p1);
            p2.multInPlace(this.step);
            p2.addInPlace(p1);
            s = this.step;
        }

        this.drawBranch(ctx, p1, p2, d, color, s);
        if (d === this.maxdepth) {
            this.drawLeaf(ctx, p2, color, s);
        }
    }
};

RecursiveTree.prototype.drawLeaf = function (ctx, p, color, s) {
    "use strict";
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(p.x, p.y, s * 5, 0, Math.PI, true);
    ctx.fill();
    ctx.closePath();
};

RecursiveTree.prototype.drawBranch = function (ctx, p1, p2, d, color, s) {
    "use strict";
    ctx.beginPath();
    ctx.strokeStyle = color;
    if (d === 0 ) { ctx.lineWidth = this.maxdepth * s; }
    else { ctx.lineWidth = this.maxdepth / d * s; }
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();
};