let NetworkvizScene = function (options) {
  'use strict';
  Scene.call(this, options);
  this.intro('Neural Networks - Network visualization', 'TODO');

  this.gravity = new B2Vec2(0, 10);
  this.world = new B2World(this.gravity, true);
  this.scale = 30;

  this.boundary = new SpaceBoundary(this, this.world, this.scale);
  this.rockets = [];

  this.rocketsCount = 10;
  this.framesCount = ~~(this.size.y * .8);
  this.elapsedFrames = 0;
  this.frameStep = 4;

  this.mutationRate = 0.1;
  let dnaSize = 3 * 4 + 4 * 2;
  let dnaOptions = {};
  this.pop = new Pop(this.rocketsCount, 'DNABloop', dnaSize, false, dnaOptions);

  this.init();
};

NetworkvizScene.prototype = Object.create(Scene.prototype);
NetworkvizScene.prototype.constructor = NetworkvizScene;

NetworkvizScene.prototype.init = function () {
  'use strict';
  this.rockets = [];
  this.startx = this.size.x * .5;
  this.starty = this.size.y * .99;

  for (let i = 0; i < this.pop.gen.length; ++i) {
    let dna = this.pop.gen[i];
    this.rockets.push(
      new NNRocket(this.startx, this.starty,
        this, this.world, this.scale, dna));
  }
};

NetworkvizScene.prototype.loop = function (delta, ctx) {
  'use strict';
  Scene.prototype.loop.call(this, delta, ctx);

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


NetworkvizScene.prototype.display = function () {
  'use strict';

  // TODO move to updateSim ?
  this.world.Step(
    1 / 30,   //frame-rate
    10,       //velocity iterations
    10       //position iterations
  );

  this.boundary.display(this.ctx);

  for (let i = 0; i < this.rockets.length; ++i) {
    this.rockets[i].display(this.ctx);
  }

  if (this.listenToEvents) {
    this.pop.display(this.ctx);
  }

  // TODO move to updateSim ?
  this.world.ClearForces();
}

NetworkvizScene.prototype.updateSim = function () {
  'use strict';
  let obstacles = this.boundary.obstacles;
  let target = this.boundary.target;

  let best = null;
  if (this.rockets.length > 0) best = this.rockets[0];

  for (let f = 0; f < this.frameStep; f++) {
    if (this.elapsedFrames < this.framesCount) {
      for (let i = 0; i < this.rockets.length; ++i) {
        let rocket = this.rockets[i];
        let dna = rocket.dna;
        rocket.update(this.elapsedFrames, obstacles, this.gravity);
        this.updateFitness(dna, rocket, target);
        if(rocket.dna.fitness > best.dna.fitness)
          best = rocket;
      }

      // set scene camera target
      let best_pos = best.chassis.body.GetWorldCenter(); 
      this.target.x = best_pos.x * this.scale;
      this.target.y = best_pos.y * this.scale;

      this.elapsedFrames++;
    }
  }
}


NetworkvizScene.prototype.updateFitness = function (dna, rocket, target) {
  'use strict';
  let rc = rocket.chassis.body.GetWorldCenter();
  let tc = target.body.GetWorldCenter();
  let dx = tc.x - rc.x;
  let dy = tc.y - rc.y;
  // let dist = 1 / (dx * dx + dy * dy);
  let previousFitness = dna.fitness;
  let dist = 1 / rc.y;
  let max = Math.max(previousFitness, dist);
  dna.updateFitness(max);
}

NetworkvizScene.prototype.nextGeneration = function () {
  'use strict';
  // TODO clear Box2D bodies
  this.pop.evolveStep(null, this.mutationRate);
  this.elapsedFrames = 0;

  // reset rockets loc + reset rockets DNA
  for (let i = 0; i < this.rockets.length; ++i) {
    let rocket = this.rockets[i];
    let dna = this.pop.gen[i];
    rocket.init(this.startx, this.starty, dna);
  }
}