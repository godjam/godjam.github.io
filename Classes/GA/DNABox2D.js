function DNABox2D(dnaSize, options) {
    'use strict';
    DNA.call(this, dnaSize, options);
}
DNABox2D.prototype = Object.create(DNA.prototype);
DNABox2D.prototype.constructor = DNABox2D;

DNABox2D.prototype.copy = function () {
    let copy = new DNABox2D(this.dnaSize, this.options);
    copy.genes = this.genes;
    return copy;
}

DNABox2D.prototype.createGenes = function () {
    segments = Tools.rnd(2, 10);
    for (let i = 0; i < segments; ++i)
        this.genes.push(this.createGene());
}

// TODO rd -> Tools
// TODO doit être créer pour le premier gene et doit servir de ref pour les autres genes  
// => max_width, max_height, max_angle, max_speed, max_torque, max_amplitude, max_period, segments
DNABox2D.prototype.resetScore = function () {
    this.dist = this.options.baseDist;
    DNA.prototype.resetScore.call(this);
}

DNABox2D.prototype.createGene = function () {
    'use strict';
    const i = this.genes.length;

    const root = (i == 0) ? this.createStructuralGene() : this.genes[0];

    // genereate the segments: parent_id, width, height, angle, mirror, speed, torque, amplitude, period, anchor_x
    // the parent is a local ref (ie: n-1, n-2, n-3) 
    const gene = {
        parent_ref: (i == 0) ? 0 : -1 * Tools.rnd(1, i), //root
        width: rd(root.max_width),
        height: rd(root.max_height),
        angle: Math.random() * root.max_angle,
        mirror: Math.random() > 0.5 ? true : false,
        speed: rd(root.max_speed),
        torque: rd(root.max_torque),
        amplitude: rd(root.max_amplitude),
        period: rd(root.max_period),
        anchor_x: Math.random()
    }

    if (i == 0) return Object.assign(gene, root);
    else return gene;

}

DNABox2D.prototype.createStructuralGene = function () {
    return {
        max_width: rd(60),
        max_height: rd(30),
        max_angle: Math.PI / 2,
        max_speed: rd(15),
        max_torque: rd(1000),
        max_amplitude: rd(20),
        max_period: 300,
        color: Color.createBrightColor(0)
    }
}

DNABox2D.prototype.mutateGene = function (i, gene) {
    const root = this.genes[0];

    gene.parent_ref = (i == 0) ? 0 : -1 * Tools.rnd(1, i);
    gene.width = rd(root.max_width);
    gene.height = rd(root.max_height);
    gene.angle = Math.random() * root.max_angle;
    gene.mirror = Math.random() > 0.5 ? true : false;
    gene.speed = rd(root.max_speed);
    gene.torque = rd(root.max_torque);
    gene.amplitude = rd(root.max_amplitude);
    gene.period = rd(root.max_period);
    gene.anchor_x = Math.random();

    return gene;
}

DNABox2D.prototype.updateScore = function (creature, target, time) {
    'use strict';
    const root = creature.nodes[0];
    // TODO à mettre dans creature
    const center = root.body.GetWorldCenter();
    const x = center.x * creature.scale;
    const y = center.y * creature.scale;

    // used to compute the avg dist to the target
    //if (x < this.dist) {
        this.dist = x;
        this.fitness = x / creature.scene.size.x;
    //}

    if(this.id == 1) {
        console.log(`${this.id} root.x ${root.x.toFixed()} dist: ${this.dist.toFixed()} center.x: ${x.toFixed()}`);
    }
}

DNABox2D.prototype.computeFitness = function (target) {
    'use strict';
}


DNABox2D.prototype.displayStats = function () {
    return `best ${this.id} [top: ${this.fitness.toFixed(3)}]`;
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