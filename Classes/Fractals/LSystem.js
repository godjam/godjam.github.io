/*globals*/
var Rule = function(i, o, p) {
    "use strict";
    this.i = i || "";
    this.o = o || "";
    this.p = p || 1;
    // used for the sum of probabilities
    this.t = 1;
};

var Ruleset = function() {
    "use strict";
    this.rules = [];
};

/**
 * Parcourt d'ajouter un regle à la liste des regles connues.
 * i = symbole entrée
 * o = symboles de sortie
 * p = la probabilité associée à cette regle (par defaut 1)
 **/
Ruleset.prototype.addRule = function(i, o, p) {
    "use strict";
    this.rules.push(new Rule(i, o, p));
};

/**
 * Parcourt les regles connues pour retourner un set de regle correspondantes au symbole en entrée.
 **/
Ruleset.prototype.getRules = function(i) {
    "use strict";
    var rules = [],
        k = 0;

    for (k = 0; k < this.rules.length; k += 1) {
        if(this.rules[k].i === i) {
            rules.push(this.rules[k]);
        }
    }

    return rules;
};


var LSystem = function (axiom, angle, ox, oy, oa) {
    "use strict";

    axiom = axiom || 'F';
    angle = angle || Math.PI / 2;

    this.generation = "";
    this.setAxiom(axiom);
    this.angle = angle;
    this.ox = ox || 0;
    this.oy = oy || 0;
    this.oa = oa || 0;
    this.ruleset = new Ruleset();

    return this;
};

LSystem.prototype.setAxiom = function(axiom) {
    "use strict";
    this.axiom = axiom;
    this.generation = this.axiom; //setup generation 0
};

LSystem.prototype.addRule = function(i, o, p) {
    "use strict";
    this.ruleset.addRule(i, o, p);
    return this;
};

LSystem.prototype.generate = function(iterations) {
    "use strict";

    var l = 0;

    for (l = 0; l < iterations; l += 1) {
        this.generation = this.createGeneration();
    }

    return this;
};

LSystem.prototype.createGeneration = function () {
    "use strict";
    var i = 0, v = "", n = "",
        g = this.getLastGeneration(), rules = null;

    for (i = 0; i < g.length; i += 1) {
        rules = this.ruleset.getRules(g.charAt(i));

        // si aucune regle ne correspond dans le ruleset
        if (rules.length === 0) {
            v = g.charAt(i);

        // si une seule regle correspondante à été trouvé dans le ruleset
        } else if (rules.length === 1) {
            v = rules[0].o;

        // si plusieures regles ont été trouvé dans le ruleset : tirage aléatoire
        } else {
            v = this.randomPick(rules).o;
        }
        n += v;
    }

    return n.slice();
};

LSystem.prototype.randomPick = function(rules) {
    "use strict";
    var i = 0,
        // probabilities total
        total = 0,
        // sum probability (used in normalization)
        current = 0,
        // a random number in [0, 1]
        rnd = Math.random(),
        // the random selected rule
        rule = null;

    for (i = 0; i < rules.length; i += 1) {
        total += rules[i].p;
    }

    // normalize probabilities
    for (i = 0; i < rules.length; i += 1) {
        rules[i].t = rules[i].p / total + current;
        current += rules[i].t;
    }

    // select the rule corresponding to the rnd number
    for (i = 0; i < rules.length ; i += 1) {
        if (rnd <= rules[i].t && rule === null) {
            rule = rules[i];
        }
    }

    return rule;
};

LSystem.prototype.getLastGeneration = function() {
    "use strict";
    return this.generation;
};