let NNRocket = function (x, y, scene, world, scale, dna) {
  'use strict';
  // TODO 3: integrate Neural network + DNA => DNANeuralNetwork ?   
  Box2dEntity.call(this, x, y, scene, world, scale);
  this.netShape = [3, 4, 2];
 
  this.chassis = new Box(x, y, scene, world, scale, 5, 25);
  this.addEntity('chassis', this.chassis);

  const angle0 = Math.PI;
  const angleD = Math.PI * 0.3;
  
  const body = this.chassis.body;

  this.ray0 = new Raycast(x, y, scene, world, scale, 150, angle0, body);
  this.ray1 = new Raycast(x, y, scene, world, scale, 150, angle0 + angleD, body);
  this.ray2 = new Raycast(x, y, scene, world, scale, 150, angle0 - angleD, body);
  this.init(x, y, dna);
};

NNRocket.prototype = Object.create(Box2dEntity.prototype);
NNRocket.prototype.constructor = NNRocket;

NNRocket.prototype.init = function (x, y, dna) {
  this.chassis.body.SetPositionAndAngle(new B2Vec2(x / this.scale, y / this.scale), 0);
  this.chassis.body.SetLinearVelocity(new B2Vec2(0, 0));

  let genes = Array.from(dna.genes);
  let weights = [];
  
  // TODO : fuction reshapeWeights
  for(let i = 1; i < this.netShape.length; i++) {
    let prevLayerSize = this.netShape[i - 1];
    let nextLayerSize = this.netShape[i];
    let nextWeights = genes.splice(prevLayerSize * nextLayerSize);
    weights.push(genes);
    genes = nextWeights;
  }

  this.dna = dna;
  this.nn = new Network(this.scene, x, y, this.netShape, weights);
}

NNRocket.prototype.update = function () {
  'use strict';
  Box2dEntity.prototype.update.call(this);
  const d0 = this.ray0.update();
  const d1 = this.ray1.update();
  const d2 = this.ray2.update();

  let forces = this.nn.feedforward([d0, d1, d2]);
  // console.log(forces);

  // TODO use RNA to compute x and y accelaration to apply on chassis
  // 3 n en entree et 2 n en sortie
  /*
  const xPower = 1;
  const yPower = -1;
  
  let xForce = 0;
  if(d1 < d2) xForce = xPower
  else if (d1 > d2) xForce = -xPower;
  
  let yForce = 2*yPower;
  if(d0 < 1) yForce = -yPower;
  */
 let xForce = forces[0];
 let yForce = -0.2 - forces[1];

  const angle = this.chassis.body.GetAngle();
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const x = xForce * cos - yForce * sin;
  const y = xForce * sin + yForce * cos;
  this.chassis.applyForce(new B2Vec2(x, y));
}

NNRocket.prototype.display = function (ctx, delta) {
  'use strict';
  this.nn.display(ctx, delta);

  this.ray0.display(ctx);
  this.ray1.display(ctx);
  this.ray2.display(ctx);

  Box2dEntity.prototype.display.call(this, ctx);
}