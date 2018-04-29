/*global Scene, CA2DContinuous, MouseEvtListener*/
//*************************************************
let ContinuousGameOfLifeScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Continuous Game Of Life", "Touch to add new cells.");
    this.init();
};
ContinuousGameOfLifeScene.prototype = Object.create(Scene.prototype);
ContinuousGameOfLifeScene.prototype.constructor = ContinuousGameOfLifeScene;

ContinuousGameOfLifeScene.prototype.init = function () {
    "use strict";
        let cellsize = Math.round(Math.max(8, this.size.x / 50)),
        columns = Math.round(this.size.x / cellsize),
        lines = Math.round(this.size.y / this.size.x * columns);
    this.ca = new CA2DContinuous(columns, lines, this);
    this.addListener(new MouseEvtListener(this, (p) => this.ca.addCells(p)));
};

ContinuousGameOfLifeScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.ca.update();
    this.ca.display(this.ctx);
    Scene.prototype.loop.call(this);
};
