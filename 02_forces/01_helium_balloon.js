/*global Scene, Mover, Gravity, RandomForce*/
var HeliumBalloonScene = function () {
    "use strict";
    Scene.call(this);
    this.ballon = new Mover(this.width / 2, this.height / 2,
                             this.width, this.height, 100);
    this.ballon.initRandomly();
    this.gravity = new Gravity(0, -0.01);
    this.wind = new RandomForce(true);
    
};
HeliumBalloonScene.prototype = Object.create(Scene.prototype);
HeliumBalloonScene.prototype.constructor =  HeliumBalloonScene;

HeliumBalloonScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // update 
    this.wind.applyOn(this.ballon);
    this.gravity.applyOn(this.ballon);
    this.ballon.update(true);
    
    // draw
    this.ballon.displayAsCircle(this.ctx);
    
    Scene.prototype.loop.call(this);
};