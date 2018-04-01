/*global Scene, Vector2, Color*/
let BouncingBallScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Bouncing Ball", "It all starts with small things.");

    this.r = Math.min(this.size.x, this.size.y) / 50;

    this.locations = [];
    this.velocities = [];
    this.colors = [];

    let i = 0;
    for (i = 0; i < 50; i += 1) {
        this.locations.push(new Vector2(Math.random() * (this.size.x - this.r * 2) + this.r,
                                        Math.random() * (this.size.y - this.r * 2) + this.r));
        this.velocities.push(new Vector2(Math.random() * 5, Math.random() * 5));
        this.colors.push(Color.createLightColor());
    }
};
BouncingBallScene.prototype = Object.create(Scene.prototype);
BouncingBallScene.prototype.constructor = BouncingBallScene;

BouncingBallScene.prototype.loop = function () {
    "use strict";
    let i = 0;

    this.ctx.shadowBlur = 6;
    this.ctx.shadowOffsetY = 6;
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    for (i = 0; i < this.locations.length; i += 1) {
        this.locations[i].addInPlace(this.velocities[i]);
        if ((this.locations[i].x + this.r > this.size.x) || (this.locations[i].x - this.r < 0)) {
            this.velocities[i].x *= -1;
        }
        if ((this.locations[i].y + this.r > this.size.y) || (this.locations[i].y - this.r < 0)) {
            this.velocities[i].y *= -1;
        }

        this.ctx.fillStyle = this.colors[i].rgba();
        this.ctx.shadowColor = this.colors[i].copy().darken().rgba();
        this.ctx.beginPath();
        this.ctx.arc(this.locations[i].x, this.locations[i].y, this.r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }
    Scene.prototype.loop.call(this);
};