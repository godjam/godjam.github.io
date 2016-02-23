/*global Scene, CA*/
//*************************************************
var WolframCAScene = function () {
    "use strict";
    Scene.call(this);
    this.intro("Wolfram CA", "Generates new rules continuously.");
    this.init();
};
WolframCAScene.prototype = Object.create(Scene.prototype);
WolframCAScene.prototype.constructor = WolframCAScene;

WolframCAScene.prototype.init = function () {
    "use strict";
    var cellsize = Math.round(Math.max(8, this.size.x / 50)),
    columns = Math.round(this.size.x / cellsize),
    lines = Math.round(this.size.y / cellsize);
    this.ca = new CA(columns, lines, this);
    this.addUpdatCallback(this.ca, this.ca.step, 100);
};

WolframCAScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.ca.display(this.ctx);
    Scene.prototype.loop.call(this);
};
