/*global Scene, Mover, toxi, Vector2*/
var MoverPerlinScene = function () {
    "use strict";
    Scene.call(this);
    this.mover = new Mover(this.size.x / 2, this.size.y / 2, this, 40);
    this.p = new toxi.math.noise.PerlinNoise();
    this.lastAccel = new Vector2(0, 0);
};
MoverPerlinScene.prototype = Object.create(Scene.prototype);
MoverPerlinScene.prototype.constructor =  MoverPerlinScene;

MoverPerlinScene.prototype.loop = function () {
    "use strict";
    // normalized acceleration

    var norm = this.mover.location,
        acceleration = new Vector2(0, 0),
        ax =  this.p.noise(norm.y, norm.x) - 0.5,
        ay =  this.p.noise(norm.x, norm.y) - 0.5;
    if (isNaN(ax)) {ax = 0; }
    if (isNaN(ay)) {ay = 0; }
    acceleration.x = ax / 100;
    acceleration.y = ay / 100;
    acceleration.normalizeInPlace();
    this.mover.acceleration = acceleration;
    this.lastAccel = acceleration.copy();
    this.mover.update(true);
    
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.mover.display(this.ctx);
    
    Scene.prototype.loop.call(this);
};