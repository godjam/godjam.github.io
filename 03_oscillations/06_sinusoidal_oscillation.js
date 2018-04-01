/*global Scene, Tools, Mover*/
let SinusoidalOcillationScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Spring emulation");
    
    this.mover = new Mover(this.size.x / 2, this.size.y / 2, this, 20);
    this.delta = this.size.x / 10;
    this.t = 0;
};
SinusoidalOcillationScene.prototype = Object.create(Scene.prototype);
SinusoidalOcillationScene.prototype.constructor = SinusoidalOcillationScene;

SinusoidalOcillationScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.t += 0.01;
    let w = this.size.x / 2;
    this.mover.location.x = w + w * Math.cos(Math.PI * 2 * this.t);
    this.mover.location.y = Math.abs(w * Math.sin(Math.PI * 2 * this.t));
    
    this.ctx.beginPath();
    this.ctx.moveTo(w, 0);
    this.ctx.lineTo(this.mover.location.x, this.mover.location.y);
    this.ctx.lineWidth = 6;
    this.ctx.strokeStyle = "#ccc";
    this.ctx.stroke();
    this.ctx.closePath();
    this.mover.display(this.ctx);
    Scene.prototype.loop.call(this);
};
