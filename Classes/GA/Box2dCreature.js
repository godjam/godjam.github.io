let rr = function (value, percent = .2) {
  //percent = Math.min(2, percent)
  percent = Math.max(0, percent)

  let r = Math.random() * percent * value;
  let rmin = 0 * percent * value;
  let rmax = 1 * percent * value;
  let base = value - (value * percent / 2);
  /*
  console.log('value: ' + value + ' percent: ' + percent 
  + ' => r: ' + r.toFixed(2) + ' base: ' + base 
  + ' => res: ' + (base+r).toFixed() 
  + ' min: ' + (base+rmin).toFixed()
  + ' max: ' + (base+rmax).toFixed())
  */
  return base + r;
}

let rd = function (value, variability = .5) {
  variability = Math.min(1, variability);
  variability = Math.max(0, variability);
  return (value * (1 - variability)) + (Math.random() * value * variability);
}


let Box2dCreature = function (x, y, scene, dna, world, scale) {
  'use strict';
  this.nodes = [];
  this.joints = [];
  this.scene = scene;
  this.world = world;
  this.scale = scale;
  this.dna = dna;
  // console.log(`${this.dna.id} ctor with [${this.dna.genes.map(g => g[0])}]`);
  this.init(x, y);
};


Box2dCreature.prototype.init = function (x, y) {
  'use strict';
  this.nodes = [];
  this.joints = [];

  const root_segment = this.dna.genes[0];
  this.addRoot(x, y, root_segment[1], root_segment[2]);

  // for each creature
  // max_width, max_height, max_angle, max_speed, max_torque, max_amplitude, max_period, segments
  // for each segment
  // parent_id, width, height, angle, mirror, speed, torque, amplitude, period, anchor_x 

  for (let i = 1; i < this.dna.genes.length; ++i) {
    const segment = this.dna.genes[i];
    if (!segment || segment.length != 10) {
      console.error('there is an error');
      continue;
    }

    const k = this.nodes.length;
    const parent_ref = Math.min(segment[0], -k);

    const parent_id = k + parent_ref;
    
    // TODO use parent node for all the segments
    const parent = this.nodes[parent_id];
    const width = segment[1];
    const height = segment[2];
    const angle = segment[3];
    const mirror = segment[4];
    const speed = segment[5];
    const torque = segment[6];
    const amplitude = segment[7];
    const period = segment[8];
    const anchor_x = segment[9];

    //console.log(p);
    if (parent)
      this.addNode(parent, new B2Vec2(anchor_x, 0), width, height, angle, mirror, speed, torque, amplitude, period);
    else console.error(`${this.dna.id} seg ${i} (node ${k+1}) parent not found: ${segment[0]}`); 
  }
  // console.log(`${this.dna.id} created with [${this.dna.genes.map(g => g[0])}]`);
}

Box2dCreature.prototype.addRoot = function (x, y, w, h) {
  'use strict';
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw 'Box2dCreature.addRoot : x or y is not a number';
  }

  if (typeof w !== 'number' || typeof h !== 'number') {
    throw 'Box2dCreature.addRoot : width or heigth is not a number';
  }

  const root = new Box(x, y, this.scene, this.world, this.scale, w, h);
  this.nodes.push(root);
  return root;
}

Box2dCreature.prototype.addNode = function (parent, parentAnchor, w, h, angle, mirror, speed, torque, amplitude, period) {
  'use strict';
  // check types
  if (!parent || !parent.body) {
    throw 'Box2dCreature.addNode : parent is null or has no body ';
  }

  if (parentAnchor instanceof B2Vec2 === false) {
    throw 'Box2dCreature.addNode : parentAnchor is not a B2Vec2';
  }

  if (typeof w !== 'number' || typeof h !== 'number') {
    throw 'Box2dCreature.addNode : width or heigth is not a number';
  }

  if (typeof angle !== 'number') {
    throw 'Box2dCreature.addNode : angle is not a number';
  }

  if (typeof mirror !== 'boolean') {
    throw 'Box2dCreature.addNode : mirror is not a boolean';
  }

  if (typeof speed !== 'number' || typeof torque !== 'number') {
    throw 'Box2dCreature.addNode : speed or torque is not a number';
  }

  if (typeof amplitude !== 'number' || typeof period !== 'number') {
    throw 'Box2dCreature.addNode : amplitude or period is not a number';
  }

  // position
  const pos = parent.body.GetWorldCenter().Copy();
  pos.x *= this.scale;
  pos.y *= this.scale;
  let anchor = new B2Vec2(0, 0);

  // mirror :
  if (mirror) {
    anchor.x = 1;
    parentAnchor.x = -parentAnchor.x;
    angle = -angle;
    speed = -speed;
    pos.x -= parent.boxW * 2;
  } else {
    anchor.x = -1;
    pos.x += parent.boxW * 2;
  }

  const node = new Box(pos.x, pos.y, this.scene, this.world, this.scale, w, h);
  node.body.SetAngle(angle);
  this.nodes.push(node);

  const joint = parent.addOscillatorJoint( //addRevoluteJoint(// 
    parent.body,
    node.body,
    this.world,
    parentAnchor,
    anchor,
    speed,
    torque,
    amplitude,
    period);
  this.joints.push(joint);

  return node;
}

Box2dCreature.prototype.update = function (ctx) {
  'use strict';
  // TODO
  /*
  // update joints
  for (let i = 0; i < this.joints.length; i++) {
    const joint = this.joints[i];
    joint.update();
  }
  //*/

  // update nodes
  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    node.update();
  }
}

Box2dCreature.prototype.display = function (ctx) {
  'use strict';
  const root = this.nodes[0];
  const list = this.dna.genes.map(g => g[0]);
  const score = this.dna.fitness;
  ctx.fillText(`${this.dna.id}: ${score.toFixed(4)}`, root.x, root.y - 20);

  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    node.display(ctx);
  }
};

Box2dCreature.prototype.destroy = function () {
  // destroy inner nodes
  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    node.killBody();
  }
}