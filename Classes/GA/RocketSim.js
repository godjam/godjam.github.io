function RocketSim(scene) {
    'use strict';
    this.scene = scene;
    this.rocketsCount = 100;
    this.framesCount = ~~(this.scene.size.y * .8);
    this.elapsedFrames = 0;
    this.frameStep = 4;
    this.mutationRate = 0.02;
    this.obstaclesCount = ~~this.scene.size.x / 300;

    let x = this.scene.size.x / 2;
    let y = this.scene.size.y * .9;
    this.start = new Vector2(x, y);
    this.target = new Vector2(x, y * 0.2);

    this.targetRect = new Mover(this.target.x, this.target.y, this.scene)
    this.obstacles = [];
    this.rockets = [];
    this.gravity = null;
    const options = {
        size: this.framesCount,
        maxForce: 0.5,
        maxDist: 1000,
        distThreshold: 20,
        baseTimeToTarget: this.framesCount
    };
    this.pop = new Pop(this.rocketsCount, DNA2D, options);
}

RocketSim.prototype.init = function () {
    'use strict';
    for (let i = 0; i < this.pop.gen.length; ++i) {
        let dna = this.pop.gen[i];
        this.rockets.push(new Rocket(this.start.x, this.start.y, this.scene, dna));
    }

    for (let i = 0; i < this.obstaclesCount; ++i) {
        let w = this.scene.size.x * 0.3;
        let x = this.scene.size.x * 0.3 + Math.random() * w;
        let h = this.scene.size.y * 0.3;
        let y = this.scene.size.y * 0.5 + Math.random() * h;
        let m = this.scene.size.y / 30;
        let mass = Math.random() * m + m;
        this.obstacles.push(new Mover(x, y, this.scene, mass))
    }

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

    this.display();
}

RocketSim.prototype.display = function() {
    for (let i = 0; i < this.obstacles.length; ++i) {
        let obstacle = this.obstacles[i];
        obstacle.angle += 0.03 - i / 100;
        obstacle.displayAsPoly(this.scene.ctx, 6 + i);
    }
    
    for (let i = 0; i < this.rockets.length; ++i) {
        let rocket = this.rockets[i];
        rocket.display(this.scene.ctx);
    }
    
    this.targetRect.display(this.scene.ctx);
    
    if(this.scene.listenToEvents) {
        this.pop.display(this.scene.ctx);
    }            
}

RocketSim.prototype.updateSim = function () {
    'use strict';
    for (let f = 0; f < this.frameStep; f++) {
        if (this.elapsedFrames < this.framesCount) {
            for (let i = 0; i < this.rockets.length; ++i) {
                let rocket = this.rockets[i];
                let dna = rocket.dna;
                rocket.update(this.elapsedFrames, this.obstacles, this.gravity);
                dna.updateScore(rocket, this.target, this.elapsedFrames);
            }
            this.elapsedFrames++;
        }
    }
}

RocketSim.prototype.nextGeneration = function () {
    'use strict';
    this.pop.evolveStep(this.target, this.mutationRate);
    this.elapsedFrames = 0;

    // reset rockets loc + reset rockets DNA
    for (let i = 0; i < this.rockets.length; ++i) {
        let rocket = this.rockets[i];
        let dna = this.pop.gen[i];
        rocket.init(this.start.x, this.start.y, dna);
    }
}