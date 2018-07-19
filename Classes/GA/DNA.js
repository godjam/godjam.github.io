function DNA(options) {
    'use strict';
    this.options = options || {};
    this.resetScore();

    this.id = ++DNA.id;
    this.genes = [];
}
DNA.id = 0;

// TODO : have a ctor that do not generate genes + a call to createGenes that actually create genes
// difference between init and resetScore?
// resetScore is used whene an individual is taken from a previous generation

DNA.prototype.createGenes = function () {
    for (let i = 0; i < this.options.size; ++i)
        this.genes.push(this.createGene());
}

DNA.prototype.resetScore = function () {
    this.fitness = 0;
}

DNA.prototype.createGene = function () {
    return Tools.rnd(32, 128);
}

DNA.prototype.mutateGene = function (i, gene) {
    // by default there is no mutation of a gene 
    // => mutation is a creation of a new gene
    return this.createGene();
}

DNA.prototype.crossOver = function (other) {
    'use strict';
    // TODO random between parent genes length
    let size = this.genes.length;
    
    // create new child without genes
    // TODO : there should be a single constructor for all type of DNA
    let child = new this.constructor(this.options);
    let pivotPoint = ~~(Math.random() * size);

    // take nodes from parents
    for (let i = 0; i < size; ++i) {
        if (i > pivotPoint)
            child.genes.push(this.genes[i]);
        else
            child.genes.push(other.genes[i]);
        
        if(child.genes[i] == null) {
            console.log('create a new gene');
            child.genes.push(this.createGene());
        }
    }

    // removes unmatched genes
    child.genes = child.genes.filter(g => g != null);
    let list = child.genes.map(g => g[0]);
    //console.log(`new individual ${child.id} with [${list}] (${child.genes.length} vs ${size}) connexions`)

    return child;
}

DNA.prototype.crossOverFlip = function (other) {
    'use strict';
    // TODO fix it with the same than crossOver
    let size = this.genes.length;
    let child = new this.constructor(this.size);

    for (let i = 0; i < size; ++i) {
        let rnd = Math.random();
        if (rnd > 0.5)
            child.genes[i] = this.genes[i];
        else
            child.genes[i] = other.genes[i];
    }

    return child;
}

DNA.prototype.mutate = function (mutationRate = 0.01) {
    let size = this.genes.length;
    for (let i = 0; i < size; ++i) {
        let rnd = Math.random();
        if (rnd < mutationRate)
            this.genes[i] = this.mutateGene(i, this.genes[i]);
    }
}

DNA.prototype.computeFitness = function (target) {
    'use strict';
    let score = 0;
    for (let i = 0; i < this.genes.length; ++i) {
        if (this.genes[i] === target.charCodeAt(i)) {
            score++;
        }
    }
    let fit = score / target.length;
    this.fitness = fit * fit;
}

DNA.prototype.displayStats = function () {
    return 'best score: ' + this.fitness.toFixed(3);
}
