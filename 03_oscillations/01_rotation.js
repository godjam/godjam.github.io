/*global Vector2, Color, Scene*/
//*************************************************
var RotationScene = function () {
    "use strict";
    Scene.call(this);
    var w = this.width,
        h = this.height;
    this.r = Math.min(w, h) / 2 * 0.8;
    this.c1 = Color.createBrightColor();
    this.c2 = Color.createBrightColor();
    
    this.v1 = new Vector2(w / 2, h / 2 - this.r);
    this.v2 = new Vector2(w / 2, h / 2 + this.r);
    this.v0 = new Vector2(w / 2, h / 2);
    this.angle = Math.PI / 100;
};
RotationScene.prototype = Object.create(Scene.prototype);
RotationScene.prototype.constructor =  RotationScene;

RotationScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.lineWidth = 6;
    this.ctx.strokeStyle = "#ccc";
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.v1.x, this.v1.y);
    this.ctx.lineTo(this.v2.x, this.v2.y);
    this.ctx.stroke();
    this.ctx.closePath();
    
    this.ctx.beginPath();
    this.ctx.arc(this.v1.x, this.v1.y, this.r / 5, 0, Math.PI * 2);
    this.c1 = this.c1.modify(0.001, 0, 0);
    this.ctx.fillStyle = this.c1.ToHex();
    this.ctx.fill();
    this.ctx.closePath();
    
    this.ctx.beginPath();
    this.ctx.arc(this.v2.x, this.v2.y, this.r / 5, 0, Math.PI * 2);
    this.c2 = this.c2.modify(0.001, 0, 0);
    this.ctx.fillStyle = this.c2.ToHex();
    this.ctx.fill();
    this.ctx.closePath();
    
    this.v1.rotateInPlace(this.angle, this.v0);
    this.v2.rotateInPlace(this.angle, this.v0);
    Scene.prototype.loop.call(this);
};
