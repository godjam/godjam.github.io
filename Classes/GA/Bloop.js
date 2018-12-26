let Bloop = function (x, y, scene, dna) {
  'use strict';
  this.dna = dna;
  this.baseHealth = 400;
  this.isTarget = false;

  const w = this.dna.genes[0];
  const maxSize = Math.min(60, ~~(scene.size.x / 20));
  // size and speed - from DNA
  this.r = Tools.map(w, 0, 1, 0, maxSize);
  this.maxspeed = Tools.map(w, 0, 1, 15, 0);
  // health 
  this.health = this.r + this.baseHealth;
  // mover : location x/y
  const c = Tools.map(w, 0, 1, 0, 255);
  this.mover = new Mover(x, y, scene, this.r);
  this.mover.color = new Color(255 - c, c, 245, 0.6);
  this.mover.setMaxVelocity(this.maxspeed);
};


Bloop.prototype.update = function (food, predators) {
  'use strict';
  this.health -= 1;
  if (this.health <= 0) return;

  // catch food
  const v1 = this.mover.location
  let distSq = Number.MAX_SAFE_INTEGER;
  let targetFood = null;

  for (let i = 0; i < food.length; i++) {
    const v2 = food[i].location;
    const v = Vector2.distanceSq(v1, v2);
    if (v < distSq) {
      distSq = v;
      targetFood = food[i];
    }
  }

  if (targetFood) {
    targetFood.setAsTarget();
    let delta = targetFood.location.sub(v1)
    this.mover.applyForce(delta.withMag(2));

    if (delta.mag() < this.r && this.health < this.baseHealth * 4) {
      this.health += this.baseHealth;
      targetFood.eaten();
    }
  }

  // avoid predators

  for (let i = 0; i < predators.length; i++) {
    let p = v1.sub(predators[i].mover.location);
    this.mover.applyForce(p.withMag(1 / p.mag()));
  }


  // update mover
  this.mover.update(1);
}

Bloop.prototype.displayHealth = function (ctx) {
  const h = this.health > 0 ? ~~this.health : '';
  const p = this.mover.location;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.fillStyle = '#000';
  ctx.fillText(h, 0, 0);
  ctx.restore();
}

Bloop.prototype.display = function (ctx) {
  'use strict';
  if (this.health < 0) {
    this.mover.color.a *= 0.9;
  }

  this.mover.displayAsCircle(ctx);
  if (this.isTarget) {
    let r = this.r;
    ctx.beginPath();
    ctx.rect(
      this.mover.location.x - r / 2,
      this.mover.location.y - r / 2,
      r, r);
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.closePath();
    this.isTarget = false;
  }
}

Bloop.prototype.dead = function () {
  'use strict';
  return this.health < -100
}

Bloop.prototype.setAsTarget = function () {
  this.isTarget = true;
}

Bloop.prototype.reproduce = function () {
  'use strict';
  if (this.health < this.baseHealth / 5) return;

  if (Math.random() < 0.001) {
    let dna = this.dna.copy();
    dna.mutate(0.01);
    return new Bloop(
      this.mover.location.x,
      this.mover.location.y,
      this.mover.scene, dna)
  }
}

Bloop.prototype.eaten = function () {
  'use strict';
  this.health -= this.baseHealth;
  this.health = Math.max(0, this.health);
}