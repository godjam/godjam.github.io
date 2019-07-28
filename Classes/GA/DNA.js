function DNA(dnaSize, options) {
    'use strict';
    this.dnaSize = dnaSize;
    this.options = options;
    this.resetFitness();

    this.id = ++DNA.id;
    this.genes = [];
    this.createGenes();
}
DNA.id = 0;

DNA.prototype.copy = function () {
    'use strict';
    // use the right constructor
    let copy = new DNA(this.dnaSize, this.options);
    copy.genes = this.genes;
    return copy;
}

// create all genes
DNA.prototype.createGenes = function () {
    'use strict';
    for (let i = 0; i < this.dnaSize; ++i)
        this.genes.push(this.createGene());
}

// resetFitness is used whene an individual is taken from a previous generation
DNA.prototype.resetFitness = function () {
    'use strict';
    this.fitness = 0;
}

// permit to update Fitness from an external algorithm 
DNA.prototype.updateFitness = function (fitness) {
    'use strict';
    this.fitness = fitness;
}

// create an single random gene 
DNA.prototype.createGene = function () {
    'use strict';
    return Math.random();
}

DNA.prototype.mutateGene = function (i, gene) {
    'use strict';
    // by default there is no mutation of a gene 
    // => mutation is a creation of a new gene
    // console.log(`${this.id} mutation`)
    return this.createGene();
}

DNA.prototype.crossOver = function (other) {
    'use strict';
    // TODO ? random between the twice
    // TODO ? random between parent genes length
    let size = Math.min(this.genes.length, other.genes.length);
    
    // create new child without genes
    let child = this.copy();
    let pivotPoint = ~~(Math.random() * size);

    // take nodes from parents
    for (let i = 0; i < size; ++i) {
        if (i < pivotPoint)
            child.genes[i] = other.genes[i];
    }

    // removes unmatched genes
    child.genes = child.genes.filter(g => g != null);
    // let list = child.genes.map(g => g[0]);
    // console.log(`new individual ${child.id} with [${list}] (${child.genes.length} vs ${size}) connexions`)

    return child;
}

DNA.prototype.crossOverFlip = function (other) {
    'use strict';
    // TODO same as crossOver
    let size = Math.min(this.genes.length, other.genes.length);
    let child = this.copy();

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
    // permit to compute fitness against a target
}

DNA.prototype.displayStats = function () {
    return (`### ${this.id} (fitness: ${this.fitness.toFixed(2)})`);
}
