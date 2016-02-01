/*global Scene, Vector2, Color*/
var BouncingBallScene = function () {
    "use strict";
    Scene.call(this);
    this.intro("Simple Bouncing Ball", "Yeay, everything begins here.");
    
    this.r = Math.min(this.size.x, this.size.y) / 10;
    this.location = new Vector2(this.r * 2, this.r * 2);
    this.velocity = new Vector2(2.5, 5);
    this.color = Color.createLightColor();
};
BouncingBallScene.prototype = Object.create(Scene.prototype);
BouncingBallScene.prototype.constructor = BouncingBallScene;

BouncingBallScene.prototype.loop = function () {
    "use strict";
    this.location.addInPlace(this.velocity);
    if ((this.location.x + this.r > this.size.x) || (this.location.x - this.r < 0)) {
        this.velocity.x *= -1;
    }
    if ((this.location.y + this.r > this.size.y) || (this.location.y - this.r < 0)) {
        this.velocity.y *= -1;
    }
    
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.ctx.fillStyle = this.color.ToHex();
    this.ctx.shadowColor = this.color.copy().darken().ToHex();
    this.ctx.beginPath();
    this.ctx.arc(this.location.x, this.location.y, this.r, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.shadowBlur = 6;
    this.ctx.shadowOffsetY = 6;
    this.ctx.fill();
    Scene.prototype.loop.call(this);
};