let Raycast = function (x, y, scene, world, scale, length, angle, parentBody) {
  'use strict';

  if (typeof length !== 'number') {
    throw 'Raycast.constructor: length is not a scalar';
  }
  if (typeof angle !== 'number') {
    throw 'Raycast.constructor: angle is not a scalar';
  }

  Box2dEntity.call(this, x, y, scene, world, scale);
  this.strokeStyle = "#ced";

  this.p1 = new Vector2(x / scale, y / scale);
  this.p2 = new Vector2(x / scale, y / scale);
  this.length = length / scale;
  this.parentAngle = 0;
  this.baseAngle = angle;
  this.parent = parentBody;
  this.closestFraction = 1;
  this.intersectionNormal = new B2Vec2(0, 0);
};
Raycast.prototype = Object.create(Box2dEntity.prototype);
Raycast.prototype.constructor = Raycast;

Raycast.prototype.update = function () {
  if(this.parent) {
    const c = this.parent.GetWorldCenter();
    this.p1.x = c.x;
    this.p1.y = c.y;
    this.parentAngle = this.parent.GetAngle();
  }

  const angle = this.baseAngle - this.parentAngle;
  this.p2.x = this.p1.x + this.length * Math.sin(angle);
  this.p2.y = this.p1.y + this.length * Math.cos(angle);

  let input = new b2RayCastInput(this.p1, this.p2, 1);
  this.closestFraction = 1;
  this.intersectionNormal = new B2Vec2(0, 0);

  for (let b = this.world.GetBodyList(); b; b = b.GetNext()) {
    for (let f = b.GetFixtureList(); f; f = f.GetNext()) {
      let output = new b2RayCastOutput();
      let hit = f.RayCast(output, input);

      if (hit && output.fraction < this.closestFraction) {
        this.closestFraction = output.fraction;
        this.intersectionNormal = output.normal;
      }
    }
  }

  return this.closestFraction;
}

Raycast.prototype.display = function (ctx) {
  'use strict';
  this.drawLine(ctx, this.p1, this.p2);
  Box2dEntity.prototype.display.call(this, ctx);
};
