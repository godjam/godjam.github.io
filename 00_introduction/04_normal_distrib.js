/*global Scene, Tools, Color*/
var NormalDistribScene = function () {
    "use strict";
    Scene.call(this);
    this.sd = Math.min(this.size.x, this.size.y) / 2;
    this.baseHue = Math.random();
};
NormalDistribScene.prototype = Object.create(Scene.prototype);
NormalDistribScene.prototype.constructor = NormalDistribScene;

NormalDistribScene.prototype.resize = function () {
    "use strict";
    Scene.prototype.resize.call(this);
    this.ctx.globalAlpha = 0.5;
};

NormalDistribScene.prototype.loop = function () {
    "use strict";
    var xMean = this.size.x / 2,
        yMean = this.size.y / 2,
        x = Tools.normalRnd() * this.sd + xMean,
        y = Tools.normalRnd() * this.sd + yMean;
    this.ctx.fillStyle = Color.createNormalDistribColor(this.baseHue).ToHex();
    this.ctx.strokeStyle = Color.createNormalDistribColor(this.baseHue).ToHex();

    this.ctx.beginPath();
    this.ctx.arc(x, y, this.sd / 16, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    
    Scene.prototype.loop.call(this);
};