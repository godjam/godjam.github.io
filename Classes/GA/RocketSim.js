function RocketSim(scene) {
    'use strict';
    this.scene = scene;
    this.rocketsCount = 100;
    this.framesCount = ~~(this.scene.size.y * .8);
    this.elapsedFrames = 0;
    this.frameStep = 4;
    this.mutationRate = 0.02;

    let x = this.scene.size.x / 2;
    let y = this.scene.size.y * .9;
    this.start = new Vector2(x, y);
    this.boundary = new RocketSimBoundary(scene);
    this.rockets = [];
    this.gravity = null;
    const options = {
        maxForce: 0.5,
        baseDist: Number.MAX_SAFE_INTEGER,
        distThreshold: 20,
        baseTimeToTarget: this.framesCount
    };
    this.pop = new Pop(this.rocketsCount, 'DNA2D', this.framesCount, false, options);
}

RocketSim.prototype.init = function () {
    'use strict';
    for (let i = 0; i < this.pop.gen.length; ++i) {
        let dna = this.pop.gen[i];
        this.rockets.push(new Rocket(this.start.x, this.start.y, this.scene, dna));
    }

    this.boundary.init();
    this.gravity = new Gravity(0, 0.004);
}

RocketSim.prototype.update = function () {
    'use strict';
    // sim
    if (this.elapsedFrames < this.framesCount) {
        this.updateSim();
    }
    // score + crossover + new gen
    else {
        this.nextGeneration();
    }

    this.boundary.update();
    this.display();
}

RocketSim.prototype.display = function () {
    this.boundary.display(this.scene.ctx);

    for (let i = 0; i < this.rockets.length; ++i) {
        let rocket = this.rockets[i];
        rocket.display(this.scene.ctx);
    }

    if (this.scene.listenToEvents) {
        this.pop.display(this.scene.ctx);
    }
}

RocketSim.prototype.updateSim = function () {
    'use strict';
    let obstacles = this.boundary.obstacles;
    let target = this.boundary.target;

    for (let f = 0; f < this.frameStep; f++) {
        if (this.elapsedFrames < this.framesCount) {
            for (let i = 0; i < this.rockets.length; ++i) {
                let rocket = this.rockets[i];
                let dna = rocket.dna;
                rocket.update(this.elapsedFrames, obstacles, this.gravity);
                dna.updateFitness(rocket, target, this.elapsedFrames);
            }
            this.elapsedFrames++;
        }
    }
}

RocketSim.prototype.nextGeneration = function () {
    'use strict';
    this.pop.evolveStep(this.boundary.target, this.mutationRate);
    this.elapsedFrames = 0;

    // reset rockets loc + reset rockets DNA
    for (let i = 0; i < this.rockets.length; ++i) {
        let rocket = this.rockets[i];
        let dna = this.pop.gen[i];
        rocket.init(this.start.x, this.start.y, dna);
    }
}