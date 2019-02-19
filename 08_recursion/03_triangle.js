/* global Scene, SpkTriangle, Color*/
//*************************************************
let SierpinskiTriangleScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Sierpiński Triangle");
    this.theta = 0;
    this.radius = Math.min(this.size.x, this.size.y) / 2 * 0.8;
    this.triangle = new SpkTriangle(this, 0, 0, this.radius, 5);
};
SierpinskiTriangleScene.prototype = Object.create(Scene.prototype);
SierpinskiTriangleScene.prototype.constructor = SierpinskiTriangleScene;

SierpinskiTriangleScene.prototype.loop = function () {
    "use strict";

    let s = 1 + Math.sin(this.theta) * 0.3;
    this.theta += this.frameloop.delta * 0.5;
    if(this.theta > Math.PI * 2) {this.theta -= Math.PI * 2; }

    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    this.ctx.save();
    this.ctx.translate(this.size.x / 2, this.size.y / 2);
    
    this.ctx.rotate(this.theta);
    this.triangle.display(this.ctx);
    this.ctx.restore();
    Scene.prototype.loop.call(this);
};