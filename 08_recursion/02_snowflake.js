/*global Scene, Kochcurve, Vector2, ColorMap, Color*/
//*************************************************
var KochSnowflakeScene = function () {
    "use strict";
    Scene.call(this);
    this.intro("Snowflake");
    var r = Math.min(this.size.x, this.size.y) / 2 - 20,
        p1 = Vector2.fromPolar(r, 2 * Math.PI / 3),
        p2 = Vector2.fromPolar(r, 4 * Math.PI / 3),
        p3 = Vector2.fromPolar(r, 0),
        c1 = Color.createStrongColor(),
        c2 = Color.createBrightColor(1);
    this.theta = Math.PI * 8 / 3;
    var colormap = new ColorMap(c1, c2, 5);
    this.flake1 = new Kochcurve(p2, p1, colormap);
    this.flake2 = new Kochcurve(p3, p2, colormap);
    this.flake3 = new Kochcurve(p1, p3, colormap);
};
KochSnowflakeScene.prototype = Object.create(Scene.prototype);
KochSnowflakeScene.prototype.constructor = KochSnowflakeScene;

KochSnowflakeScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.frameloop.display(this.ctx);
    var s = 1 + Math.sin(this.theta * 2) * 0.1;
    this.theta += this.frameloop.delta / 5000;
    if(this.theta > Math.PI * 2) {this.theta -= Math.PI * 2; }

    this.ctx.save();
    this.ctx.translate(this.size.x / 2, this.size.y / 2);
    this.ctx.scale(s, s);
    this.ctx.rotate(this.theta);
    this.flake1.display(this.ctx);
    this.flake2.display(this.ctx);
    this.flake3.display(this.ctx);
    this.ctx.restore();

    Scene.prototype.loop.call(this);
};