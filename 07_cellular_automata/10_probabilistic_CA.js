/*global Scene, CA2DProbabilistic, MouseEvtListener*/
//*************************************************
var ProbaGameOfLifeScene = function (options) {
    "use strict";
    Scene.call(this, options);
    this.intro("Probabilistic Game Of Life", "Touch to add new cells.");
    this.init();
};
ProbaGameOfLifeScene.prototype = Object.create(Scene.prototype);
ProbaGameOfLifeScene.prototype.constructor = ProbaGameOfLifeScene;

ProbaGameOfLifeScene.prototype.init = function () {
    "use strict";
        var cellsize = Math.round(Math.max(8, this.size.x / 50)),
        columns = Math.round(this.size.x / cellsize),
        lines = Math.round(this.size.y / this.size.x * columns);
    this.ca = new CA2DProbabilistic(columns, lines, this);
    this.addListener(new MouseEvtListener(this.ctx.canvas, this.ca, this.ca.addCells));
};

ProbaGameOfLifeScene.prototype.loop = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    //this.frameloop.display(this.ctx);
    this.ca.update();
    this.ca.display(this.ctx);
    Scene.prototype.loop.call(this);
};
