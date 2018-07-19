function DNABox2D(options) {
    'use strict';
    DNA.call(this, options);
}
DNABox2D.prototype = Object.create(DNA.prototype);
DNABox2D.prototype.constructor = DNABox2D;

DNABox2D.prototype.createGenes = function (segments) {
    segments = segments || 3;
    for (let i = 0; i < segments; ++i)
        this.genes.push(this.createGene());
}

// TODO rd -> Tools
// TODO doit être créer pour le premier gene et doit servir de ref pour les autres genes  
// => max_width, max_height, max_angle, max_speed, max_torque, max_amplitude, max_period, segments
DNABox2D.prototype.resetScore = function (options) {
    this.dist = 0;
    DNA.prototype.resetScore.call(this);
}

DNABox2D.prototype.createGene = function () {
    'use strict';
    const i = this.genes.length;
    if (i == 0)
        this.createFirstGene();

    //TODO createFirstGene should only be called 

    // genereate the segments: parent_id, width, height, angle, mirror, speed, torque, amplitude, period, anchor_x
    // the parent is a local ref (ie: n-1, n-2, n-3) 
    let parent_id = -1 * Tools.rnd(1, i);
    if (i == 0) parent_id = 0; //root
    const width = rd(this.max_width);
    const height = rd(this.max_height);
    const angle = Math.random() * this.max_angle;
    const mirror = Math.random() > 0.5 ? true : false;
    const speed = rd(this.max_speed);
    const torque = rd(this.max_torque);
    const amplitude = rd(this.max_amplitude);
    const period = rd(this.max_period);
    const anchor_x = Math.random();

    return [parent_id, width, height, angle, mirror, speed, torque, amplitude, period, anchor_x];

}

DNABox2D.prototype.createFirstGene = function () {
    this.max_width = rd(60);
    this.max_height = rd(30);
    this.max_angle = Math.PI / 2;
    this.max_speed = rd(15);
    this.max_torque = rd(1000);
    this.max_amplitude = rd(20);
    this.max_period = 300;    
}

DNABox2D.prototype.updateScore = function (creature, target, time) {
    'use strict';
    const root = creature.nodes[0];
    // used to compute the avg dist to the target
    //if(root.x > this.dist)
    //    this.dist = root.x;
    this.fitness = 1 / root.x; //1 / this.dist;
}

DNABox2D.prototype.computeFitness = function (target) {
    'use strict';
}


DNABox2D.prototype.displayStats = function () {
    return `best ${this.id} [lefter: ${this.fitness.toFixed(4)}]`;    
    /*
    let wd = 0.4;
    let wt = 0.6;
    let d = this.dist * wd;
    let t = this.timeToTarget * wt;
    let id = Math.min(wd, 1 / d);
    let it = Math.min(wt, 1 / t);
    let s = Math.pow(id + it, 2);
    let f = 3;
    return `d ${d.toFixed()}|t ${t.toFixed()}|id ${id.toFixed(f)}|it ${it.toFixed(f)}|s ${s.toFixed(f)}`;
    */
}
