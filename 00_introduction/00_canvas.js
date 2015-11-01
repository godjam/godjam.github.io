/*global Scene, Context, Color*/
var CanvasTestScene = function () {
	"use strict";
    Scene.call(this);
    
    this.radius = 25;
    this.x = 0;
    this.y = this.height / 2;
    this.color = Color.createLightColor();
    
    this.ctx.strokeStyle = this.color.ToHex();
    this.ctx.fillStyle = this.color.darken().ToHex();
    this.ctx.shadowColor = this.color.modify(0, -0.2, -0.2).ToHex();
};
CanvasTestScene.prototype = Object.create(Scene.prototype);
CanvasTestScene.prototype.constructor = CanvasTestScene;


CanvasTestScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.shadowOffsetY = 6;
    this.ctx.shadowBlur = 6;

    this.x += 1;
    if (this.x - this.radius >= this.width) { this.x = 0; }
    
    Scene.prototype.loop.call(this);
};