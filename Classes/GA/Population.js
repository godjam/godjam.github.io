let Pop = function (size, dna_size, dna_class) {
    'use strict';

    this.generation = 0;
    this.dna_size = dna_size;
    this.gen = [];
    this.best = null;
    for (let i = 0; i < size; ++i) {
        this.gen.push(new dna_class(dna_size))
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

Pop.prototype.cross = function (mutationRate) {
    'use strict';
    let pool = this.pool();
    let next_gen = [];

    let loops = Math.max(1, ~~(this.gen.length / 2));
    for (let i = 0; i < loops; ++i) {
        // console.log(`${i} / ${loops} (pool: ${pool.length})`)
        let a = ~~(Math.random() * pool.length);
        let parentA = pool.splice(a, 1)[0];

        let b = ~~(Math.random() * pool.length);
        let parentB = pool.splice(b, 1)[0];


        if (parentA && parentB) {
            let childA = parentA.crossOver(parentB);
            let childB = parentA.crossOver(parentB);
            childA.mutate(mutationRate);
            childB.mutate(mutationRate);
            next_gen.push(childA);
            next_gen.push(childB);
        }
    }

    //console.log(`${this.gen.length} vs ${next_gen.length}`)

    for (let i = next_gen.length; i < this.gen.length; ++i) {
        next_gen.push(this.gen[0]);
        console.log('### Error : Pop.cross : missing DNA')
    }

    this.gen = next_gen;
}

Pop.prototype.evolveStep = function (target, mutationRate) {
    this.computeFitness(target);

    console.log(`generation: ${this.generation}`);
    for(let i=this.gen.length-1; i>=0; --i) {
        let dna = this.gen[i];
        //console.log(`id: ${dna.id} dist: ${dna.dist.toFixed()} ttt: ${dna.timeToTarget} alive: ${dna.alive} fit: ${dna.fitness.toFixed(4)}`);    
    }

    this.cross(mutationRate);
    this.generation++;
}

Pop.prototype.evolve = function (target, steps, mutationRate) {
    'use strict';
    this.computeFitness(target);

    for (let i = 0; i < steps; ++i) {
        if (this.evolveStep(target, mutationRate))
            break;
    }

    for (let i = 0; i < this.gen.length; ++i) {
        let dna = this.gen[i];
        let str = '';

        for (let k = 0; k < dna.genes.length; ++k) {
            let g = dna.genes[k];
            str += String.fromCharCode(g);
        }

        dna.computeFitness(target);
        //console.log(`### ${str} (fitness: ${dna.fitness.toFixed(2)})`);
    }
}

Pop.prototype.display = function (ctx) {
    ctx.fillStyle = '#000';
    ctx.font = '12px verdana';
    ctx.fillText('generation: ' + this.generation, 64, 32);
    if(this.best) {
        ctx.fillText(this.best.displayStats(), 64, 52);
    }
}