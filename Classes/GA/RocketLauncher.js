function RocketLauncher(scene) {
    'use strict';
    this.scene = scene;
    this.rocketsCount = 100;
    this.framesCount = this.scene.size.y * 0.8;
    this.elapsedFrames = 0;
    this.frameStep = 4;
    this.mutationRate = 0.00;

    let x = this.scene.size.x / 2;
    let y = this.scene.size.y;
    this.start = new Vector2(x, y);
    this.target = new Vector2(x, y * 0.2);

    this.targetRect = new Mover(this.target.x, this.target.y, this.scene)
    this.rockets = [];
    this.pop = new Pop(this.rocketsCount, this.framesCount, DNA2D);
}

RocketLauncher.prototype.init = function () {
    'use strict';
    for (let i = 0; i < this.pop.gen.length; ++i) {
        let dna = this.pop.gen[i];
        this.rockets.push(new Rocket(this.start.x, this.start.y, this.scene, dna));
    }
}

RocketLauncher.prototype.update = function () {
    'use strict';
    // sim
    if (this.elapsedFrames < this.framesCount) {
        this.updateSim();
    }
    // score + crossover + new gen
    else {
        this.nextGeneration();
    }
}

RocketLauncher.prototype.updateSim = function () {
    'use strict';
    for (let f = 0; f < this.frameStep; f++) {
        if (this.elapsedFrames < this.framesCount) {
            for (let i = 0; i < this.rockets.length; ++i) {
                let rocket = this.rockets[i];
                rocket.update(this.elapsedFrames);
                rocket.mover.displayAsPoly(this.scene.ctx, 3);
            }
            this.targetRect.display(this.scene.ctx);
            this.elapsedFrames++;
        }
    }
}

RocketLauncher.prototype.nextGeneration = function () {
    'use strict';
    for (let i = 0; i < this.rockets.length; ++i) {
        let rocket = this.rockets[i];
        let mover = rocket.mover;
        let dna = rocket.dna;

        dna.updateScore(mover.location, mover.velocity);
    }
    this.pop.evolveStep(this.target, this.mutationRate);
    this.elapsedFrames = 0;

    // reset rockets loc + reset rockets DNA
    for (let i = 0; i < this.rockets.length; ++i) {
        let rocket = this.rockets[i];
        let dna = this.pop.gen[i];
        rocket.init(this.start.x, this.start.y, dna);
    }
}