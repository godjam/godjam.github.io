/*global Scene, Tools, Color*/
var NormalDistribScene = function () {
    "use strict";
    Scene.call(this);
    
    this.mean = this.width / 2;
    this.sd = Math.min(this.width, this.height) / 4;
    
    this.ctx.globalAlpha = 10 / 256;
    this.ctx.fillStyle = Color.createBrightColor().ToHex();
    this.ctx.strokeStyle = Color.createBrightColor().ToHex();
};
NormalDistribScene.prototype = Object.create(Scene.prototype);
NormalDistribScene.prototype.constructor = NormalDistribScene;


NormalDistribScene.prototype.loop = function () {
    "use strict";
    var i = 0,
        x = 0,
        y = this.height / 2;
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.ctx.fillRect(this.mean, y - 10, 2, 2);
    this.ctx.fillRect(this.mean + this.sd, y - 10, 2, 2);
    this.ctx.fillRect(this.mean - this.sd, y - 10, 2, 2);

    for (i = 0; i < 100; i += 1) {
        x = Tools.normalRnd() * this.sd + this.mean;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.sd / 2, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    Scene.prototype.loop.call(this);
};