function Box2dSim(scene) {
  'use strict';
  this.scene = scene;
  this.creaturesCount = 10;
  this.elapsedFrames = 0;
  this.framesCount = 200;

  this.frameStep = 1;
  this.mutationRate = 0.02;

  let x = this.scene.size.x * .5;
  let y = this.scene.size.y * .9;
  this.start = new Vector2(x, y);
  this.target = new Vector2(x, y * 0.2);

  this.creatures = [];
  this.pop = new Pop(this.creaturesCount, DNABox2D);

  this.scale = 30;
  this.gravity = new B2Vec2(0, 9);
  this.world = new B2World(this.gravity, true);

  // simple blocks
  let p = this.scene.size.y - 50;
  this.b4 = new Circle(550, p, this.scene, this.world, this.scale, 20);
  this.b4a = new Circle(450, p, this.scene, this.world, this.scale, 20);
  this.b4b = new Circle(250, p, this.scene, this.world, this.scale, 20);
  this.b4c = new Circle(150, p, this.scene, this.world, this.scale, 20);

  // boundaries
  this.b5 = new Box(this.scene.size.x / 2, this.scene.size.y - 10,
    this.scene, this.world, this.scale,
    this.scene.size.x * 2, 5, B2StaticBody);

  this.b6 = new Box(this.scene.size.x / 2, 5,
    this.scene, this.world, this.scale,
    this.scene.size.x * 2, 5, B2StaticBody);

  this.b7 = new Box(5, this.scene.size.y / 2,
    this.scene, this.world, this.scale,
    5, this.scene.size.y * 2, B2StaticBody);

  this.b8 = new Box(this.scene.size.x - 5, this.scene.size.y / 2,
    this.scene, this.world, this.scale,
    5, this.scene.size.y * 2, B2StaticBody);

  // first floor
  this.b9 = new Box(
    this.scene.size.x - 5,
    this.scene.size.y * .8,
    this.scene, this.world, this.scale,
    this.scene.size.x * .55, 5, B2StaticBody);

  this.b10 = new Box(
    5,
    this.scene.size.y * .8,
    this.scene, this.world, this.scale,
    this.scene.size.x * .55, 5, B2StaticBody);

  // second floor
  this.b11 = new Box(
    this.scene.size.x / 2,
    this.scene.size.y / 2,
    this.scene, this.world, this.scale,
    this.scene.size.x * .5, 5, B2StaticBody);

}

Box2dSim.prototype.init = function () {
  'use strict';
  // destroy old creatures
  for (let i = 0; i < this.creatures.length; ++i) {
    let creature = this.creatures[i];
    creature.destroy();
  }

  // reset creatures list
  this.creatures = [];

  // create new creatures from DNA
  for (let i = 0; i < this.pop.gen.length; ++i) {
    let dna = this.pop.gen[i];
    this.creatures.push(new Box2dCreature(
      this.start.x,
      Math.random() * this.scene.size.y, // this.start.y,
      this.scene, dna, this.world, this.scale));
  }
}

Box2dSim.prototype.update = function () {
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

Box2dSim.prototype.display = function () {
  for (let i = 0; i < this.creatures.length; ++i) {
    let creature = this.creatures[i];
    creature.display(this.scene.ctx);
  }

  if (this.scene.listenToEvents) {
    this.pop.display(this.scene.ctx);
  }

  this.b4.display(this.scene.ctx);
  this.b4a.display(this.scene.ctx);
  this.b4b.display(this.scene.ctx);
  this.b4c.display(this.scene.ctx);
  this.b5.display(this.scene.ctx);
  this.b6.display(this.scene.ctx);
  this.b7.display(this.scene.ctx);
  this.b8.display(this.scene.ctx);
  this.b9.display(this.scene.ctx);
  this.b10.display(this.scene.ctx);
  this.b11.display(this.scene.ctx);
}

Box2dSim.prototype.updateSim = function () {
  'use strict';

  this.world.Step(
    1 / 30, //frame-rate
    10, //velocity iterations
    10 //position iterations
  );
  //this.world.DrawDebugData();
  this.world.ClearForces();

  this.b4.update();
  this.b4a.update();
  this.b4b.update();
  this.b4c.update();
  this.b5.update();
  this.b6.update();
  this.b7.update();
  this.b8.update();
  this.b9.update();
  this.b10.update();
  this.b11.update();

  for (let f = 0; f < this.frameStep; f++) {
    if (this.elapsedFrames < this.framesCount) {
      for (let i = 0; i < this.creatures.length; ++i) {
        let creature = this.creatures[i];
        let dna = creature.dna;
        creature.update(this.elapsedFrames, this.obstacles, this.gravity);
        dna.updateScore(creature, this.target, this.elapsedFrames);
      }
      this.elapsedFrames++;
    }
  }
}

Box2dSim.prototype.nextGeneration = function () {
  'use strict';
  this.pop.evolveStep(this.target, this.mutationRate);
  this.elapsedFrames = 0;

  // reset creatures loc + reset creatures DNA
  this.init();
}