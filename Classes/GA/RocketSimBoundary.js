function RocketSimBoundary(scene) {
  'use strict';
  this.scene = scene;

  let x = this.scene.size.x / 2;
  let y = this.scene.size.y * 0.2;
  this.target = new Vector2(x, y);
  this.targetRect = new Mover(this.target.x, this.target.y, this.scene)

  this.obstaclesCount = (~~this.scene.size.x / 300) + 1;
  this.obstacles = [];
}

RocketSimBoundary.prototype.init = function () {
  'use strict';
  for (let i = 0; i < this.obstaclesCount; ++i) {
      let w = this.scene.size.x * 0.3;
      let x = this.scene.size.x * 0.3 + Math.random() * w;
      let h = this.scene.size.y * 0.3;
      let y = this.scene.size.y * 0.5 + Math.random() * h;
      let m = this.scene.size.y / 30;
      let mass = Math.random() * m + m;
      this.obstacles.push(new Mover(x, y, this.scene, mass))
  }
}

RocketSimBoundary.prototype.update = function () {
  'use strict';
}

RocketSimBoundary.prototype.display = function (ctx) {
  'use strict';  
  this.targetRect.display(this.scene.ctx);

  for (let i = 0; i < this.obstacles.length; ++i) {
      let obstacle = this.obstacles[i];
      obstacle.angle += 0.03 - i / 100;
      obstacle.displayAsPoly(ctx, 6 + i);
  }
}