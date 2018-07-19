let Pop = function (size, dna_class, options) {
    'use strict';
    options = options || {};
    this.generation = 0;
    this.gen = [];
    this.best = null;
    for (let i = 0; i < size; ++i) {
        // TODO maybe use a factory here
        const dna = new dna_class(options);
        dna.createGenes();
        this.gen.push(dna)
    }
}

Pop.prototype.computeFitness = function (target) {
    'use strict';
    for (let i = 0; i < this.gen.length; ++i) {
        let dna = this.gen[i];
        dna.computeFitness(target);
    }

    this.gen.sort((a, b) => {
        return a.fitness > b.fitness ? -1 : 1
    })

    this.best = this.gen[0];
}

Pop.prototype.pool = function () {
    'use strict';
    let pool = [];
    let sum = this.gen.reduce((a, b) => ({
        fitness: a.fitness + b.fitness
    }));
    let weight = this.gen.length / (sum.fitness || 1);
    // console.log(`pop: ${this.gen.length} sum fitness: ${sum.fitness.toFixed(2)} weight: ${weight}`);

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
        pool.push(this.gen[0]);
        console.log('### Error : Pop.pool : missing DNA')
    }

    return pool;
}

Pop.prototype.crossAndKeepBests = function (numberToKeep, mutationRate) {
    'use strict';
    const previousGen = this.gen.slice(0, numberToKeep);
    this.cross(mutationRate, previousGen);
}


Pop.prototype.cross = function (mutationRate, previousGen) {
    'use strict';
    let pool = this.pool();
    let nextGen = previousGen || [];

    let loops = Math.max(1, ~~(this.gen.length / 2));
    for (let i = 0; i < loops; ++i) {
        let a = ~~(Math.random() * pool.length);
        let parentA = pool.splice(a, 1)[0];

        let b = ~~(Math.random() * pool.length);
        let parentB = pool.splice(b, 1)[0];


        if (parentA && parentB) {
            let childA = parentA.crossOver(parentB);
            let childB = parentA.crossOver(parentB);
            childA.mutate(mutationRate);
            childB.mutate(mutationRate);
            nextGen.push(childA);
            nextGen.push(childB);
        }
    }

    for (let i = nextGen.length; i < this.gen.length; ++i) {
        nextGen.push(this.gen[0]);
        console.log('### Error : Pop.cross : missing DNA')
    }

    nextGen.length = this.gen.length;

    // reseting fitnesses 
    for (let i = 0; i < nextGen.length; ++i) {
        nextGen[i].resetScore();
    }

    this.gen = nextGen;
}

Pop.prototype.evolveStep = function (target, mutationRate) {
    this.computeFitness(target);

    // console.log(`generation: ${this.generation}`);
    let sumFitness = 0;

    for (let i = this.gen.length - 1; i >= 0; --i) {
        let dna = this.gen[i];
        sumFitness += dna.fitness;
        //console.log(`id: ${dna.id} dist: ${dna.dist.toFixed()} ttt: ${dna.timeToTarget} vi: ${dna.impactVelocity} alive: ${dna.alive} fit: ${dna.fitness.toFixed(4)}`);    
    }
    console.log(`generation: ${this.generation} avg fitness: ${(sumFitness / this.gen.length).toFixed(4)}`);

    this.crossAndKeepBests(2, mutationRate);
    this.generation++;
}

Pop.prototype.evolve = function (target, steps, mutationRate) {
    'use strict';
    this.computeFitness(target);

    for (let i = 0; i < steps; ++i) {

        this.evolveStep(target, mutationRate);
        let dna = this.best;
        let str = '';

        for (let k = 0; k < dna.genes.length; ++k) {
            let g = dna.genes[k];
            str += String.fromCharCode(g);
        }

        dna.computeFitness(target);
        console.log(`### ${this.best.id} ${str} (fitness: ${this.best.fitness.toFixed(2)})`);

        if (this.best.fitness == 1)
            break;
    }
}

Pop.prototype.display = function (ctx) {
    ctx.fillStyle = '#000';
    ctx.font = '12px verdana';
    ctx.fillText('generation: ' + this.generation, 64, 32);
    if (this.best) {
        ctx.fillText(this.best.displayStats(), 64, 52);
    }
}