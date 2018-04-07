let id = 0;

function DNA(size) {
    'use strict';
    //TODO size
    this.id = ++id;
    this.genes = [];
    this.fitness = 0;

    for (let i = 0; i < size; ++i) {
        this.genes.push(this.createGene());
    }
}

DNA.prototype.createGene = function () {
    return Tools.rnd(32, 128);
}

DNA.prototype.fit = function (target) {
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

DNA.prototype.crossOver = function (other) {
    'use strict';
    let size = this.genes.length;
    let child = new DNA(size);
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
    let child = new DNA(size);

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

// ################################################################
let Pop = function (size, dna_size) {
    'use strict';
    this.dna_size = dna_size;
    this.gen = [];
    for (let i = 0; i < size; ++i) {
        this.gen.push(new DNA(dna_size))
    }
}

Pop.prototype.fit = function (target) {
    'use strict';
    for (let i = 0; i < this.gen.length; ++i) {
        let p = this.gen[i];
        p.fit(target);
    }

    this.gen.sort((a, b) => {
        return a.fitness > b.fitness ? -1 : 1
    })

    if(this.gen[0].fitness >= 1) {
        console.log('perfect fitness: ' + this.gen[0].fitness)
        return this.gen[0];
    }
}

Pop.prototype.pool = function () {
    'use strict';
    let pool = [];
    let sum = this.gen.reduce((a, b) => ({fitness: a.fitness + b.fitness}));
    let weight = this.gen.length / (sum.fitness || 1);
    console.log(`sum fitness: ${sum.fitness.toFixed(2)} weight: ${weight}`);

    for (let i = 0; i < this.gen.length; ++i) {
        let p = this.gen[i];
        let n = p.fitness * weight;

        if (pool.length < this.gen.length) {
            for (let j = 0; j < n; ++j) {
                pool.push(p);
            }
        }
        // console.log(`fit: ${p.fitness.toFixed(2)} n: ${n.toFixed(2)} pool size: ${pool.length}`)
    }

    for (let i = pool.length; i < this.gen.length; ++i) {
        pool.push(new DNA(this.dna_size));
        console.log('### ERR: add empty DNA')
    }

    return pool;
}

Pop.prototype.cross = function (mutationRate) {
    'use strict';
    let pool = this.pool();
    let next_gen = [];

    let loops = ~~(this.gen.length / 2);
    for (let i = 0; i < loops; ++i) {
        // console.log(`${i} / ${loops} (pool: ${pool.length})`)
        let a = ~~(Math.random() * pool.length);
        let parentA = pool.splice(a, 1)[0];

        let b = ~~(Math.random() * pool.length);
        let parentB = pool.splice(b, 1)[0];


        if (parentA) {
            let childA = parentA.crossOver(parentB);
            let childB = parentA.crossOver(parentB);
            childA.mutate(mutationRate);
            childB.mutate(mutationRate);
            next_gen.push(childA);
            next_gen.push(childB);
        }
    }

    //console.log(`${this.gen.length} vs ${next_gen.length}`)
    this.gen = next_gen;
}


Pop.prototype.evolve = function (target, steps, mutationRate) {
    'use strict';
    this.fit(target);

    for (let i = 0; i < steps; ++i) {
        console.log('### generation ' + i);
        this.cross(mutationRate);
        if(this.fit(target))
            break;
    }

    for (let i = 0; i < this.gen.length; ++i) {
        let p = this.gen[i];
        let str = '';

        for (let k = 0; k < p.genes.length; ++k) {
            let g = p.genes[k];
            str += String.fromCharCode(g);
        }

        p.fit(target);
        console.log(`### ${str} (fitness: ${p.fitness.toFixed(2)})`);
    }
}