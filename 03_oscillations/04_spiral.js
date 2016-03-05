/*global Vector2, Scene, Color*/
//*************************************************
var SpiralScene = function () {
	"use strict";
    Scene.call(this);
    this.intro("Spiral");

    this.r = 0;
    this.theta = 0;
    this.color = Color.createLightColor();
};
SpiralScene.prototype = Object.create(Scene.prototype);
SpiralScene.prototype.constructor =  SpiralScene;

SpiralScene.prototype.resize = function () {
    "use strict";
    this.r = 0;
    this.theta = 0;
    Scene.prototype.resize.call(this);
};

SpiralScene.prototype.loop = function () {
    "use strict";
    if (this.r * 2 + 10 < this.size.x) {
        var v1 = new Vector2(),
            i = 0;

        for (i = 0; i < 50; i += 1) {
            v1 = Vector2.fromPolar(this.r, this.theta);
            this.ctx.beginPath();
            this.ctx.arc(this.size.x / 2 + v1.x,
                         this.size.y / 2 + v1.y,
                         10, 0, Math.PI * 2);
            this.ctx.closePath();
            this.color = this.color.mutate();
            this.ctx.fillStyle = this.color.rgba();
            this.ctx.fill();

            this.theta += Math.PI / 250;
            this.r += 0.05;
        }
    }
    Scene.prototype.loop.call(this);
};