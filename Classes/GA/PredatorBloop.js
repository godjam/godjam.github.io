let PredatorBloop = function (x, y, scene, dna) {
  'use strict';
  Bloop.call(this, x, y, scene, dna);
  const w = this.dna.genes[0];
  const c = Tools.map(w, 0, 1, 0, 255);
  this.mover.color = new Color(245, 128 - c, c, 0.6);
};
PredatorBloop.prototype = Object.create(Bloop.prototype);
PredatorBloop.prototype.constructor = PredatorBloop;

PredatorBloop.prototype.display = function (ctx) {
  'use strict';
  if (this.health < 0) {
    this.mover.color.a *= 0.9;
  }

  this.mover.displayAsPoly(ctx, 3);
}

PredatorBloop.prototype.update = function (bloops) {
  'use strict';
  this.health -= 1;
  if (this.health <= 0) return;
  
  const v1 = this.mover.location
  let distSq = Number.MAX_SAFE_INTEGER;
  let bloopTarget = null;

  // find min dist
  for (let i = 0; i < bloops.length; i++) {
    if (bloops[i].health < 0) continue;

    const v2 = bloops[i].mover.location;
    const v = Vector2.distanceSq(v1, v2);
    if (v < distSq) {
      distSq = v;
      bloopTarget = bloops[i];
    }
  }

  if (bloopTarget) {
    bloopTarget.setAsTarget();
    let delta = bloopTarget.mover.location.sub(v1);
    this.mover.applyForce(delta.withMag(0.7));
    
    if (delta.mag() < this.r + bloopTarget.r && 
    this.health < this.baseHealth * 4) {
      this.health += this.baseHealth;
      bloopTarget.eaten();
    }
  }

  // update mover
  this.mover.update(1);
}

PredatorBloop.prototype.reproduce = function () {
  'use strict';
  if (this.health < this.baseHealth / 5) return;

  if (Math.random() < 0.007) {
    let dna = this.dna.copy();
    dna.mutate(0.01);
    return new PredatorBloop(
      this.mover.location.x,
      this.mover.location.y,
      this.mover.scene, dna)
  }
}