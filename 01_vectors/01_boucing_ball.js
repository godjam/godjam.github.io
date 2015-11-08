/*global Scene, Vector2, Color*/
var BouncingBallScene = function () {
    "use strict";
    Scene.call(this);
    this.r = Math.min(this.width, this.height) / 10;
    this.location = new Vector2(this.r * 2, this.r * 2);
    this.velocity = new Vector2(2.5, 5);
    
    this.color = Color.createLightColor();
    this.ctx.shadowBlur = this.r / 2;
    this.ctx.shadowOffsetY = this.ctx.shadowBlur / 3;
};
BouncingBallScene.prototype = Object.create(Scene.prototype);
BouncingBallScene.prototype.constructor = BouncingBallScene;

BouncingBallScene.prototype.loop = function () {
    "use strict";
    this.location.addInPlace(this.velocity);
    if ((this.location.x + this.r > this.width) || (this.location.x - this.r < 0)) {
        this.velocity.x *= -1;
        this.color.modify(0.1, 0, 0);
    }
    if ((this.location.y + this.r > this.height) || (this.location.y - this.r < 0)) {
        this.velocity.y *= -1;
        this.color.modify(0.1, 0, 0);
    }
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.color.ToHex();
    this.ctx.shadowColor = this.color.copy().darken().ToHex();
    this.ctx.beginPath();
    this.ctx.arc(this.location.x, this.location.y, this.r, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
    Scene.prototype.loop.call(this);
};