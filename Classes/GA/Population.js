let Pop = function (size, dnaType, dnaSize, breakEarly, options) {
    'use strict';
    this.dnaType = dnaType;
    this.dnaSize = dnaSize;
    this.options = options;
    this.generation = 0;
    this.gen = [];
    this.best = null;
    this.sumFitness = 0;
    this.breakEarly = breakEarly;
    for (let i = 0; i < size; ++i) {
        this.gen.push(this.createDna(this.dnaType, this.dnaSize, this.options));
    }
}

Pop.prototype.createDna = function (dnaType, dnaSize, options) {
    // dna factory
    let dna = null;
    if (dnaType == 'DNA')
        dna = new DNA(dnaSize, options);
    else if (dnaType == 'DNA2D')
        dna = new DNA2D(dnaSize, options);
    else if (dnaType == 'DNABox2D')
        dna = new DNABox2D(dnaSize, options);
    else if (dnaType == 'DNABloop')
        dna = new DNABloop(dnaSize, options);
    else throw new Exception(`DNA type (${dnaType}) not found`)

    return dna;
}

Pop.prototype.computeFitness = function (target) {
    'use strict';
    this.sumFitness = 0;
    for (let i = 0; i < this.gen.length; ++i) {
        let dna = this.gen[i];
        dna.computeFitness(target);
        this.sumFitness += dna.fitness;
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
        let n = Math.round(p.fitness * weight);

        for (let j = 0; j <= n; ++j) {
            if (pool.length < this.gen.length) {
                pool.push(p);
            }
        }
        // console.log(`fit: ${p.fitness.toFixed(2)} n: ${n.toFixed(2)} pool size: ${pool.length}`)
    }

    for (let i = pool.length; i < this.gen.length; ++i) {
        pool.push(this.createDna(this.dnaType, this.dnaSize, this.options));
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

Pop.prototype.evolveStep = function (target, mutationRate, keepBests) {
    keepBests = keepBests || 2;
    this.computeFitness(target);

    // should break early
    if (this.breakEarly && this.best.fitness >= 1)
        return true;

    this.crossAndKeepBests(keepBests, mutationRate);
    this.generation++;
    return false;
}

Pop.prototype.evolve = function (target, steps, mutationRate) {
    'use strict';
    for (let i = 0; i < steps; ++i) {
        let shouldBreakEarly = this.evolveStep(target, mutationRate);
        if (shouldBreakEarly) break;
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