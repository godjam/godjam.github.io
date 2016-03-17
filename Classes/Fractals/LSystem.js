/*global*/
var LSystem = function (axiom, rules, iterations, angle, ox, oy, oa) {
    "use strict";

    axiom = axiom || 'F';
    rules = rules || {};
    angle = angle || Math.PI / 2;

    this.generation = "";
    this.rules = rules;
    this.setAxiom(axiom);
    this.angle = angle;
    this.ox = ox || 0;
    this.oy = oy || 0;
    this.oa = oa || 0;


    if (iterations !== undefined) {
        this.generate(iterations);
    }
};

LSystem.prototype.setAxiom = function(axiom) {
    "use strict";
    this.axiom = axiom;
    this.generation = this.axiom; //setup generation 0
};

LSystem.prototype.addRule = function(i, o) {
    "use strict";
    this.rules[i] = o;
};


LSystem.prototype.generate = function(iterations) {
    "use strict";

    var l = 0, i = 0, v = "", n = "", g = null;
    l = l || 1;

    for (l = 0; l < iterations; l += 1) {
        n = "";
        g = this.getLastGeneration();
        for (i = 0; i < g.length; i += 1) {
            v = this.rules[g.charAt(i)];
            if (v === undefined) {v = g.charAt(i);}
            n += v;
        }
        this.generation = n.slice();
    }
};

LSystem.prototype.getLastGeneration = function() {
    "use strict";
    return this.generation;
};