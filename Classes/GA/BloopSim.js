function BloopSim(scene) {
  'use strict';

  this.scene = scene;
  let s = this.scene.size;
  this.bloopCount = Math.max(20, ~~(s.y * s.y / 10000));
  this.predatorCount = ~~(this.bloopCount / 20);
  this.foodCount = ~~(this.bloopCount / 2);

  this.maxBloops = 2 * this.bloopCount;
  this.maxPredators = 5 * this.predatorCount;
  this.maxFood = 1000;

  this.bloops = [];
  this.food = [];
  this.predators = [];
}

BloopSim.prototype.init = function () {
  'use strict';

  // bloop
  for (let i = 0; i < this.bloopCount; ++i) {
    this.bloops.push(this.createBloop());
  }

  // predators
  for (let i = 0; i < this.predatorCount; ++i) {
    this.predators.push(this.createPredator());
  }

  // food
  for (let i = 0; i < this.foodCount; ++i) {
    this.food.push(this.createFood());
  }

  // mouse evt listener
  let listener = new MouseEvtListener(
    this.scene, (e) => this.touchHandler(e));
  this.scene.addListener(listener);
}

BloopSim.prototype.createBloop = function () {
  'use strict';
  const s = this.scene.size;
  const r = s.x / 2;
  const dna = new DNABloop(1);
  const ox = r / 2 - Math.random() * r;
  const oy = r / 2 - Math.random() * r;
  return new Bloop(ox, oy, this.scene, dna);
}

BloopSim.prototype.createPredator = function () {
  'use strict';
  const s = this.scene.size;
  const r = s.x / 2;
  const dna = new DNABloop(1);
  const ox = s.x + r / 2 - Math.random() * r;
  const oy = s.y + r / 2 - Math.random() * r;
  return new PredatorBloop(ox, oy, this.scene, dna);
}

BloopSim.prototype.createFood = function (x, y) {
  'use strict';
  return new Food(this.scene, x, y);
}

BloopSim.prototype.touchHandler = function (e) {
  'use strict';
  let food = this.createFood(e.x, e.y);
  this.food.push(food);
}

BloopSim.prototype.update = function () {
  'use strict';
  this.updateBloops();
  this.updatePredators();
  this.updateFood();

  this.display();
}

BloopSim.prototype.updateBloops = function () {
  'use strict';
  let nextBloopGeneration = [];

  for (let i = 0; i < this.bloops.length; ++i) {
    const b = this.bloops[i];
    b.update(this.food, this.predators);

    // reproduction
    const child = b.reproduce();
    if (child)
      nextBloopGeneration.push(child);

    // loot
    if (b.dead()) {
      const loc = b.mover.location;
      const food = new Food(this.scene, loc.x, loc.y);
      this.food.push(food);
    }
  }

  // remove dead bloops
  this.bloops = this.bloops.filter(b => !b.dead())
  // add new bloops
  this.bloops = this.bloops.concat(nextBloopGeneration);

  // min/max size
  if (this.bloops.length > this.maxBloops)
    this.bloops.length = this.maxBloops;
  if (this.bloops.length <= 0)
    this.bloops.push(this.createBloop());
}


BloopSim.prototype.updatePredators = function () {
  'use strict';
  let nextPredatorGeneration = [];

  for (let i = 0; i < this.predators.length; ++i) {
    const p = this.predators[i];
    p.update(this.bloops);

    // reproduction
    const child = p.reproduce();
    if (child)
      nextPredatorGeneration.push(child);

    // loot
    if (p.dead()) {
      const loc = p.mover.location;
      const food = new Food(this.scene, loc.x, loc.y);
      this.food.push(food);
    }
  }

  // remove dead predators
  this.predators = this.predators.filter(b => !b.dead())
  // add new predators
  this.predators = this.predators.concat(nextPredatorGeneration);


  // min/max size
  if (this.predators.length > this.maxPredators)
    this.predators.length = this.maxPredators;
  if (this.predators.length <= 0)
    this.predators.push(this.createPredator());
}

BloopSim.prototype.updateFood = function () {
  'use strict';
  let nextFoodGeneration = []
  for (let i = 0; i < this.food.length; ++i) {
    const f = this.food[i];
    f.update(false);

    const child = f.reproduce();
    if (child)
      nextFoodGeneration.push(child);
  }

  // remove food
  this.food = this.food.filter(b => b.alive);
  this.food = this.food.concat(nextFoodGeneration);

  if (this.food.length > this.maxFood)
    this.food = this.food.slice(this.food.length - this.maxFood, this.food.length);
}


BloopSim.prototype.display = function () {
  'use strict';

  for (let i = 0; i < this.food.length; ++i) {
    let food = this.food[i];
    food.display(this.scene.ctx);
  }

  for (let i = 0; i < this.bloops.length; ++i) {
    let bloop = this.bloops[i];
    //bloop.displayHealth(this.scene.ctx);
    bloop.display(this.scene.ctx);
  }

  for (let i = 0; i < this.predators.length; ++i) {
    let predator = this.predators[i];
    //predator.displayHealth(this.scene.ctx);
    predator.display(this.scene.ctx);
  }
}