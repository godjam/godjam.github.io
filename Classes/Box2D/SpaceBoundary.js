// Like RocketSimBoundary but with Box2D
let SpaceBoundary = function (scene, world, scale) {
  "use strict";
  Box2dEntity.call(this, 0, 0, scene, world, scale);
  this.obstaclesCount = ~~(scene.size.x / 100) + 1;
  this.obstacles = [];
  this.target = null;
  
  // obstacles
  for (let i = 0; i < this.obstaclesCount; ++i) {
    let w = this.scene.size.x * 0.3;
    let h = this.scene.size.y * 0.3;

    let x = this.scene.size.x * Math.random();
    let y = this.scene.size.y * 0.5 + Math.random() * h;
    let c = new Circle(x, y, scene, this.world, this.scale, 20, B2StaticBody);
    this.addEntity("c" + i, c);
    this.obstacles.push(c);
  }

  // target
  let x = this.scene.size.x  / 2;
  let y = this.scene.size.y * 0.1;
  let c = new Circle(x, y, scene, this.world, this.scale, 10, B2StaticBody);
  this.addEntity("t", c);
  this.target = c;
};
SpaceBoundary.prototype = Object.create(Box2dEntity.prototype);
SpaceBoundary.prototype.constructor = SpaceBoundary;


SpaceBoundary.prototype.display = function (ctx) {
  "use strict";
  ctx.fillStyle = this.color.rgba();
  ctx.fillRect(this.x - this.boxW / 2,
               this.y - this.boxH / 2,
               this.boxW, this.boxH);
  Box2dEntity.prototype.display.call(this, ctx);
};
