function DNA(size) {
    'use strict';
    //TODO size
    this.size = size;
    this.init();
}
DNA.id = 0;

DNA.prototype.init = function () {
    this.id = ++DNA.id;
    this.genes = [];
    this.fitness = 0;

    for (let i = 0; i < this.size; ++i) {
        this.genes.push(this.createGene());
    }
}

DNA.prototype.createGene = function () {
    return Tools.rnd(32, 128);
}

DNA.prototype.crossOver = function (other) {
    'use strict';
    let size = this.genes.length;
    let child = new this.constructor(this.size);
    let pivotPoint = ~~(Math.random() * size);

    for (let i = 0; i < size; ++i) {
        if (i > pivotPoint)
            child.genes[i] = this.genes[i];
        else
            child.genes[i] = other.genes[i];
    }

    return child;
}

DNA.prototype.crossOverFlip = function (other) {
    'use strict';
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
            this.genes[i] = this.createGene();
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